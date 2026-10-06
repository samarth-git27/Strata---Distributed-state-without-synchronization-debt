import React from 'react';
import { Container } from '../components/Container';
import { ContactForm } from '../components/ContactForm';
import { Mail, Shield, MapPin, Terminal, Clock, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-24 pt-28 sm:pt-36">
      {/* 1. HERO */}
      <section>
        <Container>
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
              <span>Direct Engineering Communication</span>
              <span aria-hidden="true">·</span>
              <span>Sub-4hr Response Time</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance">
              Speak directly with distributed systems architects.
            </h1>
            <p className="text-base text-neutral-400 leading-relaxed text-balance">
              Whether you are designing a high-throughput financial telemetry engine, evaluating edge multi-region quorums, or reviewing TLA+ proofs, our engineering group is available.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. CONTACT SURFACE */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right: Technical Channels & Locations */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Channels */}
              <div className="bg-[#0D0F17] rounded-xl border border-white/[0.08] p-6 space-y-4">
                <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
                  Direct Technical Channels
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">General Architecture Inquiries</div>
                      <a href="mailto:architecture@strata.systems" className="text-blue-400 hover:underline font-mono">
                        architecture@strata.systems
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">Security & Vulnerability Disclosures</div>
                      <div className="text-neutral-400 font-mono text-[11px]">
                        PGP Key ID: <span className="text-neutral-200">0x8F3C7A21E94B</span>
                      </div>
                      <a href="mailto:security@strata.systems" className="text-blue-400 hover:underline font-mono">
                        security@strata.systems
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">Developer Office Hours</div>
                      <div className="text-neutral-400">
                        Every Thursday at 17:00 UTC on our public developer Zulip instance.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Engineering Labs */}
              <div className="bg-[#0D0F17] rounded-xl border border-white/[0.08] p-6 space-y-4">
                <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
                  Systems Research Labs
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">Zürich Formal Methods Lab</div>
                      <div className="text-neutral-400">
                        Gotthardstrasse 26, 8002 Zürich, Switzerland
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                        Focus: TLA+ specification & verification harnesses
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">San Francisco Systems Studio</div>
                      <div className="text-neutral-400">
                        580 Howard Street, San Francisco, CA 94105, USA
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                        Focus: Linux eBPF kernel socket layer & Wasm runtime
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time Pledge */}
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 flex items-center gap-3 text-xs text-blue-200">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>All technical inquiries are reviewed by practicing systems engineers. Guaranteed response within 4 business hours.</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
