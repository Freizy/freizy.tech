/**
 * Generates one static, indexable HTML page per product into public/products/.
 * Re-run with `npm run seo:pages` after editing the data below, then rebuild.
 * These pages are pure static HTML (no JS required) so crawlers see full
 * content; the interactive demos live on the main SPA at /#products.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'products');

const SITE = 'https://freizy.com';
const WHATSAPP = 'https://wa.me/233240352196';
// Interim app-link flow (store URLs land here later): tapping a store badge
// opens WhatsApp with a prefilled message so the team can send the link.
const APP_LINK_IOS =
  'https://wa.me/233240352196?text=' +
  encodeURIComponent('Hi Freizy! Please send me the Freizy Stays app link for iPhone.');
const APP_LINK_ANDROID =
  'https://wa.me/233240352196?text=' +
  encodeURIComponent('Hi Freizy! Please notify me when Freizy Stays lands on Android.');

const products = [
  {
    slug: 'omnia-suite',
    name: 'Freizy Omnia Suite',
    tag: 'Business management software',
    metaTitle: 'Omnia Suite — Business Management Software in Ghana | Freizy',
    metaDesc:
      'Omnia Suite handles invoicing, expenses, stock and sales reports for small and mid-size businesses in Ghana. Built and supported by Freizy Technologies.',
    lede:
      'Omnia Suite is business management software for small and mid-size companies that have outgrown spreadsheets. Invoicing, expenses, stock control, purchasing and sales reporting live in one place, so the numbers the owner sees match the numbers the shop floor sees.',
    features: [
      'Invoicing and expense tracking with a clear money-in, money-out view',
      'Stock and purchasing control across products, variants and suppliers',
      'Sales recording for counter staff, with simple end-of-day summaries',
      'Exportable reports for accountants, auditors and tax filings',
      'Multi-user access with roles, so staff only see what they need',
    ],
    forWho:
      'Built for retailers, distributors, pharmacies, restaurants and service companies in Ghana that need reliable records without enterprise complexity. It runs in the browser on phones and computers, works on modest connections, and every deployment is supported directly by the Freizy engineers who built it.',
    liveUrl: 'https://omnia.freizy.com',
    liveLabel: 'Open the live Omnia Suite site',
    related: ['lavida-health-buddy', 'ksm-autos'],
  },
  {
    slug: 'lavida-health-buddy',
    name: 'Lavida Health Buddy',
    tag: 'Patient support software',
    metaTitle: 'Lavida Health Buddy — Clinic Software in Ghana | Freizy',
    metaDesc:
      'Lavida Health Buddy gives clinics appointment reminders, secure patient records and dashboards. Patient-support software by Freizy Technologies, Accra.',
    lede:
      'Lavida Health Buddy helps clinics and patients stay connected between visits. Appointment reminders cut no-shows, health records stay organised and searchable, and clinic dashboards show the day at a glance — who is booked, who checked in, and who needs a follow-up.',
    features: [
      'Appointment scheduling with automated reminders for patients',
      'Secure patient records with access controls and privacy reviews',
      'Clinic dashboards covering queues, check-ins and daily load',
      'Guidance content patients can revisit after their visit',
      'Designed for front-desk staff — no technical training required',
    ],
    forWho:
      'Built for private clinics, dental and eye practices, diagnostic centres and specialist consulting rooms in Ghana that want fewer missed appointments and tidier records. Patient data handling follows privacy-by-design principles, reviewed from the first release.',
    liveUrl: 'https://lavida2.netlify.app',
    liveLabel: 'Open the Lavida demo site',
    related: ['omnia-suite', 'exams-suite'],
  },
  {
    slug: 'ksm-autos',
    name: 'KSM Autos',
    tag: 'Garage management software',
    metaTitle: 'KSM Autos — Garage Management Software in Ghana | Freizy',
    metaDesc:
      'KSM Autos manages bookings, service history, parts and customer messaging for garages and fleets in Ghana. By Freizy Technologies.',
    lede:
      'KSM Autos keeps the workshop organised. Online bookings fill the day sensibly, every vehicle carries its own service history, and parts and jobs are tracked against each work order — so nothing leaves the shop undocumented and no customer has to explain their car twice.',
    features: [
      'Online bookings with a workshop calendar the front desk controls',
      'Full service history per vehicle, searchable by plate or customer',
      'Parts ordering and job tracking tied to each work order',
      'Customer messaging for approvals, updates and pickup notices',
      'Fleet views for companies running several vehicles',
    ],
    forWho:
      'Built for independent garages, auto service centres and fleet operators in Ghana that want dealership-grade organisation without dealership-grade fees. The system is maintained by Freizy, so feature requests go to the people who can actually ship them.',
    liveUrl: 'https://ksm.autos',
    liveLabel: 'Open the live KSM Autos site',
    related: ['omnia-suite', 'oudy-events'],
  },
  {
    slug: 'exams-suite',
    name: 'Freizy Exams Suite',
    tag: 'Exam preparation software',
    metaTitle: 'Exams Suite — CBT Practice & Mock Exams in Ghana | Freizy',
    metaDesc:
      'Exams Suite offers question banks, timed mock exams and instant scoring for schools and candidates in Ghana. By Freizy Technologies.',
    lede:
      'Exams Suite gives schools and candidates a serious way to practise. Question banks organised by subject, timed mock exams that behave like the real thing, and instant scoring with reports that show exactly where marks are lost — preparation stops being guesswork.',
    features: [
      'Question banks organised by subject and topic',
      'Timed mock exams that simulate real exam conditions',
      'Instant scoring with per-question and per-topic breakdowns',
      'Progress reports for teachers, parents and candidates',
      'Works on phones, tablets and computer-lab desktops',
    ],
    forWho:
      'Built for basic and secondary schools, remedial centres and individual candidates in Ghana preparing for class exams, mocks and national examinations. Schools can run their own assessments on the platform; candidates can drill questions independently.',
    liveUrl: null,
    liveLabel: null,
    related: ['lavida-health-buddy', 'freizy-stays'],
  },
  {
    slug: 'oudy-events',
    name: 'Oudy',
    tag: 'Events and ticketing app',
    metaTitle: 'Oudy — Event Ticketing & Discovery in Ghana | Freizy',
    metaDesc:
      'Oudy is an events app for Ghana: event discovery, online ticketing and gate check-in for organizers and attendees. By Freizy Technologies.',
    lede:
      'Oudy connects event organizers with the people who fill seats. Organizers list events, sell tickets and check guests in at the gate; attendees discover what is happening around them and buy tickets from their phones. Fewer spreadsheets at the entrance, fewer queues, fewer fake tickets.',
    features: [
      'Event listings with discovery for attendees',
      'Online ticketing with payment collection',
      'Gate check-in tools that stop duplicate entry',
      'Ticket transfers with buyer verification',
      'Sales views so organizers track performance live',
    ],
    forWho:
      'Built for concert promoters, conference organizers, church and campus events, and nightlife venues in Ghana that want professional ticketing without giving away a large cut. Attendees get one app for finding plans and holding tickets.',
    liveUrl: null,
    liveLabel: null,
    related: ['freizy-stays', 'ksm-autos'],
  },
  {
    slug: 'freizy-stays',
    name: 'Freizy Stays',
    tag: 'Mobile app · Student housing',
    metaTitle: 'Freizy Stays — Student Hostel App in Ghana | Freizy',
    metaDesc:
      'Freizy Stays is a mobile app for finding trusted student hostels in Ghana: verified listings, 360 tours, video reviews, booking and MoMo installments.',
    lede:
      'Freizy Stays is a mobile app for finding student accommodation you can actually trust. Verified hostel listings with photos and 360-degree tours, video reviews from real tenants, and in-app booking with MoMo installment payments — the whole search, from first look to first payment, happens on your phone.',
    features: [
      'Freizy Verified listings — checked photos, amenities and utility ratings',
      '360-degree tours and video reviews from real tenants',
      'Search by university, area, price and room type',
      'In-app booking with digital receipts for every payment',
      'MoMo installment plans that split fees into monthly payments',
    ],
    forWho:
      'Built for students hunting for rooms near the University of Ghana, KNUST, UPSA, UCC and other campuses — and for hostel managers who want serious tenants without the chaos of paper lists and scattered chats. Managers list rooms once; bookings, payments and messages stay organised.',
    liveUrl: null,
    liveLabel: null,
    related: ['oudy-events', 'exams-suite'],
    app: {
      category: 'LifestyleApplication',
      os: 'iOS',
      availability: 'iOS available now · Android coming soon',
    },
    appFaq: [
      {
        q: 'Is Freizy Stays free to use?',
        a: 'Yes — downloading the app and browsing hostels costs nothing. You only pay the hostel when you book, either in full or in MoMo installments.',
      },
      {
        q: 'What does Freizy Verified mean?',
        a: 'A Freizy Verified listing has been checked by our team: real photos of the actual rooms, confirmed amenities, and honest utility ratings for light and water from tenants.',
      },
      {
        q: 'How do MoMo installment payments work?',
        a: 'Instead of paying a full semester upfront, you can split it into four monthly MoMo payments inside the app. Every payment issues a digital receipt, so fee disputes are easy to settle.',
      },
    ],
  },
];

const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));

function faqSchema(p) {
  if (!p.appFaq) return '';
  const items = p.appFaq
    .map(
      (f) => `    {
      "@type": "Question",
      "name": "${f.q}",
      "acceptedAnswer": { "@type": "Answer", "text": "${f.a}" }
    }`
    )
    .join(',\n');
  return `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
${items}
    ]
  }
  </script>
`;
}

/**
 * App landing sections for mobile-app products: store download block,
 * a CSS recreation of the in-app listing screen, a manager CTA and an FAQ.
 */
