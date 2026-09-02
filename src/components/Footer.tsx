import React from 'react';
import { BrandLogo } from './BrandLogo';
import {
  Phone,
  Mail,
  Globe,
  ArrowUp,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  Server,
  Network,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 dark:bg-[#050608] border-t border-slate-800 dark:border-neutral-800/90 text-slate-400 dark:text-neutral-400 text-xs relative z-10 transition-colors">
      {/* Top Banner with Slogan */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800/80 dark:border-neutral-800/60">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div>
            <BrandLogo size="lg" withTagline={true} invertedText={true} />
            <p className="mt-3 text-slate-400 dark:text-neutral-400 max-w-xl text-xs sm:text-sm">
              Powering a smarter, connected tomorrow. Sovereign AI neural architectures, full-lifecycle custom software development, high-density silicon rigs, and zero-trust global networks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="p-3 rounded-xl bg-slate-900 dark:bg-neutral-900 border border-slate-800 dark:border-neutral-800 text-left font-mono shadow-sm">
              <div className="text-[10px] text-slate-500 dark:text-neutral-500">DIRECT ENTERPRISE DESK:</div>
              <a href="tel:+18001234567" className="text-sm font-bold text-white hover:text-[#E5252A] transition-colors">
                +1-800-123-4567
              </a>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 dark:bg-neutral-900 border border-slate-800 dark:border-neutral-800 text-left font-mono shadow-sm">
              <div className="text-[10px] text-slate-500 dark:text-neutral-500">SUPPORT & SALES:</div>
              <a href="mailto:info@freizytech.com" className="text-sm font-bold text-white hover:text-[#E5252A] transition-colors">
                info@freizytech.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Link Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Col 1 - Products */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5252A]" />
              <span>Flagship Products</span>
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400 dark:text-neutral-400">
              <li><a href="#products" className="hover:text-white transition-colors font-medium text-slate-300 dark:text-neutral-200">Freizy Omnia Suite</a></li>
              <li><a href="#products" className="hover:text-white transition-colors font-medium text-slate-300 dark:text-neutral-200">Lavida Health Buddy</a></li>
              <li><a href="#products" className="hover:text-white transition-colors font-medium text-slate-300 dark:text-neutral-200">KSM Autos</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Enterprise Sandbox Demo</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Product SLA & Support</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">
              AI & Cognition
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400 dark:text-neutral-400">
              <li><a href="#services" className="hover:text-white transition-colors">Neural Foundation Models</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Computer Vision & Edge AI</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Autonomous Agent Swarms</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Private Enterprise RAG</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Cyber Threat Defense</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">
              Software & Systems
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400 dark:text-neutral-400">
              <li><a href="#software" className="hover:text-white transition-colors">Custom Software Solutions</a></li>
              <li><a href="#software" className="hover:text-white transition-colors">Web & Mobile Apps (iOS/Android)</a></li>
              <li><a href="#software" className="hover:text-white transition-colors">Robotics (ROS 2 / Kinematics)</a></li>
              <li><a href="#software" className="hover:text-white transition-colors">Agile Project Management</a></li>
              <li><a href="#software" className="hover:text-white transition-colors">UI/UX & Graphic Design</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">
              Hardware & Mesh
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400 dark:text-neutral-400">
              <li><a href="#hardware" className="hover:text-white transition-colors">Matrix-X GPU Compute Racks</a></li>
              <li><a href="#hardware" className="hover:text-white transition-colors">EdgeNode Pro Rugged Units</a></li>
              <li><a href="#hardware" className="hover:text-white transition-colors">Zero-Trust 800Gbps Mesh</a></li>
              <li><a href="#hardware" className="hover:text-white transition-colors">IoT Sensor Gateways</a></li>
              <li><a href="#hardware" className="hover:text-white transition-colors">Direct Liquid Cooling</a></li>
            </ul>
          </div>

          {/* Col 5 */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">
              Trust & Governance
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400 dark:text-neutral-400">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SOC 2 Type II Certified</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ISO/IEC 27001 Certified</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300 dark:text-neutral-300">
                <span>HIPAA & GDPR Compliant</span>
              </li>
              <li><a href="#contact" className="hover:text-white transition-colors">Security Incident Disclosure</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Privacy Policy & Terms</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-slate-800/80 dark:border-neutral-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-neutral-500 font-mono">
          <div>
            © {new Date().getFullYear()} Freizy Technologies. All rights reserved. Innovation Builds Tomorrow.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors">www.freizytech.com</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1 border border-slate-800 dark:border-neutral-800"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
