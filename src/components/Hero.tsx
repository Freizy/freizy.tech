import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TechCanvas } from './TechCanvas';
import { CyberCore3D } from './CyberCore3D';
import { TiltCard3D } from './TiltCard3D';
import { useTheme } from '../context/ThemeContext';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  Terminal,
  Server,
  Network,
  Palette,
  ShieldAlert,
  Bot,
  FolderKanban,
  Play,
  Box,
  Layers,
} from 'lucide-react';

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenConfigurator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultation,
  onOpenConfigurator,
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<
    'ai' | 'software' | 'cyber' | 'robotics' | 'hardware' | 'network' | 'project' | 'design'
  >('ai');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simTokens, setSimTokens] = useState(4820);
  const [viewMode, setViewMode] = useState<'console' | '3d-core'>('console');

  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 600], [0, -60]);

  const handleTriggerSimulation = () => {
    setIsSimulating(true);
    let count = 0;
    const interval = setInterval(() => {
      setSimTokens((prev) => prev + Math.floor(Math.random() * 85) + 30);
      count++;
      if (count > 15) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 100);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex flex-col justify-center pt-10 pb-20 overflow-hidden bg-white dark:bg-[#08090d] transition-colors"
    >
      {/* Dynamic Interactive Particle Grid Canvas */}
      <TechCanvas interactive={true} density={50} />

      {/* Ambient Lighting Gradients matching Flyer's red energy */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-[#E5252A]/10 dark:bg-[#E5252A]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-10 left-1/4 w-[450px] h-[280px] bg-red-600/5 dark:bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Background circuit texture in Light mode matching the printed flyer */}
      <div className="absolute inset-0 flyer-circuit-bg opacity-40 dark:opacity-0 pointer-events-none" />

      {/* Floating 3D Parallax Tech Chips */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 left-[6%] hidden xl:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800 shadow-xl backdrop-blur-md z-20"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <div className="text-xs font-mono">
          <div className="text-[10px] text-slate-500 dark:text-neutral-400">NEURAL MESH</div>
          <div className="font-bold text-slate-900 dark:text-white">1.18ms Sub-Edge</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-36 right-[6%] hidden xl:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800 shadow-xl backdrop-blur-md z-20"
      >
        <ShieldCheck className="w-4 h-4 text-[#E5252A]" />
        <div className="text-xs font-mono">
          <div className="text-[10px] text-slate-500 dark:text-neutral-400">ZERO-TRUST SOC</div>
          <div className="font-bold text-slate-900 dark:text-white">Post-Quantum Armed</div>
        </div>
      </motion.div>

      <motion.div style={{ y: heroParallaxY }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Category Badge from Flyer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-neutral-900/90 border border-slate-300 dark:border-neutral-700/60 shadow-md dark:shadow-lg backdrop-blur-xl transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-[#E5252A] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5252A] dark:text-neutral-300 font-bold">
              INNOVATION BUILDS TOMORROW
            </span>
            <span className="text-slate-400 dark:text-neutral-600">|</span>
            <span className="text-[11px] text-slate-600 dark:text-neutral-400 font-medium">
              Intelligence • Robotics • Cyber • Systems
            </span>
          </div>
        </motion.div>

        {/* Main Headline - Display Typography matching Flyer */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6 transition-colors"
          >
            Powering a Smarter,{' '}
            <span className="text-brand-gradient">Connected Tomorrow.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-neutral-300 font-normal leading-relaxed max-w-3xl mx-auto transition-colors"
          >
            From deep neural AI and custom software suites to zero-trust cybersecurity, autonomous robotics, sovereign hardware rigs, high-throughput networks, agile project governance, and precision graphic design.
          </motion.p>
        </div>

        {/* Action Call-to-Actions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <button
            id="hero-primary-cta"
            onClick={onOpenConsultation}
            className="group px-7 py-3.5 rounded-xl bg-[#E5252A] hover:bg-[#d01e23] text-white font-semibold text-sm shadow-xl shadow-[#E5252A]/25 transition-all duration-300 flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Start Enterprise Project</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            id="hero-secondary-cta"
            onClick={onOpenConfigurator}
            className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900/90 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-200 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-neutral-700/80 font-medium text-sm transition-all duration-200 flex items-center gap-2 backdrop-blur-md hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-[#E5252A]" />
            <span>Interactive Architecture Builder</span>
          </button>

          <a
            href="#products"
            className="px-5 py-3.5 rounded-xl bg-transparent hover:bg-slate-100 dark:hover:bg-neutral-900/50 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all duration-200 flex items-center gap-2"
          >
            <span>View Flagship Products</span>
          </a>
        </motion.div>

        {/* 3D Visual Mode Switcher Pill */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-neutral-900/90 border border-slate-300 dark:border-neutral-800 backdrop-blur-md text-xs font-mono shadow-sm">
            <button
              onClick={() => setViewMode('console')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'console'
                  ? 'bg-white dark:bg-neutral-800 text-slate-900 dark:text-white font-bold shadow'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-[#E5252A]" />
              <span>Real-Time Telemetry Monitor</span>
            </button>
            <button
              onClick={() => setViewMode('3d-core')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === '3d-core'
                  ? 'bg-white dark:bg-neutral-800 text-slate-900 dark:text-white font-bold shadow'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5 text-[#E5252A]" />
              <span>Interactive 3D WebGL Core</span>
            </button>
          </div>
        </div>

        {/* Interactive Telemetry Console / 3D Holographic Core View */}
        <div className="max-w-5xl mx-auto">
          {viewMode === '3d-core' ? (
            <TiltCard3D intensity={10} elevation={24}>
              <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 border border-slate-800 shadow-2xl backdrop-blur-2xl text-center relative overflow-hidden">
                <div className="absolute top-4 left-6 flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>THREE.JS SPATIAL QUANTUM MATRIX</span>
                </div>
                <div className="absolute top-4 right-6 text-xs font-mono text-[#E5252A]">
                  [HOVER & TILT IN 3D]
                </div>
                <div className="h-[360px] w-full flex items-center justify-center">
                  <CyberCore3D size={440} />
                </div>
                <div className="pt-3 border-t border-slate-800 flex flex-wrap justify-between items-center text-xs font-mono text-slate-400 gap-2">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#E5252A]" />
                    <span>Geodesic Icosahedron Lattice</span>
                  </span>
                  <span className="text-emerald-400">Hardware Accelerated 60 FPS</span>
                  <span>Spatial Quaternion Tracking</span>
                </div>
              </div>
            </TiltCard3D>
          ) : (
            <TiltCard3D intensity={8} elevation={16}>
              <div className="rounded-2xl bg-gradient-to-b from-slate-200 to-slate-100 dark:from-neutral-800/80 dark:to-neutral-950/90 p-1 border border-slate-300 dark:border-neutral-700/70 shadow-2xl dark:shadow-black/80 backdrop-blur-2xl transition-all">
                {/* Window Header */}
                <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-white dark:bg-neutral-950/80 rounded-t-xl border-b border-slate-200 dark:border-neutral-800 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="font-mono text-xs text-slate-600 dark:text-neutral-400 ml-2 hidden sm:inline">
                      freizy-os://v4.8/system-monitor
                    </span>
                  </div>

                  {/* Sub-system Switcher Tabs */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-900 p-1 rounded-lg border border-slate-200 dark:border-neutral-800 overflow-x-auto max-w-full">
                    <button
                      onClick={() => setActiveTab('ai')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'ai'
                          ? 'bg-[#E5252A] text-white font-medium shadow-sm'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Cpu className="w-3 h-3" />
                      <span>AI / Neural</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('software')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'software'
                          ? 'bg-[#E5252A] text-white font-medium shadow-sm'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Terminal className="w-3 h-3" />
                      <span>Software</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('cyber')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'cyber'
                          ? 'bg-[#E5252A] text-white font-medium shadow-sm'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <ShieldAlert className="w-3 h-3" />
                      <span>Cybersecurity</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('robotics')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'robotics'
                          ? 'bg-[#E5252A] text-white font-medium shadow-sm'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Bot className="w-3 h-3" />
                      <span>Robotics</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('hardware')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'hardware'
                          ? 'bg-[#E5252A] text-white font-medium shadow-sm'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Server className="w-3 h-3" />
                      <span>Hardware</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('network')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'network'
                          ? 'bg-[#E5252A] text-white font-medium shadow-sm'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Network className="w-3 h-3" />
                      <span>Network</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('project')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'project'
                          ? 'bg-[#E5252A] text-white font-medium shadow-sm'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <FolderKanban className="w-3 h-3" />
                      <span>Project Mgmt</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('design')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'design'
                          ? 'bg-[#E5252A] text-white font-medium shadow-sm'
                          : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Palette className="w-3 h-3" />
                      <span>Creative</span>
                    </button>
                  </div>
                </div>

                {/* Console Main Window */}
                <div className="p-6 bg-slate-950 text-slate-100 rounded-b-xl min-h-[220px]">
                  {activeTab === 'ai' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            ONLINE / INFERENCE READY
                          </span>
                          <span className="text-xs text-neutral-400">Cluster: Lambda-Hyper-09</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">Latency (TTFT)</div>
                            <div className="text-base font-bold text-emerald-400 mt-1">1.18 ms</div>
                          </div>
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">Processed Tokens / Sec</div>
                            <div className="text-base font-bold text-white mt-1">{simTokens} t/s</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                          <button
                            onClick={handleTriggerSimulation}
                            disabled={isSimulating}
                            className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
                          >
                            <Play className="w-3 h-3" />
                            <span>{isSimulating ? 'Simulating High-Throughput Burst...' : 'Trigger Neural Burst Test'}</span>
                          </button>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-[#E5252A]">FP8 Quant</div>
                        <div className="text-xs text-neutral-400">Memory Footprint</div>
                        <div className="text-[11px] text-emerald-400">4.2x Faster Inference</div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'software' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/30">
                            CI/CD PIPELINE SYNCED
                          </span>
                          <span className="text-xs text-neutral-400">Kubernetes Auto-Scale Engine</span>
                        </div>
                        <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800 text-xs space-y-1">
                          <div className="flex justify-between text-neutral-300">
                            <span>Test Coverage:</span>
                            <strong className="text-emerald-400">99.2% (SOC-2 Verifiable)</strong>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Build Latency:</span>
                            <strong className="text-white">18.4s Clean Target</strong>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Zero Downtime Rollout:</span>
                            <strong className="text-emerald-400">Active (Blue-Green)</strong>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-white">0.00%</div>
                        <div className="text-xs text-neutral-400">Regression Error Rate</div>
                        <div className="text-[11px] text-cyan-400">Continuous Static AST Audit</div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'cyber' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-400 border border-red-500/30">
                            ZERO-TRUST SENTINEL ARMED
                          </span>
                          <span className="text-xs text-neutral-400">Threat Engine: Post-Quantum Kyber-768</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">Mean Time to Detect (MTTD)</div>
                            <div className="text-base font-bold text-emerald-400 mt-1">&lt; 8.5 Seconds</div>
                          </div>
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">Active Defense Status</div>
                            <div className="text-base font-bold text-white mt-1">Automated SOC Tier-2</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-[#E5252A]">99.999%</div>
                        <div className="text-xs text-neutral-400">Threat Neutralization Rate</div>
                        <div className="text-[11px] text-emerald-400">Air-Gapped HSM Cryptography</div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'robotics' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                            ROS 2 AUTONOMOUS KINEMATICS
                          </span>
                          <span className="text-xs text-neutral-400">Sensor Fusion: LiDAR + 3D Depth SLAM</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">Control Frequency</div>
                            <div className="text-base font-bold text-cyan-400 mt-1">1,000 Hz Real-Time</div>
                          </div>
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">Navigation Precision</div>
                            <div className="text-base font-bold text-white mt-1">± 1.2 mm Sub-Centimeter</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-white">&lt; 0.8ms</div>
                        <div className="text-xs text-neutral-400">Edge Fusion Latency</div>
                        <div className="text-[11px] text-cyan-400">Autonomous Collision Avoidance</div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'hardware' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/30">
                            GPU TELEMETRY STREAM
                          </span>
                          <span className="text-xs text-neutral-400">Matrix-X Rack 04</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">Thermal Equilibrium</div>
                            <div className="text-base font-bold text-emerald-400 mt-1">42.8°C (Liquid Cool)</div>
                          </div>
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">Memory Interconnect</div>
                            <div className="text-base font-bold text-white mt-1">3.2 TB/s NVLink</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-white">99.999%</div>
                        <div className="text-xs text-neutral-400">Hardware Cluster Uptime</div>
                        <div className="text-[11px] text-neutral-500">Tier-IV Data Center Certified</div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'network' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            ZERO-TRUST MESH ACTIVE
                          </span>
                          <span className="text-xs text-neutral-400">Edge Points: 38 Global POPs</span>
                        </div>
                        <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800 text-xs space-y-1">
                          <div className="flex justify-between text-neutral-300">
                            <span>Aggregate Backbone:</span>
                            <strong className="text-white">800 Gbps</strong>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Packet Drop Rate:</span>
                            <strong className="text-emerald-400">0.0000%</strong>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>DDoS Mitigation Shield:</span>
                            <strong className="text-emerald-400">ARMED (2.4 Tbps capacity)</strong>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-[#E5252A]">0.8ms</div>
                        <div className="text-xs text-neutral-400">Trans-Regional Roundtrip</div>
                        <div className="text-[11px] text-emerald-400">Deterministic Routing</div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'project' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            SCALED AGILE ENTERPRISE GOVERNANCE
                          </span>
                          <span className="text-xs text-neutral-400">Milestone Engine: SAFe / Scrum-Pro</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">On-Time Milestone Rate</div>
                            <div className="text-base font-bold text-amber-400 mt-1">98.8% Delivered</div>
                          </div>
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">Sprint Velocity Gain</div>
                            <div className="text-base font-bold text-white mt-1">+45% Team Yield</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-amber-400">&lt; 1.2%</div>
                        <div className="text-xs text-neutral-400">Budget Variance Tolerance</div>
                        <div className="text-[11px] text-neutral-400">Zero Technical Debt Drift</div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'design' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/30">
                            CREATIVE STUDIO & VECTOR ENGINE
                          </span>
                          <span className="text-xs text-neutral-400">Design System: Freizy-Precision-V3</span>
                        </div>
                        <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800 text-xs space-y-1.5">
                          <div className="flex justify-between text-neutral-300">
                            <span>Vector Precision:</span>
                            <strong className="text-emerald-400">Infinite Lossless Béziers</strong>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Print Standards:</span>
                            <strong className="text-neutral-200">CMYK / Pantone / 300+ DPI</strong>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Deliverables:</span>
                            <span className="text-rose-300">Logo Systems • Print Flyers • UI/UX • 3D Visuals</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-[#E5252A]">100%</div>
                        <div className="text-xs text-neutral-400">Brand Identity Consistency</div>
                        <div className="text-[11px] text-rose-400 font-mono">Pixel-Perfect Vector Export</div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Quick Metrics Ribbon */}
                  <div className="mt-6 pt-4 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                    <div>
                      <div className="text-[11px] font-mono text-neutral-400">Global Response SLA</div>
                      <div className="text-base sm:text-lg font-bold font-heading text-white">99.999%</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-neutral-400">Neural Inference</div>
                      <div className="text-base sm:text-lg font-bold font-heading text-white">1.18ms</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-neutral-400">Cyber Sentinel</div>
                      <div className="text-base sm:text-lg font-bold font-heading text-emerald-400">Zero-Trust</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-neutral-400">Robotics SLAM</div>
                      <div className="text-base sm:text-lg font-bold font-heading text-cyan-400">1,000 Hz</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-neutral-400">Global Backhaul</div>
                      <div className="text-base sm:text-lg font-bold font-heading text-[#E5252A]">800 Gbps</div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          )}
        </div>
      </motion.div>
    </section>
  );
};
