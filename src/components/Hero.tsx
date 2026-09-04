import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { TechCanvas } from "./TechCanvas";
import { TiltCard3D } from "./TiltCard3D";
import { WindowControls } from "./WindowControls";
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  Terminal,
  Server,
  Network,
  Palette,
  ShieldAlert,
  Bot,
  FolderKanban,
  Play,
} from "lucide-react";

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenConfigurator: () => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stats: { to: number; prefix?: string; suffix?: string; label: string }[] =
  [
    { to: 8, label: "service areas, one accountable team" },
    { to: 6, label: "maintained products in active use" },
    { to: 12, suffix: "hrs", label: "target response on new enquiries" },
    { to: 2022, prefix: "Since ", label: "building and supporting systems" },
  ];

const CountUp: React.FC<{ to: number; prefix?: string; suffix?: string }> = ({
  to,
  prefix = "",
  suffix = "",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(to);
      return;
    }
    let raf = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
};

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultation,
  onOpenConfigurator,
}) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: copy drifts up + fades, console drifts slower
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const panelScale = useTransform(scrollYProgress, [0, 1], [1, 0.985]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // --- Full 8-tab telemetry console state (kept from first version) ---
  const [activeTab, setActiveTab] = useState<
    | "ai"
    | "software"
    | "cyber"
    | "robotics"
    | "hardware"
    | "network"
    | "project"
    | "design"
  >("ai");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simTokens, setSimTokens] = useState(4820);

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

  const tabBtn = (
    id: typeof activeTab,
    icon: React.ReactNode,
    label: string,
  ) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
        activeTab === id
          ? "bg-[#E5252A] text-white font-medium shadow-sm"
          : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <section
      ref={ref}
      id="hero"
      className="relative bg-white dark:bg-black transition-colors overflow-hidden"
    >
      {/* Interactive particle grid (kept from first version) */}
      <div className="absolute inset-0 pointer-events-none">
        <TechCanvas interactive={true} density={50} />
      </div>

      {/* Soft parallax wash behind copy */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden="true"
        className="parallax-layer absolute top-[-160px] left-1/2 -translate-x-1/2 w-[820px] h-[420px] rounded-full bg-black/[0.04] dark:bg-white/[0.05] blur-[110px] pointer-events-none"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1120px] mx-auto px-5 pt-16 sm:pt-24 pb-12 text-center relative"
      >
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="parallax-layer"
        >
          <motion.p variants={item} className="eyebrow mb-4">
            Freizy Technologies
          </motion.p>
          <motion.h1
            variants={item}
            className="text-[40px] leading-[1.05] sm:text-[64px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white max-w-[820px] mx-auto"
          >
            AI, Software and Infrastructure that hold up in production.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-5 text-[17px] sm:text-[19px] leading-relaxed text-[#424245] dark:text-neutral-400 max-w-[640px] mx-auto font-normal"
          >
            We design, build and support business systems — from internal tools
            and customer apps to the servers and networks they run on.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={onOpenConsultation}
              className="group px-6 py-2.5 rounded-full bg-[#ed1c24] hover:bg-[#c41218] text-white text-[15px] font-medium transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
            >
              <span>Talk to our team</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={onOpenConfigurator}
              className="px-6 py-2.5 rounded-full text-[15px] font-medium text-[#1d1d1f] dark:text-white hover:underline flex items-center gap-1"
            >
              <span>Explore what we do</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-4 text-[13px] text-[#6e6e73] dark:text-neutral-500"
          >
            Based in Accra, working with teams worldwide. Response within one
            business day.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Telemetry console with full 8-tab system + tilt hover */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative">
        <motion.div
          style={{ y: panelY, scale: panelScale }}
          className="parallax-layer"
        >
          <motion.div
            initial={{ clipPath: "inset(6% 4% 6% 4%)", opacity: 0, y: 40 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="clip-reveal"
          >
            <TiltCard3D intensity={8} elevation={16}>
              <div className="rounded-2xl bg-gradient-to-b from-slate-200 to-slate-100 dark:from-neutral-800/80 dark:to-neutral-950/90 p-1 border border-slate-300 dark:border-neutral-700/70 shadow-2xl dark:shadow-black/80 backdrop-blur-2xl transition-all">
                {/* Window Header */}
                <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-white dark:bg-neutral-950/80 rounded-t-xl border-b border-slate-200 dark:border-neutral-800 gap-3">
                  <div className="flex items-center gap-2">
                    <WindowControls />
                    <span className="font-mono text-xs text-slate-600 dark:text-neutral-400 ml-2 hidden sm:inline">
                      freizy-os://v4.8/system-monitor
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-500 border border-slate-300 dark:border-neutral-700">
                      Illustrative figures
                    </span>
                  </div>

                  {/* Sub-system Switcher Tabs */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-900 p-1 rounded-lg border border-slate-200 dark:border-neutral-800 overflow-x-auto max-w-full">
                    {tabBtn("ai", <Cpu className="w-3 h-3" />, "AI / Neural")}
                    {tabBtn(
                      "software",
                      <Terminal className="w-3 h-3" />,
                      "Software",
                    )}
                    {tabBtn(
                      "cyber",
                      <ShieldAlert className="w-3 h-3" />,
                      "Cybersecurity",
                    )}
                    {tabBtn(
                      "robotics",
                      <Bot className="w-3 h-3" />,
                      "Robotics",
                    )}
                    {tabBtn(
                      "hardware",
                      <Server className="w-3 h-3" />,
                      "Hardware",
                    )}
                    {tabBtn(
                      "network",
                      <Network className="w-3 h-3" />,
                      "Network",
                    )}
                    {tabBtn(
                      "project",
                      <FolderKanban className="w-3 h-3" />,
                      "Project Mgmt",
                    )}
                    {tabBtn(
                      "design",
                      <Palette className="w-3 h-3" />,
                      "Creative",
                    )}
                  </div>
                </div>

                {/* Console Main Window */}
                <div className="p-6 bg-slate-950 text-slate-100 rounded-b-xl min-h-[220px]">
                  {activeTab === "ai" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            ONLINE / INFERENCE READY
                          </span>
                          <span className="text-xs text-neutral-400">
                            Cluster: Lambda-Hyper-09
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">
                              Latency (TTFT)
                            </div>
                            <div className="text-base font-bold text-emerald-400 mt-1">
                              1.18 ms
                            </div>
                          </div>
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">
                              Processed Tokens / Sec
                            </div>
                            <div className="text-base font-bold text-white mt-1">
                              {simTokens} t/s
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                          <button
                            onClick={handleTriggerSimulation}
                            disabled={isSimulating}
                            className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
                          >
                            <Play className="w-3 h-3" />
                            <span>
                              {isSimulating
                                ? "Simulating High-Throughput Burst..."
                                : "Trigger Neural Burst Test"}
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-[#E5252A]">
                          FP8 Quant
                        </div>
                        <div className="text-xs text-neutral-400">
                          Memory Footprint
                        </div>
                        <div className="text-[11px] text-emerald-400">
                          4.2x Faster Inference
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "software" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/30">
                            CI/CD PIPELINE SYNCED
                          </span>
                          <span className="text-xs text-neutral-400">
                            Kubernetes Auto-Scale Engine
                          </span>
                        </div>
                        <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800 text-xs space-y-1">
                          <div className="flex justify-between text-neutral-300">
                            <span>Test Coverage:</span>
                            <strong className="text-emerald-400">
                              99.2% (SOC-2 Verifiable)
                            </strong>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Build Latency:</span>
                            <strong className="text-white">
                              18.4s Clean Target
                            </strong>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Zero Downtime Rollout:</span>
                            <strong className="text-emerald-400">
                              Active (Blue-Green)
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-white">
                          0.00%
                        </div>
                        <div className="text-xs text-neutral-400">
                          Regression Error Rate
                        </div>
                        <div className="text-[11px] text-cyan-400">
                          Continuous Static AST Audit
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "cyber" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-400 border border-red-500/30">
                            ZERO-TRUST SENTINEL ARMED
                          </span>
                          <span className="text-xs text-neutral-400">
                            Threat Engine: Post-Quantum Kyber-768
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">
                              Mean Time to Detect (MTTD)
                            </div>
                            <div className="text-base font-bold text-emerald-400 mt-1">
                              &lt; 8.5 Seconds
                            </div>
                          </div>
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">
                              Active Defense Status
                            </div>
                            <div className="text-base font-bold text-white mt-1">
                              Automated SOC Tier-2
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-[#E5252A]">
                          99.999%
                        </div>
                        <div className="text-xs text-neutral-400">
                          Threat Neutralization Rate
                        </div>
                        <div className="text-[11px] text-emerald-400">
                          Air-Gapped HSM Cryptography
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "robotics" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                            ROS 2 AUTONOMOUS KINEMATICS
                          </span>
                          <span className="text-xs text-neutral-400">
                            Sensor Fusion: LiDAR + 3D Depth SLAM
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">
                              Control Frequency
                            </div>
                            <div className="text-base font-bold text-cyan-400 mt-1">
                              1,000 Hz Real-Time
                            </div>
                          </div>
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">
                              Navigation Precision
                            </div>
                            <div className="text-base font-bold text-white mt-1">
                              ± 1.2 mm Sub-Centimeter
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-white">
                          &lt; 0.8ms
                        </div>
                        <div className="text-xs text-neutral-400">
                          Edge Fusion Latency
                        </div>
                        <div className="text-[11px] text-cyan-400">
                          Autonomous Collision Avoidance
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "hardware" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/30">
                            GPU TELEMETRY STREAM
                          </span>
                          <span className="text-xs text-neutral-400">
                            Matrix-X Rack 04
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">
                              Thermal Equilibrium
                            </div>
                            <div className="text-base font-bold text-emerald-400 mt-1">
                              42.8°C (Liquid Cool)
                            </div>
                          </div>
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">
                              Memory Interconnect
                            </div>
                            <div className="text-base font-bold text-white mt-1">
                              3.2 TB/s NVLink
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-white">
                          99.999%
                        </div>
                        <div className="text-xs text-neutral-400">
                          Hardware Cluster Uptime
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Tier-IV Data Center Certified
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "network" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            ZERO-TRUST MESH ACTIVE
                          </span>
                          <span className="text-xs text-neutral-400">
                            Edge Points: 38 Global POPs
                          </span>
                        </div>
                        <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800 text-xs space-y-1">
                          <div className="flex justify-between text-neutral-300">
                            <span>Aggregate Backbone:</span>
                            <strong className="text-white">800 Gbps</strong>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Packet Drop Rate:</span>
                            <strong className="text-emerald-400">
                              0.0000%
                            </strong>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>DDoS Mitigation Shield:</span>
                            <strong className="text-emerald-400">
                              ARMED (2.4 Tbps capacity)
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-[#E5252A]">
                          0.8ms
                        </div>
                        <div className="text-xs text-neutral-400">
                          Trans-Regional Roundtrip
                        </div>
                        <div className="text-[11px] text-emerald-400">
                          Deterministic Routing
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "project" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            SCALED AGILE ENTERPRISE GOVERNANCE
                          </span>
                          <span className="text-xs text-neutral-400">
                            Milestone Engine: SAFe / Scrum-Pro
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">
                              On-Time Milestone Rate
                            </div>
                            <div className="text-base font-bold text-amber-400 mt-1">
                              98.8% Delivered
                            </div>
                          </div>
                          <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800">
                            <div className="text-neutral-400 text-[11px]">
                              Sprint Velocity Gain
                            </div>
                            <div className="text-base font-bold text-white mt-1">
                              +45% Team Yield
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-amber-400">
                          &lt; 1.2%
                        </div>
                        <div className="text-xs text-neutral-400">
                          Budget Variance Tolerance
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          Zero Technical Debt Drift
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "design" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/30">
                            CREATIVE STUDIO & VECTOR ENGINE
                          </span>
                          <span className="text-xs text-neutral-400">
                            Design System: Freizy-Precision-V3
                          </span>
                        </div>
                        <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800 text-xs space-y-1.5">
                          <div className="flex justify-between text-neutral-300">
                            <span>Vector Precision:</span>
                            <strong className="text-emerald-400">
                              Infinite Lossless Béziers
                            </strong>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Print Standards:</span>
                            <strong className="text-neutral-200">
                              CMYK / Pantone / 300+ DPI
                            </strong>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Deliverables:</span>
                            <span className="text-rose-300">
                              Logo Systems • Print Flyers • UI/UX • 3D Visuals
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center space-y-2">
                        <div className="text-2xl font-bold text-[#E5252A]">
                          100%
                        </div>
                        <div className="text-xs text-neutral-400">
                          Brand Identity Consistency
                        </div>
                        <div className="text-[11px] text-rose-400 font-mono">
                          Pixel-Perfect Vector Export
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Quick Metrics Ribbon */}
                  <div className="mt-6 pt-4 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                    <div>
                      <div className="text-[11px] font-mono text-neutral-400">
                        Global Response SLA
                      </div>
                      <div className="text-base sm:text-lg font-bold font-mono text-white">
                        99.999%
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-neutral-400">
                        Neural Inference
                      </div>
                      <div className="text-base sm:text-lg font-bold font-mono text-white">
                        1.18ms
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-neutral-400">
                        Cyber Sentinel
                      </div>
                      <div className="text-base sm:text-lg font-bold font-mono text-emerald-400">
                        Zero-Trust
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-neutral-400">
                        Robotics SLAM
                      </div>
                      <div className="text-base sm:text-lg font-bold font-mono text-cyan-400">
                        1,000 Hz
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-neutral-400">
                        Global Backhaul
                      </div>
                      <div className="text-base sm:text-lg font-bold font-mono text-[#E5252A]">
                        800 Gbps
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </motion.div>
        </motion.div>

        {/* Stats — stagger up on scroll */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-[900px] mx-auto"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={item}>
              <div className="font-display text-[22px] font-bold text-[#1d1d1f] dark:text-white">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-0.5">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
