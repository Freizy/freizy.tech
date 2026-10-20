import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useConsultation } from '../../context/ConsultationContext';

export const CtaBand: FC<{ title?: string; text?: string }> = ({
  title = 'Tell us what you are trying to do.',
  text = 'A short message is enough. We reply within one business day and suggest a 20-minute call if it helps.',
}) => {
  const { openConsultation } = useConsultation();
  return (
    <section className="bg-[#0b0b0d] text-white border-t-2 border-[#ed1c24]">
      <div className="max-w-[1160px] mx-auto px-5 py-16 sm:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-[560px]">
          <h2 className="text-[26px] sm:text-[34px] font-semibold tracking-tight leading-[1.15]">
            {title}
          </h2>
          <p className="mt-3 text-[15px] text-neutral-400 leading-relaxed">{text}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => openConsultation()} className="btn btn-primary">
            Talk to engineers
            <ArrowRight className="w-4 h-4" />
          </button>
          <Link to="/contact" className="btn border border-white/25 text-white hover:border-[#ed1c24] hover:text-[#ed1c24] transition-colors">
            Contact page
          </Link>
        </div>
      </div>
    </section>
  );
};
