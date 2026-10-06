import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { RoutePath } from '../types';
import { Search, Terminal, Zap, Shield, ArrowRight, X, Copy, Check } from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Simulation' | 'Documentation' | 'CLI';
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { navigate } = useNavigation();
  const [query, setQuery] = useState('');
  const [copiedCli, setCopiedCli] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyInstall = () => {
    navigator.clipboard.writeText('curl -fsSL https://get.strata.systems | sh');
    setCopiedCli(true);
    setTimeout(() => {
      setCopiedCli(false);
      onClose();
    }, 1200);
  };

  const commands: CommandItem[] = [
    {
      id: 'cmd-home',
      title: 'Navigate to Overview & Live Sandbox',
      category: 'Navigation',
      action: () => {
        navigate('/');
        onClose();
      },
    },
    {
      id: 'cmd-features',
      title: 'Inspect Causal Quorums & eBPF Kernel Bus',
      category: 'Navigation',
      action: () => {
        navigate('/features');
        onClose();
      },
    },
    {
      id: 'cmd-pricing',
      title: 'Explore Pricing & Calculate Infrastructure Capacity',
      category: 'Navigation',
      action: () => {
        navigate('/pricing');
        onClose();
      },
    },
    {
      id: 'cmd-about',
      title: 'Read Origin Story: The $4.2M Phantom Fill Post-Mortem',
      category: 'Navigation',
      action: () => {
        navigate('/about');
        onClose();
      },
    },
    {
      id: 'cmd-contact',
      title: 'Schedule Systems Architecture Consultation',
      category: 'Navigation',
      action: () => {
        navigate('/contact');
        onClose();
      },
    },
    {
      id: 'cmd-cli',
      title: 'Copy Quickstart CLI Installation Script',
      category: 'CLI',
      action: copyInstall,
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="command-palette-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-xl bg-[#0F121C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-[#121524]">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <h2 id="command-palette-title" className="sr-only">Command Navigation Palette</h2>
          <input
            type="text"
            autoFocus
            aria-label="Search architecture docs, simulation, and commands"
            placeholder="Type a command, feature, or page... (e.g. eBPF, pricing, CLI)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-neutral-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-neutral-400">
              No matching commands or architecture documents found.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full text-left px-3.5 py-2.5 rounded-lg hover:bg-white/[0.06] flex items-center justify-between gap-3 text-xs transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 shrink-0">
                    {item.category}
                  </span>
                  <span className="text-white group-hover:text-blue-300 font-medium truncate">
                    {item.title}
                  </span>
                </div>
                {item.category === 'CLI' && copiedCli ? (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 shrink-0 font-mono">
                    <Check className="w-3.5 h-3.5" /> Copied
                  </span>
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="px-4 py-2.5 bg-[#0B0D15] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>Navigate with mouse or Tab</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
