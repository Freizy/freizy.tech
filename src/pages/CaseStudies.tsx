import { type FC } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useConsultation } from '../context/ConsultationContext';
import { PageHeader } from '../components/layout/PageHeader';
import { CtaBand } from '../components/layout/CtaBand';
import { CaseStudies } from '../components/CaseStudies';

export const CaseStudiesPage: FC = () => {
  const { openConsultation } = useConsultation();
  usePageMeta({
    title: 'Case Studies — Recent projects | Freizy Technologies',
    description:
      'Recent Freizy Technologies projects in plain terms: reconciliation automation for a lender, stock visibility across warehouses, and patient follow-up for a clinic group.',
    path: '/case-studies',
  });

  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="Recent projects, in plain terms."
        lede="What the situation was, what we built, and what changed — without the buzzwords."
      >
        <button onClick={() => openConsultation()} className="btn btn-primary">
          Start a project
        </button>
      </PageHeader>

      <CaseStudies onOpenConsultation={() => openConsultation()} />
      <CtaBand
        title="Similar problem? Let's scope it."
        text="Tell us what is slowing your team down. We will come back with a plain plan and a price."
      />
    </>
  );
};
