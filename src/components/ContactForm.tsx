import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, FileText, ArrowRight } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Staff / Principal Architect',
    scale: '10M - 50M events / month',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid work email address';
    }
    if (!formData.company.trim()) errs.company = 'Company or team name is required';
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters describing your architecture or inquiry';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate high-reliability backend ingestion
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      const generatedId = 'STRATA-REQ-' + Math.floor(100000 + Math.random() * 900000);
      setTicketId(generatedId);
    }, 850);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      role: 'Staff / Principal Architect',
      scale: '10M - 50M events / month',
      message: '',
    });
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="bg-[#0D0F17] rounded-xl border border-white/[0.08] p-8 sm:p-10 space-y-6 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Inquiry Dispatched to Distributed Systems Engineering
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Your technical request has been routed directly to our systems architecture group. We typically respond with a topological analysis within 4 business hours.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#141724] border border-white/[0.06] max-w-sm mx-auto text-left space-y-1 font-mono text-xs">
          <div className="text-neutral-400 text-[11px]">Request Tracking Key:</div>
          <div className="text-blue-400 font-semibold">{ticketId}</div>
          <div className="text-neutral-500 text-[10px] pt-1">
            Assigned reviewer: Principal Systems Architect (EMEA / US-West)
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={handleReset}
            className="text-xs text-neutral-400 hover:text-white px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            Submit Another Technical Brief
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0D0F17] rounded-xl border border-white/[0.08] p-6 sm:p-8 space-y-6">
      <div className="border-b border-white/[0.06] pb-4">
        <h3 className="text-lg font-semibold text-white tracking-tight">
          Request Architecture Consultation & Cluster Access
        </h3>
        <p className="text-xs text-neutral-400 mt-1">
          Direct technical conversation with systems architects. No aggressive sales funnels.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-300">
            Full Name <span className="text-blue-400">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Elena Vance"
            className={`w-full px-3.5 py-2 text-xs rounded-lg bg-[#141624] border ${
              errors.name ? 'border-rose-500' : 'border-white/10 focus:border-blue-500'
            } text-white placeholder-neutral-400 focus:outline-none transition-colors`}
          />
          {errors.name && <p className="text-[11px] text-rose-400">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-300">
            Work Email <span className="text-blue-400">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="elena@company.com"
            className={`w-full px-3.5 py-2 text-xs rounded-lg bg-[#141624] border ${
              errors.email ? 'border-rose-500' : 'border-white/10 focus:border-blue-500'
            } text-white placeholder-neutral-400 focus:outline-none transition-colors`}
          />
          {errors.email && <p className="text-[11px] text-rose-400">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Company */}
        <div className="space-y-1.5 sm:col-span-1">
          <label className="text-xs font-medium text-neutral-300">
            Organization <span className="text-blue-400">*</span>
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Monolith Systems"
            className={`w-full px-3.5 py-2 text-xs rounded-lg bg-[#141624] border ${
              errors.company ? 'border-rose-500' : 'border-white/10 focus:border-blue-500'
            } text-white placeholder-neutral-400 focus:outline-none transition-colors`}
          />
          {errors.company && <p className="text-[11px] text-rose-400">{errors.company}</p>}
        </div>

        {/* Role */}
        <div className="space-y-1.5 sm:col-span-1">
          <label htmlFor="engineering-role" className="text-xs font-medium text-neutral-300">Engineering Role</label>
          <select
            id="engineering-role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3.5 py-2 text-xs rounded-lg bg-[#141624] border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="Staff / Principal Architect">Staff / Principal Architect</option>
            <option value="VP Infrastructure / CTO">VP Infrastructure / CTO</option>
            <option value="Senior Backend / Distributed Engineer">Senior Distributed Engineer</option>
            <option value="Engineering Manager / Lead">Engineering Manager / Lead</option>
          </select>
        </div>

        {/* Expected Scale */}
        <div className="space-y-1.5 sm:col-span-1">
          <label htmlFor="expected-scale" className="text-xs font-medium text-neutral-300">Expected Scale</label>
          <select
            id="expected-scale"
            value={formData.scale}
            onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
            className="w-full px-3.5 py-2 text-xs rounded-lg bg-[#141624] border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="Prototype / Research">Prototype / Research (&lt;1M ops)</option>
            <option value="1M - 10M events / month">1M - 10M events / month</option>
            <option value="10M - 50M events / month">10M - 50M events / month</option>
            <option value="100M+ events / month">100M+ events / month</option>
          </select>
        </div>
      </div>

        {/* Message */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-medium text-neutral-300">
            Architecture Overview / Requirements <span className="text-blue-400">*</span>
          </label>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
            <span>Quick presets:</span>
            {[
              { label: 'Fintech Matching', text: 'We are architecting a multi-region matching engine. We require sub-2ms cross-continental causal order consistency without double-spend risks during WAN jitter.' },
              { label: 'Spatial Canvas', text: 'We are building a real-time collaborative spatial design canvas. We need deterministic CRDT vector resolution for 100+ concurrent editors on the same document.' },
              { label: 'Autonomous Fleet', text: 'We operate a distributed robotics swarm. We require offline-first monotonic state logs with guaranteed eventual convergence once edge telemetry links heal.' },
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setFormData({ ...formData, message: preset.text })}
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 hover:bg-white/5 px-1 py-0.5 rounded cursor-pointer transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Briefly describe your current state topology, latency targets, and any multi-region partition challenges you are looking to solve..."
          className={`w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#141624] border ${
            errors.message ? 'border-rose-500' : 'border-white/10 focus:border-blue-500'
          } text-white placeholder-neutral-400 focus:outline-none transition-colors resize-none`}
        />
        {errors.message && <p className="text-[11px] text-rose-400">{errors.message}</p>}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="text-[11px] text-neutral-400">
          Encrypted TLS 1.3 transmission. Strictly confidential NDA compliance.
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
        >
          {submitting ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Verifying & Routing...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Submit Technical Inquiry</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
