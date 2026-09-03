import React from 'react';
import { motion } from 'motion/react';

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export const MotionSection: React.FC<MotionSectionProps> = ({
  children,
  className = '',
  id,
  delay = 0,
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 45, rotateX: 2.5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`[perspective:1200px] ${className}`}
    >
      {children}
    </motion.section>
  );
};
