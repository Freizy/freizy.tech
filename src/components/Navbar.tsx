import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'AI', href: '#ai' },
    { name: 'Services', href: '#services' },
    { name: 'Products', href: '#products' },
    { name: 'Software', href: '#software' },
    { name: 'Infrastructure', href: '#hardware' },
    { name: 'Work', href: '#cases' },
    { name: 'Company', href: '#contact' },
  ];

  return (
    <>
      {/* Flyer top strip: INNOVATION BUILDS TOMORROW */}
      <div className="circuit-bg bg-white dark:bg-black border-b border-black/5 dark:border-white/10">
        <div className="max-w-[1120px] mx-auto px-5 py-1.5 flex items-center justify-between">
          <span className="flyer-tagline uppercase text-[10px] text-neutral-500 dark:text-neutral-400">
            Intelligence <span className="pipe">|</span> Solutions <span className="pipe">|</span> Beyond
          </span>
          <span className="text-[10px] font-semibold tracking-[0.18em] text-black dark:text-white uppercase flex items-center gap-2">
            Innovation builds tomorrow
            <span className="inline-block w-8 h-[2px] bg-[#ed1c24]" />
          </span>
        </div>
      </div>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled ? 'glass-nav' : 'bg-white/80 dark:bg-black/60 backdrop-blur-xl border-b border-transparent'
        }`}
      >
        <div className="max-w-[1120px] mx-auto px-5 h-[52px] flex items-center justify-between">
          <a href="#hero" className="flex items-center" aria-label="Freizy Technologies home">
            <BrandLogo size="sm" />
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] font-normal text-[#424245] dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-[#6e6e73] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle appearance"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={onOpenConsultation}
              className="px-4 py-1.5 text-[13px] font-medium rounded-full text-white bg-[#ed1c24] hover:bg-[#c41218] transition-colors"
            >
              Talk to engineers
            </button>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-[#6e6e73] dark:text-neutral-400"
              aria-label="Toggle appearance"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[#1d1d1f] dark:text-white"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[52px] z-40 bg-white dark:bg-black border-b border-black/10 dark:border-white/10 px-5 py-4">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-[15px] text-[#1d1d1f] dark:text-white border-b border-black/5 dark:border-white/5 last:border-0"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="mt-3 w-full py-2.5 rounded-full text-white bg-[#ed1c24] hover:bg-[#c41218] text-sm font-medium"
            >
              Talk to engineers
            </button>
          </div>
        </div>
      )}
    </>
  );
};
