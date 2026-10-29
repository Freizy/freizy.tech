# Freizy Technologies — Marketing Site

Company site for Freizy Technologies (Accra, Ghana): applied AI, software development, cybersecurity, robotics, hardware and networks. Includes product showcases for Freizy Omnia Suite, Lavida Health Buddy and KSM Autos.

## Stack

- React 19 + TypeScript + Vite 6
- Tailwind CSS v4
- `motion` for scroll reveals / parallax, `lucide-react` icons
- Canvas particle field in the hero (no WebGL dependency)

## Scripts

| Command          | What it does              |
| ---------------- | ------------------------- |
| `npm run dev`    | Local dev server (:3000)  |
| `npm run build`  | Production build + prerender to `dist/` |
| `npm run preview`| Serve the production build |
| `npm run lint`   | `tsc --noEmit` typecheck  |
| `npm run seo:pages` | Regenerate static product pages into `public/products/` |

## Project structure

- `src/App.tsx` — page composition + consultation modal state
- `src/components/` — one component per site section (Hero, AISection, ProductsShowcase, …)
- `src/components/*TelemetryMonitor.tsx` — live-feel product demos (sample data, pausable, reduced-motion aware)
- `src/context/ThemeContext.tsx` — light/dark theme with localStorage + OS preference fallback
- `scripts/product-pages.mjs` — generates static SEO pages (`public/products/*/`) with SoftwareApplication + BreadcrumbList schema; re-run after editing, listed in `public/sitemap.xml`. The Stays page is app-aware: MobileApplication + FAQPage schema, store badges (currently WhatsApp app-link flow — swap `APP_LINK_IOS` / `APP_LINK_ANDROID` for real store URLs when ready), a CSS phone mockup and a hostel-manager CTA. `freizy-stays` is hand-built and skipped by the generator — edit `public/products/freizy-stays/index.html` directly
- `src/data/page-meta.json` — canonical title, description and path for every app route. Both the React pages and the prerender step read it, so edit it once
- `scripts/prerender.mjs` — post-build step that writes `dist/about.html`, `dist/404.html`, etc., strips the home-only FAQ schema from other routes, and appends the matching Netlify rewrite/redirect rules to `dist/_redirects`. Adding a route means adding it to `App.tsx` and `page-meta.json`

## Contact backend (Web3Forms, active)

Both forms submit through `src/lib/contact.ts`, which POSTs directly to
Web3Forms with a honeypot and hard field caps. No auto-reply on the free
tier — the visitor just sees the on-site confirmation.

### Going live

1. Get an access key at https://web3forms.com (submit your email, the key
   arrives in your inbox)
2. Set `VITE_WEB3FORMS_KEY` on the host **and redeploy** — VITE_ vars bake
   in at build time (for local dev, copy `.env.example` to `.env`)

### Upgrade path: serverless

`api/contact.ts` is a ready Vercel Edge function (validation, honeypot +
fill-time + rate limiting, Resend delivery, visitor auto-reply). To switch:
set `RESEND_API_KEY` / `CONTACT_TO` / `CONTACT_FROM`, verify `freizy.com`
in Resend, point `submitEnquiry` at `/api/contact`, deploy. For local
end-to-end testing of that path use `vercel dev`.

### Accepted risk: public key and client-side spam checks

The Web3Forms access key ships in the public JS bundle. These keys are
designed for client-side use, but anyone can copy this one and POST to the
API directly, bypassing the site entirely.

What protects us today: the honeypot, Web3Forms' own spam filtering, and
the free-plan submission cap. A successful abuse attempt creates noise in
the inbox or burns quota; it does not expose customer data. What does
**not** protect us: origin checks, rate limiting, or a server-side
fill-time gate — none can be enforced on the direct Web3Forms path.

This is accepted for a low-volume marketing form. Revisit if junk mail or
quota exhaustion appears: enable CAPTCHA/domain restrictions in the
Web3Forms dashboard, rotate the key, or switch to `api/contact.ts` or a
Netlify Edge Function proxy that keeps the key out of the bundle.

## Contact

- Phone: +233 24 035 2196 · +233 26 624 2703
- Email: info@freizy.com
- Web: https://freizy.com
