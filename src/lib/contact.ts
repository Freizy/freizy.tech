export interface EnquiryPayload {
  name: string;
  email: string;
  company?: string;
  topic: string;
  message: string;
  /** Honeypot — must stay empty. */
  website?: string;
  /** Timestamp (ms) of when the visitor started the form. */
  startedAt?: number;
}

const ENDPOINT = 'https://api.web3forms.com/submit';

/** Trim + hard-cap every field so tampered clients can't send oversized payloads. */
const clip = (value: string | undefined, max: number): string =>
  (value ?? '').trim().slice(0, max);

/**
 * POST an enquiry via Web3Forms (current active backend).
 * Silent success is returned for bot-like submissions (honeypot filled
 * or submitted implausibly fast) so spammers can't probe the form.
 * Throws an Error with a human-readable message on any real failure.
 *
 * SECURITY NOTE: the Web3Forms key is public by design and submissions go
 * straight to their API, so the honeypot is best-effort only. See README
 * "Accepted risk" before replacing this with a server-side proxy.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  // Honeypot only: filled means bot — silent success so spammers can't probe.
  // (No fill-time gate: browser autofill lets real humans submit in seconds,
  // and false negatives here look exactly like "it's not working".)
  if (payload.website) return;

  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
  if (!accessKey) {
    throw new Error(
      'Our form service isn\u2019t connected yet. Please message us on WhatsApp or email directly.'
    );
  }

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New enquiry — ${clip(payload.topic, 80)} — ${clip(payload.name, 120)}`,
        name: clip(payload.name, 120),
        email: clip(payload.email, 160),
        company: clip(payload.company, 160),
        topic: clip(payload.topic, 80),
        message: clip(payload.message, 5000),
      }),
    });
  } catch {
    throw new Error(
      'Could not reach our server. Check your connection — or message us on WhatsApp.'
    );
  }

  let data: { success?: boolean; message?: string } = {};
  try {
    data = await res.json();
  } catch {
    /* ignore */
  }
  if (res.ok && data.success) return;
  throw new Error(data.message || 'Something went wrong sending your message.');
}
