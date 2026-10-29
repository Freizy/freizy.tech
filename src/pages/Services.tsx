import { type FC } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import pageMeta from '../data/page-meta.json';
import { useConsultation } from '../context/ConsultationContext';
import { PageHeader } from '../components/layout/PageHeader';
import { CtaBand } from '../components/layout/CtaBand';
import { ServicePillars } from '../components/ServicePillars';
import { AISection } from '../components/AISection';
import { SoftwareShowcase } from '../components/SoftwareShowcase';
import { HardwareNetworkShowcase } from '../components/HardwareNetworkShowcase';
import { ProcessPipeline } from '../components/ProcessPipeline';

export const Services: FC = () => {
  const { openConsultation } = useConsultation();
  usePageMeta(pageMeta.services);

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Eight services. One team responsible for all of it."
        lede="Most projects touch more than one area. You get a single point of contact and a plan that covers software, hardware and support together."
      >
        <button onClick={() => openConsultation()} className="btn btn-primary">
          Discuss a project
        </button>
      </PageHeader>

      <ServicePillars onSelectService={(s) => openConsultation(s)} />
      <AISection onOpenConsultation={() => openConsultation('Applied AI')} />
      <SoftwareShowcase onOpenConsultation={() => openConsultation('Software development')} />
      <HardwareNetworkShowcase />
      <ProcessPipeline onOpenConsultation={() => openConsultation()} />
      <CtaBand
        title="Not sure which service you need?"
        text="Describe the problem — we will scope it with you and tell you plainly what it takes."
      />
    </>
  );
};
