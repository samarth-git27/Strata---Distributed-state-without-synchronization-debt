import React, { useState } from 'react';
import { Layers, CheckCircle2, XCircle, ArrowRight, Activity, ShieldAlert, Cpu } from 'lucide-react';

export const ArchitecturalComparison: React.FC = () => {
  const [activeView, setActiveView] = useState<'traditional' | 'strata'>('strata');

  return (
    <div className="w-full bg-[#0D0F17] rounded-xl border border-white/[0.08] overflow-hidden">
      {/* Mode Switcher */}
      <div className="p-4 sm:p-6 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1">
            System Topology Contrast
          </div>
          <h3 className="text-lg font-semibold text-white">
            {activeView === 'strata'
              ? 'Strata: The Unified Causal Log Primitive'
              : 'Traditional: The 5-Layer Synchronization Stack'}
          </h3>
        </div>

        {/* Segmented Control */}
        <div className="inline-flex p-1 bg-[#141724] rounded-lg border border-white/[0.06] self-start sm:self-auto">
          <button
            onClick={() => setActiveView('traditional')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeView === 'traditional'
                ? 'bg-neutral-800 text-amber-400 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Traditional Multi-Layer Stack
          </button>
          <button
            onClick={() => setActiveView('strata')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeView === 'strata'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Strata Kernel Primitive
          </button>
        </div>
      </div>

      {/* Diagram & Metrics Body */}
      <div className="p-6 sm:p-8">
        {activeView === 'traditional' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { title: '1. Relational DB', sub: 'PostgreSQL / MySQL', fail: 'ACID lock contention' },
                { title: '2. Ephemeral Cache', sub: 'Redis Pub/Sub', fail: 'Silent drop under jitter' },
                { title: '3. Stream Buffer', sub: 'Kafka / Redpanda', fail: 'Offset rebalance stalls' },
                { title: '4. Edge Gateway', sub: 'WebSocket Cluster', fail: 'Zombie socket pools' },
                { title: '5. Client State', sub: 'Bespoke Redux/CRDT', fail: 'Clock drift ghost writes' },
              ].map((layer, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-[#141620] border border-amber-900/30 text-left space-y-2 relative"
                >
                  <div className="text-[11px] font-mono text-neutral-400">{layer.title}</div>
                  <div className="text-xs font-semibold text-white">{layer.sub}</div>
                  <div className="text-[10px] text-amber-400 flex items-center gap-1 pt-1 border-t border-white/[0.04]">
                    <XCircle className="w-3 h-3 shrink-0" />
                    <span>{layer.fail}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-semibold block mb-0.5">
                  The Synchronization Debt Tax
                </strong>
                When an application bridges five disjoint state systems, race conditions become mathematically inevitable. Distributed transactions require complex two-phase commits or fragile CDC (Change Data Capture) pipelines. A single packet delay across multi-region links results in split-brain divergence.
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#111422] border border-blue-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-blue-400">Layer 01</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-sm font-semibold text-white">eBPF Socket Ring Buffer</div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Mutations processed directly in Linux kernel buffers. Zero user-space context switches.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#111422] border border-blue-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-blue-400">Layer 02</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-sm font-semibold text-white">Causal Vector Quorum</div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Leaderless multi-region consensus with TLA+ mathematical invariants and sub-4ms convergence.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#111422] border border-blue-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-blue-400">Layer 03</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-sm font-semibold text-white">Isomorphic Wasm Engine</div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  184KB client micro-kernel executes identical deterministic transitions in browser & edge.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-950/20 border border-blue-500/20 text-xs text-blue-200/90 leading-relaxed flex items-start gap-3">
              <Cpu className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-blue-300 font-semibold block mb-0.5">
                  Single Source of Truth, Mathematically Guaranteed
                </strong>
                Instead of synchronizing five distinct databases, Strata treats all state as an immutable causal lattice. Every edge worker, browser client, and server cluster operates on the exact same append-only log with guaranteed convergence.
              </div>
            </div>
          </div>
        )}

        {/* Quantified Differential Table */}
        <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <div className="text-neutral-400 text-[11px]">System Boundaries</div>
            <div className="text-white text-base font-semibold mt-1 tabular-nums">
              {activeView === 'strata' ? '1 Runtime' : '5 Subsystems'}
            </div>
          </div>
          <div>
            <div className="text-neutral-400 text-[11px]">Cross-Region Convergence</div>
            <div className="text-white text-base font-semibold mt-1 tabular-nums">
              {activeView === 'strata' ? '3.8ms' : '140ms - 420ms'}
            </div>
          </div>
          <div>
            <div className="text-neutral-400 text-[11px]">Split-Brain Risk</div>
            <div className="text-white text-base font-semibold mt-1">
              {activeView === 'strata' ? '0.00% (TLA+ Proven)' : 'High under WAN drop'}
            </div>
          </div>
          <div>
            <div className="text-neutral-400 text-[11px]">State Replay Accuracy</div>
            <div className="text-white text-base font-semibold mt-1">
              {activeView === 'strata' ? 'Cycle-exact' : 'Non-deterministic'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
