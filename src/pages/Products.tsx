import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useConsultation } from '../context/ConsultationContext';
import { PageHeader } from '../components/layout/PageHeader';
import { CtaBand } from '../components/layout/CtaBand';
import { ProductsShowcase } from '../components/ProductsShowcase';

export const Products: FC = () => {
  const { openConsultation } = useConsultation();
  usePageMeta({
    title: 'Products — Omnia, Lavida, KSM, Exams, Oudy, Stays | Freizy Technologies',
    description:
      'Six products built and maintained by Freizy Technologies: Omnia Suite, Lavida Health Buddy, KSM Autos, Exams Suite, Oudy and Freizy Stays. Live demos available.',
    path: '/products',
  });

  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Built by us. Used every day."
        lede="Six products we maintain ourselves — so the support you get comes from the people who wrote the code. Select one to see it live."
      >
        <div className="flex flex-wrap gap-3">
          <button onClick={() => openConsultation('Product demo')} className="btn btn-primary">
            Request a demo
            <ArrowRight className="w-4 h-4" />
          </button>
          <Link to="/case-studies" className="btn border border-white/25 text-white hover:border-[#ed1c24] hover:text-[#ed1c24] transition-colors">
            See case studies
          </Link>
        </div>
      </PageHeader>

      <ProductsShowcase onOpenConsultation={(p) => openConsultation(p)} />
      <CtaBand
        title="Want a walkthrough on your own workflow?"
        text="Demos use sample data. We can run through your real process on a call instead — usually more useful."
      />
    </>
  );
};
