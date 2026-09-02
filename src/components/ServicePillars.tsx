import React, { useState } from 'react';
import {
  BrainCircuit,
  MonitorCheck,
  Server,
  Network,
  Palette,
  ShieldAlert,
  Bot,
  FolderKanban,
  CheckCircle2,
  ArrowRight,
  Code,
  Layers,
  ShieldCheck,
  Zap,
  Globe2,
  Database,
  Cpu,
  Smartphone,
  Workflow,
  Wrench,
  GitBranch,
  PenTool,
  Sparkles,
  Lock,
  Cog,
  Target,
} from 'lucide-react';

interface ServicePillarsProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicePillars: React.FC<ServicePillarsProps> = ({ onSelectService }) => {
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  const pillars = [
    {
      id: 'ai-ml',
      title: 'AI & ML Solutions',
      icon: BrainCircuit,
      category: 'COGNITIVE INTELLIGENCE',
      tagline: 'Sovereign Neural Architectures & Autonomous Agent Systems',
      description:
        'Transform complex enterprise operations with custom-trained machine learning models, low-latency vision systems, and private agentic workflows designed to scale safely.',
      features: [
        'Custom Large Language Model (LLM) Fine-Tuning & Quantization',
        'Computer Vision & Real-time Edge Object Detection',
        'Autonomous Multi-Agent Orchestration & Workflow Automation',
        'Predictive Analytics & Real-Time Cognitive Data Intelligence',
        'Retrieval-Augmented Generation (RAG) on Private Enterprise Data',
        'Multi-Modal Voice, Vision, and Sensor Integration',
      ],
      metrics: [
        { label: 'Inference Speed', value: '1.2ms TTFT' },
        { label: 'Model Accuracy', value: '99.85%' },
        { label: 'Data Privacy', value: '100% Air-Gapped' },
      ],
      ctaText: 'Deploy AI Architecture',
      codeSnippet: `// Freizy Neural Core Agent Execution
import { FreizyNeuralMesh } from '@freizy/ai-core';

const cluster = new FreizyNeuralMesh({
  model: 'freizy-neural-70b-fp8',
  acceleration: 'tensor-gpu-matrix',
  deterministic: true,
  zeroDataRetention: true
});

const result = await cluster.infer({
  prompt: 'Analyze enterprise telemetry for anomalies',
  context: privateEnterpriseVectors,
  maxLatencyMs: 5
});`,
    },
    {
      id: 'software',
      title: 'Software Development',
      icon: MonitorCheck,
      category: 'FROM CONCEPT TO CODE',
      tagline: 'From Concept to Code, We Bring Your Ideas to Life',
      description:
        'End-to-end full-stack software engineering crafted with modern frameworks, ironclad security, high-velocity CI/CD pipelines, and human-centric design.',
      features: [
        'Custom Software Solutions & High-Concurrency Backends',
        'Web and Mobile App Development (iOS, Android, React Native, Next.js)',
        'UI/UX Design Systems, Prototyping & Rigorous Usability Testing',
        'API & Complex Enterprise System Integration',
        'Enterprise Resource Planning (ERP) & CRM Systems',
        'DevOps & Automated Continuous Deployment (CI/CD)',
        '24/7 Maintenance, SLA Management & Managed Services',
      ],
      metrics: [
        { label: 'Code Test Coverage', value: '99.4%' },
        { label: 'Release Cadence', value: 'Continuous / Zero-Downtime' },
        { label: 'Response Target', value: '< 20ms Global' },
      ],
      ctaText: 'Build Custom Software',
      codeSnippet: `// Freizy High-Throughput Microservice
import { EnterpriseGateway, RateLimiter } from '@freizy/services';

export const APIService = EnterpriseGateway.create({
  security: 'zero-trust-oauth',
  loadBalancing: 'geographic-round-robin',
  resilience: { circuitBreaker: true, retries: 3 }
});

APIService.route('/v1/transactions', async (req) => {
  return await APIService.processSync(req.payload);
});`,
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      icon: ShieldAlert,
      category: 'DEFENSIVE & OFFENSIVE ASSURANCE',
      tagline: 'Zero-Trust Architecture, Threat Intelligence & Automated Defense',
      description:
        'Fortify your digital and physical perimeter with enterprise-grade threat modeling, real-time AI anomaly detection, penetration testing, compliance certification, and automated SOC response.',
      features: [
        'Zero-Trust Network Architecture (ZTNA) & Identity Governance',
        'Penetration Testing, Red Teaming & Vulnerability Assessments',
        'AI-Driven Endpoint Detection & Autonomous Threat Neutralization (EDR/XDR)',
        'SOC 2 Type II, ISO 27001, HIPAA & NIST Regulatory Compliance',
        'Hardware-Rooted Cryptography & Post-Quantum Encryption Keys',
        '24/7 Automated Security Operations Center (SOC) & Incident Response',
      ],
      metrics: [
        { label: 'Threat Neutralization', value: '99.999%' },
        { label: 'Mean Time to Detect (MTTD)', value: '< 10 Seconds' },
        { label: 'Compliance Readiness', value: '100% Audit-Verified' },
      ],
      ctaText: 'Secure Your Infrastructure',
      codeSnippet: `// Freizy Zero-Trust Security Sentinel & Policy Guard
import { SecuritySentinel, PolicyEnforcer } from '@freizy/cyber-defense';

export const shield = new SecuritySentinel({
  mode: 'zero-trust-continuous-auth',
  cryptography: 'post-quantum-kyber768',
  threatFeed: 'real-time-global-telemetry'
});

shield.onAnomalyDetected(async (event) => {
  await shield.quarantineVector({
    sourceIp: event.origin,
    isolateLayer: 'micro-segmentation',
    alertSOC: true
  });
});`,
    },
    {
      id: 'robotics',
      title: 'Robotics & Autonomous Systems',
      icon: Bot,
      category: 'AUTONOMOUS KINEMATICS',
      tagline: 'Industrial Automation, Real-time Sensor Fusion & ROS 2 Control',
      description:
        'Engineering intelligent robotic systems, autonomous mobile robots (AMRs), industrial arm controllers, and high-frequency sensor fusion engines engineered for smart factories and precision automation.',
      features: [
        'Autonomous Mobile Robot (AMR) Navigation & Fleet Orchestration',
        'ROS 2 (Robot Operating System) Real-Time Architecture & Custom Nodes',
        'Multi-Sensor Fusion (LiDAR, 3D Depth Cameras, Radar, IMU & Spatial Telemetry)',
        'Simultaneous Localization & Mapping (SLAM) in Dynamic Environments',
        'Embedded Edge Motor Controllers & High-Speed Kinematics Algorithms',
        'Digital Twin Simulation & Synthetic Training Environments in Omniverse',
      ],
      metrics: [
        { label: 'Sensor Fusion Latency', value: '< 0.8ms' },
        { label: 'Navigation Precision', value: '± 1.5mm Sub-Centimeter' },
        { label: 'Real-Time Telemetry', value: '1,000 Hz' },
      ],
      ctaText: 'Deploy Autonomous Robotics',
      codeSnippet: `// Freizy Real-Time ROS 2 Navigation & Kinematics Engine
import { RoboticMeshNode, SpatialSLAM } from '@freizy/robotics-core';

export class AutonomousArmController extends RoboticMeshNode {
  async executeTrajectory(targetPose: Pose3D) {
    const obstacleMap = await SpatialSLAM.getRealtimeDepthGrid();
    const optimalPath = this.computeKinematics(targetPose, obstacleMap);
    
    return await this.actuators.streamTorqueVectors(optimalPath, {
      frequencyHz: 1000,
      safetyEStopEnabled: true
    });
  }
}`,
    },
    {
      id: 'hardware',
      title: 'Hardware Solutions',
      icon: Server,
      category: 'PHYSICAL INFRASTRUCTURE',
      tagline: 'High-Density GPU Clusters & Edge Silicon Acceleration',
      description:
        'Engineered hardware infrastructure designed specifically for compute-intensive AI training, edge inferencing, and mission-critical telemetry capture.',
      features: [
        'High-Performance GPU Training & Inference Clusters',
        'Custom Edge Computing Units & Ruggedized Field Nodes',
        'Enterprise Server Racks with Advanced Liquid Thermal Cooling',
        'IoT Sensor Gateways & Real-Time Embedded Microcontrollers',
        'High-Bandwidth NVLink & Optical Bus Architecture',
        'Hardware Security Modules (HSM) & Physical Cryptographic Seals',
      ],
      metrics: [
        { label: 'Compute Density', value: '1,024 TFLOPS/U' },
        { label: 'Thermal Efficiency', value: 'PUE 1.08' },
        { label: 'Hardware SLA', value: '99.999% Redundant' },
      ],
      ctaText: 'Provision Hardware',
      codeSnippet: `// Hardware Telemetry & Cluster Orchestration
{
  "rack_id": "FREIZY-MATRIX-04",
  "cooling_state": "Liquid-Submerged-Active",
  "thermal_celsius": 41.2,
  "memory_bandwidth_tb_s": 3.35,
  "gpu_utilization_percent": 98.6,
  "power_efficiency_pue": 1.08
}`,
    },
    {
      id: 'network',
      title: 'Network Services',
      icon: Network,
      category: 'GLOBAL CONNECTIVITY',
      tagline: 'Zero-Trust Enterprise Mesh & Ultra-Low Latency Backbones',
      description:
        'Deterministic network connectivity engineered for global enterprises requiring uninterrupted uptime, impenetrable encryption, and microsecond packet routing.',
      features: [
        'Enterprise Zero-Trust Network Architecture (ZTNA)',
        'Ultra-Low Latency Global Fiber & Optical Interconnects',
        'Software-Defined Wide Area Networking (SD-WAN)',
        'Multi-Cloud Dynamic Interconnects (AWS, GCP, Azure, Bare-Metal)',
        'DDoS Mitigation Shield with 2.5 Tbps Scrubbing Capacity',
        '24/7 Automated Network Operations Center (NOC) Monitoring',
      ],
      metrics: [
        { label: 'Global Backbone', value: '800+ Gbps' },
        { label: 'Packet Loss', value: '0.0000%' },
        { label: 'DDoS Mitigation', value: '< 1 Second Instant Scrub' },
      ],
      ctaText: 'Deploy Network Mesh',
      codeSnippet: `// Zero-Trust Mesh Topology Config
mesh_network "global_enterprise" {
  encryption = "wireguard-cha-cha20-poly1305"
  routing_algorithm = "deterministic-shortest-path"
  failover_latency_ms = 0.4
  ddos_protection = "unconditional-scrub-layer"
  compliance = ["SOC2-Type2", "ISO-27001", "HIPAA"]
}`,
    },
    {
      id: 'project-management',
      title: 'Project Management',
      icon: FolderKanban,
      category: 'ENTERPRISE GOVERNANCE & DELIVERY',
      tagline: 'Agile Governance, Systems Architecture Roadmaps & SLA Assurance',
      description:
        'Providing strategic technical project governance, certified Scrum/SAFe frameworks, risk mitigation, and milestone delivery for complex multi-vendor engineering initiatives.',
      features: [
        'Agile, Scrum & Scaled Agile (SAFe) Governance for Tech Transformation',
        'End-to-End Systems Engineering Roadmaps & Architecture Milestones',
        'Comprehensive Risk Assessment, Quality Assurance & Security Gateways',
        'Cross-Functional Engineering Team Leadership & Vendor Oversight',
        'Budget Allocation, Resource Optimization & Velocity Tracking',
        'Post-Launch Operations Handover, SRE Governance & SLA Maintenance',
      ],
      metrics: [
        { label: 'On-Time Delivery', value: '98.8%' },
        { label: 'Budget Variance', value: '< 1.2%' },
        { label: 'Velocity Multiplier', value: '1.45x Sprint Yield' },
      ],
      ctaText: 'Consult on Project Delivery',
      codeSnippet: `// Freizy Enterprise Program Governance Metric & Gate Keeper
import { DeliveryGovernance, SprintEngine } from '@freizy/management-core';

export const techInitiative = new DeliveryGovernance({
  methodology: 'Scaled-Agile-Enterprise-v4',
  qualityGates: ['Security-Audited', 'Test-Coverage-99', 'Performance-SLA-Locked'],
  budgetTracking: 'real-time-variance-analyzer'
});

techInitiative.evaluateMilestone('Phase-2-Global-Deployment', {
  requireZeroP0Bugs: true,
  signoffRequired: ['Chief-Architect', 'Security-Officer', 'Lead-PM']
});`,
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      icon: Palette,
      category: 'VISUAL IDENTITY & MEDIA',
      tagline: 'High-Impact Brand Systems, Print Media & Digital Creatives',
      description:
        'Crafting bespoke brand identities, precision vector logos, marketing collateral, pitch decks, print flyers, social media assets, and digital design systems that command attention and elevate market presence.',
      features: [
        'Corporate Brand Identity, Logo Systems & Brand Guidelines',
        'High-Resolution Marketing Collateral, Posters & Print Flyers (CMYK/300DPI)',
        'UI/UX Design Systems, Wireframing & Interactive Prototypes',
        'Custom Vector Illustration, Iconography & Infographics',
        '3D Product Visualizations, Motion Graphics & Visual Assets',
        'Digital Ad Creatives, Social Media Brand Kits & Pitch Decks',
        'Print Production Ready Vector Assets & Packaging Design',
      ],
      metrics: [
        { label: 'Vector Precision', value: 'Infinite Lossless' },
        { label: 'Print Standard', value: 'CMYK / 300+ DPI' },
        { label: 'Brand Consistency', value: '100% Guideline Locked' },
      ],
      ctaText: 'Commission Creative Design',
      codeSnippet: `// Freizy Creative Studio Brand Spec
{
  "brand_system": "Freizy-Precision-Identity-v3",
  "vector_precision": "Infinite-Lossless-Curvature",
  "palette": {
    "crimson_primary": "#E5252A",
    "pure_obsidian": "#000000",
    "pure_canvas": "#FFFFFF",
    "accent_energy": "#FF3B40"
  },
  "typography": ["Michroma", "Orbitron", "Space Grotesk", "Plus Jakarta Sans"],
  "deliverables": [
    "Logo Systems & Vector Glyphs",
    "Print Collateral & Flyers (CMYK 300DPI)",
    "UI/UX Design Systems & Figma Tokens",
    "3D Product Visualizations & Motion FX",
    "Pitch Decks & Marketing Ad Kits"
  ],
  "export_pipeline": ["SVG", "PDF/X-1a", "PNG-Transparent-8K", "Figma"]
}`,
    },
  ];