function appSections(p) {
  const faqs = (p.appFaq || [])
    .map(
      (f) => `    <details class="faq">
      <summary>${f.q}</summary>
      <p>${f.a}</p>
    </details>`
    )
    .join('\n');
  return `
    <div class="dl" id="get-the-app">
      <h2>Get ${p.name}</h2>
      <p>Free download. ${p.app.availability}. Tap a button and we will send the install link straight to your WhatsApp.</p>
      <p class="badges">
        <a class="store" href="${APP_LINK_IOS}" target="_blank" rel="noopener noreferrer">Download on the App Store</a>
        <a class="store ghost" href="${APP_LINK_ANDROID}" target="_blank" rel="noopener noreferrer">Get it on Google Play</a>
      </p>
      <p class="avail">${p.app.availability}.</p>
    </div>
    <h2>Inside the app</h2>
    <div class="phone" role="img" aria-label="Sample Freizy Stays listing: Oak Court Hostel, GH₵ 3500 per semester, with amenities, video reviews and MoMo installment booking.">
      <div class="ph-status"><span>9:41</span><span>5G &#9646;&#9646;&#9646;</span></div>
      <div class="ph-head"><span>&#8249;</span><span class="ph-brand">FREIZY <b>STAYS</b></span><span>&#8599; &#128278;</span></div>
      <div class="ph-photo">
        <span class="ph-chip ok">Freizy Verified</span>
        <span class="ph-chip tour">360 Tour</span>
      </div>
      <div class="ph-body">
        <div class="ph-row"><b>Oak Court Hostel</b><b>GH&#8373; 3500<small>/semester</small></b></div>
        <div class="ph-row pills"><span class="pill y">Light 4.8</span><span class="pill b">Water 4.6</span></div>
        <p class="ph-loc">Legon, Accra &middot; 1.2km from University of Ghana</p>
        <p class="ph-sec">Amenities</p>
        <div class="ph-amen"><span>Wi-Fi</span><span>AC</span><span>24/7 Security</span><span>Study Room</span><span>Laundry</span><span>Kitchen</span></div>
        <p class="ph-sec">Video Reviews <a href="#get-the-app">See all 12</a></p>
        <div class="ph-rev">
          <div><i>&#9654;</i><b>Clean &amp; safe</b><small>Ama K.</small></div>
          <div><i>&#9654;</i><b>Great water supply</b><small>Kwame</small></div>
          <div><i>&#9654;</i><b>Nice study space</b><small>Efe</small></div>
        </div>
        <div class="ph-momo"><div><b>MoMo Installment</b><small>Pay in 4 monthly installments</small></div><b>GH&#8373; 875 &times; 4</b></div>
        <div class="ph-book">Book Now</div>
      </div>
    </div>
    <p class="avail" style="text-align:center">Sample listing as it appears in the app.</p>
    <div class="mgr">
      <h2>Own a hostel? List it on ${p.name}</h2>
      <p>Verified hostels get discovered by thousands of students searching near their campus. Listing is free to start — message us and we will photograph, verify and publish your rooms.</p>
      <p><a class="btn" href="${WHATSAPP}" target="_blank" rel="noopener noreferrer">List your hostel</a></p>
    </div>
    <h2>App questions</h2>
${faqs}`;
}

