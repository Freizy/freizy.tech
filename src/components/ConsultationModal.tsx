import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialNotes?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialService = 'AI & ML Solutions',
  initialNotes = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService);
  const [notes, setNotes] = useState(initialNotes);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (initialService) setService(initialService);
    if (initialNotes) setNotes(initialNotes);
  }, [initialService, initialNotes]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto transition-colors">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white transition-colors">
              Consultation Scheduled
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 max-w-sm mx-auto transition-colors">
              We have assigned a senior systems architect to review your technical spec. We will contact you at <strong className="text-slate-900 dark:text-white">{email}</strong> within 24 hours.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 font-mono text-xs text-slate-600 dark:text-neutral-400">
              Assigned Lead Engineer ID: <span className="text-[#E5252A] font-bold">FRZ-ENG-084</span>
            </div>
            <button
              onClick={() => {
                setIsDone(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#E5252A] text-white font-mono text-xs font-semibold hover:bg-[#d01e23] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <BrandLogo size="sm" withTagline={false} />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white transition-colors">
                Book Architecture Review
              </h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Direct engagement with Freizy Technologies systems architects.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 mb-1 font-medium">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#E5252A] shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 mb-1 font-medium">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#E5252A] shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 mb-1 font-medium">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enterprise Inc."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#E5252A] shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 mb-1 font-medium">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#E5252A] shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 mb-1 font-medium">
                Solution Focus Area
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#E5252A] shadow-sm"
              >
                <optgroup label="Flagship Products">
                  <option value="Freizy Omnia Suite">Freizy Omnia Suite (Enterprise ERP & Workflows)</option>
                  <option value="Lavida Health Buddy">Lavida Health Buddy (AI Symptom Triage Tool)</option>
                  <option value="KSM Autos">KSM Autos (Luxury Online Garage & Concierge)</option>
                </optgroup>
                <optgroup label="Engineering & Creative Services">
                  <option value="AI & ML Solutions">AI & ML Solutions (Neural Models/LLM)</option>
                  <option value="Software Development">Software Development (Custom/Cloud/Mobile)</option>
                  <option value="Cybersecurity">Cybersecurity (Zero-Trust & Threat Defense)</option>
                  <option value="Robotics">Robotics & Autonomous Systems (ROS 2)</option>
                  <option value="Hardware Solutions">Hardware Solutions (GPU/Edge Racks)</option>
                  <option value="Network Services">Network Services (Zero-Trust 800Gbps Mesh)</option>
                  <option value="Project Management">Project Management (Scaled Agile Governance)</option>
                  <option value="Graphic Design">Graphic Design & Creative Brand Studio</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 mb-1 font-medium">
                Project Spec / Requirements
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Details regarding your infrastructure, desired stack, or architectural goals..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#E5252A] resize-none shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-[#E5252A] hover:bg-[#d01e23] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E5252A]/25"
            >
              {isSubmitting ? (
                <span>Confirming Booking...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Confirm Architecture Review</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-neutral-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                NDA Protected
              </span>
              <span>Direct: +1-800-123-4567</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
