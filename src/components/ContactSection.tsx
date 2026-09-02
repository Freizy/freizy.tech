import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Send,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ContactSectionProps {
  initialNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialNotes = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    serviceInterest: 'AI & ML Solutions',
    projectBudget: '$50,000 - $150,000',
    message: initialNotes,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if initialNotes changes
  React.useEffect(() => {
    if (initialNotes) {
      setFormData((prev) => ({ ...prev, message: initialNotes }));
    }
  }, [initialNotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 relative bg-white dark:bg-[#08090d] border-t border-slate-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-neutral-900 border border-red-200 dark:border-neutral-800 text-xs font-mono uppercase tracking-widest text-[#E5252A] mb-3 font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>DIRECT ENTERPRISE ENGAGEMENT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            Let's Build the Future of <br />
            <span className="text-brand-gradient">Your Technology Infrastructure</span>
          </h2>

          <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg transition-colors">
            Ready to architect your custom AI models, software suite, or hardware cluster? Reach out directly or submit your project requirements below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info from Flyer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-8 shadow-xl dark:shadow-2xl space-y-6 transition-colors">
              <BrandLogo size="lg" withTagline={true} />

              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed font-normal pt-2 transition-colors">
                Freizy Technologies partners with ambitious enterprises globally to engineer sovereign AI, custom software, hardware silicon, and deterministic networks.
              </p>

              {/* Direct Info from Flyer */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 shadow-sm transition-colors">
                  <div className="p-2.5 rounded-lg bg-red-50 dark:bg-[#E5252A]/10 border border-red-200 dark:border-[#E5252A]/30 text-[#E5252A]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">Direct Phone Inquiries:</div>
                    <a
                      href="tel:+18001234567"
                      className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white hover:text-[#E5252A] transition-colors"
                    >
                      +1-800-123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 shadow-sm transition-colors">
                  <div className="p-2.5 rounded-lg bg-red-50 dark:bg-[#E5252A]/10 border border-red-200 dark:border-[#E5252A]/30 text-[#E5252A]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">Enterprise Email:</div>
                    <a
                      href="mailto:info@freizytech.com"
                      className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white hover:text-[#E5252A] transition-colors"
                    >
                      info@freizytech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 shadow-sm transition-colors">
                  <div className="p-2.5 rounded-lg bg-red-50 dark:bg-[#E5252A]/10 border border-red-200 dark:border-[#E5252A]/30 text-[#E5252A]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">Official Web Domain:</div>
                    <a
                      href="https://www.freizytech.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white hover:text-[#E5252A] transition-colors"
                    >
                      www.freizytech.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Global Engineering Hubs */}
              <div className="pt-2 border-t border-slate-200 dark:border-neutral-800">
                <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 mb-2">Global Operations & Hubs:</div>
                <div className="flex flex-wrap gap-2">
                  {['Silicon Valley (HQ)', 'Frankfurt', 'Tokyo', 'London', 'Singapore'].map((loc, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-[11px] font-mono text-slate-700 dark:text-neutral-300 flex items-center gap-1 shadow-sm transition-colors"
                    >
                      <MapPin className="w-3 h-3 text-[#E5252A]" />
                      <span>{loc}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Consultation Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-8 sm:p-10 shadow-xl dark:shadow-2xl relative transition-colors">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white transition-colors">
                    Proposal Request Received
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-neutral-300 max-w-md transition-colors">
                    Thank you, <strong className="text-slate-900 dark:text-white">{formData.fullName || 'Partner'}</strong>. Our engineering leads will review your technical specifications and reach out within 24 business hours.
                  </p>
                  <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 font-mono text-xs text-slate-600 dark:text-neutral-400 shadow-sm">
                    Confirmation Ticket: <span className="text-[#E5252A] font-bold">FRZ-REQ-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-800 dark:text-white font-mono text-xs transition-all"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-200 dark:border-neutral-800 pb-4 mb-2 flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white transition-colors">
                        Request Engineering Consultation
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-neutral-400">
                        Zero sales pitch. Connect directly with solutions architects.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                      SLA: &lt; 24h Response
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 mb-1.5 font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Dr. Alex Mercer"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#E5252A] shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 mb-1.5 font-medium">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@enterprise.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#E5252A] shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 mb-1.5 font-medium">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Global Corp"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#E5252A] shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 mb-1.5 font-medium">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#E5252A] shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 mb-1.5 font-medium">
                        Primary Pillar of Interest
                      </label>
                      <select
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#E5252A] shadow-sm"
                      >
                        <option value="AI & ML Solutions">AI & ML Solutions</option>
                        <option value="Software Development">Software Development (ERP/Custom/Apps)</option>
                        <option value="Cybersecurity">Cybersecurity (Zero-Trust & Threat Defense)</option>
                        <option value="Robotics">Robotics & Autonomous Systems (ROS 2 / SLAM)</option>
                        <option value="Hardware Solutions">Hardware Solutions (GPU/Edge Racks)</option>
                        <option value="Network Services">Network Services (Zero-Trust Mesh)</option>
                        <option value="Project Management">Project Management & Enterprise Governance</option>
                        <option value="Graphic Design">Graphic Design & Creative Brand Studio</option>
                        <option value="Full Comprehensive Ecosystem">Full Comprehensive Ecosystem (All Pillars)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 mb-1.5 font-medium">
                        Project Scope / Budget Tier
                      </label>
                      <select
                        value={formData.projectBudget}
                        onChange={(e) => setFormData({ ...formData, projectBudget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#E5252A] shadow-sm"
                      >
                        <option value="$25,000 - $50,000">$25,000 - $50,000 (Scoping & Pilot)</option>
                        <option value="$50,000 - $150,000">$50,000 - $150,000 (Core Deployment)</option>
                        <option value="$150,000 - $500,000">$150,000 - $500,000 (Enterprise Scale)</option>
                        <option value="$500,000+">$500,000+ (Hyperscale Infrastructure)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 mb-1.5 font-medium">
                      Technical Requirements / Architectural Notes
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your target latency, throughput requirements, preferred tech stack, or specific challenges..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-slate-900 dark:text-white text-xs placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#E5252A] resize-none shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#E5252A] hover:bg-[#d01e23] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E5252A]/25"
                  >
                    {isSubmitting ? (
                      <span>Dispatching Requirements...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Architecture Request</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500 dark:text-neutral-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Non-Disclosure Agreement (NDA) automatically protected by default</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
