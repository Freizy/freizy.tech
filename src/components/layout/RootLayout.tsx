import { Suspense, useEffect, useRef, type FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

const RouteFallback: FC = () => (
  <div
    role="status"
    aria-live="polite"
    className="min-h-[60vh] flex items-center justify-center"
  >
    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6e6e73] dark:text-neutral-400">
      Loading…
    </span>
  </div>
);

const ScrollToTop: FC = () => {
  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    // Footer links point at sections on /services. The target may not exist
    // until the lazy route chunk has rendered, so poll briefly instead of
    // assuming the section is already in the DOM.
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let frame = 0;
      let cancelled = false;

      const scrollToTarget = () => {
        if (cancelled) return;
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ block: 'start' });
          return;
        }
        if (frame++ < 90) requestAnimationFrame(scrollToTarget);
      };

      requestAnimationFrame(scrollToTarget);
      return () => {
        cancelled = true;
      };
    }

    window.scrollTo(0, 0);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
};

export const RootLayout: FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0c] text-[#111114] dark:text-[#f5f5f7] font-sans antialiased">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
