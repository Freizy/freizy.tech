import { useState, useEffect, useRef, type FC } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BrandLogo } from '../BrandLogo';
import { useTheme } from '../../context/ThemeContext';
import { useConsultation } from '../../context/ConsultationContext';
import { Menu, X, Sun, Moon } from 'lucide-react';

type NavItem =
  | { name: string; kind: 'route'; to: string }
  | { name: string; kind: 'static'; href: string };

const navLinks: NavItem[] = [
  { name: 'Home', kind: 'route', to: '/' },
  { name: 'About', kind: 'route', to: '/about' },
  { name: 'Services', kind: 'route', to: '/services' },
  { name: 'Products', kind: 'route', to: '/products' },
  { name: 'Stays', kind: 'static', href: 'https://stays.freizy.com/' },
  { name: 'Case Studies', kind: 'route', to: '/case-studies' },
  { name: 'Contact', kind: 'route', to: '/contact' },
];

export const Header: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { openConsultation } = useConsultation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const panel = mobileMenuRef.current;
    panel?.querySelector<HTMLElement>('a[href], button:not([disabled])')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia('(min-width: 1024px)');
    const onDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onDesktop);
    return () => {
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? 'glass-nav' : 'bg-white/80 dark:bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-transparent'
      }`}
    >
      <div className="max-w-[1160px] mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <BrandLogo size="sm" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {navLinks.map((link) =>
            link.kind === 'static' ? (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ) : (
              <NavLink
                key={link.name}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 text-[#6e6e73] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle appearance"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={() => openConsultation()} className="btn btn-primary">
            Talk to engineers
          </button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-[#6e6e73] dark:text-neutral-400"
            aria-label="Toggle appearance"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            ref={menuButtonRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1d1d1f] dark:text-white"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          ref={mobileMenuRef}
          id="mobile-menu"
          aria-label="Mobile"
          className="lg:hidden fixed inset-x-0 top-16 z-40 bg-white dark:bg-[#0a0a0c] border-b border-black/10 dark:border-white/10 px-5 py-4"
        >
          <div className="flex flex-col">
            {navLinks.map((link) =>
              link.kind === 'static' ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-[15px] border-b border-black/5 dark:border-white/5 last:border-0 text-[#1d1d1f] dark:text-white"
                >
                  {link.name}
                </a>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `py-3 text-[15px] border-b border-black/5 dark:border-white/5 last:border-0 ${
                      isActive ? 'text-brand-red font-medium' : 'text-[#1d1d1f] dark:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openConsultation();
              }}
              className="btn btn-primary mt-3 w-full"
            >
              Talk to engineers
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
