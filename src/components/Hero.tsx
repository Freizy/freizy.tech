import { useEffect, useRef, useState, type FC } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { TechCanvas } from './TechCanvas';
import { ArrowRight, ChevronRight } from 'lucide-react';

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

const stats: { to: number; prefix?: string; suffix?: string; label: string }[] = [
  { to: 8, label: 'service areas, one accountable team' },
  { to: 6, label: 'maintained products in active use' },
  { to: 12, suffix: 'hrs', label: 'target response on new enquiries' },
  { to: 2022, prefix: 'Since ', label: 'building and supporting systems' },
];

const CountUp: FC<{ to: number; prefix?: string; suffix?: string }> = ({
  to,
  prefix = '',
  suffix = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState(0);
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
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

export const Hero: FC<HeroProps> = ({
  onOpenConsultation,
  onOpenConfigurator,
}) => {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 90]);

  return (
    <section ref={ref} id="hero" className="relative bg-white dark:bg-black transition-colors overflow-hidden">
      {/* Interactive particle grid */}
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
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="parallax-layer">
          <motion.p variants={item} className="eyebrow mb-4">Freizy Technologies</motion.p>
          <motion.h1
            variants={item}
            className="text-[40px] leading-[1.05] sm:text-[64px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white max-w-[820px] mx-auto"
          >
            Software, AI and infrastructure that hold up in production.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-5 text-[17px] sm:text-[19px] leading-relaxed text-[#424245] dark:text-neutral-400 max-w-[640px] mx-auto font-normal"
          >
            We design, build and support business systems — from internal tools
            and customer apps to the servers and networks they run on.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3">
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

          <motion.p variants={item} className="mt-4 text-[13px] text-[#6e6e73] dark:text-neutral-500">
            Based in Accra, working with teams worldwide. Response within one business day.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Stats — stagger + count up on scroll */}
      <div className="max-w-[1120px] mx-auto px-5 pb-16 relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-[900px] mx-auto"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={item}>
              <div className="font-display text-[22px] font-bold text-[#1d1d1f] dark:text-white">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
