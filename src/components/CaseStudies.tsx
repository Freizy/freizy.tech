import React from 'react';
import { motion } from 'motion/react';

interface CaseStudiesProps {
  onOpenConsultation: () => void;
}

const cases = [
  {
    industry: 'Financial services',
    title: 'Replacing manual reconciliation for a lender',
    desc: 'A lending team was matching payments in spreadsheets. We built a small reconciliation tool on top of Omnia that cut month-end close from 6 days to 2.',
  },
  {
    industry: 'Logistics',
    title: 'Stock visibility across three warehouses',
    desc: 'A distributor couldn\'t see stock levels without calling each site. We added barcode scanning and a shared dashboard — stock-outs dropped noticeably in the first quarter.',
  },
  {
    industry: 'Healthcare',
    title: 'Simpler patient follow-up for a clinic group',
    desc: 'Two clinics used paper cards for recalls. Lavida now handles reminders and visit history, and reception staff spend less time on the phone.',
  },
];

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenConsultation }) => {
  return (
    <section id="cases" className="py-20 sm:py-28 bg-[#f5f5f7] dark:bg-[#0b0b0d] transition-colors overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[680px] mb-12"
        >
          <p className="eyebrow mb-3">Selected work</p>
          <h2 className="text-[32px] sm:text-[48px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white leading-[1.08]">
            Recent projects, in plain terms.
          </h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {cases.map((c) => (
            <motion.div
              key={c.title}
              variants={{
                hidden: { opacity: 0, y: 26 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: -4 }}
              className="glass-card lift rounded-2xl p-6 flex flex-col"
            >
              <div className="text-[12px] font-medium uppercase tracking-wide text-[#6e6e73] dark:text-neutral-500 mb-2">
                {c.industry}
              </div>
              <h3 className="text-[17px] font-semibold text-[#1d1d1f] dark:text-white mb-2 leading-snug">
                {c.title}
              </h3>
              <p className="text-[14px] text-[#424245] dark:text-neutral-400 leading-relaxed">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-8 text-[14px] text-[#424245] dark:text-neutral-400">
          References available on request.{' '}
          <button onClick={onOpenConsultation} className="link-arrow">
            Ask about a similar project
          </button>
        </p>
      </div>
    </section>
  );
};
