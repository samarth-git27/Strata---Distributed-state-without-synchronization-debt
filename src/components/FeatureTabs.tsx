import React, { useState } from 'react';
import { CORE_FEATURES } from '../data/productData';
import { Check, Copy, Terminal, ShieldCheck, ArrowRight } from 'lucide-react';

export const FeatureTabs: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(CORE_FEATURES[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const activeFeature = CORE_FEATURES.find((f) => f.id === activeTabId) || CORE_FEATURES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFeature.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Tab Navigation (Segmented bar without candy pills) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/[0.08]">
        {CORE_FEATURES.map((feature) => {
          const isActive = feature.id === activeTabId;
          return (
            <button
              key={feature.id}
              onClick={() => setActiveTabId(feature.id)}
              className={`px-4 py-2 text-xs font-medium transition-all cursor-pointer whitespace-nowrap rounded-t-lg border-b-2 -mb-[2px] ${
                isActive
                  ? 'border-blue-500 text-white bg-white/[0.04]'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.02]'
              }`}
            >
              {feature.title}
            </button>
          );
        })}
      </div>

      {/* Feature Content Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Description & Invariants */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {activeFeature.headline}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {activeFeature.summary}
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/[0.06]">
            {activeFeature.metrics.map((metric, i) => (
              <div key={i} className="space-y-1">
                <div className="text-xl font-bold font-mono text-white tabular-nums">
                  {metric.value}
                  {metric.unit && <span className="text-xs text-blue-400 ml-1 font-sans">{metric.unit}</span>}
                </div>
                <div className="text-[11px] text-neutral-400">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Invariants */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider text-[11px]">
              Engine Invariants
            </div>
            <ul className="space-y-2">
              {activeFeature.invariants.map((inv, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-400 leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{inv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Code Snippet / Terminal Inspector */}
        <div className="lg:col-span-7 bg-[#07080D] rounded-xl border border-white/[0.08] overflow-hidden shadow-xl">
          <div className="bg-[#0E1018] px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-mono text-neutral-300">
                {activeFeature.id === 'ebpf' ? 'kernel/bpf_filter.c' : activeFeature.id === 'timetravel' ? 'strata-cli --replay' : 'src/runtime/state.ts'}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 sm:p-5 text-xs font-mono text-neutral-300 overflow-x-auto leading-relaxed bg-[#07080D]">
            <code>{activeFeature.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
