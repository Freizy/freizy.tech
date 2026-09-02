import React from 'react';
import {
  Compass,
  Palette,
  Code2,
  CheckCircle2,
  Rocket,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ProcessPipelineProps {
  onOpenConsultation: () => void;
}

export const ProcessPipeline: React.FC<ProcessPipelineProps> = ({ onOpenConsultation }) => {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Architecture',
      icon: Compass,
      phase: 'STRATEGY & AUDIT',
      desc: 'We analyze your data flows, infrastructure constraints, and system SLAs to formulate a rigorous technical blueprint.',
      deliverables: ['System Architecture Diagram', 'Threat Modeling & Security Spec', 'SLA & Latency Budget'],
    },
    {
      number: '02',
      title: 'UI/UX & Prototyping',
      icon: Palette,
      phase: 'HUMAN INTERACTION',
      desc: 'Crafting fluid, high-contrast design systems with Figma tokens, interactive prototypes, and usability testing.',
      deliverables: ['Design Token Library', 'Interactive Click-Through Prototype', 'Accessibility Audit'],
    },
    {
      number: '03',
      title: 'Full-Stack Engineering',
      icon: Code2,
      phase: 'PRODUCTION BUILD',
      desc: 'Writing modular, high-throughput microservices, edge models, and frontends in TypeScript, Rust, Python, or Go.',
      deliverables: ['100% Typed Modular Codebase', 'Automated Unit/Integration Tests', 'API Documentation'],
    },
    {
      number: '04',
      title: 'Quality & Penetration Test',
      icon: CheckCircle2,
      phase: 'SECURITY VALIDATION',
      desc: 'Rigorous regression test suites, chaos engineering, fuzzing, and SOC2 / ISO 27001 vulnerability scans.',
      deliverables: ['Automated CI/CD Pass Matrix', 'Penetration Test Report', 'Load & Stress Benchmarks'],
    },
    {
      number: '05',
      title: 'Zero-Downtime Launch',
      icon: Rocket,
      phase: 'CONTINUOUS OPERATIONS',
      desc: 'Automated canary deployment onto our high-bandwidth mesh, followed by 24/7 SRE monitoring and SLA management.',
      deliverables: ['Canary Deployment Pipeline', 'Real-Time NOC Telemetry Dashboards', '24/7 Incident SLA'],
    },
  ];

  return (
    <section id="process" className="py-24 relative bg-white dark:bg-[#06070a] border-t border-slate-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-neutral-900 border border-red-200 dark:border-neutral-800 text-xs font-mono uppercase tracking-widest text-[#E5252A] mb-3 font-semibold">
            <span>ENGINEERING METHODOLOGY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            From Concept to Code. <br />
            <span className="text-brand-gradient">The Freizy Engineering Pipeline.</span>
          </h2>

          <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg transition-colors">
            A battle-tested 5-stage lifecycle designed to bring mission-critical enterprise projects from initial discovery to continuous production deployment.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-neutral-950/80 border border-slate-200 dark:border-neutral-800/90 flex flex-col justify-between hover:border-[#E5252A]/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading font-black text-2xl text-[#E5252A]">
                      {step.number}
                    </span>
                    <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 text-slate-600 dark:text-neutral-400 group-hover:text-white group-hover:bg-[#E5252A] transition-colors border border-slate-200 dark:border-neutral-800">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-500 uppercase tracking-wider mb-1 font-semibold">
                    {step.phase}
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed mb-4 transition-colors">
                    {step.desc}
                  </p>
                </div>

                <div className="border-t border-slate-200 dark:border-neutral-800/80 pt-3 space-y-1.5">
                  <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-500 uppercase font-semibold">Key Artifacts:</div>
                  {step.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E5252A]" />
                      <span className="truncate">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 border border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-base font-bold text-slate-900 dark:text-white transition-colors">Have an ambitious project in mind?</div>
            <div className="text-xs text-slate-600 dark:text-neutral-400 transition-colors">
              Our principal engineers can review your architecture within 24 business hours.
            </div>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-xl bg-[#E5252A] hover:bg-[#d01e23] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#E5252A]/20 flex-shrink-0"
          >
            <span>Schedule Discovery Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
