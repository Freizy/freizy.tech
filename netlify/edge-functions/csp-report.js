// Netlify Edge Function: CSP violation collector.
// Browsers POST reports here. The CSP currently emits `report-uri`, which
// sends application/csp-report; application/reports+json is also accepted so
// `report-to` can be enabled later without changing this function.
// We only log a size-capped line - never reflect or execute the body.
const MAX_BYTES = 8 * 1024;
const REPORT_TYPE = /^application\/(csp-report|reports\+json)\b/i;

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { allow: 'POST' },
    });
  }

  const contentType = request.headers.get('content-type') || '';
  if (!REPORT_TYPE.test(contentType)) {
    return new Response(null, { status: 204 });
  }

  try {
    const body = (await request.text()).slice(0, MAX_BYTES);
    if (body) console.log('[csp-report]', body);
  } catch {
    // Never let a malformed report affect the response.
  }

  return new Response(null, { status: 204 });
}

export const config = { path: '/api/csp-report' };
