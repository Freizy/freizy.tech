import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { useTheme } from '../context/ThemeContext';
import {
  Menu,
  X,
  Phone,
  Mail,
  Cpu,
  Code2,
  Server,
  Network,
  Layers,
  Sliders,
  ChevronRight,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenConfigurator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onOpenConfigurator,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        'hero',
        'services',
        'products',
        'software',
        'hardware',
        'network',
        'configurator',
        'process',
        'cases',
        'contact',
      ];

      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services', icon: Cpu },
    { name: 'Products', href: '#products', icon: Layers },
    { name: 'Software', href: '#software', icon: Code2 },
    { name: 'Infrastructure', href: '#hardware', icon: Server },
    { name: 'Architecture', href: '#configurator', icon: Sliders },
    { name: 'Case Studies', href: '#cases', icon: Sparkles },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <>
      {/* Top micro banner matching the flyer's top status & contact */}
      <div className="bg-[#050608] border-b border-neutral-800/80 text-xs py-1.5 px-4 z-50 relative text-neutral-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] tracking-tight text-neutral-300">
                Global Infrastructure: <strong className="text-emerald-400 font-medium">99.999% Active</strong>
              </span>
            </span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden md:inline font-mono text-[11px] text-neutral-400">
              Avg Neural Latency: <strong className="text-white">1.18ms</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <a
              href="tel:+18001234567"
              className="hover:text-white transition-colors flex items-center gap-1 text-neutral-300"
            >
              <Phone className="w-3 h-3 text-[#E5252A]" />
              <span>+1-800-123-4567</span>
            </a>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <a
              href="mailto:info@freizytech.com"
              className="hidden sm:flex hover:text-white transition-colors items-center gap-1 text-neutral-300"
            >
              <Mail className="w-3 h-3 text-[#E5252A]" />
              <span>info@freizytech.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Floating Nav (Apple-tier Frosted Glass) */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 shadow-lg'
            : 'bg-white/85 dark:bg-[#08090d]/85 backdrop-blur-md py-4 border-b border-slate-200 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <BrandLogo size="md" withTagline={false} />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-neutral-900/60 p-1.5 rounded-full border border-slate-200 dark:border-neutral-800/80 backdrop-blur-lg transition-colors">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-white dark:bg-neutral-800 text-slate-900 dark:text-white shadow-sm border border-slate-300 dark:border-neutral-700/60 font-semibold'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <link.icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5252A]' : 'text-slate-500 dark:text-neutral-400'}`} />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Action CTAs + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-neutral-700/70 bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 transition-all flex items-center gap-1.5 group relative"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme mode"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 transition-transform group-hover:rotate-45" />
                  <span className="text-[11px] font-mono text-neutral-300 font-medium pr-1">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#E5252A] transition-transform group-hover:-rotate-12" />
                  <span className="text-[11px] font-mono text-slate-800 font-medium pr-1">Dark Mode</span>
                </>
              )}
            </button>

            <button
              id="nav-configurator-btn"
              onClick={onOpenConfigurator}
              className="px-3.5 py-2 text-xs font-mono font-medium rounded-xl text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-700/70 transition-all flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-[#E5252A]" />
              <span>Stack Builder</span>
            </button>

            <button
              id="nav-consultation-btn"
              onClick={onOpenConsultation}
              className="relative group px-4 py-2 text-xs font-semibold rounded-xl text-white bg-[#E5252A] hover:bg-[#d01e23] transition-all duration-200 shadow-lg shadow-[#E5252A]/20 flex items-center gap-1.5 overflow-hidden"
            >
              <span className="relative z-10">Consult Engineers</span>
              <ChevronRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-0.5" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-neutral-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#E5252A]" />}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[88px] z-40 bg-white/95 dark:bg-[#0a0c10]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-neutral-800 p-5 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-neutral-900 border border-transparent hover:border-slate-200 dark:hover:border-neutral-800 text-slate-800 dark:text-neutral-200 font-medium text-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <link.icon className="w-4 h-4 text-[#E5252A]" />
                  <span>{link.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-neutral-500" />
              </a>
            ))}

            <div className="pt-4 border-t border-slate-200 dark:border-neutral-800/80 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConfigurator();
                }}
                className="w-full py-3 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-800 dark:text-neutral-200 text-xs font-mono font-medium flex items-center justify-center gap-2"
              >
                <Sliders className="w-4 h-4 text-[#E5252A]" />
                Interactive Stack Builder
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 rounded-xl bg-[#E5252A] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#E5252A]/25"
              >
                Consult Our Engineering Team
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
