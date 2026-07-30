import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Settings, Menu, X, Moon, Sun, Heart, LayoutGrid } from 'lucide-react';
import { ThemeMode, ActivePage } from '../types';

export const Header: React.FC = () => {
  const { profile, theme, setTheme, setIsAdminOpen, activePage, setActivePage } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; pageId: ActivePage; href: string }[] = [
    { name: 'ALL', pageId: 'home', href: '#hero' },
    { name: 'Best Works', pageId: 'best-works', href: '#best-works' },
    { name: 'About', pageId: 'about', href: '#about' },
    { name: 'Services', pageId: 'services', href: '#services' },
    { name: 'Process', pageId: 'process', href: '#process' },
    { name: 'Gallery', pageId: 'gallery', href: '#gallery' },
    { name: 'Reviews', pageId: 'reviews', href: '#reviews' },
    { name: 'FAQ', pageId: 'faq', href: '#faq' },
    { name: 'Contact', pageId: 'contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, pageId: ActivePage, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActivePage(pageId);

    setTimeout(() => {
      if (pageId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }, 50);
  };

  const getThemeIcon = () => {
    if (theme === 'dark') return <Moon className="w-3.5 h-3.5 text-white/70" />;
    if (theme === 'light') return <Sun className="w-3.5 h-3.5 text-amber-400" />;
    return <Heart className="w-3.5 h-3.5 text-rose-400" />;
  };

  const nextTheme = (): ThemeMode => {
    if (theme === 'dark') return 'light';
    if (theme === 'light') return 'pastel';
    return 'dark';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0B]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-[#0A0A0B]/60 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & Status */}
        <div className="flex items-center gap-6">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'home', '#hero')}
            className="flex items-center gap-3 group"
          >
            <span className="font-serif italic text-2xl tracking-tighter text-white group-hover:text-amber-200 transition-colors">
              Chiko Arche
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-sm bg-amber-300/10 border border-amber-300/30 text-amber-300 font-sans tracking-widest uppercase font-bold hidden sm:inline-block">
              치코
            </span>
          </a>

          {/* Status Badge */}
          <div
            className={`hidden xl:flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border ${
              profile.status === 'AVAILABLE'
                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                profile.status === 'AVAILABLE' ? 'bg-green-500' : 'bg-rose-500'
              }`}
            />
            <span>{profile.status === 'AVAILABLE' ? 'Status: Available' : 'Status: Busy'}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-[11px] uppercase tracking-[0.15em] font-medium text-white/50">
          {navLinks.map((link) => {
            const isActive = activePage === link.pageId;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.pageId, link.href)}
                className={`py-1 relative transition-colors ${
                  isActive ? 'text-white font-bold' : 'hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-amber-300 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(nextTheme())}
            title={`Current Theme: ${theme.toUpperCase()}`}
            className="p-2 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 transition-all flex items-center gap-1.5 text-[11px]"
          >
            {getThemeIcon()}
            <span className="capitalize text-[10px] font-medium tracking-wider hidden md:inline">{theme}</span>
          </button>

          {/* Admin Toggle Button */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="px-3 py-2 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all text-[11px] uppercase tracking-widest font-semibold flex items-center gap-1.5"
            title="Portfolio Management"
          >
            <Settings className="w-3.5 h-3.5 text-white/60" />
            <span className="hidden md:inline">Admin</span>
          </button>

          {/* Inquiry CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact', '#contact')}
            className="px-4 py-2 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-200 transition-colors shadow-lg"
          >
            Inquire Now
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setTheme(nextTheme())}
            className="p-2 rounded-sm bg-white/5 border border-white/10 text-white/80"
          >
            {getThemeIcon()}
          </button>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-2 rounded-sm bg-white/5 border border-white/10 text-white/80"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-sm bg-white/5 border border-white/10 text-white/80 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0F12] border-b border-white/10 px-6 py-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.pageId, link.href)}
                className={`text-xs uppercase tracking-[0.2em] font-medium py-1.5 border-b border-white/5 flex items-center justify-between ${
                  activePage === link.pageId ? 'text-amber-300 font-bold' : 'text-white/70 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                {activePage === link.pageId && (
                  <span className="text-[9px] px-2 py-0.5 rounded bg-amber-300 text-black font-bold">PAGE ACTIVE</span>
                )}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-white/40">
                {profile.status === 'AVAILABLE' ? 'Status: Available' : 'Status: Busy'}
              </span>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact', '#contact')}
                className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-sm"
              >
                Inquire Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
