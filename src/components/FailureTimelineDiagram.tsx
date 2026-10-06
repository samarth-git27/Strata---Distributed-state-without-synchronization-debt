import React from 'react';
import { AlertCircle, Clock, CheckCircle2, ArrowDown } from 'lucide-react';

export const FailureTimelineDiagram: React.FC = () => {
  const timelineSteps = [
    {
      time: 'T + 0.00ms',
      title: 'Limit Order Executed on EU-Central Node',
      desc: 'Order #9021 fills 250 units against margin collateral on the Frankfurt exchange node. Local commit succeeds.',
      anomaly: false,
    },
    {
      time: 'T + 18.40ms',
      title: 'Transatlantic Network Jitter Drops Cache Invalidation',
      desc: 'Out-of-band Redis Pub/Sub message to US-West is delayed by transatlantic WAN packet loss. The US cache continues serving stale available collateral.',
      anomaly: true,
      anomalyText: 'Silent Out-of-Band Disconnect',
    },
    {
      time: 'T + 41.80ms',
      title: 'Concurrent Duplicate Order Executed on US-West Node',
      desc: 'Order #9022 evaluates against the stale Redis cache. It allocates the exact same collateral already pledged in Frankfurt.',
      anomaly: true,
      anomalyText: 'Double-Execution Race Condition',
    },
    {
      time: 'T + 64.10ms',
      title: 'PostgreSQL Relational DB Primary Attempts Sync',
      desc: 'Postgres primary attempts two-phase lock. Transactions execute out-of-order, producing a phantom ledger deficit of $4.2M.',
      anomaly: true,
      anomalyText: 'Silent Split-Brain Inconsistency',
    },
    {
      time: 'Strata Invariant',
      title: 'How Strata Causal Vector Quorums Prevent This',
      desc: 'Every state mutation contains its parent vector timestamp. Under WAN jitter, the US node detects causal divergence, rejects out-of-order allocation, and merges deterministically with zero double-spends.',
      anomaly: false,
      strataSolved: true,
    },
  ];

  return (
    <div className="bg-[#090B12] rounded-2xl border border-white/[0.08] p-6 sm:p-8 space-y-6">
      <div className="border-b border-white/[0.06] pb-4">
        <div className="text-xs font-mono text-rose-400 font-semibold uppercase tracking-wider">
          Incident Post-Mortem Sequence
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
          Chronology of a 42ms Out-of-Band Desynchronization
        </h3>
        <p className="text-xs text-neutral-400 mt-1">
          Anatomy of how disjoint caches and database transactions inevitably diverge under network jitter.
        </p>
      </div>

      <div className="space-y-4 relative">
        {timelineSteps.map((step, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border transition-all ${
              step.strataSolved
                ? 'bg-blue-950/20 border-blue-500/40 text-blue-100'
                : step.anomaly
                ? 'bg-rose-950/15 border-rose-500/25'
                : 'bg-[#10131E] border-white/[0.06]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold ${
                    step.strataSolved
                      ? 'bg-blue-600 text-white'
                      : step.anomaly
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-white/10 text-neutral-300'
                  }`}
                >
                  {step.time}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  {step.title}
                </span>
              </div>

              {step.anomaly && (
                <span className="text-[10px] font-mono text-rose-400 flex items-center gap-1 self-start sm:self-auto">
                  <AlertCircle className="w-3 h-3" />
                  {step.anomalyText}
                </span>
              )}
              {step.strataSolved && (
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 self-start sm:self-auto">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Mathematically Prevented
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
