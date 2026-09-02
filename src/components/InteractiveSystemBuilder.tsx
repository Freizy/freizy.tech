import React, { useState } from 'react';
import {
  Sliders,
  Cpu,
  Server,
  Network,
  Shield,
  Zap,
  Check,
  Download,
  Send,
  Layers,
  Sparkles,
  Palette,
  ShieldAlert,
  Bot,
  FolderKanban,
} from 'lucide-react';

interface InteractiveSystemBuilderProps {
  onProceedWithConfig: (configNotes: string) => void;
}

export const InteractiveSystemBuilder: React.FC<InteractiveSystemBuilderProps> = ({
  onProceedWithConfig,
}) => {
  const [selectedWorkload, setSelectedWorkload] = useState('ai-agent');
  const [selectedScale, setSelectedScale] = useState('enterprise');
  const [selectedHardware, setSelectedHardware] = useState('liquid-gpu');
  const [selectedSla, setSelectedSla] = useState('dedicated');
  const [copied, setCopied] = useState(false);

  const workloads = [
    {
      id: 'ai-agent',
      name: 'Autonomous AI Multi-Agent Cluster',
      icon: Cpu,
      desc: 'Private RAG, automated workflow reasoning, & vision inference',
      throughput: '12,500 ops/sec',
      latency: '1.2ms',
    },
    {
      id: 'fullstack-erp',
      name: 'Full-Stack ERP & Microservices Suite',
      icon: Layers,
      desc: 'High-concurrency CRM, ERP, and API gateways with zero latency',
      throughput: '45,000 req/sec',
      latency: '4.8ms',
    },
    {
      id: 'cyber-sentinel',
      name: 'Zero-Trust Cyber Sentinel & Automated SOC',
      icon: ShieldAlert,
      desc: 'Continuous authentication, endpoint threat neutralization & compliance',
      throughput: '99.999% Neutralization',
      latency: '< 8.5s MTTD',
    },
    {
      id: 'robotics-fleet',
      name: 'ROS 2 AMR & Sensor Fusion Robotic Fleet',
      icon: Bot,
      desc: 'LiDAR SLAM, edge kinematics & sub-centimeter industrial automation',
      throughput: '1,000 Hz Telemetry',
      latency: '< 0.8ms Fusion',
    },
    {
      id: 'edge-iot',
      name: 'Industrial Edge IoT & Silicon Telemetry',
      icon: Server,
      desc: 'Low-power ruggedized nodes with offline AI classification',
      throughput: '120 FPS CV Stream',
      latency: '0.4ms',
    },
    {
      id: 'global-mesh',
      name: 'Zero-Trust 800Gbps Global Backbone',
      icon: Network,
      desc: 'Deterministic multi-cloud optical routing & DDoS shield',
      throughput: '800 Gbps line-rate',
      latency: '0.8ms',
    },
    {
      id: 'program-governance',
      name: 'Agile Enterprise Project & SAFe Delivery Architecture',
      icon: FolderKanban,
      desc: 'Milestone governance, multi-vendor leadership & budget assurance',
      throughput: '98.8% On-Time SLA',
      latency: '< 1.2% Variance',
    },
    {
      id: 'brand-design',
      name: 'Corporate Identity & Graphic Design Suite',
      icon: Palette,
      desc: 'Vector logo systems, marketing collateral, UI design & print production',
      throughput: 'Infinite Vector Scale',
      latency: 'Lossless / CMYK',
    },
  ];


  const scales = [
    { id: 'startup', label: 'Growth / Scale-Up', nodes: '5 - 20 Nodes', time: '1 - 2 Weeks' },
    { id: 'enterprise', label: 'Mid-Enterprise', nodes: '50 - 250 Nodes', time: '2 - 4 Weeks' },
    { id: 'hyperscale', label: 'Global Hyperscale', nodes: '1,000+ Nodes', time: 'Bespoke Cadence' },
  ];

  const hardwareOptions = [
    { id: 'liquid-gpu', label: 'Freizy Matrix-X Liquid Submerged GPU Racks', badge: 'High Compute' },
    { id: 'edgenode-pro', label: 'EdgeNode Pro Fanless Ruggedized Silicon Units', badge: 'Edge/Field' },
    { id: 'hybrid-cloud', label: 'Hybrid Bare-Metal + Multi-Cloud Orchestration', badge: 'Flexible' },
  ];

  const slaTiers = [
    { id: 'standard', label: '99.9% Production SLA', desc: 'Standard business support' },
    { id: 'dedicated', label: '99.999% Mission-Critical SLA', desc: '24/7 dedicated SRE team + sub-15min response' },
    { id: 'air-gapped', label: 'Air-Gapped Sovereign On-Prem', desc: 'Complete physical isolation + compliance' },
  ];

  const currentWorkload = workloads.find((w) => w.id === selectedWorkload) || workloads[0];
  const currentScale = scales.find((s) => s.id === selectedScale) || scales[0];
  const currentHw = hardwareOptions.find((h) => h.id === selectedHardware) || hardwareOptions[0];
  const currentSla = slaTiers.find((t) => t.id === selectedSla) || slaTiers[0];

  const generatedSummary = `Freizy Architecture Spec:
- Workload: ${currentWorkload.name}
- Scale Tier: ${currentScale.label} (${currentScale.nodes})
- Silicon Acceleration: ${currentHw.label}
- SLA Guarantee: ${currentSla.label}
- Est. Deployment Velocity: ${currentScale.time}
- Target Latency Envelope: ${currentWorkload.latency}`;

  const handleExport = () => {
    onProceedWithConfig(generatedSummary);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="configurator" className="py-24 relative bg-white dark:bg-[#06070a] border-t border-slate-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-neutral-900 border border-red-200 dark:border-neutral-800 text-xs font-mono uppercase tracking-widest text-[#E5252A] mb-3 font-semibold">
            <Sliders className="w-3.5 h-3.5" />
            <span>INTERACTIVE ARCHITECTURE BUILDER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            Configure Your <span className="text-brand-gradient">Enterprise Solution</span>
          </h2>

          <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg transition-colors">
            Design your bespoke stack in seconds. Get instant architectural blueprints, expected throughput targets, and deployment timelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Config Controls */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Workload Selection */}
            <div>
              <div className="flex items-center gap-2 text-sm font-mono text-slate-900 dark:text-white font-bold mb-3 transition-colors">
                <span className="w-5 h-5 rounded-full bg-[#E5252A] text-white flex items-center justify-center text-xs">
                  1
                </span>
                <span>Select Primary Workload</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {workloads.map((wl) => {
                  const Icon = wl.icon;
                  const isSel = selectedWorkload === wl.id;
                  return (
                    <button
                      key={wl.id}
                      onClick={() => setSelectedWorkload(wl.id)}
                      className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                        isSel
                          ? 'bg-white dark:bg-neutral-900 border-[#E5252A] shadow-md shadow-[#E5252A]/15 ring-1 ring-[#E5252A]'
                          : 'bg-slate-50 dark:bg-neutral-950/70 hover:bg-white dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Icon className={`w-5 h-5 ${isSel ? 'text-[#E5252A]' : 'text-slate-500 dark:text-neutral-400'}`} />
                          {isSel && <Check className="w-4 h-4 text-[#E5252A]" />}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 transition-colors">{wl.name}</h4>
                        <p className="text-xs text-slate-600 dark:text-neutral-400 leading-normal transition-colors">{wl.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scale */}
            <div>
              <div className="flex items-center gap-2 text-sm font-mono text-slate-900 dark:text-white font-bold mb-3 transition-colors">
                <span className="w-5 h-5 rounded-full bg-[#E5252A] text-white flex items-center justify-center text-xs">
                  2
                </span>
                <span>Choose Deployment Scale</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {scales.map((sc) => {
                  const isSel = selectedScale === sc.id;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => setSelectedScale(sc.id)}
                      className={`p-3.5 rounded-xl text-center border transition-all ${
                        isSel
                          ? 'bg-white dark:bg-neutral-900 border-[#E5252A] shadow-md shadow-[#E5252A]/10 ring-1 ring-[#E5252A]'
                          : 'bg-slate-50 dark:bg-neutral-950 hover:bg-white dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900 dark:text-white mb-1 transition-colors">{sc.label}</div>
                      <div className="text-[11px] font-mono text-[#E5252A] font-semibold">{sc.nodes}</div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-500 mt-1">Est: {sc.time}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Hardware Architecture */}
            <div>
              <div className="flex items-center gap-2 text-sm font-mono text-slate-900 dark:text-white font-bold mb-3 transition-colors">
                <span className="w-5 h-5 rounded-full bg-[#E5252A] text-white flex items-center justify-center text-xs">
                  3
                </span>
                <span>Silicon & Infrastructure Acceleration</span>
              </div>
              <div className="space-y-2.5">
                {hardwareOptions.map((hw) => {
                  const isSel = selectedHardware === hw.id;
                  return (
                    <button
                      key={hw.id}
                      onClick={() => setSelectedHardware(hw.id)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSel
                          ? 'bg-white dark:bg-neutral-900 border-[#E5252A] ring-1 ring-[#E5252A]'
                          : 'bg-slate-50 dark:bg-neutral-950 hover:bg-white dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSel ? 'border-[#E5252A] bg-[#E5252A]' : 'border-slate-400 dark:border-neutral-600'
                          }`}
                        >
                          {isSel && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white transition-colors">{hw.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-700 dark:text-neutral-400 bg-slate-200/80 dark:bg-neutral-800 px-2 py-0.5 rounded font-medium">
                        {hw.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: SLA & Security */}
            <div>
              <div className="flex items-center gap-2 text-sm font-mono text-slate-900 dark:text-white font-bold mb-3 transition-colors">
                <span className="w-5 h-5 rounded-full bg-[#E5252A] text-white flex items-center justify-center text-xs">
                  4
                </span>
                <span>SLA & Operational Security Tier</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {slaTiers.map((tier) => {
                  const isSel = selectedSla === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedSla(tier.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSel
                          ? 'bg-white dark:bg-neutral-900 border-[#E5252A] ring-1 ring-[#E5252A]'
                          : 'bg-slate-50 dark:bg-neutral-950 hover:bg-white dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900 dark:text-white mb-1 transition-colors">{tier.label}</div>
                      <div className="text-[10px] text-slate-600 dark:text-neutral-400 leading-tight transition-colors">{tier.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Summary & Blueprint Console */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl dark:shadow-2xl space-y-6 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white transition-colors">
                    Generated System Blueprint
                  </h3>
                  <p className="font-mono text-xs text-slate-500 dark:text-neutral-400">Spec Version: 2026.4-LTS</p>
                </div>
                <div className="p-2 rounded-xl bg-red-50 dark:bg-[#E5252A]/10 border border-red-200 dark:border-[#E5252A]/30 text-[#E5252A]">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Spec Performance Matrix */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 bg-white dark:bg-neutral-900/80 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-sm transition-colors">
                  <div className="text-slate-500 dark:text-neutral-400 text-[11px]">Estimated Latency</div>
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {currentWorkload.latency}
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-neutral-900/80 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-sm transition-colors">
                  <div className="text-slate-500 dark:text-neutral-400 text-[11px]">System Throughput</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5 transition-colors">
                    {currentWorkload.throughput}
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-neutral-900/80 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-sm transition-colors">
                  <div className="text-slate-500 dark:text-neutral-400 text-[11px]">Cluster Scale</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5 transition-colors">{currentScale.nodes}</div>
                </div>
                <div className="p-3 bg-white dark:bg-neutral-900/80 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-sm transition-colors">
                  <div className="text-slate-500 dark:text-neutral-400 text-[11px]">Deployment Target</div>
                  <div className="text-base font-bold text-[#E5252A] mt-0.5">
                    {currentScale.time}
                  </div>
                </div>
              </div>

              {/* Structured Configuration Manifest */}
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 text-xs font-mono space-y-2 shadow-sm transition-colors">
                <div className="text-slate-500 dark:text-neutral-400 text-[11px] uppercase tracking-wider font-semibold">
                  Active Configuration Manifest:
                </div>
                <div className="text-slate-800 dark:text-neutral-200">
                  <span className="text-slate-400 dark:text-neutral-500">Module:</span> {currentWorkload.name}
                </div>
                <div className="text-slate-800 dark:text-neutral-200">
                  <span className="text-slate-400 dark:text-neutral-500">Hardware:</span> {currentHw.label}
                </div>
                <div className="text-slate-800 dark:text-neutral-200">
                  <span className="text-slate-400 dark:text-neutral-500">SLA:</span> {currentSla.label}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleExport}
                  className="w-full py-3.5 rounded-xl bg-[#E5252A] hover:bg-[#d01e23] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E5252A]/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Custom Proposal with this Spec</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-neutral-700/80 font-mono text-xs transition-all flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-slate-500 dark:text-neutral-400" />
                      <span>Copy Architecture Spec</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center font-mono text-[11px] text-slate-500 dark:text-neutral-500">
                Direct phone support: <strong className="text-slate-800 dark:text-neutral-300">+1-800-123-4567</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
