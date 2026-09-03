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
import { ScrollProgress } from './components/ScrollProgress';
import { ParallaxBackground } from './components/ParallaxBackground';
import { MotionSection } from './components/MotionSection';

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
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-foreground)] selection:bg-[#E5252A] selection:text-white font-sans transition-colors duration-300 relative">
      {/* 3D Scroll Progress Top Indicator */}
      <ScrollProgress />

      {/* Spatial Multi-Depth Parallax Background Layer */}
      <ParallaxBackground />

      {/* Navigation */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenConfigurator={handleOpenConfigurator}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Apple-Tier Cinematic Hero with 3D WebGL Core */}
        <Hero
          onOpenConsultation={() => handleOpenConsultation()}
          onOpenConfigurator={handleOpenConfigurator}
        />

        {/* 8 Core Pillars */}
        <MotionSection id="services-section">
          <ServicePillars
            onSelectService={(service) => handleOpenConsultation(service)}
          />
        </MotionSection>

        {/* Flagship Products Showcase (Freizy Omnia Suite, Lavida Health Buddy, KSM Autos) */}
        <MotionSection id="products-section">
          <ProductsShowcase
            onOpenConsultation={(productName) => handleOpenConsultation(productName)}
          />
        </MotionSection>

        {/* Dedicated Full-Lifecycle Software Development */}
        <MotionSection id="software-section">
          <SoftwareShowcase
            onOpenConsultation={() => handleOpenConsultation('Software Development')}
          />
        </MotionSection>

        {/* Hardware & Network Infrastructure */}
        <MotionSection id="hardware-section">
          <HardwareNetworkShowcase />
        </MotionSection>

        {/* Interactive Architecture Builder & ROI/Spec Configurator */}
        <MotionSection id="configurator-section">
          <InteractiveSystemBuilder
            onProceedWithConfig={handleProceedWithConfig}
          />
        </MotionSection>

        {/* Developer Sandbox & Multi-Language API Console */}
        <MotionSection id="sandbox-section">
          <InteractiveCodeSandbox />
        </MotionSection>

        {/* Concept to Code Lifecycle Pipeline */}
        <MotionSection id="pipeline-section">
          <ProcessPipeline
            onOpenConsultation={() => handleOpenConsultation()}
          />
        </MotionSection>

        {/* Enterprise Case Studies & Verifiable Metrics */}
        <MotionSection id="cases-section">
          <CaseStudies
            onOpenConsultation={() => handleOpenConsultation()}
          />
        </MotionSection>

        {/* Contact & Consultation Booking with Flyer Info */}
        <MotionSection id="contact-section">
          <ContactSection initialNotes={configNotes} />
        </MotionSection>
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
