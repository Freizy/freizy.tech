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

/**
 * POST an enquiry via Web3Forms (current active backend).
 * Silent success is returned for bot-like submissions (honeypot filled
 * or submitted implausibly fast) so spammers can't probe the form.
 * Throws an Error with a human-readable message on any real failure.
 *
 * NOTE: the serverless endpoint in api/contact.ts is the planned upgrade
 * path (adds auto-replies, topic routing, no submission caps). Switching
 * back is a one-line change here.
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
        subject: `New enquiry — ${payload.topic} — ${payload.name}`,
        name: payload.name,
        email: payload.email,
        company: payload.company || '',
        topic: payload.topic,
        message: payload.message,
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
