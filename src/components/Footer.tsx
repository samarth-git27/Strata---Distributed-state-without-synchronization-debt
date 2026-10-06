import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { RoutePath } from '../types';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();

  const handleLink = (path: RoutePath, hash?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path, hash);
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#07080B] text-neutral-400 text-xs py-14">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/[0.06]">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-[4px] bg-blue-600 flex items-center justify-center text-white text-[11px] font-mono font-semibold">
                S
              </div>
              <span className="text-white font-semibold text-base tracking-tight">Strata</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Deterministic distributed state log and real-time synchronization engine. Formally verified causal consensus for mission-critical software systems.
            </p>
            <div className="text-[11px] text-neutral-500 font-mono">
              Kernel target: Linux 6.x eBPF · Wasm 2.0 · FlatBuffers v23
            </div>
          </div>

          {/* Architecture Navigation */}
          <div className="space-y-3">
            <div className="text-white font-medium text-xs tracking-wider uppercase text-[11px]">Architecture</div>
            <ul className="space-y-2">
              <li>
                <a
                  href="/features"
                  onClick={handleLink('/features', 'consensus')}
                  className="hover:text-white transition-colors"
                >
                  Causal Quorum
                </a>
              </li>
              <li>
                <a
                  href="/features"
                  onClick={handleLink('/features', 'ebpf')}
                  className="hover:text-white transition-colors"
                >
                  eBPF Kernel Bus
                </a>
              </li>
              <li>
                <a
                  href="/features"
                  onClick={handleLink('/features', 'timetravel')}
                  className="hover:text-white transition-colors"
                >
                  Time-Travel Replay
                </a>
              </li>
              <li>
                <a
                  href="/features"
                  onClick={handleLink('/features', 'topology')}
                  className="hover:text-white transition-colors"
                >
                  Edge Topology
                </a>
              </li>
            </ul>
          </div>

          {/* Product & Solutions */}
          <div className="space-y-3">
            <div className="text-white font-medium text-xs tracking-wider uppercase text-[11px]">Product</div>
            <ul className="space-y-2">
              <li>
                <a
                  href="/pricing"
                  onClick={handleLink('/pricing')}
                  className="hover:text-white transition-colors"
                >
                  Pricing & Tiers
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  onClick={handleLink('/pricing', 'calculator')}
                  className="hover:text-white transition-colors"
                >
                  Cost Calculator
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  onClick={handleLink('/pricing', 'faq')}
                  className="hover:text-white transition-colors"
                >
                  Technical FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={handleLink('/contact')}
                  className="hover:text-white transition-colors"
                >
                  Enterprise Inquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Engineering & Company */}
          <div className="space-y-3">
            <div className="text-white font-medium text-xs tracking-wider uppercase text-[11px]">Company</div>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  onClick={handleLink('/about')}
                  className="hover:text-white transition-colors"
                >
                  Philosophy
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={handleLink('/about', 'principles')}
                  className="hover:text-white transition-colors"
                >
                  Core Principles
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={handleLink('/about', 'research')}
                  className="hover:text-white transition-colors"
                >
                  Formal Methods
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={handleLink('/contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Labs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Strata Systems Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Security Whitepaper</span>
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">TLA+ Formal Proofs</span>
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
