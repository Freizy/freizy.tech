import { useEffect, type FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

const ScrollToTop: FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const RootLayout: FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0c] text-[#111114] dark:text-[#f5f5f7] font-sans antialiased">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
