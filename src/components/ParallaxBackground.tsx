import { type FC } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

/**
 * Very subtle ambient depth — two soft washes that drift at
 * different speeds. No wireframes, no labels, no glow.
 */
export const ParallaxBackground: FC = () => {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -120]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.7, 0.4]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <motion.div
        style={{ y: ySlow, opacity }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-black/[0.03] dark:bg-white/[0.04] blur-[120px]"
      />
      <motion.div
        style={{ y: yFast, opacity }}
        className="absolute top-[60%] -left-40 w-[500px] h-[500px] rounded-full bg-black/[0.02] dark:bg-white/[0.03] blur-[120px]"
      />
    </div>
  );
};
