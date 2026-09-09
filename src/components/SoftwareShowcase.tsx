import { type FC } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface SoftwareShowcaseProps {
  onOpenConsultation: () => void;
}

const items = [
  { title: 'Custom platforms', desc: 'Internal dashboards, portals and admin tools your team actually uses.' },
  { title: 'Web & mobile apps', desc: 'Customer-facing apps for iOS, Android and web — one codebase where it makes sense.' },
  { title: 'Integrations', desc: 'Connect payments, SMS, accounting and existing systems without manual exports.' },
  { title: 'Maintenance', desc: 'Updates, backups and small improvements on a monthly plan. No surprise invoices.' },
];

export const SoftwareShowcase: FC<SoftwareShowcaseProps> = ({ onOpenConsultation }) => {
  return (
    <section id="software" className="py-20 sm:py-28 bg-[#f5f5f7] dark:bg-[#0b0b0d] transition-colors overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <p className="eyebrow mb-3">Software</p>
            <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white leading-[1.1]">
              From idea to something your team uses daily.
            </h2>
            <p className="mt-4 text-[15px] text-[#424245] dark:text-neutral-400 leading-relaxed">
              We start with a short discovery, build in small releases you can
              test, and stay on for support after launch.
            </p>
            <button onClick={onOpenConsultation} className="mt-6 link-arrow text-[15px] inline-flex items-center gap-0.5 group">
              Get a project estimate <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {items.map((it) => (
              <motion.div
                key={it.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ y: -4 }}
                className="glass-card lift rounded-2xl p-6"
              >
                <h3 className="text-[16px] font-semibold text-[#1d1d1f] dark:text-white mb-1.5">{it.title}</h3>
                <p className="text-[14px] text-[#6e6e73] dark:text-neutral-400 leading-relaxed">{it.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {['TypeScript', 'React', 'Next.js', 'React Native', 'Node.js', 'Python', 'PostgreSQL', 'Redis', 'GraphQL', 'Tailwind CSS', 'Docker', 'Kubernetes'].map((t) => (
            <span key={t} className="px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-[13px] text-[#424245] dark:text-neutral-300">
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
