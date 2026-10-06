import React, { useState, useEffect } from 'react';
import { useNavigation, NavLink } from '../context/NavigationContext';
import { RoutePath } from '../types';
import { Menu, X, ArrowUpRight, Search } from 'lucide-react';
import { CommandPalette } from './CommandPalette';

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useNavigation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  const navLinks: { path: RoutePath; label: string }[] = [
    { path: '/', label: 'Overview' },
    { path: '/features', label: 'Architecture' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about', label: 'Philosophy' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-[#090A0F]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-lg shadow-black/20'
            : 'bg-transparent border-b border-white/[0.04] py-5'
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12 flex items-center justify-between">
          {/* Zone 1: Brand wordmark (single text element) */}
          <div className="flex items-center">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-white select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              <div className="w-5 h-5 rounded-[4px] bg-blue-600 flex items-center justify-center text-white text-[11px] font-mono font-semibold transition-transform duration-200 group-hover:scale-105 shadow-sm shadow-blue-500/20">
                S
              </div>
              <span className="tracking-[-0.03em] font-semibold text-[17px]">Strata</span>
            </a>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-neutral-400">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="transition-colors hover:text-white py-1 relative whitespace-nowrap"
                activeClassName="text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-blue-500"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5">
            {/* Quick command search button */}
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden lg:flex items-center gap-2 text-xs text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="Search commands and documentation"
              aria-label="Open command palette"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">⌘K</span>
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 px-3.5 py-2 rounded-lg transition-all duration-150 shadow-sm shadow-blue-600/30 whitespace-nowrap border border-blue-400/20 cursor-pointer"
            >
              Deploy Cluster
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </button>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0D0F17] border-b border-white/[0.08] px-5 py-6 space-y-4 shadow-xl">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="text-sm font-medium text-neutral-300 hover:text-white py-2 px-3 rounded-md hover:bg-white/5 transition-colors"
                  activeClassName="text-blue-400 bg-blue-500/10 font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCommandOpen(true);
                }}
                className="w-full py-2 px-3 text-left text-xs text-neutral-400 hover:text-white bg-white/5 rounded-lg flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5" />
                  <span>Search architecture specs</span>
                </span>
                <span className="font-mono text-[10px]">⌘K</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/contact');
                }}
                className="w-full py-2.5 px-4 text-center text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Deploy Cluster
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Command Palette Modal */}
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
};
