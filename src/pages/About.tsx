import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useConsultation } from '../context/ConsultationContext';
import { PageHeader } from '../components/layout/PageHeader';
import { CtaBand } from '../components/layout/CtaBand';

const values = [
  {
    title: 'One accountable team',
    desc: 'Software, hardware and support are not handed between vendors. One team scopes it, builds it and answers for it afterwards.',
  },
  {
    title: 'Production over demos',
    desc: 'Everything we ship is meant to run unattended — with backups, monitoring and a plan for when something breaks.',
  },
  {
    title: 'Support from the authors',
    desc: 'Our six products are maintained by the people who wrote the code. Help does not go to a third-party helpdesk.',
  },
  {
    title: 'Plain communication',
    desc: 'Proposals in plain numbers, updates you can follow, and honest answers when something is not worth doing.',
  },
];

const timeline = [
  { year: '2022', text: 'Started building and supporting systems for businesses in Accra.' },
  { year: 'Today', text: 'Eight service areas, six maintained products, clients in Ghana and abroad.' },
  { year: 'Next', text: 'Growing product adoption across Ghana and expanding support to remote teams worldwide.' },
];

export const About: FC = () => {
  const { openConsultation } = useConsultation();
  usePageMeta({
    title: 'About — Freizy Technologies, Accra, Ghana',
    description:
      'Freizy Technologies designs, builds and supports business software, applied AI and IT infrastructure from Accra, Ghana. One accountable team since 2022.',
    path: '/about',
  });

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A software, AI and IT team built around accountability."
        lede="Freizy Technologies is based in Accra, Ghana. We design, build and support the systems businesses depend on — and we stay responsible for them after they go live."
      >
        <button onClick={() => openConsultation()} className="btn btn-primary">
          Talk to our team
        </button>
      </PageHeader>

      <section className="py-20 sm:py-24 bg-white dark:bg-[#0a0a0c] transition-colors">
        <div className="max-w-[1160px] mx-auto px-5 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">Who we are</p>
            <div className="space-y-5 text-[16px] leading-relaxed text-[#3a3a3e] dark:text-neutral-400 max-w-[640px]">
              <p>
                Freizy Technologies started in 2022 with a simple observation:
                businesses were buying software, hardware and support from
                separate vendors, and when something broke, everyone pointed
                elsewhere.
              </p>
              <p>
                We built a team that carries the whole stack. The people who
                design your system are the ones who install the server it runs
                on, and the same people pick up the phone when you need help
                afterwards.
              </p>
              <p>
                Today we run six products of our own — from business management
                to student housing — and deliver projects across applied AI,
                software development, cybersecurity and infrastructure for
                clients in Ghana and worldwide.
              </p>
            </div>

            <div className="mt-10 border-t border-black/10 dark:border-white/10">
              {timeline.map((t) => (
                <div
                  key={t.year}
                  className="grid grid-cols-[90px_1fr] gap-4 py-5 border-b border-black/10 dark:border-white/10"
                >
                  <div className="font-mono text-[12px] uppercase tracking-wider text-[#ed1c24] pt-0.5">
                    {t.year}
                  </div>
                  <div className="text-[15px] text-[#3a3a3e] dark:text-neutral-400 leading-relaxed">
                    {t.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="apple-panel edge-red p-7">
              <p className="eyebrow mb-4">At a glance</p>
              <dl className="space-y-5">
                {[
                  ['Founded', '2022 · Accra, Ghana'],
                  ['Services', '8 — AI, software, security, robotics, hardware, networks, PM, marketing'],
                  ['Products', '6 maintained and in active use'],
                  ['Response', 'Within one business day'],
                  ['Reach', 'Ghana and remote teams worldwide'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6e6e73] dark:text-neutral-500">
                      {k}
                    </dt>
                    <dd className="text-[15px] text-[#111114] dark:text-white mt-1 leading-snug">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-[#f5f5f7] dark:bg-[#0b0b0d] transition-colors">
        <div className="max-w-[1160px] mx-auto px-5">
          <p className="eyebrow mb-4">How we work</p>
          <h2 className="text-[30px] sm:text-[40px] font-semibold tracking-tight leading-[1.1] max-w-[600px] mb-12">
            Four things we hold to.
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card lift p-7"
              >
                <div className="font-mono text-[11px] text-[#ed1c24] mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-[18px] font-semibold tracking-tight mb-2">{v.title}</h3>
                <p className="text-[14px] leading-relaxed text-[#6e6e73] dark:text-neutral-400">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/case-studies" className="link-arrow text-[15px] inline-flex items-center gap-1 group">
              See what that looks like in practice
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
};