function page(p) {
  const url = `${SITE}/products/${p.slug}/`;
  const relatedLinks = p.related
    .map((s) => {
      const r = bySlug[s];
      return `<li><a href="${SITE}/products/${r.slug}/">${r.name}</a> — ${r.tag.toLowerCase()}.</li>`;
    })
    .join('\n      ');
  const live = p.liveUrl
    ? `<p><a class="btn" href="${p.liveUrl}" target="_blank" rel="noopener noreferrer">${p.liveLabel}</a></p>`
    : `<p>There is no public demo site for ${p.name} yet — <a href="${WHATSAPP}" target="_blank" rel="noopener noreferrer">message us on WhatsApp</a> and we will walk you through it on a call.</p>`;
  const features = p.features.map((f) => `<li>${f}</li>`).join('\n      ');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.metaTitle}</title>
  <meta name="description" content="${p.metaDesc}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Freizy Technologies" />
  <meta property="og:title" content="${p.metaTitle}" />
  <meta property="og:description" content="${p.metaDesc}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${SITE}/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${p.metaTitle}" />
  <meta name="twitter:description" content="${p.metaDesc}" />
  <meta name="twitter:image" content="${SITE}/og-image.png" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "${p.app ? 'MobileApplication' : 'SoftwareApplication'}",
    "name": "${p.name}",
    "applicationCategory": "${p.app ? p.app.category : 'BusinessApplication'}",
    "operatingSystem": "${p.app ? p.app.os : 'Web'}",
    "url": "${url}",
    "description": "${p.metaDesc}",
    "provider": {
      "@type": "Organization",
      "name": "Freizy Technologies",
      "url": "${SITE}/",
      "telephone": "+233240352196",
      "address": { "@type": "PostalAddress", "addressLocality": "Accra", "addressCountry": "GH" }
    }
  }
  </script>
