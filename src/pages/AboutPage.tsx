import React from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { FailureTimelineDiagram } from '../components/FailureTimelineDiagram';
import { TEAM_MEMBERS } from '../data/productData';
import { useNavigation } from '../context/NavigationContext';
import { ArrowRight, BookOpen, ShieldCheck, Terminal, Compass, Layers } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 pt-28 sm:pt-36">
      {/* 1. HERO & MANIFESTO */}
      <section>
        <Container>
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
              <span>Engineering Philosophy & Origin</span>
              <span aria-hidden="true">·</span>
              <span>Formal Methods Group</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance">
              Why we stopped trusting out-of-band distributed synchronization.
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed text-balance">
              Distributed software has spent the last decade duct-taping databases to cache queues, praying that network jitter won't expose the race conditions hidden in between. We founded Strata to restore mathematical determinism to systems engineering.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. THE ORIGIN STORY: THE $4M PHANTOM FILL */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-3">
                <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
                  The Catalyst
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Born from a 3 AM ghost state disaster.
                </h2>
                <div className="space-y-4 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  <p>
                    In 2023, while operating a multi-region matching engine, a 42-millisecond transatlantic link partition caused a Postgres primary write and an asynchronous Redis pub/sub invalidation to arrive out of order.
                  </p>
                  <p>
                    The consequence was catastrophic: two valid orders filled against the same collateral simultaneously. The system reported both executions as successful, creating a phantom ledger imbalance that cost over $4.2M before automated circuits tripped.
                  </p>
                  <p>
                    When we post-mortemed the failure, the problem wasn't a bug in Redis or Postgres—it was the fundamental architectural sin of having two out-of-band representations of truth. We realized that true reliability requires a single, causal-ordered state log where all state mutations are verified mathematical transitions.
                  </p>
                </div>
              </div>
            </div>

            {/* Documentary Visual Asset */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0E1019] shadow-2xl group">
                <img
                  src="/src/assets/images/strata_team_engineering_1791294374274.jpg"
                  alt="Senior distributed systems architects in modern studio discussing state log architecture"
                  className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center justify-between text-xs font-mono text-neutral-300">
                  <span>Systems Architecture Lab · Zürich</span>
                  <span className="text-neutral-400 text-[11px]">TLA+ Invariant Review</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Incident Chronology Diagram */}
          <FailureTimelineDiagram />
        </Container>
      </section>

      {/* 3. FOUR CORE ENGINEERING PRINCIPLES */}
      <section id="principles">
        <Container>
          <div className="max-w-2xl space-y-3 mb-10">
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
              Foundational Beliefs
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Our architectural principles.
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              We reject the hype-driven churn of modern software tools in favor of rigorous, durable systems engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: '01',
                title: 'Determinism Over Heuristics',
                desc: 'Never rely on clock synchronization (NTP) or heuristic "last-write-wins" resolvers to determine truth. State ordering must be algebraically provable through causal vector lattices.',
              },
              {
                num: '02',
                title: 'Kernel Efficiency Over Cloud Bloat',
                desc: 'Throwing dozens of oversized cloud instances at an inefficient synchronization pipeline is an architectural failure. By executing in Linux eBPF and WebAssembly, a single node handles 1.8M writes/sec.',
              },
              {
                num: '03',
                title: 'Formal Verification Before Production',
                desc: 'We write formal TLA+ mathematical specifications for every consensus protocol and verify invariants with exhaustive model checking before writing a single line of production code.',
              },
              {
                num: '04',
                title: 'Zero Black Boxes',
                desc: 'If a distributed system cannot explain why state resolved in a specific order down to the exact nanosecond log entry, it has no place running mission-critical infrastructure.',
              },
            ].map((principle, idx) => (
              <div
                key={idx}
                className="bg-[#0D0F17] rounded-xl border border-white/[0.08] p-6 sm:p-8 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-blue-400">{principle.num}</div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{principle.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. SYSTEMS LEADERSHIP & RESEARCH TEAM */}
      <section>
        <Container>
          <div className="max-w-2xl space-y-3 mb-10">
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
              Research & Engineering Team
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Led by distributed systems veterans.
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Our engineers come from high-frequency exchange architectures, formal methods laboratories, and Linux kernel networking working groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#0D0F17] rounded-xl border border-white/[0.08] p-5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-white/10 flex items-center justify-center font-mono font-bold text-sm text-white">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">{member.name}</h3>
                    <div className="text-[11px] text-blue-400 font-mono">{member.role}</div>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-neutral-500">
                  Prior: {member.prior}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. ARCHITECTURAL HEADQUARTERS & COMMITMENT */}
      <section id="research">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#090B12] rounded-2xl border border-white/[0.08] p-6 sm:p-10">
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                Open Verifiability
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Our TLA+ proofs and Jepsen test harnesses are public.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Trust in distributed systems is earned through reproducible verification, not marketing claims. Anyone can clone our repository, execute our TLA+ model checks, and run our Jepsen chaos partition suite locally.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-neutral-300">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  Jepsen CI: 100% Green
                </span>
                <span className="flex items-center gap-1.5 text-blue-400">
                  <Terminal className="w-4 h-4" />
                  Apache 2.0 Core
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-xl overflow-hidden border border-white/[0.08]">
                <img
                  src="/src/assets/images/strata_architecture_monolith_1791294394334.jpg"
                  alt="Minimalist modern architectural headquarters pavilion surrounded by tranquil reflecting pool"
                  className="w-full h-[280px] sm:h-[320px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 text-[11px] font-mono text-neutral-300">
                  Strata Formal Systems Lab · Zürich, Switzerland
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. CALL TO ACTION */}
      <section>
        <Container size="narrow">
          <div className="bg-[#0E101A] rounded-2xl border border-white/[0.08] p-8 sm:p-10 text-center space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Build your next distributed system on mathematical foundations.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
              We welcome technical deep-dives with software engineering leads. Reach out to schedule a consultation with our systems team.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/contact')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Connect with the Systems Team
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
