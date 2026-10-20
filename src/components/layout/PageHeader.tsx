import { type FC, type ReactNode } from 'react';
import { motion } from 'motion/react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = ({ eyebrow, title, lede, children }) => {
  return (
    <section className="relative bg-[#0b0b0d] text-white overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 80% at 50% 0%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 0%, black 30%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-[3px] bg-[#ed1c24]"
      />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-[1160px] mx-auto px-5 pt-16 pb-14 sm:pt-20 sm:pb-16"
      >
        <p className="eyebrow eyebrow-dim mb-4">{eyebrow}</p>
        <h1 className="text-[34px] sm:text-[48px] font-semibold leading-[1.08] tracking-tight max-w-[760px]">
          {title}
        </h1>
        {lede && (
          <p className="mt-5 text-[16px] sm:text-[18px] leading-relaxed text-neutral-400 max-w-[620px]">
            {lede}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </motion.div>
    </section>
  );
};
