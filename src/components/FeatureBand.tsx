import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface FeatureBandProps {
  onOpenConsultation: () => void;
}

/**
 * Nvidia-style dark interlude: parallax backdrop, clip-mask edges,
 * staggered spec columns. Quiet, technical, no neon.
 */
export const FeatureBand: React.FC<FeatureBandProps> = ({ onOpenConsultation }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const fgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={ref} className="relative bg-[#f5f5f7] dark:bg-[#0b0b0d] transition-colors">
      <div className="clip-slant-both relative overflow-hidden bg-[#0a0a0c] dark:bg-black text-white">
        {/* Parallax backdrop — faint grid + wash */}
        <motion.div style={{ y: bgY }} className="parallax-layer absolute inset-[-15%] pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 75%)',
            }}
          />
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-white/[0.06] blur-[100px]" />
        </motion.div>

        <motion.div
          style={{ y: fgY }}
          className="parallax-layer relative max-w-[1120px] mx-auto px-5 py-20 sm:py-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[720px]"
          >
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-neutral-400 mb-4">
              Why teams stay with us
            </p>
            <h2 className="text-[30px] sm:text-[44px] font-semibold tracking-tight leading-[1.08]">
              One partner for software, hardware and support.
            </h2>
            <p className="mt-4 text-[16px] text-neutral-400 leading-relaxed max-w-[600px]">
              No hand-offs between vendors. When something breaks at 8am on a
              Monday, you call one number — and we already know your setup.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden"
          >
            {[
              { k: 'Single contract', v: 'Software, devices and support under one agreement.' },
              { k: 'Documented systems', v: 'Network maps, logins and runbooks you keep.' },
              { k: 'Local support', v: 'On-site in Accra, remote everywhere else.' },
            ].map((s) => (
              <motion.div
                key={s.k}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="bg-[#0a0a0c]/90 p-6"
              >
                <div className="text-[15px] font-semibold mb-1.5">{s.k}</div>
                <div className="text-[14px] text-neutral-400 leading-relaxed">{s.v}</div>
              </motion.div>
            ))}
          </motion.div>

          <button
            onClick={onOpenConsultation}
            className="mt-8 inline-flex items-center gap-1 text-[15px] font-medium text-white hover:underline"
          >
            Talk through your setup <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Quiet capability ticker */}
      <div className="overflow-hidden border-b border-black/5 dark:border-white/10 py-4">
        <div className="ticker-track flex gap-10 whitespace-nowrap w-max px-5 text-[13px] text-[#6e6e73] dark:text-neutral-500">
          {[...Array(2)].flatMap((_, dup) =>
            [
              'ERP & invoicing',
              'Mobile apps',
              'Office networks',
              'CCTV & access',
              'Cloud backups',
              'Staff training',
              'Maintenance plans',
              'IT audits',
            ].map((t, i) => (
              <span key={`${dup}-${i}`} className="flex items-center gap-10">
                <span>{t}</span>
                <span className="w-1 h-1 rounded-full bg-[#c7c7cc] dark:bg-neutral-700" />
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
