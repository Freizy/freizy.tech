import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-slate-200/20 dark:bg-neutral-800/40">
      <motion.div
        className="h-full bg-gradient-to-r from-[#E5252A] via-rose-500 to-amber-500 shadow-[0_0_12px_rgba(229,37,42,0.8)] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};