${p.appFaq ? faqSchema(p) : ''}  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "${SITE}/" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "${SITE}/#products" },
      { "@type": "ListItem", "position": 3, "name": "${p.name}", "item": "${url}" }
    ]
  }
  </script>
  <style>
    :root { --red: #ed1c24; --ink: #1d1d1f; --muted: #6e6e73; }
    * { box-sizing: border-box; margin: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif; color: var(--ink); line-height: 1.65; background: #fff; }
    @media (prefers-color-scheme: dark) { body { background: #000; color: #f5f5f7; } }
    .wrap { max-width: 760px; margin: 0 auto; padding: 0 20px; }
    header.top { border-bottom: 1px solid #e5e5e5; padding: 14px 0; }
    header.top a.brand { font-weight: 800; letter-spacing: 0.08em; text-decoration: none; color: inherit; }
    header.top a.brand span { color: var(--red); }
    nav.crumbs { font-size: 13px; color: var(--muted); margin: 28px 0 8px; }
    nav.crumbs a { color: var(--muted); }
    .tag { display: inline-block; font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--red); margin-bottom: 10px; }
    h1 { font-size: clamp(32px, 5vw, 48px); line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 16px; }
    .lede { font-size: 18px; margin-bottom: 28px; }
    h2 { font-size: 22px; margin: 36px 0 12px; letter-spacing: -0.01em; }
    ul.feats { padding-left: 20px; margin-bottom: 8px; }
    ul.feats li { margin-bottom: 8px; }
    p { margin-bottom: 14px; }
    a { color: var(--red); }
    .btn { display: inline-block; background: var(--red); color: #fff !important; text-decoration: none; font-weight: 600; padding: 10px 22px; margin: 6px 0 4px; }
    .cta { border: 1px solid #e5e5e5; padding: 24px; margin: 32px 0; }
    .cta h2 { margin-top: 0; }
    ul.related { padding-left: 20px; }
    ul.related li { margin-bottom: 6px; }
    footer { border-top: 1px solid #e5e5e5; margin-top: 48px; padding: 24px 0 40px; font-size: 14px; color: var(--muted); }
    footer a { color: var(--muted); }
    .dl { border: 2px solid var(--ink); padding: 24px; margin: 28px 0; }
    .dl h2 { margin-top: 0; }
    .badges { display: flex; flex-wrap: wrap; gap: 10px; margin: 14px 0 6px; }
    a.store { display: inline-block; background: #000; color: #fff !important; text-decoration: none; font-weight: 600; font-size: 15px; padding: 12px 20px; }
    a.store.ghost { background: transparent; color: var(--ink) !important; border: 2px solid var(--ink); }
    @media (prefers-color-scheme: dark) { a.store.ghost { color: #f5f5f7 !important; border-color: #f5f5f7; } .dl { border-color: #f5f5f7; } }
    .avail { font-size: 13px; color: var(--muted); }
    .phone { max-width: 320px; margin: 28px auto 8px; border: 10px solid #111; border-radius: 44px; overflow: hidden; background: #fff; color: #111; font-size: 13px; line-height: 1.45; }
    .ph-status { display: flex; justify-content: space-between; padding: 10px 18px 2px; font-weight: 600; font-size: 12px; }
    .ph-head { display: flex; justify-content: space-between; align-items: center; padding: 8px 14px; font-size: 16px; letter-spacing: 0.06em; }
    .ph-head .ph-brand b { color: var(--red); font-weight: 400; }
    .ph-photo { position: relative; height: 150px; margin: 0 12px; border-radius: 12px; background: linear-gradient(135deg, #3f4a5a 0%, #6b7686 45%, #9aa3ad 70%, #4a5568 100%); }
    .ph-chip { position: absolute; bottom: 10px; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
    .ph-chip.ok { left: 10px; background: #16a34a; color: #fff; }
    .ph-chip.tour { right: 10px; background: rgba(0,0,0,0.65); color: #fff; }
    .ph-body { padding: 12px 14px 16px; }
    .ph-row { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin-bottom: 6px; }
    .ph-row small { font-weight: 400; color: #666; font-size: 11px; }
    .pill { font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 16px; }
    .pill.y { background: #fef3c7; color: #92400e; }
    .pill.b { background: #dbeafe; color: #1e40af; }
    .ph-loc { font-size: 12px; color: #555; margin: 8px 0 4px; }
    .ph-sec { font-weight: 700; font-size: 14px; margin: 12px 0 8px; }
    .ph-sec a { font-size: 12px; font-weight: 600; float: right; }
    .ph-amen { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
    .ph-amen span { background: #f3f4f6; border-radius: 8px; font-size: 11px; text-align: center; padding: 10px 2px; }
    .ph-rev { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
    .ph-rev div { background: #fdf2f2; border-radius: 8px; padding: 16px 4px 10px; text-align: center; position: relative; }
    .ph-rev i { position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 22px; height: 22px; border-radius: 50%; background: rgba(0,0,0,0.55); color: #fff; font-style: normal; font-size: 10px; line-height: 22px; }
    .ph-rev b { display: block; font-size: 11px; }
    .ph-rev small { color: #666; font-size: 11px; }
    .ph-momo { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 12px; }
    .ph-momo small { display: block; color: #666; }
    .ph-book { background: var(--red); color: #fff; text-align: center; font-weight: 700; border-radius: 24px; padding: 12px; margin-top: 10px; }
    .mgr { border: 1px solid #e5e5e5; padding: 24px; margin: 32px 0; }
    .mgr h2 { margin-top: 0; }
    details.faq { border-top: 1px solid #e5e5e5; padding: 14px 0; }
    details.faq:last-of-type { border-bottom: 1px solid #e5e5e5; }
    details.faq summary { cursor: pointer; font-weight: 600; list-style: none; }
    details.faq summary::-webkit-details-marker { display: none; }
  </style>
</head>
<body>
  <header class="top">
    <div class="wrap"><a class="brand" href="${SITE}/">FREIZY<span>.</span></a></div>
  </header>
  <main class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="${SITE}/">Home</a> / <a href="${SITE}/#products">Products</a> / ${p.name}</nav>
    <span class="tag">${p.tag}</span>
    <h1>${p.name}</h1>
    <p class="lede">${p.lede}</p>
    <h2>What it does</h2>
    <ul class="feats">
      ${features}
    </ul>
    <h2>Who it is for</h2>
    <p>${p.forWho}</p>
    ${p.app ? appSections(p) : live}
    <div class="cta">
      <h2>Talk to the people who built it</h2>
      <p>Every Freizy product is maintained by our own engineers in Accra — support comes from the people who wrote the code.</p>
      <p>
        <a class="btn" href="${SITE}/#contact">Contact us</a>
        &nbsp;&nbsp;<a href="${WHATSAPP}" target="_blank" rel="noopener noreferrer">WhatsApp: +233 24 035 2196</a>
      </p>
    </div>
    <h2>Related products</h2>
    <ul class="related">
      ${relatedLinks}
    </ul>
  </main>
  <footer>
    <div class="wrap">
      Freizy Technologies, Accra, Ghana ·
      <a href="mailto:info@freizy.com">info@freizy.com</a> ·
      <a href="tel:+233240352196">+233 24 035 2196</a> ·
      <a href="${SITE}/">freizy.com</a>
    </div>
  </footer>
</body>
</html>
`;
}

for (const p of products) {
  const dir = join(outDir, p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page(p));
  console.log('wrote public/products/' + p.slug + '/index.html');
}
