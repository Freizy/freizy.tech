import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { ProductTelemetryMonitor } from './ProductTelemetryMonitor';
import { LavidaTelemetryMonitor } from './LavidaTelemetryMonitor';
import { KsmTelemetryMonitor } from './KsmTelemetryMonitor';
import { ExamsTelemetryMonitor } from './ExamsTelemetryMonitor';
import { OudyTelemetryMonitor } from './OudyTelemetryMonitor';
import { HostelTelemetryMonitor } from './HostelTelemetryMonitor';

interface ProductsShowcaseProps {
  onOpenConsultation: (productName?: string) => void;
}

type ProductId = 'omnia' | 'lavida' | 'ksm' | 'exams' | 'oudy' | 'hostel';

const products: {
  id: ProductId;
  name: string;
  tag: string;
  desc: string;
  points: string[];
  url?: string;
  liveTitle: string;
  liveDesc: string;
}[] = [
  {
    id: 'omnia',
    name: 'Freizy Omnia Suite',
    tag: 'Business management',
    desc: 'Accounting, inventory, sales and reporting for small and mid-size companies. Replaces spreadsheets and disconnected tools.',
    points: ['Invoicing and expenses', 'Stock and purchasing', 'Simple, exportable reports'],
    url: 'https://omnia.freizy.com',
    liveTitle: 'Live look: Omnia Suite',
    liveDesc: 'Finance, stock and sales as your team would see them. Pause it, switch tabs — it\'s all sample data.',
  },
  {
    id: 'lavida',
    name: 'Lavida Health Buddy',
    tag: 'Patient support',
    desc: 'Appointment reminders, health records and guidance for clinics and patients. Built with privacy reviews from day one.',
    points: ['Appointment management', 'Secure patient records', 'Clinic dashboards'],
    url: 'https://lavida2.netlify.app',
    liveTitle: 'Live look: Lavida Health Buddy',
    liveDesc: 'Today\u2019s clinic queue — appointments, check-ins and reminders. Pause it, switch tabs — it\'s all sample data.',
  },
  {
    id: 'ksm',
    name: 'KSM Autos',
    tag: 'Garage management',
    desc: 'Bookings, service history and customer messaging for garages and fleets. Keeps the workshop organised.',
    points: ['Online bookings', 'Service history per vehicle', 'Parts and job tracking'],
    url: 'https://ksm.autos',
    liveTitle: 'Live look: KSM Autos',
    liveDesc: 'Bookings, workshop load and parts as the front desk would see them. Pause it, switch tabs — it\'s all sample data.',
  },
  {
    id: 'exams',
    name: 'Freizy Exams Suite',
    tag: 'Education',
    desc: 'Practice questions, timed mock exams and instant scoring for schools and candidates.',
    points: ['Question banks by subject', 'Timed mock exams', 'Instant scoring & reports'],
    liveTitle: 'Freizy Exams Suite',
    liveDesc: 'Built for schools and candidates preparing for exams. Live demo available on request.',
  },
  {
    id: 'oudy',
    name: 'Oudy',
    tag: 'Events app',
    desc: 'Event discovery, ticketing and gate check-in for organizers and attendees.',
    points: ['Event listings & discovery', 'Tickets & payments', 'Gate check-in'],
    liveTitle: 'Oudy — Events App',
    liveDesc: 'For organizers filling seats and attendees finding things to do. Live demo available on request.',
  },
  {
    id: 'hostel',
    name: 'Freizy Hostel Hub',
    tag: 'Student housing',
    desc: 'Room listings, bookings and payments for hostels and student accommodation.',
    points: ['Room listings & search', 'Bookings & payments', 'Tenant messaging'],
    liveTitle: 'Freizy Hostel Hub',
    liveDesc: 'For hostel managers and students looking for a room. Live demo available on request.',
  },
];

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({
  onOpenConsultation,
}) => {
  const [active, setActive] = useState<ProductId>('omnia');
  const current = products.find((p) => p.id === active) ?? products[0];

  return (
    <section id="products" className="py-20 sm:py-28 bg-white dark:bg-black transition-colors">
      <div className="max-w-[1120px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[680px] mb-12"
        >
          <p className="eyebrow mb-3">Products</p>
          <h2 className="text-[32px] sm:text-[48px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white leading-[1.08]">
            Built by us. Used every day.
          </h2>
          <p className="mt-4 text-[17px] text-[#424245] dark:text-neutral-400 leading-relaxed">
            Six products we maintain ourselves — so the support you get comes
            from the people who wrote the code. Select one to see it live.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="tablist" aria-label="Products">
          {products.map((p, i) => {
            const selected = p.id === active;
            return (
              <motion.div
                key={p.name}
                role="tab"
                tabIndex={0}
                aria-selected={selected}
                onClick={() => setActive(p.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActive(p.id);
                  }
                }}
                initial={{ opacity: 0, y: 32, clipPath: 'inset(8% 4% 8% 4%)' }}
                whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className={`clip-reveal rounded-2xl p-7 flex flex-col text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ed1c24] transition-colors ${
                  selected
                    ? 'bg-white dark:bg-[#0f0f12] border-2 border-[#1d1d1f] dark:border-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]'
                    : 'apple-panel lift border border-transparent hover:border-black/10 dark:hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="text-[12px] font-medium text-[#6e6e73] dark:text-neutral-500 uppercase tracking-wide">
                    {p.tag}
                  </div>
                  {selected && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Viewing live
                    </span>
                  )}
                </div>
                <h3 className="text-[21px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white mb-2">
                  {p.name}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#424245] dark:text-neutral-400 mb-5">
                  {p.desc}
                </p>
                <ul className="space-y-2 mb-6">
                  {p.points.map((pt) => (
                    <li key={pt} className="text-[14px] text-[#424245] dark:text-neutral-300 flex items-start gap-2">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-[#6e6e73] flex-shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                  <span className={`text-[13px] font-medium ${selected ? 'text-[#1d1d1f] dark:text-white' : 'text-[#6e6e73] dark:text-neutral-500'}`}>
                    {selected ? 'Showing below' : 'See it live'}
                  </span>
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="link-arrow text-[14px] inline-flex items-center gap-1 group"
                    >
                      Visit site
                      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenConsultation(p.name);
                      }}
                      className="link-arrow text-[14px] inline-flex items-center gap-0.5 group"
                    >
                      Request demo
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, clipPath: 'inset(6% 3% 6% 3%)' }}
          whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="clip-reveal mt-10"
        >
          <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
            <div>
              <h3 className="text-[21px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white">
                {current.liveTitle}
              </h3>
              <p className="text-[14px] text-[#6e6e73] dark:text-neutral-500 mt-1">
                {current.liveDesc}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {current.url && (
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow text-[14px] inline-flex items-center gap-1 group"
                >
                  Open live site
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              <button
                onClick={() => onOpenConsultation(current.name)}
                className="link-arrow text-[14px] inline-flex items-center gap-0.5 group"
              >
                Request a demo
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {current.id === 'omnia' && <ProductTelemetryMonitor />}
              {current.id === 'lavida' && <LavidaTelemetryMonitor />}
              {current.id === 'ksm' && <KsmTelemetryMonitor />}
              {current.id === 'exams' && <ExamsTelemetryMonitor />}
              {current.id === 'oudy' && <OudyTelemetryMonitor />}
              {current.id === 'hostel' && <HostelTelemetryMonitor />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <p className="mt-6 text-[13px] text-[#6e6e73] dark:text-neutral-500">
          Demos use sample data. We can walk through your own workflow on a call if that's more useful.
        </p>
      </div>
    </section>
  );
};
