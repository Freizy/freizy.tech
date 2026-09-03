import React, { useState } from 'react';
import { TiltCard3D } from './TiltCard3D';
import {
  Layers,
  Activity,
  Car,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  BarChart3,
  HeartPulse,
  Gauge,
  FileCheck2,
  Users,
  Clock,
  ChevronRight,
  Database,
  Lock,
  Stethoscope,
  Key,
  Flame,
  AlertTriangle,
  Play,
  RotateCcw,
} from 'lucide-react';

interface ProductsShowcaseProps {
  onOpenConsultation: (productName?: string) => void;
}

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({
  onOpenConsultation,
}) => {
  const [activeProductId, setActiveProductId] = useState<'omnia' | 'lavida' | 'ksm'>('omnia');
  
  // Interactive states for Omnia ERP
  const [omniaModule, setOmniaModule] = useState<'finance' | 'supply' | 'operations'>('finance');
  
  // Interactive states for Lavida Health Buddy Triage Simulator
  const [selectedSymptomCase, setSelectedSymptomCase] = useState<number>(0);
  const [isTriaging, setIsTriaging] = useState(false);

  // Interactive states for KSM Autos Garage
  const [selectedVehicle, setSelectedVehicle] = useState<number>(0);

  const symptomScenarios = [
    {
      title: 'Persistent Migraine with Visual Aura',
      duration: '4 Days',
      ageGroup: 'Adult (32 y/o)',
      urgency: 'Medium - Outpatient Evaluation',
      urgencyColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
      differential: [
        { condition: 'Migraine with Typical Aura (ICD-10 G43.109)', confidence: '89.4%' },
        { condition: 'Tension-Type Cephalea', confidence: '7.8%' },
        { condition: 'Cluster Episode Variant', confidence: '2.8%' },
      ],
      triageProtocol: 'Recommend neurological consult within 48h. Prescribe abortive protocol review. Red-flag alert for acute thunderclap onset.',
    },
    {
      title: 'Acute Sub-Sternal Chest Tightness & Dyspnea',
      duration: '45 Minutes',
      ageGroup: 'Adult (56 y/o)',
      urgency: 'CRITICAL - IMMEDIATE EMERGENCY (ED)',
      urgencyColor: 'text-red-500 bg-red-500/10 border-red-500/30',
      differential: [
        { condition: 'Acute Coronary Syndrome / STEMI Candidate', confidence: '94.2%' },
        { condition: 'Acute Pulmonary Embolism', confidence: '4.1%' },
        { condition: 'Gastroesophageal Spasm Reflux', confidence: '1.7%' },
      ],
      triageProtocol: 'AUTOMATIC EMERGENCY ESCALATION: Advise immediate 911 dispatch. Keep patient seated, administer 324mg chewable Aspirin if non-allergic.',
    },
    {
      title: 'Low-Grade Pediatric Pyrexia with Rash',
      duration: '36 Hours',
      ageGroup: 'Pediatric (4 y/o)',
      urgency: 'Low - Pediatrician Telehealth',
      urgencyColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      differential: [
        { condition: 'Viral Exanthem (Roseola Infantum)', confidence: '91.0%' },
        { condition: 'Contact Dermatitis with Mild Viral Co-infection', confidence: '6.5%' },
        { condition: 'Streptococcal Pharyngitis / Scarletiform', confidence: '2.5%' },
      ],
      triageProtocol: 'Hydration maintenance, monitor capillary refill and temperature. Book asynchronous pediatric video review within 12 hours.',
    },
  ];

  const exoticVehicles = [
    {
      model: 'Porsche 911 GT3 RS (992)',
      vin: 'WP0ZZZ99ZNS29****',
      chassisStatus: 'Track Calibrated',
      engineHealth: '99.8%',
      oilTemp: '93°C / Nominal',
      brakeWear: 'Carbon-Ceramic: 11% Used',
      nextService: 'Bespoke Track Inspection in 420 km',
      telemetry: {
        power: '518 HP',
        torque: '465 Nm',
        downforce: '860 kg @ 285 km/h',
        lastDyno: '4.0L Flat-Six Pure Atmo',
      },
    },
    {
      model: 'Ferrari SF90 Stradale Assetto Fiorano',
      vin: 'ZFF94NHT5N028****',
      chassisStatus: 'Hybrid Hyper-Drive Active',
      engineHealth: '100%',
      oilTemp: '89°C / Nominal',
      brakeWear: 'Brembo CCM-R: 6% Used',
      nextService: 'Annual Concierge Service in 1,850 km',
      telemetry: {
        power: '986 HP (Twin-Turbo V8 + 3 e-Motors)',
        torque: '800 Nm',
        acceleration: '0-100 km/h in 2.5s',
        batteryHealth: '98.5% State of Health',
      },
    },
    {
      model: 'Rolls-Royce Spectre Black Badge Edition',
      vin: 'SCA66D403PU01****',
      chassisStatus: 'Planar Suspension Optimized',
      engineHealth: '100% Dual Motor EV',
      oilTemp: 'N/A (Liquid Coolant 32°C)',
      brakeWear: 'Regen Matrix: 2% Used',
      nextService: 'White-Glove Valet Detail in 3,200 km',
      telemetry: {
        power: '577 HP / 900 Nm Instantaneous',
        range: '520 km WLTP',
        cabinAcoustics: '0.04 dBA Isolation',
        conciergeTransport: 'Enclosed Climate-Controlled Trailer',
      },
    },
  ];

  const handleRunTriage = (idx: number) => {
    setIsTriaging(true);
    setSelectedSymptomCase(idx);
    setTimeout(() => {
      setIsTriaging(false);
    }, 450);
  };

  const products = [
    {
      id: 'omnia' as const,
      name: 'Freizy Omnia Suite',
      category: 'ENTERPRISE ERP & INTELLIGENT WORKFLOW ENGINE',
      badge: 'Flagship Enterprise Suite',
      badgeColor: 'text-[#E5252A] bg-red-500/10 border-red-500/20',
      icon: Layers,
      tagline: 'Autonomous Multi-Entity ERP, Supply Chain Forecasting & Financial Operations',
      overview:
        'A next-generation enterprise resource planning ecosystem engineered to unify disparate global accounting, complex bill-of-materials supply chains, automated vendor reconciliation, and real-time executive BI into a single, lightning-fast pane of glass.',
      keyCapabilities: [
        'Multi-currency GL, Treasury, and Automated 3-Way Invoice Matching',
        'Predictive AI Demand Planning & Dynamic Safety Stock Optimization',
        'End-to-End Manufacturing Execution (MES) with IoT Silicon Telemetry',
        'SOC 2 Type II, SOX Compliance & Tamper-Proof Audit Trails',
        'Microservices-based REST/GraphQL APIs with sub-50ms query latency',
        'Real-time Executive BI Cockpit with Automated Board-Ready Reporting',
      ],
      metrics: [
        { label: 'Reconciliation Velocity', value: '10x Faster' },
        { label: 'Supply Lead-Time Loss', value: '-38%' },
        { label: 'Invoice Auto-Match SLA', value: '99.4%' },
      ],
    },
    {
      id: 'lavida' as const,
      name: 'Lavida Health Buddy',
      category: 'AI CLINICAL SYMPTOM ASSESSMENT & TRIAGE TOOL',
      badge: 'HIPAA & Medical AI Ready',
      badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      icon: HeartPulse,
      tagline: 'Clinically Grounded AI Triage, Differential Guidance & Emergency Escalation',
      overview:
        'An intelligent, patient-centric symptom assessment engine powered by validated clinical decision-support models. Lavida Health Buddy guides users through structured medical anamnesis, detects life-threatening red flags instantly, and connects directly to telehealth queues and EHRs.',
      keyCapabilities: [
        'Multi-Turn Adaptive Anamnesis with Voice & Natural Language Understanding',
        'Probabilistic Differential Diagnosis Ranking mapped to ICD-10 & SNOMED CT',
        'Instant Emergency Red-Flag Triggering with 911/EMS Dispatch Geolocation',
        'Zero-Knowledge Encrypted Patient Vault meeting HIPAA & GDPR standards',
        'Bidirectional FHIR / HL7 v2 Interoperability with Hospital EHR Systems',
        'Automated Clinician SBAR Handover Summaries for Expedited Encounters',
      ],
      metrics: [
        { label: 'Triage Accuracy', value: '96.8%' },
        { label: 'Wait-Time Reduction', value: '-65%' },
        { label: 'Red-Flag Detection', value: '< 1.2s' },
      ],
    },
    {
      id: 'ksm' as const,
      name: 'KSM Autos',
      category: 'ONLINE GARAGE & CONCIERGE FOR LUXURY CARS',
      badge: 'Luxury Automotive Concierge',
      badgeColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      icon: Car,
      tagline: 'Digital Twin Telemetry, Concierge Maintenance & High-Performance Garage',
      overview:
        'A bespoke digital garage and concierge platform designed for collectors, luxury sports car enthusiasts, and performance motorsport owners. Features live OBD-II vehicle telemetry, certified supercar maintenance scheduling, track-prep telemetry, and cryptographic provenance verification.',
      keyCapabilities: [
        'Live OBD-II / CAN-Bus IoT Telemetry Streaming (Brake, Oil, Dyno, Boost)',
        'White-Glove Concierge Maintenance Booking & Enclosed Logistics Transport',
        'Cryptographic Vehicle Provenance Ledger for Unalterable Service History',
        '3D Interactive Vehicle Twin & Performance Upgrade Visualizer',
        'Real-Time Track-Day Telemetry Logger & Lap-Time Comparison Suite',
        'VIP Collector Marketplace & Verified Rare Exotic Inventory Management',
      ],
      metrics: [
        { label: 'Supercars Managed', value: '1,200+' },
        { label: 'Telemetry Precision', value: '100 Hz CAN' },
        { label: 'Concierge SLA', value: '< 30 Min Response' },
      ],
    },
  ];

  const currentProduct = products.find((p) => p.id === activeProductId) || products[0];

  return (
    <section id="products" className="py-20 sm:py-24 relative overflow-hidden bg-slate-50/70 dark:bg-black/40 border-b border-slate-200/80 dark:border-neutral-900">
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#E5252A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5252A]/10 border border-[#E5252A]/20 text-[#E5252A] text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FLAGSHIP PRODUCT ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-slate-900 dark:text-white mb-4">
            Purpose-Built <span className="text-brand-gradient">Enterprise Software Products</span>
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
            Engineered, deployed, and continuously maintained by Freizy Technologies. Explore our signature platforms transforming enterprise operations, clinical healthcare triage, and luxury automotive asset management.
          </p>
        </div>

        {/* 3 Top Products Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {products.map((product) => {
            const Icon = product.icon;
            const isSelected = activeProductId === product.id;

            return (
              <TiltCard3D key={product.id} intensity={10} elevation={16}>
                <button
                  onClick={() => setActiveProductId(product.id)}
                  className={`w-full h-full p-6 rounded-2xl text-left transition-all duration-300 relative border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white dark:bg-neutral-900/90 border-[#E5252A] shadow-xl shadow-red-500/10 ring-2 ring-[#E5252A]/30'
                      : 'bg-white/80 dark:bg-neutral-900/40 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-900/70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl transition-colors ${
                          isSelected
                            ? 'bg-[#E5252A] text-white shadow-md shadow-red-500/20'
                            : 'bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${product.badgeColor}`}>
                        {product.badge}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                      {product.category}
                    </div>
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-neutral-800/80 text-xs font-medium">
                    <span className={isSelected ? 'text-[#E5252A] font-semibold' : 'text-slate-500 dark:text-neutral-400'}>
                      {isSelected ? 'Currently Viewing' : 'Explore Interactive Preview'}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-[#E5252A]' : 'text-slate-400'}`} />
                  </div>
                </button>
              </TiltCard3D>
            );
          })}
        </div>

        {/* Detailed Interactive Showcase Display */}
        <div className="rounded-3xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/80 backdrop-blur-xl shadow-2xl p-6 sm:p-8 lg:p-10 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Product Specifications & Capabilities */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono border mb-3 bg-slate-100 dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300">
                  <currentProduct.icon className="w-3.5 h-3.5 text-[#E5252A]" />
                  <span>{currentProduct.category}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                  {currentProduct.name}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                  {currentProduct.overview}
                </p>
              </div>

              {/* Key Features Matrix */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                  Architectural Capabilities
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {currentProduct.keyCapabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-[#E5252A] shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Live Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {currentProduct.metrics.map((metric, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900/80 border border-slate-200/80 dark:border-neutral-800 text-center">
                    <div className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white">
                      {metric.value}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => onOpenConsultation(currentProduct.name)}
                  className="px-6 py-3 rounded-xl bg-[#E5252A] hover:bg-[#c91d22] text-white font-medium text-sm transition-all duration-200 flex items-center gap-2 shadow-lg shadow-red-500/20"
                >
                  <span>Request Live Sandbox Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#contact"
                  className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-neutral-900 hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 text-sm font-medium transition-colors border border-slate-200 dark:border-neutral-800 flex items-center gap-2"
                >
                  <span>Deployment Pricing</span>
                </a>
              </div>
            </div>

            {/* Right Column: High-Fidelity Interactive Product Workstation / UI Simulation */}
            <div className="lg:col-span-7">
              {/* Freizy Omnia Suite Interactive Workstation */}
              {activeProductId === 'omnia' && (
                <div className="rounded-2xl border border-neutral-800 bg-[#0A0C10] p-5 text-white font-mono shadow-2xl space-y-4">
                  {/* Mock Window Header */}
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-xs text-neutral-400 ml-2">Freizy Omnia Suite v4.8 Enterprise</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Cluster: Global-Primary-Active</span>
                    </div>
                  </div>

                  {/* Top Omnia Tabs */}
                  <div className="flex items-center gap-2 border-b border-neutral-800/80 pb-2.5 overflow-x-auto text-xs">
                    <button
                      onClick={() => setOmniaModule('finance')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                        omniaModule === 'finance'
                          ? 'bg-[#E5252A] text-white font-semibold'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>Finance & Treasury</span>
                    </button>
                    <button
                      onClick={() => setOmniaModule('supply')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                        omniaModule === 'supply'
                          ? 'bg-[#E5252A] text-white font-semibold'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Supply Chain & BOM</span>
                    </button>
                    <button
                      onClick={() => setOmniaModule('operations')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                        omniaModule === 'operations'
                          ? 'bg-[#E5252A] text-white font-semibold'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Autonomous MES</span>
                    </button>
                  </div>

                  {/* Dynamic Module Content */}
                  {omniaModule === 'finance' && (
                    <div className="space-y-4 text-xs">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800">
                          <div className="text-neutral-400 text-[11px]">Consolidated Revenue (YTD)</div>
                          <div className="text-lg font-bold text-white mt-1">$14,820,400</div>
                          <div className="text-[10px] text-emerald-400 mt-0.5">↑ +18.4% vs FY Forecast</div>
                        </div>
                        <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800">
                          <div className="text-neutral-400 text-[11px]">Auto-Reconciled Invoices</div>
                          <div className="text-lg font-bold text-emerald-400 mt-1">99.4% (42.8k)</div>
                          <div className="text-[10px] text-neutral-400 mt-0.5">Zero manual intervention</div>
                        </div>
                        <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800">
                          <div className="text-neutral-400 text-[11px]">Audit Integrity Index</div>
                          <div className="text-lg font-bold text-cyan-400 mt-1">100 / 100</div>
                          <div className="text-[10px] text-neutral-400 mt-0.5">SOX & SOC 2 Verifiable</div>
                        </div>
                      </div>

                      {/* Live Ledger Activity Table */}
                      <div className="rounded-xl border border-neutral-800 overflow-hidden bg-neutral-950/60">
                        <div className="px-3 py-2 bg-neutral-900/60 border-b border-neutral-800 text-[11px] font-semibold text-neutral-300 flex justify-between">
                          <span>Live Autonomous Journal Entries</span>
                          <span className="text-[#E5252A]">AI Matcher Engine Active</span>
                        </div>
                        <div className="divide-y divide-neutral-900 text-[11px]">
                          <div className="px-3 py-2 flex items-center justify-between">
                            <span className="text-neutral-300">#TX-9402 EMEA Cross-Border Settlement</span>
                            <span className="text-emerald-400 font-bold">+€480,000.00</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300">Reconciled (12ms)</span>
                          </div>
                          <div className="px-3 py-2 flex items-center justify-between">
                            <span className="text-neutral-300">#TX-9403 North America Vendor AP Auto-Release</span>
                            <span className="text-amber-400 font-bold">-$124,500.00</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300">3-Way PO Matched</span>
                          </div>
                          <div className="px-3 py-2 flex items-center justify-between">
                            <span className="text-neutral-300">#TX-9404 APAC Silicon Component Inbound Batch</span>
                            <span className="text-neutral-400">Inventory Sync</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300">Ledger Posted</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {omniaModule === 'supply' && (
                    <div className="space-y-4 text-xs">
                      <div className="p-4 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-neutral-200">AI Supply Chain Buffer Predictor</span>
                          <span className="text-xs text-[#E5252A]">Monte Carlo Simulation Active</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[11px] text-neutral-400">
                            <span>Global GPU Rack Components (Lead Time: 14 Days)</span>
                            <span className="text-emerald-400 font-bold">Optimal Safety Stock: 1,400 Units</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 w-4/5" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[11px] text-neutral-400">
                            <span>High-Frequency Fiber Optic Transceivers</span>
                            <span className="text-cyan-400 font-bold">Auto-Replenish Triggered</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-3/5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {omniaModule === 'operations' && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 flex items-center justify-between">
                        <div>
                          <div className="text-neutral-400 text-[11px]">Factory Floor OEE Metric</div>
                          <div className="text-xl font-bold text-emerald-400 mt-1">94.8% Overall Efficiency</div>
                        </div>
                        <div className="text-right">
                          <div className="text-neutral-400 text-[11px]">Predictive Downtime</div>
                          <div className="text-sm font-bold text-white">0.00 hrs this quarter</div>
                        </div>
                      </div>
                      <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                        <div className="text-[#E5252A] font-semibold">Autonomous Workflows Summary:</div>
                        <div>• Automated purchase orders generated across 18 authorized tier-1 vendors.</div>
                        <div>• Real-time warehouse robotic fleet coordinated with Freight API dispatch.</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Lavida Health Buddy Interactive Clinical Workstation */}
              {activeProductId === 'lavida' && (
                <div className="rounded-2xl border border-neutral-800 bg-[#080B10] p-5 text-white font-mono shadow-2xl space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span className="text-xs text-neutral-300 font-semibold">Lavida Health Buddy — Clinical Triage Simulator</span>
                    </div>
                    <div className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      HIPAA VAULT ENCRYPTED
                    </div>
                  </div>

                  {/* Case Scenario Selector Buttons */}
                  <div className="space-y-2">
                    <div className="text-[11px] text-neutral-400">Select Clinical Anamnesis Scenario:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {symptomScenarios.map((sc, i) => (
                        <button
                          key={i}
                          onClick={() => handleRunTriage(i)}
                          className={`p-2.5 rounded-lg text-left text-xs transition-all border ${
                            selectedSymptomCase === i
                              ? 'bg-neutral-800 border-emerald-500 text-white font-medium shadow'
                              : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          <div className="text-[10px] text-neutral-500">{sc.ageGroup}</div>
                          <div className="truncate font-semibold mt-0.5">{sc.title}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Triage Output Dashboard */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-400">Triage Classification Level:</span>
                      <span className={`px-2.5 py-1 rounded text-xs font-bold border ${symptomScenarios[selectedSymptomCase].urgencyColor}`}>
                        {symptomScenarios[selectedSymptomCase].urgency}
                      </span>
                    </div>

                    {/* Differential Diagnosis Engine */}
                    <div className="space-y-2">
                      <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                        <span>AI Differential Diagnosis Confidence:</span>
                        <span className="text-emerald-400 text-[10px]">SNOMED CT / ICD-10 Mapped</span>
                      </div>
                      {symptomScenarios[selectedSymptomCase].differential.map((d, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded bg-neutral-900/80 text-xs">
                          <span className="text-neutral-300">{d.condition}</span>
                          <span className="text-emerald-400 font-bold">{d.confidence}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actionable Clinical Protocol */}
                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs">
                      <div className="text-neutral-400 text-[11px] font-semibold mb-1">
                        Automated Clinical Triage Directives:
                      </div>
                      <div className="text-neutral-200 leading-relaxed">
                        {symptomScenarios[selectedSymptomCase].triageProtocol}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* KSM Autos Interactive Luxury Garage Terminal */}
              {activeProductId === 'ksm' && (
                <div className="rounded-2xl border border-neutral-800 bg-[#08090C] p-5 text-white font-mono shadow-2xl space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-amber-400" />
                      <span className="text-xs text-neutral-300 font-semibold">KSM Autos — Luxury Digital Garage Terminal</span>
                    </div>
                    <div className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      LIVE CAN-BUS TELEMETRY
                    </div>
                  </div>

                  {/* Vehicle Switcher */}
                  <div className="space-y-2">
                    <div className="text-[11px] text-neutral-400">Select Supercar in Digital Vault:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {exoticVehicles.map((v, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedVehicle(i)}
                          className={`p-2.5 rounded-lg text-left text-xs transition-all border ${
                            selectedVehicle === i
                              ? 'bg-neutral-800 border-amber-500 text-white font-medium shadow'
                              : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          <div className="text-[10px] text-neutral-500">VIN: {v.vin}</div>
                          <div className="truncate font-semibold mt-0.5">{v.model}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Vehicle Telemetry Matrix */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-white">
                        {exoticVehicles[selectedVehicle].model}
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {exoticVehicles[selectedVehicle].chassisStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="p-2.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                        <div className="text-neutral-400 text-[10px]">Engine/Powertrain Health</div>
                        <div className="font-bold text-emerald-400 mt-0.5">{exoticVehicles[selectedVehicle].engineHealth}</div>
                      </div>
                      <div className="p-2.5 bg-neutral-900/80 rounded-lg border border-neutral-800">
                        <div className="text-neutral-400 text-[10px]">Thermal Status</div>
                        <div className="font-bold text-cyan-400 mt-0.5">{exoticVehicles[selectedVehicle].oilTemp}</div>
                      </div>
                      <div className="p-2.5 bg-neutral-900/80 rounded-lg border border-neutral-800 col-span-2 sm:col-span-1">
                        <div className="text-neutral-400 text-[10px]">Brake Wear / Rotors</div>
                        <div className="font-bold text-white mt-0.5">{exoticVehicles[selectedVehicle].brakeWear}</div>
                      </div>
                    </div>

                    {/* Concierge & Provenance Status */}
                    <div className="p-3 bg-neutral-900/90 rounded-lg border border-neutral-800 text-[11px] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Next Scheduled Concierge Event:</span>
                        <span className="text-amber-400 font-medium">{exoticVehicles[selectedVehicle].nextService}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-neutral-800/80 pt-1.5">
                        <span className="text-neutral-400">Power Output:</span>
                        <span className="text-white font-bold">{exoticVehicles[selectedVehicle].telemetry.power}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
