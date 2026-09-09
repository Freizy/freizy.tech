export const config = { runtime: 'edge' };

import { Resend } from 'resend';

const CONTACT_TO_FALLBACK = 'info@freizy.com';
const CONTACT_FROM_FALLBACK = 'website@freizy.com';
const MAX_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;
const MIN_FILL_MS = 3000;

const hits = new Map<string, number[]>();

function json(data: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const str = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

const cleanSubject = (v: string): string => v.replace(/[\r\n]+/g, ' ').slice(0, 120);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

  let raw: unknown = null;
  try {
    raw = await req.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }
  const body = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>;

  // Honeypot: bots fill it; pretend success so they can't probe.
  if (str(body.website, 500)) return json({ ok: true }, 200);

  // Fill-time check: humans take more than a few seconds.
  const startedAt = Number(body.startedAt) || 0;
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) return json({ ok: true }, 200);

  const name = str(body.name, 120);
  const email = str(body.email, 160);
  const company = str(body.company, 160);
  const topic = str(body.topic, 80) || 'General enquiry';
  const message = str(body.message, 5000);

  if (!name) return json({ error: 'Please include your name.' }, 400);
  if (!EMAIL_RE.test(email)) return json({ error: 'That email address doesn\u2019t look right.' }, 400);
  if (message.length < 10)
    return json({ error: 'Please add a little more detail (10+ characters).' }, 400);

  if (rateLimited(clientIp(req))) {
    return json(
      { error: 'Too many messages in a short time. Please try again in a few minutes.' },
      429
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json({ error: 'Email service is not configured yet.' }, 503);
  const to = process.env.CONTACT_TO ?? CONTACT_TO_FALLBACK;
  const from = process.env.CONTACT_FROM ?? CONTACT_FROM_FALLBACK;

  const resend = new Resend(apiKey);
  const subject = cleanSubject(`New enquiry — ${topic} — ${name}`);
  const lines = [
    'New website enquiry',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    `Topic: ${topic}`,
    '',
    message,
  ].filter((l): l is string => l !== null);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text: lines.join('\n'),
    });
    if (error) {
      return json(
        { error: 'Could not send your message. Please try WhatsApp or email directly.' },
        502
      );
    }
  } catch {
    return json(
      { error: 'Could not send your message. Please try WhatsApp or email directly.' },
      502
    );
  }

  // Best-effort auto-reply; never fails the request.
  try {
    await resend.emails.send({
      from,
      to: email,
      subject: 'We received your message — Freizy Technologies',
      text: [
        `Hi ${name},`,
        '',
        'Thanks for writing to Freizy Technologies. A real person will reply within 12 hours on business days.',
        '',
        'Need us sooner? WhatsApp: +233 24 035 2196.',
        '',
        '— The Freizy team',
      ].join('\n'),
    });
  } catch {
    /* ignore */
  }

  return json({ ok: true }, 200);
}
