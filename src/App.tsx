import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicePillars } from './components/ServicePillars';
import { ProductsShowcase } from './components/ProductsShowcase';
import { SoftwareShowcase } from './components/SoftwareShowcase';
import { HardwareNetworkShowcase } from './components/HardwareNetworkShowcase';
import { InteractiveSystemBuilder } from './components/InteractiveSystemBuilder';
import { InteractiveCodeSandbox } from './components/InteractiveCodeSandbox';
import { ProcessPipeline } from './components/ProcessPipeline';
import { CaseStudies } from './components/CaseStudies';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('AI & ML Solutions');
  const [configNotes, setConfigNotes] = useState('');

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) setSelectedService(serviceName);
    setIsConsultationOpen(true);
  };

  const handleOpenConfigurator = () => {
    const el = document.getElementById('configurator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedWithConfig = (summary: string) => {
    setConfigNotes(summary);
    setIsConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-foreground)] selection:bg-[#E5252A] selection:text-white font-sans transition-colors duration-300">
      {/* Navigation */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenConfigurator={handleOpenConfigurator}
      />

      {/* Main Content */}
      <main>
        {/* Apple-Tier Cinematic Hero */}
        <Hero
          onOpenConsultation={() => handleOpenConsultation()}
          onOpenConfigurator={handleOpenConfigurator}
        />

        {/* 8 Core Pillars */}
        <ServicePillars
          onSelectService={(service) => handleOpenConsultation(service)}
        />

        {/* Flagship Products Showcase (Freizy Omnia Suite, Lavida Health Buddy, KSM Autos) */}
        <ProductsShowcase
          onOpenConsultation={(productName) => handleOpenConsultation(productName)}
        />

        {/* Dedicated Full-Lifecycle Software Development */}
        <SoftwareShowcase
          onOpenConsultation={() => handleOpenConsultation('Software Development')}
        />

        {/* Hardware & Network Infrastructure */}
        <HardwareNetworkShowcase />

        {/* Interactive Architecture Builder & ROI/Spec Configurator */}
        <InteractiveSystemBuilder
          onProceedWithConfig={handleProceedWithConfig}
        />

        {/* Developer Sandbox & Multi-Language API Console */}
        <InteractiveCodeSandbox />

        {/* Concept to Code Lifecycle Pipeline */}
        <ProcessPipeline
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* Enterprise Case Studies & Verifiable Metrics */}
        <CaseStudies
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* Contact & Consultation Booking with Flyer Info */}
        <ContactSection initialNotes={configNotes} />
      </main>

      {/* Structured Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialService={selectedService}
        initialNotes={configNotes}
      />
    </div>
  );
}
