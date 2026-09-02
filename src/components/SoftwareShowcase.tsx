import React, { useState } from 'react';
import {
  Code2,
  Smartphone,
  Layout,
  Network,
  Database,
  GitBranch,
  Wrench,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
} from 'lucide-react';

interface SoftwareShowcaseProps {
  onOpenConsultation: () => void;
}

export const SoftwareShowcase: React.FC<SoftwareShowcaseProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<'custom' | 'mobile' | 'uiux' | 'api' | 'erp' | 'devops' | 'managed'>('custom');

  const capabilities = [
    {
      id: 'custom',
      name: 'Custom Software',
      icon: Code2,
      headline: 'Tailored Enterprise Software Engineered for High Scale',
      subtitle: 'Bespoke architectures built with zero technical debt and elastic performance.',
      points: [
        'Modular microservices and event-driven architectures',
        'High-concurrency data engines (handling 500k+ req/sec)',
        'Domain-Driven Design (DDD) & clean test-driven code',
        'Long-term maintainability with comprehensive documentation',
      ],
      techStack: ['TypeScript', 'Rust', 'Go', 'Python', 'PostgreSQL', 'Redis', 'Kafka'],
    },
    {
      id: 'mobile',
      name: 'Web & Mobile Apps',
      icon: Smartphone,
      headline: 'Next-Gen Native iOS, Android & Responsive Web Apps',
      subtitle: 'Fluid, intuitive applications that deliver Apple-tier 60fps animations.',
      points: [
        'Native iOS (SwiftUI) and Android (Jetpack Compose)',
        'Cross-platform React Native & Flutter solutions',
        'Next.js, React 19, and modern edge-rendered web apps',
        'Offline-first synchronization & biometric security',
      ],
      techStack: ['Swift', 'Kotlin', 'React Native', 'Next.js', 'Tailwind CSS', 'GraphQL'],
    },
    {
      id: 'uiux',
      name: 'UI/UX Design & Testing',
      icon: Layout,
      headline: 'Apple-Grade Interface Design & Rigorous Usability Testing',
      subtitle: 'Mathematical layout hierarchies, refined typography, and delightful micro-interactions.',
      points: [
        'End-to-end design systems with Figma design tokens',
        'WCAG AA accessible color palettes and typographic scaling',
        'Automated A/B usability testing and heat-map analytics',
        'Interactive prototyping with tactile haptic feedback',
      ],
      techStack: ['Figma', 'Storybook', 'Framer Motion', 'Cypress', 'Playwright', 'Jest'],
    },
    {
      id: 'api',
      name: 'API & System Integration',
      icon: Network,
      headline: 'Seamless Data Bridges & Mission-Critical API Gateways',
      subtitle: 'Unify disparate legacy systems and modern cloud backends effortlessly.',
      points: [
        'Ultra-fast gRPC and GraphQL federation gateways',
        'Legacy mainframe and ERP database bridges',
        'Webhook delivery engine with guaranteed idempotent execution',
        'Full OAuth 2.0, mTLS and Zero-Trust token security',
      ],
      techStack: ['gRPC', 'GraphQL', 'REST', 'Kong Gateway', 'OAuth2', 'WebSockets'],
    },
    {
      id: 'erp',
      name: 'ERP & CRM Systems',
      icon: Database,
      headline: 'Comprehensive Enterprise Resource Planning & CRM Solutions',
      subtitle: 'Streamline operational workflows, billing, customer data, and supply chain telemetry.',
      points: [
        'Automated multi-currency billing and revenue recognition',
        'Dynamic inventory & global supply-chain tracking',
        'Custom CRM pipelines with AI predictive lead scoring',
        'Role-Based Access Control (RBAC) & audit logging',
      ],
      techStack: ['Custom ERP Core', 'PostgreSQL', 'ElasticSearch', 'Snowflake', 'Drizzle ORM'],
    },
    {
      id: 'devops',
      name: 'DevOps & CI/CD',
      icon: GitBranch,
      headline: 'Automated Continuous Deployment & Zero-Downtime Releases',
      subtitle: 'Infrastructure-as-Code with automated canary testing and instant rollback.',
      points: [
        'Kubernetes container orchestration on cloud and bare-metal',
        'Terraform & Pulumi Infrastructure-as-Code (IaC)',
        'Zero-downtime blue/green deployment pipelines',
        'Automated vulnerability scanning and SBOM generation',
      ],
      techStack: ['Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Prometheus', 'Grafana'],
    },
    {
      id: 'managed',
      name: 'Maintenance & Managed',
      icon: Wrench,
      headline: '24/7 Managed Services & 99.999% SLA Guarantee',
      subtitle: 'Proactive incident response, regular security audits, and dedicated SRE teams.',
      points: [
        'Round-the-clock site reliability engineering (SRE)',
        'Sub-15 minute critical incident response SLA',
        'Continuous patch management and dependency security',
        'Quarterly architectural reviews & capacity planning',
      ],
      techStack: ['Datadog', 'PagerDuty', 'OpenTelemetry', 'CloudWatch', 'Sentry'],
    },
  ];

  const current = capabilities.find((c) => c.id === activeTab) || capabilities[0];

  return (
    <section id="software" className="py-24 relative bg-white dark:bg-[#06070a] border-t border-slate-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Flyer Quote & Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-neutral-900 border border-red-200 dark:border-neutral-800 text-xs font-mono uppercase tracking-widest text-[#E5252A] mb-3 font-semibold">
            <span>FULL-LIFECYCLE SOFTWARE DEVELOPMENT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            From Concept to Code, <br className="hidden sm:inline" />
            <span className="text-brand-gradient">We Bring Your Ideas to Life.</span>
          </h2>

          <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto transition-colors">
            Whether building high-concurrency microservices, mission-critical ERP platforms, or responsive mobile apps, our engineering teams deliver precision code.
          </p>
        </div>

        {/* Interactive Capability Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            const isSelected = activeTab === cap.id;
            return (
              <button
                key={cap.id}
                onClick={() => setActiveTab(cap.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap border ${
                  isSelected
                    ? 'bg-[#E5252A] text-white border-[#E5252A] shadow-lg shadow-[#E5252A]/20'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900/80 text-slate-700 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cap.name}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Showcase Layout */}
        <div className="rounded-3xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800/90 p-6 sm:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-xs font-mono text-[#E5252A] uppercase tracking-wider mb-2 font-semibold">
                  Specialized Offering
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-2 transition-colors">
                  {current.headline}
                </h3>
                <p className="text-slate-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed transition-colors">
                  {current.subtitle}
                </p>
              </div>

              {/* Verified Checklist from Flyer */}
              <div className="space-y-2.5">
                {current.points.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 text-xs sm:text-sm text-slate-800 dark:text-neutral-200 shadow-sm transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#E5252A] flex-shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Pill Grid */}
              <div>
                <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 mb-2">Verified Technology Stack</div>
                <div className="flex flex-wrap gap-2">
                  {current.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono text-slate-700 dark:text-neutral-300 shadow-sm transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="px-6 py-3 rounded-xl bg-[#E5252A] hover:bg-[#d01e23] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#E5252A]/20"
                >
                  <span>Request Engineering Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Interactive Architecture Visualizer */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-900 dark:bg-neutral-900/90 border border-slate-800 dark:border-neutral-800 p-6 space-y-4 shadow-xl text-neutral-100">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#E5252A]" />
                    <span className="font-mono text-xs text-white">Live Pipeline Visualizer</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    STAGE: PRODUCTION
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 dark:bg-neutral-950 border border-slate-800 dark:border-neutral-800 space-y-1">
                    <div className="flex justify-between text-neutral-400 text-[11px]">
                      <span>Code Quality Score:</span>
                      <span className="text-emerald-400 font-bold">A+ (99.8%)</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full w-[99%]" />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 dark:bg-neutral-950 border border-slate-800 dark:border-neutral-800 space-y-1">
                    <div className="flex justify-between text-neutral-400 text-[11px]">
                      <span>Automated Regression Tests:</span>
                      <span className="text-white font-bold">2,418 Passed</span>
                    </div>
                    <div className="text-[11px] text-neutral-500">Zero security vulnerabilities flagged</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 dark:bg-neutral-950 border border-slate-800 dark:border-neutral-800 space-y-1">
                    <div className="flex justify-between text-neutral-400 text-[11px]">
                      <span>Deployment Velocity:</span>
                      <span className="text-[#E5252A] font-bold">&lt; 3.2 minutes</span>
                    </div>
                    <div className="text-[11px] text-neutral-500">Automated Canary with Instant Rollback</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#E5252A]/10 border border-[#E5252A]/20 text-[11px] text-neutral-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E5252A] flex-shrink-0" />
                  <span>Integrated directly with Freizy Cloud & Edge compute infrastructure.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
