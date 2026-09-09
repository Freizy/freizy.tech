import { type FC } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none">
      <motion.div
        className="h-full bg-[#1d1d1f] dark:bg-white origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};
