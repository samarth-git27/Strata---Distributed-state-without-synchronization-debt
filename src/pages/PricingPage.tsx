import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { PricingCalculator } from '../components/PricingCalculator';
import { PLANS, FAQS } from '../data/productData';
import { useNavigation } from '../context/NavigationContext';
import { Check, ArrowRight, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { navigate } = useNavigation();
  const [annualBilling, setAnnualBilling] = useState<boolean>(true);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setExpandedFaqIndex(expandedFaqIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 pt-28 sm:pt-36">
      {/* 1. HERO */}
      <section>
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="text-xs font-mono text-blue-400 font-semibold tracking-wider uppercase">
              Predictable Infrastructure Economics
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance">
              Simple, transparent pricing. Built for serious scale.
            </h1>
            <p className="text-base text-neutral-400 leading-relaxed text-balance">
              No punitive per-connection throttles. No surprise cross-region data transfer markups. Pay for the state throughput you actually commit.
            </p>

            {/* Annual vs Monthly Billing Toggle */}
            <div className="inline-flex items-center gap-3 p-1.5 bg-[#12141F] rounded-xl border border-white/[0.08]">
              <button
                onClick={() => setAnnualBilling(false)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  !annualBilling ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setAnnualBilling(true)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  annualBilling ? 'bg-blue-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-mono">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. PRICING TIERS */}
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {PLANS.map((plan) => {
              const price = annualBilling ? plan.priceAnnual : plan.priceMonthly;

              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-[#101322] border-2 border-blue-500/60 shadow-xl shadow-blue-500/10 relative'
                      : 'bg-[#0D0F17] border border-white/[0.08]'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono font-semibold tracking-wider uppercase bg-blue-600 text-white px-3 py-1 rounded-full shadow-sm">
                      {plan.badge}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                      <p className="text-xs text-neutral-400 min-h-[32px] leading-relaxed">
                        {plan.tagline}
                      </p>
                    </div>

                    <div className="py-2 border-y border-white/[0.06] space-y-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-extrabold font-mono text-white tabular-nums">
                          ${price}
                        </span>
                        <span className="text-xs text-neutral-400">/ month</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono">
                        {plan.priceMonthly === 0
                          ? 'Free forever · No credit card required'
                          : annualBilling
                          ? 'Billed annually ($' + price * 12 + '/yr)'
                          : 'Billed monthly'}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                        Included Primitives
                      </div>
                      <ul className="space-y-2.5">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8">
                    <Button
                      variant={plan.highlighted ? 'primary' : 'outline'}
                      size="md"
                      className="w-full"
                      onClick={() => navigate('/contact')}
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      {plan.ctaText}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. INTERACTIVE USAGE & CAPACITY CALCULATOR */}
      <section>
        <Container>
          <PricingCalculator />
        </Container>
      </section>

      {/* 4. SIDE-BY-SIDE TECHNICAL CAPABILITY MATRIX */}
      <section>
        <Container>
          <div className="max-w-2xl space-y-3 mb-8">
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
              Specification Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Compare Technical Capabilities Across Tiers
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0A0C14]">
            <table className="w-full text-left text-xs font-mono border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#111420] text-neutral-300 font-sans">
                  <th className="py-3.5 px-5 font-semibold text-white">Capability</th>
                  <th className="py-3.5 px-5 font-medium text-neutral-400">Developer ($0)</th>
                  <th className="py-3.5 px-5 font-bold text-blue-400 bg-blue-950/20 border-x border-white/[0.06]">Production ($149)</th>
                  <th className="py-3.5 px-5 font-medium text-neutral-300">Enterprise ($799)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-neutral-300">
                <tr>
                  <td className="py-3 px-5 font-sans font-medium text-white">Quorum Topology</td>
                  <td className="py-3 px-5 text-neutral-400">Single Cluster</td>
                  <td className="py-3 px-5 bg-blue-950/10 border-x border-white/[0.06] text-white">3-Region Global Mesh</td>
                  <td className="py-3 px-5 text-white">Custom Multi-Region (12+)</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-sans font-medium text-white">Cross-Region Latency</td>
                  <td className="py-3 px-5 text-neutral-400">Local (&lt;1ms)</td>
                  <td className="py-3 px-5 bg-blue-950/10 border-x border-white/[0.06] text-emerald-400 font-bold tabular-nums">Sub-4ms p99.9</td>
                  <td className="py-3 px-5 text-emerald-400 font-bold tabular-nums">Sub-1ms Dedicated Edge</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-sans font-medium text-white">eBPF Socket Ring Buffers</td>
                  <td className="py-3 px-5 text-neutral-400">Local Wasm Only</td>
                  <td className="py-3 px-5 bg-blue-950/10 border-x border-white/[0.06] text-white">Full Kernel Modules</td>
                  <td className="py-3 px-5 text-white">Custom Kernel Modules</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-sans font-medium text-white">Time-Travel Snapshot Log</td>
                  <td className="py-3 px-5 text-neutral-400">24 Hours</td>
                  <td className="py-3 px-5 bg-blue-950/10 border-x border-white/[0.06] text-white">30 Days Continuous</td>
                  <td className="py-3 px-5 text-white">Unlimited / Regulatory Cold</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-sans font-medium text-white">SLA & Recovery Backing</td>
                  <td className="py-3 px-5 text-neutral-400">Community Support</td>
                  <td className="py-3 px-5 bg-blue-950/10 border-x border-white/[0.06] text-white">99.95% / &lt;1hr SLA</td>
                  <td className="py-3 px-5 text-emerald-400 font-bold">99.999% Financial Backing</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-sans font-medium text-white">Air-Gapped VPC Licensing</td>
                  <td className="py-3 px-5 text-neutral-500">—</td>
                  <td className="py-3 px-5 bg-blue-950/10 border-x border-white/[0.06] text-neutral-500">—</td>
                  <td className="py-3 px-5 text-emerald-400">Supported (Bare Metal / VPC)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 5. TECHNICAL FAQ */}
      <section id="faq">
        <Container size="narrow">
          <div className="space-y-4 mb-10 text-center">
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
              Engineering Due Diligence
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Frequently Asked Technical Questions
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              In-depth technical answers addressing consistency guarantees, partition behavior, and security compliance.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isExpanded = expandedFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/[0.08] bg-[#0D0F17] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                    aria-expanded={isExpanded}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      {faq.question}
                    </span>
                    <span className="text-neutral-400 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-neutral-400 leading-relaxed border-t border-white/[0.04]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. CALL TO ACTION */}
      <section>
        <Container size="narrow">
          <div className="bg-[#0E101A] rounded-2xl border border-white/[0.08] p-8 sm:p-10 text-center space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Need custom quorums or air-gapped on-premise licensing?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
              We work directly with infrastructure architects designing high-throughput fintech engines, spatial collaboration canvases, and autonomous robotics swarms.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/contact')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Inquire About Enterprise Quorums
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
