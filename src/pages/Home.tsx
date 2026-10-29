import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import pageMeta from '../data/page-meta.json';
import { useConsultation } from '../context/ConsultationContext';
import { ServicePillars } from '../components/ServicePillars';
import { FeatureBand } from '../components/FeatureBand';
import { ProductsShowcase } from '../components/ProductsShowcase';
import { CaseStudies } from '../components/CaseStudies';
import { FaqSection } from '../components/FaqSection';
import { CtaBand } from '../components/layout/CtaBand';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stats: { to: string; label: string }[] = [
  { to: '8', label: 'service areas, one accountable team' },
  { to: '6', label: 'maintained products in active use' },
  { to: '12h', label: 'target response on new enquiries' },
  { to: '2022', label: 'building and supporting systems' },
];

export const Home: FC = () => {
  const { openConsultation } = useConsultation();
  usePageMeta(pageMeta.home);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-white dark:bg-[#0a0a0c] overflow-hidden transition-colors">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.14] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 20%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 20%, transparent 100%)',
          }}
        />
        <div aria-hidden="true" className="absolute top-0 left-0 w-full h-[3px] bg-[#ed1c24]" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative max-w-[1160px] mx-auto px-5 pt-20 sm:pt-28 pb-16"
        >
          <motion.p variants={item} className="eyebrow mb-5">
            Software · AI · Infrastructure — Accra, Ghana
          </motion.p>
          <motion.h1
            variants={item}
            className="text-[38px] sm:text-[58px] lg:text-[68px] font-semibold tracking-tight leading-[1.04] max-w-[900px]"
          >
            Systems that hold up{' '}
            <span className="text-brand-red">in production</span>.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 text-[17px] sm:text-[19px] leading-relaxed text-[#3a3a3e] dark:text-neutral-400 max-w-[600px]"
          >
            We design, build and support business software, applied AI and the
            servers and networks they run on — one team, end to end.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <button onClick={() => openConsultation()} className="btn btn-primary group">
              Talk to our team
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <Link to="/services" className="btn btn-outline">
              Explore services
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.p variants={item} className="mt-5 text-[13px] text-[#6e6e73] dark:text-neutral-400">
            Based in Accra, working with teams worldwide. Response within one business day.
          </motion.p>
        </motion.div>

        <div className="relative max-w-[1160px] mx-auto px-5 pb-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 dark:bg-white/10 border-t border-b border-black/10 dark:border-white/10"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={item}
                className="bg-white dark:bg-[#0a0a0c] px-5 sm:px-7 py-7"
              >
                <div className="text-[26px] font-semibold tracking-tight text-[#111114] dark:text-white tabular-nums">
                  {s.to}
                </div>
                <div className="text-[13px] text-[#6e6e73] dark:text-neutral-400 mt-1.5 leading-snug">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ServicePillars onSelectService={(s) => openConsultation(s)} />
      <FeatureBand onOpenConsultation={() => openConsultation()} />
      <ProductsShowcase onOpenConsultation={(p) => openConsultation(p)} />
      <CaseStudies onOpenConsultation={() => openConsultation()} />
      <FaqSection />
      <CtaBand />
    </>
  );
};
