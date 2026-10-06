import React from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { FeatureTabs } from '../components/FeatureTabs';
import { CausalDAGVisualizer } from '../components/CausalDAGVisualizer';
import { useNavigation } from '../context/NavigationContext';
import { ArrowRight, Check, X, Shield, Cpu, Zap, HardDrive, Network } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 pt-28 sm:pt-36">
      {/* 1. HERO */}
      <section>
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
              <span>Core Architecture Specifications</span>
              <span aria-hidden="true">·</span>
              <span>Linux eBPF · Wasm 2.0 · TLA+ Verified</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance">
              The internal anatomy of a deterministic state engine.
            </h1>
            <p className="text-base text-neutral-400 leading-relaxed text-balance">
              Strata dismantles the traditional layered middleware stack. Explore the four core subsystems that guarantee causal convergence without clock synchronization or leader bottlenecks.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. INTERACTIVE FEATURE DEEP DIVE */}
      <section>
        <Container>
          <div className="bg-[#0A0C14] rounded-2xl border border-white/[0.08] p-6 sm:p-10">
            <FeatureTabs />
          </div>
        </Container>
      </section>

      {/* 3. INTERACTIVE CAUSAL DAG GRAPH EXPLORER */}
      <section>
        <Container>
          <CausalDAGVisualizer />
        </Container>
      </section>

      {/* 4. HARDWARE & KERNEL DEPLOYMENT TOPOLOGY */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
                  Bare-Metal & Edge Topology
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Zero external dependencies. Single static binary execution.
                </h2>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Most distributed streaming platforms require an armada of JVM runtimes, ZooKeeper or KRaft coordination nodes, and heavy sidecar proxies. Strata ships as a zero-dependency 22MB compiled binary or lightweight WebAssembly container that boots in 14 milliseconds.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                {[
                  { title: 'Sub-4ms Global Consensus', desc: 'Pre-computed algebraic semi-lattice join resolves conflicts without multi-RTT coordination.' },
                  { title: 'Memory-Mapped Ring Buffers', desc: 'Direct kernel shared memory avoids GC thrashing, yielding steady sub-millisecond p99.9 latencies.' },
                  { title: 'Zero Ingress Surcharges', desc: 'Deploy within your own AWS/GCP VPC or bare-metal racks with 100% data sovereignty.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-[#0F121C] border border-white/[0.06] space-y-1">
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="text-neutral-400 leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware Visual Asset */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0E1019] shadow-2xl group">
                <img
                  src="/src/assets/images/strata_datacenter_node_1791294354112.jpg"
                  alt="High-density Strata distributed node server chassis in a cleanroom datacenter facility"
                  className="w-full h-[380px] sm:h-[440px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center justify-between text-xs font-mono text-neutral-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Edge Cluster Node 01 · Frankfurt</span>
                  </div>
                  <span className="text-neutral-400 text-[11px]">eBPF RX Ring: 0 drops</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. COMPARISON MATRIX (STRATA VS ALTERNATIVES) */}
      <section>
        <Container>
          <div className="max-w-2xl space-y-3 mb-10">
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
              Architectural Tradeoffs
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              How Strata compares to legacy synchronization options.
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Evaluating developer friction, latency penalties, and failure modes across common real-time architecture patterns.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0B0D15]">
            <table className="w-full text-left text-xs font-mono border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#10131E] text-neutral-300 font-sans">
                  <th className="py-4 px-5 font-semibold text-white">System Capability</th>
                  <th className="py-4 px-5 font-bold text-blue-400 bg-blue-950/20 border-x border-white/[0.06]">Strata Engine</th>
                  <th className="py-4 px-5 font-medium text-neutral-400">Kafka + Redis PubSub</th>
                  <th className="py-4 px-5 font-medium text-neutral-400">Postgres CDC (Debezium)</th>
                  <th className="py-4 px-5 font-medium text-neutral-400">Bespoke Client CRDTs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-neutral-300">
                <tr>
                  <td className="py-3.5 px-5 font-sans font-medium text-white">Consensus Protocol</td>
                  <td className="py-3.5 px-5 bg-blue-950/10 border-x border-white/[0.06] text-blue-300">Causal Vector Quorum</td>
                  <td className="py-3.5 px-5 text-neutral-400">Strict Leader (KRaft)</td>
                  <td className="py-3.5 px-5 text-neutral-400">Primary Lock / WAL</td>
                  <td className="py-3.5 px-5 text-neutral-400">Heuristic LWW</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-sans font-medium text-white">Multi-Region Latency</td>
                  <td className="py-3.5 px-5 bg-blue-950/10 border-x border-white/[0.06] text-emerald-400 font-bold tabular-nums">Sub-4ms Convergence</td>
                  <td className="py-3.5 px-5 text-neutral-400 tabular-nums">120ms - 350ms RTT</td>
                  <td className="py-3.5 px-5 text-neutral-400 tabular-nums">250ms - 800ms lag</td>
                  <td className="py-3.5 px-5 text-neutral-400">Variable / Unbounded</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-sans font-medium text-white">Split-Brain Tolerance</td>
                  <td className="py-3.5 px-5 bg-blue-950/10 border-x border-white/[0.06] text-emerald-400">100% Mathematically Proven</td>
                  <td className="py-3.5 px-5 text-amber-400">Write pauses during partition</td>
                  <td className="py-3.5 px-5 text-rose-400">Replication fork risk</td>
                  <td className="py-3.5 px-5 text-amber-400">Divergent tombstone bugs</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-sans font-medium text-white">Runtime Footprint</td>
                  <td className="py-3.5 px-5 bg-blue-950/10 border-x border-white/[0.06] text-white">184KB Wasm / 22MB Binary</td>
                  <td className="py-3.5 px-5 text-neutral-400">JVM + Redis (4GB+ RAM)</td>
                  <td className="py-3.5 px-5 text-neutral-400">Kafka Connect daemon</td>
                  <td className="py-3.5 px-5 text-neutral-400">Unbounded JS memory</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-sans font-medium text-white">Deterministic Replay</td>
                  <td className="py-3.5 px-5 bg-blue-950/10 border-x border-white/[0.06] text-emerald-400">Nanosecond Merkle Journal</td>
                  <td className="py-3.5 px-5 text-neutral-400">Offset replay only</td>
                  <td className="py-3.5 px-5 text-neutral-400">None without snapshot</td>
                  <td className="py-3.5 px-5 text-rose-400">None (clock dependent)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 6. CALL TO ACTION */}
      <section>
        <Container size="narrow">
          <div className="bg-[#0E101A] rounded-2xl border border-white/[0.08] p-8 sm:p-10 text-center space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to evaluate Strata in your development pipeline?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
              Run the local single-binary runtime on your workstation, or deploy a three-node global test cluster in under five minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/contact')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Request Architecture Consultation
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/pricing')}
              >
                View Transparent Pricing
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
