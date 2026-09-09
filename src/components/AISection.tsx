import { type FC } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface AISectionProps {
  onOpenConsultation: () => void;
}

const capabilities = [
  {
    title: 'Custom models & fine-tuning',
    desc: 'Adapt proven open models on your own data — support replies, document search, classification.',
  },
  {
    title: 'Computer vision',
    desc: 'Counting, inspection and quality checks from ordinary cameras. Pilots start with your footage.',
  },
  {
    title: 'Robotics & ROS 2',
    desc: 'Navigation, sensor fusion and automation prototypes for warehouses, labs and field work.',
  },
  {
    title: 'Assistants on your docs',
    desc: 'Ask questions over your manuals, policies and records — with sources shown, access-controlled.',
  },
  {
    title: 'Forecasting',
    desc: 'Demand, stock-outs and maintenance windows predicted from the history you already have.',
  },
  {
    title: 'Edge inference',
    desc: 'Models that run on-device where the network can\u2019t be trusted — shops, sites, vehicles.',
  },
];

export const AISection: FC<AISectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="ai" className="relative bg-[#0b0b0d] text-white overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-5 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[720px] mb-12"
        >
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-neutral-500 font-medium mb-3">
            Artificial intelligence
          </p>
          <h2 className="text-[32px] sm:text-[48px] font-semibold leading-[1.08]">
            AI that ships to production.
          </h2>
          <p className="mt-4 text-[17px] text-neutral-400 leading-relaxed">
            Not demos that die on a laptop. We take models from a two-week pilot
            on your data to something your team relies on — monitored, documented
            and running on infrastructure we support.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10"
        >
          {capabilities.map((c) => (
            <motion.div
              key={c.title}
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="bg-[#0b0b0d] p-6 group hover:bg-white/[0.03] transition-colors"
            >
              <div className="w-8 h-[3px] bg-[#ed1c24] mb-4 transition-transform duration-300 group-hover:scale-x-125 origin-left" />
              <h3 className="text-[16px] font-semibold text-white mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                {c.title}
              </h3>
              <p className="text-[14px] text-neutral-400 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0b0b0d] p-6 sm:p-8"
          >
            <div className="text-[12px] font-mono text-neutral-500 mb-3">SAMPLE INTERACTION — OMNIA ASSISTANT PILOT</div>
            <div className="space-y-3 text-[14px] leading-relaxed">
              <p className="text-white">
                <span className="text-neutral-500 font-mono text-[12px] block mb-1">YOU ASK</span>
                Which invoices are overdue, and who owes the most?
              </p>
              <p className="text-neutral-300 border-l-2 border-[#ed1c24] pl-4">
                <span className="text-neutral-500 font-mono text-[12px] block mb-1">ASSISTANT</span>
                9 invoices totalling GH₵ 64,200. Largest: Apex Traders — GH₵ 18,400, 23 days overdue. Draft reminders?
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0b0b0d] p-6 sm:p-8 flex flex-col"
          >
            <div className="text-[12px] font-mono text-neutral-500 mb-3">TOOLING WE USE</div>
            <div className="flex flex-wrap gap-2">
              {['Python', 'PyTorch', 'scikit-learn', 'Hugging Face', 'CUDA', 'TensorRT', 'LangChain', 'FastAPI', 'ONNX', 'ROS 2', 'OpenCV', 'Docker'].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-white/5 border border-white/10 text-[13px] text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-5 text-[14px] text-neutral-400 leading-relaxed">
              Pilot-first, NDA-friendly. If the pilot doesn\u2019t prove value on
              your data, you keep everything we built and we part ways.
            </p>
            <button
              onClick={onOpenConsultation}
              className="mt-6 self-start px-6 py-2.5 bg-[#ed1c24] hover:bg-[#c41218] text-white text-[15px] font-medium transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-1.5"
            >
              <span>Discuss an AI project</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
