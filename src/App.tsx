import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicePillars } from './components/ServicePillars';
import { AISection } from './components/AISection';
import { ProductsShowcase } from './components/ProductsShowcase';
import { FeatureBand } from './components/FeatureBand';
import { SoftwareShowcase } from './components/SoftwareShowcase';
import { HardwareNetworkShowcase } from './components/HardwareNetworkShowcase';
import { ProcessPipeline } from './components/ProcessPipeline';
import { CaseStudies } from './components/CaseStudies';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { LegalModal, type LegalKind } from './components/LegalModal';
import { ScrollProgress } from './components/ScrollProgress';
import { ParallaxBackground } from './components/ParallaxBackground';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('General enquiry');
  const [legalModal, setLegalModal] = useState<LegalKind | null>(null);

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) setSelectedService(serviceName);
    setIsConsultationOpen(true);
  };

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] font-sans antialiased relative">
      <ScrollProgress />
      <ParallaxBackground />

      <div className="relative z-10">
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
      />

        <main>
          <Hero
            onOpenConsultation={() => handleOpenConsultation()}
            onOpenConfigurator={() => handleScrollTo('services')}
          />
          <ServicePillars onSelectService={(s) => handleOpenConsultation(s)} />
        <AISection onOpenConsultation={() => handleOpenConsultation('Applied AI')} />
          <ProductsShowcase onOpenConsultation={(p) => handleOpenConsultation(p)} />
          <FeatureBand onOpenConsultation={() => handleOpenConsultation()} />
          <SoftwareShowcase onOpenConsultation={() => handleOpenConsultation('Software development')} />
          <HardwareNetworkShowcase />
          <ProcessPipeline onOpenConsultation={() => handleOpenConsultation()} />
          <CaseStudies onOpenConsultation={() => handleOpenConsultation()} />
          <ContactSection initialNotes={''} />
        </main>

        <Footer onOpenLegal={(kind) => setLegalModal(kind)} />
      </div>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialService={selectedService}
        initialNotes={''}
      />

      <LegalModal open={legalModal} onClose={() => setLegalModal(null)} />
    </div>
  );
}
