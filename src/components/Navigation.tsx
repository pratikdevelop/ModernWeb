import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Crown } from 'lucide-react';

interface NavigationProps {
  onOpenPro: () => void;
  konamiActive?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenPro, konamiActive }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Demo', href: '#demo' },
    { label: 'AI Studio', href: '#ai-studio' },
    { label: 'Blog', href: '#blog' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        id="header"
        role="banner"
        className={`sticky top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#16213E]/95 backdrop-blur-xl py-3 border-b border-[#FFD700]/25 shadow-xl'
            : 'bg-[#1A1A2E]/80 backdrop-blur-md py-5 border-b border-white/10'
        }`}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
            className="group flex items-center gap-2 text-2xl font-bold font-kreon tracking-tight text-white relative focus:outline-none"
            aria-label="ModernWeb - Go to homepage"
          >
            <span className="bg-gradient-to-r from-[#4A00E0] via-[#8E2DE2] to-[#FFD700] bg-clip-text text-transparent">
              ModernWeb
            </span>
            {konamiActive && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FF0080] to-[#FFD700] text-[#1A1A2E] font-black animate-pulse">
                RAINBOW
              </span>
            )}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="relative py-1 transition-colors hover:text-[#FFD700] focus:outline-none focus:text-[#FFD700] group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-upgrade-pro-btn"
              onClick={onOpenPro}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#1A1A2E] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Upgrade to Pro</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            id="mobile-menu-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-[65px] z-30 bg-[#16213E]/98 backdrop-blur-2xl md:hidden flex flex-col p-6 border-t border-white/10 animate-fade-in"
        >
          <ul className="flex flex-col gap-5 text-lg font-semibold text-gray-200 mt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="block py-2 text-white hover:text-[#FFD700] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPro();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#1A1A2E] font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <Crown className="w-4 h-4" /> Upgrade to Pro
            </button>
            <p className="text-center text-[11px] text-gray-400">
              Zero ads • Unlimited AI Studio generations
            </p>
          </div>
        </div>
      )}
    </>
  );
};
