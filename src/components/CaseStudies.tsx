import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Building2,
  Cpu,
  Globe2,
} from 'lucide-react';

interface CaseStudiesProps {
  onOpenConsultation: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenConsultation }) => {
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [
    {
      id: 'fintech',
      client: 'Apex Global Financial Mesh',
      industry: 'FINANCIAL SERVICES',
      title: 'Sub-Millisecond Fraud Inference at 200,000 TPS',
      challenge:
        'A tier-1 global banking exchange required continuous machine learning fraud detection across 18 countries without injecting more than 2ms of transactional latency.',
      solution:
        'Freizy deployed dedicated Matrix-X FP8 GPU clusters coupled with our private 800Gbps zero-trust optical mesh, running quantized transformer anomaly classifiers.',
      results: [
        { label: 'Inference Latency', metric: '0.84 ms' },
        { label: 'Fraud Detection Rate', metric: '99.98%' },
        { label: 'Infrastructure Savings', metric: '42%' },
      ],
      techUsed: ['Matrix-X GPU Clusters', 'Custom gRPC Middleware', 'Private Zero-Trust Mesh', 'Rust Engine'],
    },
    {
      id: 'logistics',
      client: 'Vanguard Global Freight & Port Logistics',
      industry: 'SUPPLY CHAIN & IOT',
      title: 'Autonomous Edge Computer Vision across 40 Maritime Ports',
      challenge:
        'Harsh oceanic salt-spray environments and intermittent satellite connections made cloud-based container inspection impossible.',
      solution:
        'Freizy engineered ruggedized EdgeNode Pro silicon units with dual-sensor feeds and offline neural object classification running 120 FPS vision models.',
      results: [
        { label: 'Container Throughput', metric: '+310%' },
        { label: 'Offline Availability', metric: '100.000%' },
        { label: 'Ingress Inspection Time', metric: '1.4 Sec' },
      ],
      techUsed: ['EdgeNode Pro Fanless Nodes', 'Jetpack Compose Edge UI', 'Custom Vision Model', 'Offline Sync'],
    },
    {
      id: 'healthcare',
      client: 'OmniHealth BioMedical AI Network',
      industry: 'HEALTHCARE & LIFE SCIENCES',
      title: 'Air-Gapped Private LLM Diagnostics & HIPAA-Compliant Mesh',
      challenge:
        'A consortium of 30+ regional hospitals needed patient record synthesis without leaking identifiable patient vectors to public cloud API providers.',
      solution:
        'Freizy implemented sovereign on-premises LLM instances with air-gapped vector databases and continuous role-based audit logging.',
      results: [
        { label: 'Diagnostic Speed', metric: '5.2x Faster' },
        { label: 'Data Leak Risk', metric: 'Zero (Air-Gapped)' },
        { label: 'SLA Pass Rate', metric: '99.999%' },
      ],
      techUsed: ['Private LLM Quantization', 'Air-Gapped Vector DB', 'Custom Web & Mobile Portal', 'SOC2 Compliant'],
    },
  ];

  const current = cases[selectedCase];

  return (
    <section id="cases" className="py-24 relative bg-slate-50 dark:bg-[#08090d] border-t border-slate-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-neutral-900 border border-red-200 dark:border-neutral-800 text-xs font-mono uppercase tracking-widest text-[#E5252A] mb-3 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENTERPRISE PROVEN RESULTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            Proven at <span className="text-brand-gradient">Global Scale</span>
          </h2>

          <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg transition-colors">
            See how top-tier industry leaders deploy Freizy AI models, custom software, and hardware infrastructure to dominate their markets.
          </p>
        </div>

        {/* Case Switcher Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {cases.map((c, idx) => {
            const isSelected = selectedCase === idx;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCase(idx)}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-neutral-900 border-[#E5252A] shadow-xl shadow-[#E5252A]/10 ring-1 ring-[#E5252A]'
                    : 'bg-white/80 dark:bg-neutral-950/70 hover:bg-white dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 shadow-sm'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-500 uppercase tracking-wider mb-1 font-semibold">
                  {c.industry}
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mb-2 transition-colors">{c.client}</div>
                <div className="text-xs text-slate-600 dark:text-neutral-400 line-clamp-1 font-normal transition-colors">
                  {c.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Case Study Detail Box */}
        <div className="rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-8 sm:p-12 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 dark:bg-[#E5252A]/10 text-[#E5252A] border border-red-200 dark:border-[#E5252A]/30 font-mono text-xs font-semibold mb-3">
                  {current.industry}
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white mb-2 transition-colors">
                  {current.title}
                </h3>
                <div className="text-xs font-mono text-slate-500 dark:text-neutral-400">
                  Client: <strong className="text-slate-800 dark:text-neutral-200">{current.client}</strong>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 text-xs sm:text-sm text-slate-700 dark:text-neutral-300 transition-colors">
                  <strong className="text-slate-900 dark:text-white block font-mono mb-1">The Challenge:</strong>
                  {current.challenge}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 text-xs sm:text-sm text-slate-700 dark:text-neutral-300 transition-colors">
                  <strong className="text-[#E5252A] block font-mono mb-1">The Freizy Solution:</strong>
                  {current.solution}
                </div>
              </div>

              {/* Technologies Deployed */}
              <div>
                <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 mb-2">Architectural Modules Deployed:</div>
                <div className="flex flex-wrap gap-2">
                  {current.techUsed.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono text-slate-700 dark:text-neutral-300 flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#E5252A]" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Metrics Box */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-[#0d0f14] border border-slate-800 dark:border-neutral-800 rounded-2xl p-8 space-y-6 text-neutral-100">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs text-neutral-400">
                <span>VERIFIED METRICS</span>
                <span className="text-emerald-400 font-bold">100% SLA COMPLIANCE</span>
              </div>

              <div className="space-y-4">
                {current.results.map((res, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-950/80 dark:bg-neutral-950/80 border border-slate-800 dark:border-neutral-800 flex items-center justify-between"
                  >
                    <span className="text-xs font-mono text-neutral-300">{res.label}</span>
                    <span className="text-2xl font-bold font-heading text-white">{res.metric}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3 rounded-xl bg-[#E5252A] hover:bg-[#d01e23] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E5252A]/20"
                >
                  <span>Build a Similar Architecture</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
