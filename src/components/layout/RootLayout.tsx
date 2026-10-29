import { useEffect, useRef, type FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

const ScrollToTop: FC = () => {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [pathname]);

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
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
