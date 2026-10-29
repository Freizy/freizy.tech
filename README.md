# Freizy Technologies — Marketing Site

The company site for [Freizy Technologies](https://freizy.com) in Accra, Ghana:
software development, applied AI, cybersecurity, hardware and networks. It also
hosts the product pages for the six products we maintain:

| Product | Where it lives |
| --- | --- |
| Stays | Live at [stays.freizy.com](https://stays.freizy.com); hand-built page in `public/products/freizy-stays/` |
| Lavida Health Buddy | Live at [lavida2.netlify.app](https://lavida2.netlify.app) |
| KSM Autos | Live at [ksm.autos](https://ksm.autos) |
| Freizy Exams Suite | Static page at `/products/exams-suite/` |
| Oudy | Static page at `/products/oudy-events/` |
| Freizy Omnia Suite | Static page at `/products/omnia-suite/` |

## Stack

- React 19 + TypeScript (strict) + Vite 6
- Tailwind CSS v4
- `motion` for scroll reveals and transitions, `lucide-react` for icons
- React Router 7 for the SPA routes
- Web3Forms for contact submissions
- Self-hosted fonts (Inter, JetBrains Mono, Orbitron)
- Netlify for hosting, redirects, cache headers and the CSP report endpoint

## Requirements

- Node 22 (see `.nvmrc`)
- npm (the project uses `package-lock.json`; do not add a second lockfile)

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on `http://localhost:3000` |
| `npm run dev:host` | Dev server exposed on the local network |
| `npm run build` | Production build, then prerender route HTML and `404.html` |
| `npm run preview` | Serve the production build locally |
| `npm run clean` | Delete `dist/` and `server.js` (cross-platform) |
| `npm run lint` | ESLint over the repo |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier write (optional; not enforced in CI) |
| `npm run seo:pages` | Regenerate the five generated product pages in `public/products/` |

`npm run seo:pages` deliberately skips `public/products/freizy-stays/`. That page
is hand-built; running the generator must never overwrite it.

## Project structure

```
src/
  App.tsx                 route table; Home is eager, every other page is lazy
  main.tsx                React root, router, theme and error boundary
  components/             layout, sections, product demos
  context/                theme and consultation-modal providers
  data/page-meta.json     per-route title/description/canonical/og:url
  hooks/usePageMeta.ts    applies the same metadata on client navigation
  lib/contact.ts          Web3Forms submission + honeypot handling
  pages/                  one component per SPA route
  index.css               design tokens, shared utility classes
public/
  _headers                security + cache headers
  _redirects              Stays subdomain rewrite and Plausible proxy
  products/               static product pages and their assets
scripts/
  prerender.mjs           writes per-route HTML and Netlify redirects
  product-pages.mjs       generates the non-Stays product pages
  clean.mjs               cross-platform clean
netlify/edge-functions/
  csp-report.js           accepts CSP reports at /api/csp-report
```

## Routing and metadata

`src/data/page-meta.json` is the single source of truth for route metadata.
`scripts/prerender.mjs` runs after Vite and:

1. Copies the built app shell into one HTML file per SPA route.
2. Replaces title, description, Open Graph, Twitter and canonical tags.
3. Removes the home-only FAQ JSON-LD from other routes.
4. Writes a real `404.html` with `noindex`.
5. Appends the route rewrites and trailing-slash redirects to `dist/_redirects`.

There is no SPA catch-all. Unknown paths get a real 404 response.

The product pages under `public/products/<slug>/` are plain HTML and are linked
with normal `<a href>` elements, not React Router `Link`s.

## Stays

`public/products/freizy-stays/index.html` is hand-built and intentionally
excluded from `seo:pages`. Its CSS lives in `stays.css`, fonts in `fonts.css` /
`fonts/`, and images in `public/images/`.

`public/_redirects` maps `https://stays.freizy.com/*` to
`/products/freizy-stays/:splat` with a 200 rewrite, preserving every path. The
Stays folder therefore also contains `robots.txt`, `sitemap.xml`,
`.well-known/security.txt`, and `favicon.ico` for the subdomain.

## Contact forms

The forms post to Web3Forms at `https://api.web3forms.com/submit`. The access key
is supplied at build time via `VITE_WEB3FORMS_KEY`; without it, submissions show
the error state. The key is public by design (it is shipped to the browser).

**Accepted risk:** Web3Forms has submission caps and no server-side validation.
The honeypot and fill-time check are best-effort only. If spam becomes a
problem, put a server-side proxy in front of Web3Forms or switch providers; do
not assume the client-side checks are a security boundary.

## Security and caching

- `public/_headers` sets CSP, HSTS, frame and permission policies.
- `script-src` is `'self'`; Plausible is proxied through Netlify so there is no
  third-party script origin.
- CSP reports go to `netlify/edge-functions/csp-report.js` (204 for valid
  reports, 405 for other methods).
- Fingerprinted assets and fonts are cached for a year. Stays images use `?v=`
  in the markup, so bump the version when replacing one.
- `netlify.toml` holds the build command, publish directory and Node version.
  `public/_headers` and `public/_redirects` remain the source of truth for
  headers and redirects.

## CI

`.github/workflows/ci.yml` runs `npm ci`, `npm run lint`, `npm run typecheck`
and `npm run build` on pushes to `main` and on pull requests.

## Deployment

1. Set `VITE_WEB3FORMS_KEY` in the Netlify build environment.
2. Deploy with `npm run build` and publish `dist/`.
3. Verify `/`, `/products`, `/contact`, `/products/freizy-stays/` and the five
   generated product pages after changing routing, headers or assets.

No automated browser tests are included yet. The CI build catches type, lint,
prerender and broken-import failures; visual and Lighthouse checks are manual.
