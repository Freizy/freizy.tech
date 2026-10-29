/**
 * Generates one static, indexable HTML page per product into public/products/.
 * Re-run with `npm run seo:pages` after editing the data below, then rebuild.
 * These pages are pure static HTML (no JS required) so crawlers see full
 * content; the interactive demos live on the main SPA at /products.
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
  encodeURIComponent('Hi Freizy! Please send me the Stays app link for iPhone.');
const APP_LINK_ANDROID =
  'https://wa.me/233240352196?text=' +
  encodeURIComponent('Hi Freizy! Please notify me when Stays lands on Android.');

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
    liveUrl: null,
    liveLabel: null,
    ctaUrl: SITE + '/contact',
    ctaLabel: 'Request an Omnia Suite walkthrough',
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
    name: 'Stays',
    tag: 'Mobile app · Student housing',
    metaTitle: 'Stays — Student Hostel App in Ghana | Freizy',
    metaDesc:
      'Stays is a mobile app for finding trusted student hostels in Ghana: verified listings, 360 tours, video reviews, booking and MoMo installments.',
    lede:
      'Stays is a mobile app for finding student accommodation you can actually trust. Verified hostel listings with photos and 360-degree tours, video reviews from real tenants, and in-app booking with MoMo installment payments — the whole search, from first look to first payment, happens on your phone.',
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
      availability: 'iPhone early access · Android in development',
    },
    appFaq: [
      {
        q: 'Is Stays free to use?',
        a: 'Yes — joining early access and browsing hostels costs nothing. You only pay the hostel when you book, either in full or in MoMo installments.',
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

function standardPage(p, features, live) {
  return `
    <nav class="crumbs" aria-label="Breadcrumb"><a href="${SITE}/">Home</a> / <a href="${SITE}/products">Products</a> / ${p.name}</nav>
    <span class="tag">${p.tag}</span>
    <h1>${p.name}</h1>
    <p class="lede">${p.lede}</p>
    <h2>What it does</h2>
    <ul class="feats">
      ${features}
    </ul>
    <h2>Who it is for</h2>
    <p>${p.forWho}</p>
    ${live}
    <div class="cta">
      <h2>Talk to the people who built it</h2>
      <p>Every Freizy product is maintained by our own engineers in Accra — support comes from the people who wrote the code.</p>
      <p>
        <a class="btn" href="${SITE}/contact">Contact us</a>
        &nbsp;&nbsp;<a href="${WHATSAPP}" target="_blank" rel="noopener noreferrer">WhatsApp: +233 24 035 2196</a>
      </p>
    </div>`;
}

function storeBadges() {
  return `<p class="badges">
      <a class="store" href="${APP_LINK_IOS}" target="_blank" rel="noopener noreferrer"><small>Early access on</small>iPhone</a>
      <a class="store ghost" href="${APP_LINK_ANDROID}" target="_blank" rel="noopener noreferrer"><small>Coming soon to</small>Google Play</a>
    </p>`;
}

function phoneMockup() {
  return `<div class="phone" role="img" aria-label="Sample Stays listing: Oak Court Hostel, GH₵ 3500 per semester, with amenities, video reviews and MoMo installment booking.">
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
    </div>`;
}

function mini(kind) {
  if (kind === 'verified')
    return `<div class="mini" role="img" aria-label="Verified listing card in the Stays app.">
      <div class="mn-photo"><span class="ph-chip ok">Freizy Verified</span></div>
      <p class="mn-t"><b>Oak Court Hostel</b><span>Legon, Accra</span></p>
      <p class="mn-t"><b class="red">GH&#8373; 3500<small>/semester</small></b><span class="pill y">Light 4.8</span></p>
    </div>`;
  if (kind === 'reviews')
    return `<div class="mini" role="img" aria-label="Tenant video reviews in the Stays app.">
      <p class="mn-h">Video Reviews</p>
      <div class="mn-rev"><i>&#9654;</i><div><b>Clean &amp; safe</b><small>Ama K. · Legon</small></div></div>
      <div class="mn-rev"><i>&#9654;</i><div><b>Great water supply</b><small>Kwame · Kumasi</small></div></div>
      <div class="mn-tags"><span class="pill y">Light 4.8</span><span class="pill b">Water 4.6</span></div>
    </div>`;
  if (kind === 'momo')
    return `<div class="mini" role="img" aria-label="MoMo installment plan: 875 cedis times 4 in the Stays app.">
      <p class="mn-h">MoMo Installment</p>
      <p class="mn-big">GH&#8373; 875 <span>&times; 4</span></p>
      <div class="mn-dots"><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div>
      <p class="mn-t"><small>3 of 4 paid · receipt for every payment</small></p>
      <div class="mn-btn">Pay with MoMo</div>
    </div>`;
  return `<div class="mini" role="img" aria-label="Booking confirmation with digital receipt in the Stays app.">
      <p class="mn-check">&#10003;</p>
      <p class="mn-h center">Booking confirmed</p>
      <p class="mn-t center"><small>Room B12 · 2-bed · 2 terms</small></p>
      <div class="mn-rcpt"><span>Semester fee</span><b>GH&#8373; 3,500</b></div>
      <div class="mn-rcpt"><span>Paid via MoMo</span><b>GH&#8373; 875</b></div>
      <div class="mn-rcpt"><span>Balance</span><b>GH&#8373; 2,625</b></div>
    </div>`;
}

function appPage(p) {
  const faqs = (p.appFaq || [])
    .map(
      (f) => `    <details class="faq">
      <summary>${f.q}</summary>
      <p>${f.a}</p>
    </details>`
    )
    .join('\n');
  return `
  <header class="bar"><div class="wrap wide bar-in">
    <a class="brand" href="${SITE}/">FREIZY<span>.</span> <em>STAYS</em></a>
    <nav aria-label="On this page"><a href="#features">Features</a><a href="#reviews">Reviews</a><a href="#managers">Managers</a><a href="#faq-app">FAQ</a></nav>
    <a class="btn sm" href="#get-the-app">Get early access</a>
  </div></header>
  <section class="hero"><div class="wrap wide hero-grid">
    <div>
      <nav class="crumbs dark" aria-label="Breadcrumb"><a href="${SITE}/">Home</a> / <a href="${SITE}/products">Products</a> / ${p.name}</nav>
      <p class="eyebrow">Stays · Student housing app</p>
      <h1>Find a hostel you can trust.</h1>
      <p class="lede">${p.lede}</p>
      ${storeBadges()}
      <p class="micro">Free to browse · ${p.app.availability}</p>
    </div>
    <div class="hero-visual">
      ${phoneMockup()}
      <div class="float f1"><b>&#10003; Freizy Verified</b><small>Oak Court Hostel · photos checked</small></div>
      <div class="float f2"><b>MoMo receipt</b><small>GH&#8373; 875 received · 3 of 4</small></div>
    </div>
  </div></section>
  <section class="strip"><div class="wrap wide stats">
    <div><b>214+</b><span>verified rooms listed</span></div>
    <div><b>3</b><span>cities: Accra · Kumasi · Cape Coast</span></div>
    <div><b>4×</b><span>monthly MoMo installments</span></div>
    <div><b>1</b><span>team that builds &amp; supports the app</span></div>
  </div>
  <p class="avail center">The Stays platform at a glance.</p></section>
  <div class="wrap wide" id="features">
    <div class="frow">
      <div><p class="eyebrow">Verified listings</p><h2>Every room checked before it lists.</h2><p>No more paying for a room you have never seen. Our team verifies photos, confirms amenities, and publishes honest utility ratings — so the room you book is the room you get.</p></div>
      ${mini('verified')}
    </div>
    <div class="frow flip">
      <div><p class="eyebrow">Tours &amp; reviews</p><h2>See it before you pay for it.</h2><p>Walk through rooms with 360-degree tours, then hear it from the people who live there — video reviews from real tenants, plus Light and Water ratings that actually matter in Ghana.</p></div>
      ${mini('reviews')}
    </div>
    <div class="frow">
      <div><p class="eyebrow">MoMo installments</p><h2>Split the semester into four.</h2><p>Big upfront fees lock students out. Stays splits the semester into four monthly MoMo payments inside the app — with a digital receipt for every single one.</p></div>
      ${mini('momo')}
    </div>
    <div class="frow flip">
      <div><p class="eyebrow">Booking &amp; receipts</p><h2>Book in minutes, prove it forever.</h2><p>Reserve your room from your phone and keep every payment on record. Balances, due dates and receipts live in the app — fee disputes become a five-second lookup.</p></div>
      ${mini('booking')}
    </div>
  </div>
  <section class="band" id="reviews"><div class="wrap wide">
    <p class="eyebrow">Tenant reviews</p>
    <h2>Tenants rate what matters.</h2>
    <div class="quotes">
      <figure><blockquote>“Clean &amp; safe — the photos were exactly the room I got.”</blockquote><figcaption>Ama K. · Legon</figcaption></figure>
      <figure><blockquote>“Great water supply, which is rare. The rating told the truth.”</blockquote><figcaption>Kwame · Kumasi</figcaption></figure>
      <figure><blockquote>“Nice study space. Booked and paid without visiting twice.”</blockquote><figcaption>Efe · Cape Coast</figcaption></figure>
    </div>
    <p class="avail">Sample reviews shown inside Stays.</p>
  </div></section>
  <div class="wrap">
    <h2>Who it is for</h2>
    <p>${p.forWho}</p>
  </div>
  <section class="band dark" id="managers"><div class="wrap wide split">
    <div><p class="eyebrow">For hostel managers</p><h2>Fill your rooms with serious tenants.</h2><p>Verified hostels get discovered by thousands of students searching near their campus. Listing is free to start — message us and we will photograph, verify and publish your rooms.</p></div>
    <div><a class="btn big" href="${WHATSAPP}" target="_blank" rel="noopener noreferrer">List your hostel</a></div>
  </div></section>
  <div class="wrap" id="faq-app">
    <h2>App questions</h2>
${faqs}
  </div>
  <section class="final" id="get-the-app"><div class="wrap">
    <h2>Your next room is in your pocket.</h2>
    <p>Stays is rolling out to students in Accra. Join early access and start with verified hostels near your campus.</p>
    ${storeBadges()}
    <p class="micro">Free to browse · ${p.app.availability} · <a href="${SITE}/contact">Contact us</a> · <a href="${WHATSAPP}" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
  </div></section>`;
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
    : p.ctaUrl
      ? `<p><a class="btn" href="${p.ctaUrl}">${p.ctaLabel}</a></p>`
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
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "${SITE}/products" },
      { "@type": "ListItem", "position": 3, "name": "${p.name}", "item": "${url}" }
    ]
  }
  </script>
  <style>
    :root { --red: #ed1c24; --red-ink: #c41218; --red-on-dark: #ff6b70; --ink: #1d1d1f; --muted: #6e6e73; }
    @media (prefers-color-scheme: dark) { :root { --muted: #a1a1a6; } }
    * { box-sizing: border-box; margin: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif; color: var(--ink); line-height: 1.65; background: #fff; }
    @media (prefers-color-scheme: dark) { body { background: #000; color: #f5f5f7; } }
    .wrap { max-width: 760px; margin: 0 auto; padding: 0 20px; }
    header.top { border-bottom: 1px solid #e5e5e5; padding: 14px 0; }
    header.top a.brand { font-weight: 800; letter-spacing: 0.08em; text-decoration: none; color: inherit; }
    header.top a.brand span { color: var(--red); }
    nav.crumbs { font-size: 13px; color: var(--muted); margin: 28px 0 8px; }
    nav.crumbs a { color: var(--muted); }
    .tag { display: inline-block; font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--red-ink); margin-bottom: 10px; }
    @media (prefers-color-scheme: dark) { .tag { color: var(--red-on-dark); } }
    h1 { font-size: clamp(32px, 5vw, 48px); line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 16px; }
    .lede { font-size: 18px; margin-bottom: 28px; }
    h2 { font-size: 22px; margin: 36px 0 12px; letter-spacing: -0.01em; }
    ul.feats { padding-left: 20px; margin-bottom: 8px; }
    ul.feats li { margin-bottom: 8px; }
    p { margin-bottom: 14px; }
    a { color: var(--red-ink); }
    @media (prefers-color-scheme: dark) { a { color: var(--red-on-dark); } }
    .btn { display: inline-block; background: var(--red-ink); color: #fff !important; text-decoration: none; font-weight: 600; padding: 10px 22px; margin: 6px 0 4px; }
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
    .ph-book { background: var(--red-ink); color: #fff; text-align: center; font-weight: 700; border-radius: 24px; padding: 12px; margin-top: 10px; }
    .mgr { border: 1px solid #e5e5e5; padding: 24px; margin: 32px 0; }
    .mgr h2 { margin-top: 0; }
    details.faq { border-top: 1px solid #e5e5e5; padding: 14px 0; }
    details.faq:last-of-type { border-bottom: 1px solid #e5e5e5; }
    details.faq summary { cursor: pointer; font-weight: 600; list-style: none; }
    details.faq summary::-webkit-details-marker { display: none; }
    .wrap.wide { max-width: 1080px; }
    .bar { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid #e5e5e5; }
    @media (prefers-color-scheme: dark) { .bar { background: rgba(0,0,0,0.85); border-color: #222; } }
    .bar-in { display: flex; align-items: center; gap: 20px; padding-top: 12px; padding-bottom: 12px; }
    .bar nav { display: flex; gap: 18px; margin-left: auto; font-size: 14px; }
    .bar nav a { color: var(--muted); text-decoration: none; }
    .bar nav a:hover { color: var(--red); }
    @media (max-width: 640px) { .bar nav { display: none; } }
    .brand em { font-style: normal; font-weight: 400; letter-spacing: 0.28em; font-size: 12px; color: var(--muted); }
    .btn.sm { padding: 8px 18px; font-size: 14px; margin: 0; }
    .hero { background: #0b0b0d; color: #f5f5f7; overflow: hidden; position: relative; }
    .hero::before { content: ""; position: absolute; top: -200px; right: -150px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(237,28,36,0.28), transparent 65%); pointer-events: none; }
    .hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; padding-top: 72px; padding-bottom: 72px; }
    @media (max-width: 860px) { .hero-grid { grid-template-columns: 1fr; padding-top: 48px; padding-bottom: 48px; } }
    .eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--red-ink); margin-bottom: 14px; }
    .hero .eyebrow { color: var(--red-on-dark); }
    .hero h1 { font-size: clamp(40px, 6vw, 68px); line-height: 1.04; letter-spacing: -0.03em; margin-bottom: 18px; font-weight: 800; }
    .hero .lede { font-size: 18px; color: #c9c9d1; max-width: 520px; }
    .hero .crumbs.dark, .hero .crumbs.dark a { color: #8e8e96; }
    .micro { font-size: 13px; color: var(--muted); }
    .hero .micro { color: #8e8e96; }
    .micro a { color: inherit; }
    .hero-visual { position: relative; display: flex; justify-content: center; }
    .hero-visual .phone { margin: 0; box-shadow: 0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px #333; }
    .float { position: absolute; background: #fff; color: #111; border-radius: 12px; padding: 10px 14px; font-size: 13px; box-shadow: 0 16px 40px rgba(0,0,0,0.45); }
    .float b { display: block; font-size: 13px; }
    .float small { color: #555; }
    .float.f1 { top: 12%; left: -8px; border-left: 4px solid #16a34a; }
    .float.f2 { bottom: 10%; right: -4px; border-left: 4px solid var(--red); }
    @media (max-width: 1100px) { .float.f1 { left: 0; } .float.f2 { right: 0; } }
    @media (max-width: 480px) { .float { display: none; } }
    .strip { border-bottom: 1px solid #e5e5e5; padding: 36px 0 24px; }
    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; text-align: left; }
    @media (max-width: 640px) { .stats { grid-template-columns: repeat(2, 1fr); } }
    .stats b { display: block; font-size: 34px; font-weight: 800; letter-spacing: -0.02em; }
    .stats b::after { content: ""; display: block; width: 28px; height: 3px; background: var(--red); margin-top: 6px; }
    .stats span { font-size: 14px; color: var(--muted); }
    .center { text-align: center; }
    .frow { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; padding: 56px 0; border-bottom: 1px solid #eee; }
    .frow.flip > div:first-child { order: 2; }
    @media (max-width: 760px) { .frow { grid-template-columns: 1fr; gap: 24px; padding: 36px 0; } .frow.flip > div:first-child { order: 0; } }
    .frow h2 { font-size: clamp(26px, 3.4vw, 36px); letter-spacing: -0.02em; margin: 0 0 12px; }
    .frow p { color: var(--muted); font-size: 16px; max-width: 440px; }
    @media (prefers-color-scheme: dark) { .frow { border-color: #222; } }
    .mini { max-width: 260px; margin: 0 auto; background: #fff; color: #111; border: 8px solid #111; border-radius: 36px; padding: 18px 16px 20px; font-size: 13px; box-shadow: 0 24px 60px rgba(0,0,0,0.18); width: 100%; }
    .mn-h { font-weight: 800; font-size: 15px; margin-bottom: 10px; }
    .mn-h.center, .mn-t.center { text-align: center; }
    .mn-t { margin-bottom: 8px; }
    .mn-t small { color: #666; }
    .mn-t .red { color: var(--red-ink); }
    .mn-photo { height: 110px; border-radius: 10px; background: linear-gradient(135deg, #3f4a5a, #9aa3ad 60%, #4a5568); position: relative; margin-bottom: 10px; }
    .mn-big { font-size: 30px; font-weight: 800; letter-spacing: -0.02em; }
    .mn-big span { font-size: 16px; color: #555; }
    .mn-dots { display: flex; gap: 6px; margin: 10px 0; }
    .mn-dots i { width: 34px; height: 8px; border-radius: 4px; background: #e5e5e5; }
    .mn-dots i.on { background: #16a34a; }
    .mn-btn { background: var(--red-ink); color: #fff; text-align: center; font-weight: 700; border-radius: 20px; padding: 10px; margin-top: 10px; }
    .mn-check { width: 44px; height: 44px; border-radius: 50%; background: #16a34a; color: #fff; font-size: 22px; line-height: 44px; text-align: center; margin: 4px auto 10px; }
    .mn-rcpt { display: flex; justify-content: space-between; border-top: 1px dashed #ddd; padding: 8px 0; font-size: 12px; }
    .mn-rev { display: flex; gap: 8px; align-items: center; background: #f6f6f7; border-radius: 10px; padding: 8px; margin-bottom: 8px; }
    .mn-rev i { width: 26px; height: 26px; flex-shrink: 0; border-radius: 50%; background: rgba(0,0,0,0.6); color: #fff; font-style: normal; font-size: 11px; line-height: 26px; text-align: center; }
    .mn-rev b { display: block; font-size: 12px; }
    .mn-rev small { color: #666; font-size: 11px; }
    .mn-tags { display: flex; gap: 6px; margin-top: 4px; }
    .band { background: #f5f5f7; padding: 64px 0; margin-top: 40px; }
    @media (prefers-color-scheme: dark) { .band { background: #0b0b0d; } }
    .band h2 { font-size: clamp(26px, 3.4vw, 38px); letter-spacing: -0.02em; margin-bottom: 24px; }
    .quotes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    @media (max-width: 760px) { .quotes { grid-template-columns: 1fr; } }
    .quotes figure { background: #fff; border: 1px solid #e5e5e5; padding: 22px; }
    @media (prefers-color-scheme: dark) { .quotes figure { background: #111; border-color: #2a2a2e; } }
    .quotes blockquote { font-size: 16px; margin-bottom: 12px; }
    .quotes figcaption { font-size: 13px; color: var(--muted); }
    .band.dark { background: #0b0b0d; color: #f5f5f7; }
    .band.dark p { color: #c9c9d1; }
    .split { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 32px; align-items: center; }
    @media (max-width: 760px) { .split { grid-template-columns: 1fr; } }
    .btn.big { font-size: 17px; padding: 14px 30px; }
    .final { background: #0b0b0d; color: #f5f5f7; text-align: center; padding: 88px 0; margin-top: 56px; position: relative; overflow: hidden; }
    .final::before { content: ""; position: absolute; bottom: -240px; left: 50%; transform: translateX(-50%); width: 700px; height: 480px; background: radial-gradient(ellipse, rgba(237,28,36,0.3), transparent 65%); pointer-events: none; }
    .final h2 { font-size: clamp(32px, 5vw, 56px); letter-spacing: -0.03em; font-weight: 800; margin-bottom: 12px; }
    .final p { color: #c9c9d1; }
    .final .badges { justify-content: center; }
  </style>
</head>
<body>
  ${p.app ? '' : '<header class="top"><div class="wrap"><a class="brand" href="' + SITE + '/">FREIZY<span>.</span></a></div></header>'}
  ${p.app ? '<main>' : '<main class="wrap">'}
    ${p.app ? appPage(p) : standardPage(p, features, live)}
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

// Hand-built pages that this generator must never overwrite.
const HAND_BUILT = new Set(['freizy-stays']);

for (const p of products) {
  if (HAND_BUILT.has(p.slug)) {
    console.log('skipped public/products/' + p.slug + '/index.html (hand-built)');
    continue;
  }
  const dir = join(outDir, p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page(p));
  console.log('wrote public/products/' + p.slug + '/index.html');
}