  const currentPillar = pillars[selectedPillar];

  return (
    <section id="services" className="py-24 relative bg-slate-50 dark:bg-[#08090d] border-t border-slate-200 dark:border-neutral-800/80 transition-colors">
      {/* Background radial accent */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#E5252A]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-neutral-900 border border-red-200 dark:border-neutral-800 text-xs font-mono uppercase tracking-widest text-[#E5252A] mb-3 font-semibold">
            <span>CORE CAPABILITIES & SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            Core Pillars of <span className="text-brand-gradient">Technological & Creative Excellence</span>
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg transition-colors">
            Directly integrating intelligent AI models, robust software suites, zero-trust cybersecurity, autonomous robotics, sovereign hardware, deterministic networking, agile project governance, and high-impact graphic design.
          </p>
        </div>

        {/* 8 Pillars Interactive Tab Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 mb-10">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === idx;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 relative border flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-white dark:bg-neutral-900 border-[#E5252A] shadow-xl shadow-[#E5252A]/10 scale-[1.02]'
                    : 'bg-white/80 dark:bg-neutral-950/70 hover:bg-white dark:hover:bg-neutral-900/60 border-slate-200 dark:border-neutral-800/80 hover:border-slate-300 dark:hover:border-neutral-700 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div
                      className={`p-2.5 rounded-xl transition-colors ${
                        isSelected
                          ? 'bg-[#E5252A] text-white shadow-md shadow-[#E5252A]/30'
                          : 'bg-red-50 dark:bg-neutral-800 text-[#E5252A] dark:text-neutral-400 group-hover:text-[#E5252A] dark:group-hover:text-white border border-red-100 dark:border-transparent'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 dark:text-neutral-500 font-bold tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-1 transition-colors leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono line-clamp-1">
                    {pillar.category}
                  </p>
                </div>

                {isSelected && (
                  <div className="w-full h-1 bg-[#E5252A] rounded-full mt-3.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Pillar Deep-Dive Display Card */}
        <div className="rounded-3xl bg-white dark:bg-neutral-950/90 border border-slate-200 dark:border-neutral-800/90 p-6 sm:p-10 shadow-xl dark:shadow-2xl backdrop-blur-xl relative overflow-hidden transition-colors">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5252A]/5 dark:bg-[#E5252A]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
            {/* Left: Pillar Overview & Features Checklist */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 dark:bg-[#E5252A]/15 text-[#E5252A] border border-red-200 dark:border-[#E5252A]/30 font-mono text-xs font-semibold mb-3">
                  {currentPillar.category}
                </div>
                <h3 className="text-2xl sm:text-4xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-2 transition-colors">
                  {currentPillar.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed font-normal transition-colors">
                  {currentPillar.description}
                </p>
              </div>

              {/* Verified Features list from Flyer */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-semibold">
                  Key Deliverables & Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentPillar.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/70 border border-slate-200 dark:border-neutral-800/80 text-xs text-slate-800 dark:text-neutral-200 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#E5252A] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-200 dark:border-neutral-800/80">
                {currentPillar.metrics.map((m, i) => (
                  <div key={i} className="p-3 bg-slate-50 dark:bg-neutral-900/40 rounded-xl border border-slate-200 dark:border-neutral-800 transition-colors">
                    <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">{m.label}</div>
                    <div className="text-sm sm:text-base font-bold font-heading text-slate-900 dark:text-white mt-0.5 transition-colors">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onSelectService(currentPillar.title)}
                  className="px-6 py-3 rounded-xl bg-[#E5252A] hover:bg-[#d01e23] text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#E5252A]/20"
                >
                  <span>{currentPillar.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Technical Blueprint / Code / Schema Inspector */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="rounded-2xl bg-slate-900 dark:bg-[#0d0f14] border border-slate-800 dark:border-neutral-800 p-4 shadow-xl font-mono text-xs overflow-hidden text-neutral-100">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-neutral-400 text-[11px]">
                  <div className="flex items-center gap-2">
                    <Code className="w-3.5 h-3.5 text-[#E5252A]" />
                    <span>technical-spec.config</span>
                  </div>
                  <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    VERIFIED COMPILED
                  </span>
                </div>

                <pre className="mt-3 text-neutral-300 overflow-x-auto text-[11px] leading-relaxed p-2 bg-neutral-950/60 rounded-lg border border-neutral-800/60">
                  <code>{currentPillar.codeSnippet}</code>
                </pre>
              </div>

              {/* Enterprise Guarantee Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 flex items-center gap-3.5 transition-colors">
                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-[#E5252A]/10 border border-red-200 dark:border-[#E5252A]/30 text-[#E5252A]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white transition-colors">Freizy Enterprise Assurance</div>
                  <div className="text-[11px] text-slate-600 dark:text-neutral-400 transition-colors">
                    SOC2 Type II, ISO 27001, and 24/7 dedicated engineering response SLA.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

