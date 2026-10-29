import { type FC } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import pageMeta from '../data/page-meta.json';
import { useConsultation } from '../context/ConsultationContext';
import { PageHeader } from '../components/layout/PageHeader';
import { CtaBand } from '../components/layout/CtaBand';
import { CaseStudies } from '../components/CaseStudies';

export const CaseStudiesPage: FC = () => {
  const { openConsultation } = useConsultation();
  usePageMeta(pageMeta.caseStudies);

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
