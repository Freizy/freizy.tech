import { type FC } from 'react';
import { motion } from 'motion/react';
import {
  BrainCircuit,
  Code2,
  ShieldCheck,
  Bot,
  Server,
  Network,
  FolderKanban,
  Megaphone,
  ChevronRight,
} from 'lucide-react';

interface ServicePillarsProps {
  onSelectService: (serviceName: string) => void;
}

const services = [
  {
    icon: BrainCircuit,
    title: 'Applied AI',
    desc: 'Practical machine learning for search, document work and forecasting — deployed on your data, with access controls.',
  },
  {
    icon: Code2,
    title: 'Software development',
    desc: 'Web platforms, mobile apps and internal tools. Design, build, testing and handover included.',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity',
    desc: 'Audits, hardening and monitoring basics done properly — reviews, patching and staff guidance.',
  },
  {
    icon: Bot,
    title: 'Robotics & automation',
    desc: 'Small-scale automation and ROS-based prototypes for warehouses, labs and field work.',
  },
  {
    icon: Server,
    title: 'Hardware & servers',
    desc: 'Workstations, servers and edge devices — specified, installed and maintained.',
  },
  {
    icon: Network,
    title: 'Networks',
    desc: 'Office and site networks, VPNs and Wi-Fi that stay up — planned, installed and documented.',
  },
  {
    icon: FolderKanban,
    title: 'Project management',
    desc: 'Scoping, timelines and delivery in one pair of hands — with progress you can actually follow.',
  },
  {
    icon: Megaphone,
    title: 'Digital marketing',
    desc: 'SEO, social and campaigns tied to business goals — reported in plain numbers.',
  },
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const card = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const ServicePillars: FC<ServicePillarsProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[#f5f5f7] dark:bg-[#0b0b0d] transition-colors relative overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[680px] mb-12"
        >
          <p className="eyebrow mb-3">What we do</p>
          <h2 className="text-[32px] sm:text-[48px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white leading-[1.08]">
            Eight services. One team responsible for all of it.
          </h2>
          <p className="mt-4 text-[17px] text-[#424245] dark:text-neutral-400 leading-relaxed">
            Most projects touch more than one area. You get a single point of
            contact and a plan that covers software, hardware and support together.
          </p>
        </motion.div>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-parent"
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.button
                key={s.title}
                variants={card}
                onClick={() => onSelectService(s.title)}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="glass-card lift rounded-2xl p-6 text-left group"
              >
                <Icon className="w-6 h-6 text-[#1d1d1f] dark:text-white mb-4" strokeWidth={1.75} />
                <h3 className="text-[17px] font-semibold text-[#1d1d1f] dark:text-white mb-1.5">
                  {s.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#6e6e73] dark:text-neutral-400 mb-4">
                  {s.desc}
                </p>
                <span className="link-arrow text-[14px] inline-flex items-center gap-0.5">
                  Discuss a project
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-[13px] text-[#6e6e73] dark:text-neutral-500"
        >
          Need design or project management with it? That's part of every engagement — branding, UI design and delivery planning are included, not upsold.
        </motion.p>
      </div>
    </section>
  );
};
