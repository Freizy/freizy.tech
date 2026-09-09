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
| `npm run build`  | Production build to `dist/` |
| `npm run preview`| Serve the production build |
| `npm run lint`   | `tsc --noEmit` typecheck  |

## Project structure

- `src/App.tsx` — page composition + consultation modal state
- `src/components/` — one component per site section (Hero, AISection, ProductsShowcase, …)
- `src/components/*TelemetryMonitor.tsx` — live-feel product demos (sample data, pausable, reduced-motion aware)
- `src/context/ThemeContext.tsx` — light/dark theme with localStorage + OS preference fallback

## Contact backend (Web3Forms, active)

Both forms submit through `src/lib/contact.ts`, which POSTs to Web3Forms
with basic bot screening (honeypot + minimum fill time). No auto-reply on
the free tier — the visitor just sees the on-site confirmation.

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

## Contact

- Phone: +233 24 035 2196 · +233 26 624 2703
- Email: info@freizy.com
- Web: https://freizy.com
