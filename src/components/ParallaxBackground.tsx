import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const ParallaxBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Different parallax depths & rotations
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 480]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 240]);
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [45, 405]);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.6]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Parallax Layer 1: Floating Glowing Torus & Crimson Spheres */}
      <motion.div
        style={{ y: y1, rotate: rotate1, opacity }}
        className="absolute top-[18%] left-[4%] w-64 h-64 border border-[#E5252A]/20 rounded-full border-dashed pointer-events-none hidden lg:block"
      >
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#E5252A] rounded-full shadow-[0_0_15px_#E5252A]" />
        <div className="absolute inset-4 border border-[#E5252A]/10 rounded-full" />
      </motion.div>

      {/* Parallax Layer 2: Geometric Octagon Wireframe on the Right */}
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[35%] right-[5%] w-80 h-80 border border-slate-400/20 dark:border-neutral-700/30 rounded-3xl rotate-12 pointer-events-none hidden md:block"
      >
        <div className="absolute inset-6 border border-[#E5252A]/15 rounded-2xl" />
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[#E5252A]/60">
          SEC://0x94A-DELTA
        </div>
      </motion.div>

      {/* Parallax Layer 3: Floating 3D Cyber Cube Frame */}
      <motion.div
        style={{ y: y3, rotate: rotate3 }}
        className="absolute top-[65%] left-[8%] w-48 h-48 pointer-events-none hidden lg:block"
      >
        <div className="w-full h-full border border-blue-500/15 dark:border-cyan-500/20 rounded-xl relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl" />
          <div className="absolute top-2 left-2 text-[9px] font-mono text-cyan-500/60">
            [SYS_NODES_3D]
          </div>
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-sm" />
        </div>
      </motion.div>

      {/* Parallax Layer 4: Deep Ambient Color Field Orbs */}
      <motion.div
        style={{ y: y4 }}
        className="absolute top-[50%] right-[15%] w-[450px] h-[450px] rounded-full bg-[#E5252A]/[0.03] dark:bg-[#E5252A]/[0.04] blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[80%] left-[25%] w-[500px] h-[500px] rounded-full bg-blue-500/[0.02] dark:bg-cyan-500/[0.03] blur-3xl pointer-events-none"
      />
    </div>
  );
};
