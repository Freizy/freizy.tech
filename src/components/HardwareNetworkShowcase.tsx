import React, { useState } from 'react';
import {
  Server,
  Network,
  Cpu,
  Shield,
  Activity,
  Zap,
  Globe2,
  HardDrive,
  CheckCircle2,
  Sliders,
  Radio,
} from 'lucide-react';

export const HardwareNetworkShowcase: React.FC = () => {
  const [activeSpec, setActiveSpec] = useState<'matrix-x' | 'edgenode' | 'network-mesh'>('matrix-x');

  const regions = [
    { name: 'North America (US-East)', latency: '0.8ms', load: '38%' },
    { name: 'Europe (Frankfurt)', latency: '1.2ms', load: '44%' },
    { name: 'Asia Pacific (Tokyo)', latency: '1.9ms', load: '51%' },
    { name: 'Middle East (Dubai)', latency: '2.1ms', load: '29%' },
  ];

  return (
    <section id="hardware" className="py-24 relative bg-slate-50 dark:bg-[#08090d] border-t border-slate-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-neutral-900 border border-red-200 dark:border-neutral-800 text-xs font-mono uppercase tracking-widest text-[#E5252A] mb-3 font-semibold">
            <span>PHYSICAL INFRASTRUCTURE & BACKBONES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            Hardware Acceleration & <br className="hidden sm:inline" />
            <span className="text-brand-gradient">Global Carrier-Grade Mesh</span>
          </h2>

          <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg transition-colors">
            Precision-engineered liquid-cooled server clusters and zero-trust fiber meshes deployed worldwide for deterministic uptime.
          </p>
        </div>

        {/* Spec Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 transition-colors">
            <button
              onClick={() => setActiveSpec('matrix-x')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs transition-all flex items-center gap-2 ${
                activeSpec === 'matrix-x'
                  ? 'bg-white dark:bg-[#E5252A] text-slate-950 dark:text-white font-bold shadow-md shadow-slate-300/50 dark:shadow-[#E5252A]/20'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Server className="w-4 h-4 text-[#E5252A] dark:text-white" />
              <span>Matrix-X GPU Rack</span>
            </button>

            <button
              onClick={() => setActiveSpec('edgenode')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs transition-all flex items-center gap-2 ${
                activeSpec === 'edgenode'
                  ? 'bg-white dark:bg-[#E5252A] text-slate-950 dark:text-white font-bold shadow-md shadow-slate-300/50 dark:shadow-[#E5252A]/20'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4 text-[#E5252A] dark:text-white" />
              <span>EdgeNode Pro (AI Rigs)</span>
            </button>

            <button
              onClick={() => setActiveSpec('network-mesh')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs transition-all flex items-center gap-2 ${
                activeSpec === 'network-mesh'
                  ? 'bg-white dark:bg-[#E5252A] text-slate-950 dark:text-white font-bold shadow-md shadow-slate-300/50 dark:shadow-[#E5252A]/20'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Network className="w-4 h-4 text-[#E5252A] dark:text-white" />
              <span>Global 800Gbps Mesh</span>
            </button>
          </div>
        </div>

        {/* Display Card */}
        {activeSpec === 'matrix-x' && (
          <div className="rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-8 sm:p-12 shadow-xl dark:shadow-2xl transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 font-mono text-xs border border-slate-200 dark:border-neutral-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  ENTERPRISE DATA CENTER COMPUTE
                </div>

                <h3 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 dark:text-white transition-colors">
                  Freizy Matrix-X GPU Cluster
                </h3>

                <p className="text-slate-600 dark:text-neutral-300 text-base leading-relaxed transition-colors">
                  Engineered with 8x synchronized Tensor silicon cores, direct-to-chip liquid cooling, and ultra-high bandwidth memory. Purpose-built for training sovereign foundation models and real-time vision inference.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3.5 bg-slate-50 dark:bg-neutral-900/60 rounded-xl border border-slate-200 dark:border-neutral-800 transition-colors">
                    <div className="text-slate-500 dark:text-neutral-400 font-mono text-xs">Peak Compute</div>
                    <div className="text-lg font-bold font-heading text-slate-900 dark:text-white mt-1 transition-colors">1,024 TFLOPS</div>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-neutral-900/60 rounded-xl border border-slate-200 dark:border-neutral-800 transition-colors">
                    <div className="text-slate-500 dark:text-neutral-400 font-mono text-xs">Interconnect</div>
                    <div className="text-lg font-bold font-heading text-slate-900 dark:text-white mt-1 transition-colors">3.35 TB/s</div>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-neutral-900/60 rounded-xl border border-slate-200 dark:border-neutral-800 transition-colors">
                    <div className="text-slate-500 dark:text-neutral-400 font-mono text-xs">Cooling Tech</div>
                    <div className="text-lg font-bold font-heading text-emerald-600 dark:text-emerald-400 mt-1 transition-colors">Liquid Submerged</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700 dark:text-neutral-300 font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E5252A]" />
                    <span>Redundant N+2 Power Supply & Automatic Battery Backup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E5252A]" />
                    <span>Hardware Root of Trust with cryptographic attestation</span>
                  </div>
                </div>
              </div>

              {/* Hardware Spec Graphic Simulator */}
              <div className="lg:col-span-6 bg-slate-900 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-[#0c0e14] border border-slate-800 dark:border-neutral-800 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[360px] text-neutral-100">
                <div className="flex items-center justify-between border-b border-slate-800 dark:border-neutral-800 pb-4">
                  <div className="font-mono text-xs text-neutral-400 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#E5252A]" />
                    <span>SILICON TELEMETRY & SENSORS</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">STATUS: 100% NOMINAL</span>
                </div>

                {/* Conceptual Hardware Visualizer */}
                <div className="py-6 flex flex-col items-center justify-center">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-neutral-950 border-2 border-neutral-700 shadow-2xl flex items-center justify-center group hover:border-[#E5252A] transition-all duration-500">
                    <div className="absolute inset-4 rounded-xl border border-dashed border-neutral-800 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-lg bg-[#E5252A]/10 border border-[#E5252A]/40 flex items-center justify-center">
                        <Cpu className="w-12 h-12 text-[#E5252A] animate-pulse" />
                      </div>
                    </div>
                    {/* Glowing corner pins */}
                    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#E5252A] rounded-full shadow-lg shadow-[#E5252A]" />
                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#E5252A] rounded-full shadow-lg shadow-[#E5252A]" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#E5252A] rounded-full shadow-lg shadow-[#E5252A]" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#E5252A] rounded-full shadow-lg shadow-[#E5252A]" />
                  </div>
                  <span className="font-mono text-xs text-neutral-400 mt-4">
                    Freizy Tensor-X8 Matrix Accelerator Module
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-neutral-400 border-t border-slate-800 dark:border-neutral-800 pt-3">
                  <span>TDP: 450W / Core</span>
                  <span>Operating Temp: 41.2°C</span>
                  <span>FP8 Matrix Precision</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSpec === 'edgenode' && (
          <div className="rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-8 sm:p-12 shadow-xl dark:shadow-2xl transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 font-mono text-xs border border-slate-200 dark:border-neutral-800">
                  <span className="w-2 h-2 rounded-full bg-[#E5252A]" />
                  RUGGEDIZED IOT & EDGE SILICON
                </div>

                <h3 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 dark:text-white transition-colors">
                  Freizy EdgeNode Pro AI Unit
                </h3>

                <p className="text-slate-600 dark:text-neutral-300 text-base leading-relaxed transition-colors">
                  Compact, fanless, and built for harsh industrial environments. Houses dedicated neural processing units (NPU) for zero-latency camera streams, drone telemetry, robotic vision, and local predictive models without cloud reliance.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3.5 bg-slate-50 dark:bg-neutral-900/60 rounded-xl border border-slate-200 dark:border-neutral-800 transition-colors">
                    <div className="text-slate-500 dark:text-neutral-400 font-mono text-xs">Edge NPU</div>
                    <div className="text-lg font-bold font-heading text-slate-900 dark:text-white mt-1 transition-colors">275 TOPS</div>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-neutral-900/60 rounded-xl border border-slate-200 dark:border-neutral-800 transition-colors">
                    <div className="text-slate-500 dark:text-neutral-400 font-mono text-xs">Ingress Rate</div>
                    <div className="text-lg font-bold font-heading text-slate-900 dark:text-white mt-1 transition-colors">Dual 10GbE</div>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-neutral-900/60 rounded-xl border border-slate-200 dark:border-neutral-800 transition-colors">
                    <div className="text-slate-500 dark:text-neutral-400 font-mono text-xs">Enclosure</div>
                    <div className="text-lg font-bold font-heading text-slate-900 dark:text-white mt-1 transition-colors">IP67 Sealed</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700 dark:text-neutral-300 font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E5252A]" />
                    <span>Operating range: -40°C to +85°C with passive thermal radiator</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E5252A]" />
                    <span>Real-time local computer vision with 120 FPS object classification</span>
                  </div>
                </div>
              </div>

              {/* Edge Node Visual Preview */}
              <div className="lg:col-span-6 bg-slate-900 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-[#0c0e14] border border-slate-800 dark:border-neutral-800 rounded-2xl p-8 flex flex-col justify-between min-h-[360px] text-neutral-100">
                <div className="flex items-center justify-between border-b border-slate-800 dark:border-neutral-800 pb-3 font-mono text-xs text-neutral-400">
                  <span>EDGE TELEMETRY LOG</span>
                  <span className="text-emerald-400">ZERO PACKET JITTER</span>
                </div>
                <div className="py-6 flex flex-col items-center justify-center space-y-4">
                  <div className="w-44 h-44 rounded-3xl bg-neutral-950 border border-neutral-700 p-4 flex flex-col justify-between shadow-2xl hover:border-[#E5252A] transition-all">
                    <div className="flex justify-between items-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-mono text-neutral-400">IP67 CERTIFIED</span>
                    </div>
                    <div className="flex justify-center">
                      <Radio className="w-12 h-12 text-[#E5252A]" />
                    </div>
                    <div className="text-center font-mono text-[10px] text-neutral-300">
                      DUAL SENSOR BUS
                    </div>
                  </div>
                  <p className="font-mono text-xs text-neutral-400">
                    Continuous offline autonomous edge inference
                  </p>
                </div>
                <div className="border-t border-slate-800 dark:border-neutral-800 pt-3 text-xs font-mono text-neutral-400 flex justify-between">
                  <span>Latency: 0.4ms</span>
                  <span>Power: 35W Active</span>
                  <span>Encrypted Flash Memory</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSpec === 'network-mesh' && (
          <div id="network" className="rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-8 sm:p-12 shadow-xl dark:shadow-2xl transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 font-mono text-xs border border-slate-200 dark:border-neutral-800">
                  <Globe2 className="w-3.5 h-3.5 text-[#E5252A]" />
                  DETERMINISTIC GLOBAL NETWORK
                </div>

                <h3 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 dark:text-white transition-colors">
                  Zero-Trust 800Gbps Global Mesh
                </h3>

                <p className="text-slate-600 dark:text-neutral-300 text-base leading-relaxed transition-colors">
                  Our private optical backbone bridges major cloud regions and on-premises data centers with sub-millisecond switching, line-rate WireGuard encryption, and automated multi-path failover.
                </p>

                {/* Global Region Latency List */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono text-slate-500 dark:text-neutral-400">Real-Time Point of Presence Telemetry:</div>
                  {regions.map((reg, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 text-xs font-mono transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-slate-800 dark:text-neutral-200">{reg.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-500 dark:text-neutral-400">
                        <span>Load: {reg.load}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{reg.latency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Global Network Diagram Visualizer */}
              <div className="lg:col-span-6 bg-slate-900 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-[#0c0e14] border border-slate-800 dark:border-neutral-800 rounded-2xl p-6 flex flex-col justify-between min-h-[380px] text-neutral-100">
                <div className="flex items-center justify-between border-b border-slate-800 dark:border-neutral-800 pb-3 font-mono text-xs text-neutral-400">
                  <span>BACKBONE THROUGHPUT</span>
                  <span className="text-[#E5252A] font-bold">800 GBPS AGGREGATE</span>
                </div>

                {/* Simulated Visual Graph */}
                <div className="py-8 flex flex-col items-center justify-center space-y-6">
                  <div className="relative w-full max-w-sm h-32 flex items-center justify-between px-6">
                    {/* Node 1 */}
                    <div className="flex flex-col items-center gap-1 z-10">
                      <div className="w-10 h-10 rounded-xl bg-neutral-950 border-2 border-[#E5252A] flex items-center justify-center">
                        <Server className="w-4 h-4 text-[#E5252A]" />
                      </div>
                      <span className="font-mono text-[10px] text-neutral-400">Data Center</span>
                    </div>

                    {/* Animated Line */}
                    <div className="flex-1 h-0.5 bg-neutral-800 relative mx-2">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-[#E5252A] animate-pulse" />
                    </div>

                    {/* Node 2 - Core Gateway */}
                    <div className="flex flex-col items-center gap-1 z-10">
                      <div className="w-12 h-12 rounded-2xl bg-neutral-950 border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Network className="w-6 h-6 text-emerald-400" />
                      </div>
                      <span className="font-mono text-[10px] text-emerald-400 font-bold">Freizy Mesh</span>
                    </div>

                    {/* Animated Line */}
                    <div className="flex-1 h-0.5 bg-neutral-800 relative mx-2">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#E5252A] to-emerald-400 animate-pulse" />
                    </div>

                    {/* Node 3 */}
                    <div className="flex flex-col items-center gap-1 z-10">
                      <div className="w-10 h-10 rounded-xl bg-neutral-950 border-2 border-neutral-700 flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-neutral-300" />
                      </div>
                      <span className="font-mono text-[10px] text-neutral-400">Edge Point</span>
                    </div>
                  </div>

                  <p className="text-center font-mono text-xs text-neutral-400 max-w-sm">
                    Automated BGP routing with instantaneous failover across 38 global carrier interconnects.
                  </p>
                </div>

                <div className="border-t border-slate-800 dark:border-neutral-800 pt-3 text-xs font-mono text-neutral-400 flex justify-between">
                  <span>Packet Drop: 0.0000%</span>
                  <span>Encryption: ChaCha20-Poly1305</span>
                  <span>DDoS Mitigation: Armed</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
