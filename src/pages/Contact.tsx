import { type FC } from 'react';
import { MessageCircle } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useConsultation } from '../context/ConsultationContext';
import { PageHeader } from '../components/layout/PageHeader';
import { ContactSection } from '../components/ContactSection';

export const Contact: FC = () => {
  const { openConsultation } = useConsultation();
  usePageMeta({
    title: 'Contact — Sales & Support | Freizy Technologies, Accra',
    description:
      'Reach Freizy Technologies in Accra, Ghana: sales +233 24 035 2196, support +233 26 624 2703, info@freizy.com or WhatsApp. Response within one business day.',
    path: '/contact',
  });

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you are trying to do."
        lede="A short message is enough. We reply within one business day — usually by an engineer, not a sales script."
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={() => openConsultation()} className="btn btn-primary">
            Quick enquiry
          </button>
          <a
            href="https://wa.me/233240352196?text=Hello%20Freizy%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="btn border border-white/25 text-white hover:border-[#ed1c24] hover:text-[#ed1c24] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </PageHeader>

      <ContactSection initialNotes="" />

      <section className="py-14 bg-[#f5f5f7] dark:bg-[#0b0b0d] border-t border-black/10 dark:border-white/10 transition-colors">
        <div className="max-w-[1160px] mx-auto px-5 grid sm:grid-cols-3 gap-8 text-[14px]">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#ed1c24] mb-2">Sales</div>
            <a href="tel:+233240352196" className="link-arrow">+233 24 035 2196</a>
            <p className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">New projects and demos</p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#ed1c24] mb-2">Support</div>
            <a href="tel:+233266242703" className="link-arrow">+233 26 624 2703</a>
            <p className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Existing clients and products</p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#ed1c24] mb-2">Email</div>
            <a href="mailto:info@freizy.com" className="link-arrow">info@freizy.com</a>
            <p className="text-[13px] text-[#6e6e73] dark:text-neutral-500 mt-1">Include timeline and budget for a faster reply</p>
          </div>
        </div>
      </section>
    </>
  );
};
