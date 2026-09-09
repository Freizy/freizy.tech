import { type FC } from 'react';
import { motion } from 'motion/react';

interface ProcessPipelineProps {
  onOpenConsultation: () => void;
}

const steps = [
  { n: '01', title: 'Understand', desc: 'A call and a short written brief. We confirm scope, timeline and what success looks like.' },
  { n: '02', title: 'Plan', desc: 'A one-page proposal with milestones, fixed pricing for the first phase, and who does what.' },
  { n: '03', title: 'Build', desc: 'Small releases you can test every 1–2 weeks. You see progress, not slide decks.' },
  { n: '04', title: 'Launch', desc: 'We deploy, document and hand over — logins, source access and a walkthrough.' },
  { n: '05', title: 'Support', desc: 'Monthly support for fixes and small improvements. Larger work is quoted separately.' },
];

export const ProcessPipeline: FC<ProcessPipelineProps> = ({ onOpenConsultation }) => {
  return (
    <section id="process" className="py-20 sm:py-28 bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[680px] mb-12"
        >
          <p className="eyebrow mb-3">How we work</p>
          <h2 className="text-[32px] sm:text-[48px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white leading-[1.08]">
            A simple process you can follow.
          </h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {steps.map((s) => (
            <motion.div
              key={s.n}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: -4 }}
              className="apple-panel lift rounded-2xl p-5"
            >
              <div className="text-[13px] font-mono text-[#6e6e73] dark:text-neutral-500 mb-2">{s.n}</div>
              <h3 className="text-[16px] font-semibold text-[#1d1d1f] dark:text-white mb-1.5">{s.title}</h3>
              <p className="text-[13px] text-[#424245] dark:text-neutral-400 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20, clipPath: 'inset(10% 2% 10% 2%)' }}
          whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="clip-reveal mt-8 apple-panel rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-[14px] text-[#424245] dark:text-neutral-300">
            Have something in mind? Send a paragraph about it — we'll tell you honestly if we're a fit.
          </p>
          <button
            onClick={onOpenConsultation}
            className="px-5 py-2 rounded-full bg-[#1d1d1f] dark:bg-white dark:text-black text-white text-[14px] font-medium whitespace-nowrap transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Start a conversation
          </button>
        </motion.div>
      </div>
    </section>
  );
};
