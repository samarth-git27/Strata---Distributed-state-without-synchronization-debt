import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { InteractiveStateInspector } from '../components/InteractiveStateInspector';
import { ArchitecturalComparison } from '../components/ArchitecturalComparison';
import { useNavigation } from '../context/NavigationContext';
import { ArrowRight, ShieldCheck, Cpu, GitBranch, Layers, CheckCircle2, ChevronRight, Terminal, Copy, Check, Activity } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useNavigation();
  const [copiedCli, setCopiedCli] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText('curl -fsSL https://get.strata.systems | sh');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 pt-28 sm:pt-36">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* Subtle background ambient mesh */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <Container>
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            {/* Top architectural trust marker */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Strata Engine v2.4</span>
              <span aria-hidden="true">·</span>
              <span>TLA+ Formally Verified</span>
              <span aria-hidden="true">·</span>
              <span>Linux eBPF Socket Layer</span>
            </div>

            {/* High-impact headline with text-balance */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.04em] text-white text-balance leading-[1.08]">
              Distributed state without synchronization debt.
            </h1>

            {/* Concrete value proposition */}
            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl text-balance leading-relaxed">
              Eliminate race conditions, cache invalidation chaos, and silent split-brains. Strata provides a mathematically deterministic causal state log compiled directly to WebAssembly and eBPF.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/contact')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Request Architecture Briefing
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/features')}
              >
                Inspect Technical Invariants
              </Button>
            </div>

            {/* Fast CLI Quickstart Prompt */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-lg bg-[#11131C] border border-white/10 text-xs font-mono text-neutral-300">
                <span className="text-blue-400">$</span>
                <span className="text-neutral-200 select-all">curl -fsSL https://get.strata.systems | sh</span>
                <button
                  onClick={copyInstall}
                  className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy installation string"
                  aria-label="Copy installation command"
                >
                  {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Hero Surface (The Interactive State Inspector) */}
          <div className="mt-12 sm:mt-16">
            <InteractiveStateInspector />
          </div>
        </Container>
      </section>

      {/* 2. THE PROBLEM STORY & ARCHITECTURAL COMPARISON */}
      <section className="relative">
        <Container>
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
              01. The Fundamental Flaw of Multi-Tier Systems
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white text-balance">
              Why modern distributed real-time stacks constantly drift apart.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed text-balance">
              When applications bridge Redis pub/sub, Postgres tables, Kafka buffers, and client-side CRDTs, there is no single authoritative causal clock. Under latency spikes or network partitions, state diverts silently—generating phantom updates, double-spends, and lost user intent.
            </p>
          </div>

          <ArchitecturalComparison />
        </Container>
      </section>

      {/* 3. CORE CAPABILITIES (ASYMMETRIC BENTO GRID) */}
      <section>
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
                02. Kernel & Distributed Primitives
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Engineered for sub-millisecond mathematical convergence.
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/features')}
              icon={<ChevronRight className="w-3.5 h-3.5" />}
            >
              Full Feature Specifications
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Bento Card 1 (Large - Col 7) */}
            <div className="md:col-span-7 bg-[#0D0F17] rounded-xl border border-white/[0.08] p-6 sm:p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                  <GitBranch className="w-4 h-4" />
                  <span>Leaderless Consensus</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Causal Vector Quorums (CVQ)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Unlike traditional Raft protocols that bottleneck writes through a geographically distant leader, Strata nodes commit mutations locally in 0.8ms and propagate state causally with zero cross-region roundtrip stalls.
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-4 font-mono text-xs">
                <div>
                  <div className="text-neutral-400 text-[11px]">Local Commit</div>
                  <div className="text-white text-base font-bold tabular-nums mt-0.5">&lt;0.8ms</div>
                </div>
                <div>
                  <div className="text-neutral-400 text-[11px]">Global Convergence</div>
                  <div className="text-white text-base font-bold tabular-nums mt-0.5">3.8ms</div>
                </div>
                <div>
                  <div className="text-neutral-400 text-[11px]">TLA+ Invariant</div>
                  <div className="text-emerald-400 text-base font-bold mt-0.5">Formal Pass</div>
                </div>
              </div>
            </div>

            {/* Bento Card 2 (Col 5) */}
            <div className="md:col-span-5 bg-[#0D0F17] rounded-xl border border-white/[0.08] p-6 sm:p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                  <Cpu className="w-4 h-4" />
                  <span>Kernel Bypass</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Linux eBPF Socket Filters
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Zero memory copies across network interface buffers. Mutations are verified and mapped directly in kernel shared memory before reaching user-space.
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] font-mono text-xs flex justify-between">
                <div>
                  <div className="text-neutral-400 text-[11px]">Throughput</div>
                  <div className="text-white text-base font-bold tabular-nums mt-0.5">1.8M ops/sec</div>
                </div>
                <div>
                  <div className="text-neutral-400 text-[11px]">CPU Tax</div>
                  <div className="text-white text-base font-bold tabular-nums mt-0.5">&lt;2.4%</div>
                </div>
              </div>
            </div>

            {/* Bento Card 3 (Col 5) */}
            <div className="md:col-span-5 bg-[#0D0F17] rounded-xl border border-white/[0.08] p-6 sm:p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                  <Terminal className="w-4 h-4" />
                  <span>Diagnostic Rigor</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Deterministic Time-Travel Replay
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Cryptographic Merkle log allows rewinding any production cluster state to an exact nanosecond to isolate concurrency anomalies in your local debugger.
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] font-mono text-xs flex justify-between">
                <div>
                  <div className="text-neutral-400 text-[11px]">Compaction Ratio</div>
                  <div className="text-white text-base font-bold tabular-nums mt-0.5">14.2 : 1</div>
                </div>
                <div>
                  <div className="text-neutral-400 text-[11px]">State Rebuild</div>
                  <div className="text-white text-base font-bold tabular-nums mt-0.5">&lt;12ms</div>
                </div>
              </div>
            </div>

            {/* Bento Card 4 (Col 7) */}
            <div className="md:col-span-7 bg-[#0D0F17] rounded-xl border border-white/[0.08] p-6 sm:p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                  <Layers className="w-4 h-4" />
                  <span>Universal Runtime</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Isomorphic 184KB WebAssembly Core
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  The exact same deterministic state transition kernel executes inside browser clients, Cloudflare Workers, and bare-metal server nodes—guaranteeing 100% semantic parity across the edge.
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-4 font-mono text-xs">
                <div>
                  <div className="text-neutral-400 text-[11px]">Wasm Size</div>
                  <div className="text-white text-base font-bold tabular-nums mt-0.5">184 KB</div>
                </div>
                <div>
                  <div className="text-neutral-400 text-[11px]">Cold Start</div>
                  <div className="text-white text-base font-bold tabular-nums mt-0.5">&lt;3ms</div>
                </div>
                <div>
                  <div className="text-neutral-400 text-[11px]">Supported SDKs</div>
                  <div className="text-white text-base font-bold mt-0.5">TS · Rust · Go</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. VERIFIED ENGINEERING PROOF & JEPSEN RESULTS WITH LATENCY SPECTRUM */}
      <section className="relative">
        <Container>
          <div className="bg-[#0A0C14] rounded-2xl border border-white/[0.08] p-8 sm:p-12 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                  03. Rigorous Empirical Verification
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Stress-tested against hostile network partitions.
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  We test Strata against synthetic chaos regimes using Jepsen verification suites: packet drops, asymmetric network splits, clock-skew faults, and hard process crashes.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 self-start lg:self-auto">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span>Continuous Jepsen CI Testbench #4012</span>
              </div>
            </div>

            {/* Latency Spectrum Visualization */}
            <div className="p-5 sm:p-6 bg-[#0E111C] rounded-xl border border-white/[0.06] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <div className="text-white font-semibold">
                  Multi-Region Convergence Latency Distribution (40% Packet Drop)
                </div>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1.5 text-blue-400">
                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
                    Strata CVQ
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <span className="w-2.5 h-2.5 rounded-sm bg-neutral-600 inline-block" />
                    Raft Leader Election
                  </span>
                </div>
              </div>

              {/* Graphical Latency Bar Comparison */}
              <div className="space-y-3 font-mono text-xs pt-2">
                <div>
                  <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                    <span>p50 (Median Cross-Region Commit)</span>
                    <span className="text-white">Strata: 0.8ms vs Raft: 118ms</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex">
                    <div className="h-full bg-blue-500 w-[8%]" title="Strata: 0.8ms" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                    <span>p95 (Under 20% Jitter)</span>
                    <span className="text-white">Strata: 2.4ms vs Raft: 280ms</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex">
                    <div className="h-full bg-blue-500 w-[18%]" title="Strata: 2.4ms" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                    <span>p99.9 (Under 40% Sustained Partition)</span>
                    <span className="text-white">Strata: 3.8ms vs Raft: 1,420ms (Stall)</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex">
                    <div className="h-full bg-blue-500 w-[28%]" title="Strata: 3.8ms" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/[0.06]">
              <div className="space-y-2">
                <div className="text-3xl font-extrabold font-mono text-white tabular-nums">
                  0
                </div>
                <div className="text-xs font-semibold text-neutral-200">
                  Linearizability Invariant Violations
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Zero stale reads or phantom mutations across 500+ simulated partition tests running continuously over 72 hours.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-extrabold font-mono text-white tabular-nums">
                  40%
                </div>
                <div className="text-xs font-semibold text-neutral-200">
                  Sustained WAN Packet Loss Resilience
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Nodes maintain deterministic local monotonic advancement without deadlocks or write-stalling under severe link degradation.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-extrabold font-mono text-white tabular-nums">
                  100%
                </div>
                <div className="text-xs font-semibold text-neutral-200">
                  TLA+ Specification Checked
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Every state transition function is verified with model-checking tools to mathematically eliminate deadlocks and race conditions.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. FINAL DECISIVE CALL TO ACTION */}
      <section>
        <Container size="narrow">
          <div className="bg-[#0E101A] rounded-2xl border border-white/[0.08] p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
                Replace your distributed synchronization duct tape today.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed text-balance">
                Start with a single-node local cluster in under two minutes, or schedule a topological review with our distributed systems architects.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/contact')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Schedule Technical Review
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/pricing')}
              >
                Inspect Pricing & Plans
              </Button>
            </div>

            <div className="text-[11px] text-neutral-400 font-mono pt-4 border-t border-white/[0.04]">
              Available as managed edge mesh or self-hosted bare-metal binary.
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

