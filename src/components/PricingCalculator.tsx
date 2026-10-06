import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const PricingCalculator: React.FC = () => {
  const { navigate } = useNavigation();
  const [eventsMillions, setEventsMillions] = useState<number>(15);
  const [regions, setRegions] = useState<number>(3);
  const [retentionDays, setRetentionDays] = useState<number>(30);

  // Transparent calculation model
  const baseMonthly = 49;
  const eventsCost = Math.max(0, (eventsMillions - 2) * 4.2);
  const regionsMultiplier = regions === 1 ? 1 : regions === 3 ? 1.4 : 1.8;
  const retentionCost = retentionDays === 7 ? 0 : retentionDays === 30 ? 25 : 85;

  const totalMonthly = Math.round((baseMonthly + eventsCost) * regionsMultiplier + retentionCost);
  const legacyStackEstimate = Math.round(totalMonthly * 2.85);
  const savings = legacyStackEstimate - totalMonthly;

  return (
    <div id="calculator" className="w-full bg-[#0D0F17] rounded-xl border border-white/[0.08] p-6 sm:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1">
            Usage Estimator
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Transparent Capacity Calculator
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Predictable infrastructure spend without hidden per-connection or ingress bandwidth surcharges.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-3 py-1.5 rounded-lg self-start sm:self-auto">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Zero ingress/egress bandwidth markup</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders and Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Monthly Events Slider */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="events-slider" className="text-neutral-300 font-medium">Monthly State Mutations</label>
              <span className="font-mono text-white text-sm font-semibold tabular-nums">
                {eventsMillions}M events / mo
              </span>
            </div>
            <input
              id="events-slider"
              type="range"
              min="1"
              max="100"
              step="1"
              value={eventsMillions}
              onChange={(e) => setEventsMillions(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
              <span>1M</span>
              <span>25M</span>
              <span>50M</span>
              <span>100M+</span>
            </div>
          </div>

          {/* Edge Regions */}
          <div className="space-y-2">
            <label className="text-xs text-neutral-300 font-medium block">
              Active Mesh Consensus Regions
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { count: 1, label: 'Single Region', desc: 'Local dev / staging' },
                { count: 3, label: '3 Regions', desc: 'US, EU, Tokyo' },
                { count: 5, label: '5 Regions', desc: 'Global multi-edge' },
              ].map((item) => (
                <button
                  key={item.count}
                  onClick={() => setRegions(item.count)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    regions === item.count
                      ? 'bg-blue-600/10 border-blue-500/40 text-white'
                      : 'bg-[#12141F] border-white/[0.04] text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-semibold">{item.label}</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time-Travel Snapshot Retention */}
          <div className="space-y-2">
            <label className="text-xs text-neutral-300 font-medium block">
              Time-Travel Snapshot Retention Log
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { days: 7, label: '7 Days', desc: 'Continuous log' },
                { days: 30, label: '30 Days', desc: 'Standard production' },
                { days: 365, label: '1 Year', desc: 'Regulatory audit' },
              ].map((item) => (
                <button
                  key={item.days}
                  onClick={() => setRetentionDays(item.days)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    retentionDays === item.days
                      ? 'bg-blue-600/10 border-blue-500/40 text-white'
                      : 'bg-[#12141F] border-white/[0.04] text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-semibold">{item.label}</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="lg:col-span-5 bg-[#121422] rounded-xl border border-white/[0.08] p-6 space-y-6">
          <div className="space-y-1">
            <div className="text-xs text-neutral-400">Estimated Strata Runtime</div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold font-mono text-white tabular-nums">
                ${totalMonthly}
              </span>
              <span className="text-xs text-neutral-400">/ month</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-4 border-t border-white/[0.06] text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>Mutations ({eventsMillions}M ops):</span>
              <span className="font-mono text-neutral-200">${Math.round(eventsCost)}/mo</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Mesh Quorum ({regions} regions):</span>
              <span className="font-mono text-neutral-200">{regionsMultiplier}x</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Time-Travel Journal ({retentionDays} days):</span>
              <span className="font-mono text-neutral-200">${retentionCost}/mo</span>
            </div>
            <div className="flex justify-between text-neutral-400 pt-1 border-t border-white/[0.04]">
              <span>Memory Footprint (FlatBuffers mmap):</span>
              <span className="font-mono text-blue-400">{Math.round(eventsMillions * 0.38 + 64)} MB</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Active eBPF Ring Buffers:</span>
              <span className="font-mono text-blue-400">{regions * 2} instances</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 space-y-1">
            <div className="text-xs text-emerald-400 font-semibold flex items-center justify-between">
              <span>vs. Multi-Tier Redis + Kafka Stack</span>
              <span className="font-mono text-neutral-400 line-through">${legacyStackEstimate}/mo</span>
            </div>
            <div className="text-[11px] text-emerald-300/80">
              Estimated infrastructure savings: <strong>~${savings}/month</strong> by eliminating duplicate cluster memory and cross-region egress hops.
            </div>
          </div>

          <button
            onClick={() => navigate('/contact')}
            className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            Deploy This Configuration
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
