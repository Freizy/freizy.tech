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

## Known stub: forms have no backend (yet)

`ContactSection` and `ConsultationModal` currently simulate submission client-side and show a success state. Before launch, wire them to a real endpoint (e.g. Formspree, a serverless function, or `mailto:` fallback) — enquiries submitted today go nowhere.

## Contact

- Phone: +233 24 035 2196 · +233 26 624 2703
- Email: info@freizytech.com
- Web: https://freizy.tech
