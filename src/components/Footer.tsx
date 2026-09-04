import React from 'react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f5f5f7] dark:bg-[#0b0b0d] border-t border-black/10 dark:border-white/10 transition-colors">
      <div className="max-w-[1120px] mx-auto px-5 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-[13px]">
          <div className="col-span-2 md:col-span-1">
            <BrandLogo size="sm" />
            <p className="mt-3 text-[#6e6e73] dark:text-neutral-500 leading-relaxed">
              Software, AI and infrastructure — designed, built and supported by one team.
            </p>
          </div>
          <div>
            <div className="font-medium text-[#1d1d1f] dark:text-white mb-3">Services</div>
            <ul className="space-y-2 text-[#424245] dark:text-neutral-400">
              <li><a href="#services" className="hover:underline">Applied AI</a></li>
              <li><a href="#services" className="hover:underline">Software development</a></li>
              <li><a href="#services" className="hover:underline">Cybersecurity</a></li>
              <li><a href="#services" className="hover:underline">Robotics & automation</a></li>
              <li><a href="#services" className="hover:underline">Hardware & servers</a></li>
              <li><a href="#services" className="hover:underline">Networks</a></li>
              <li><a href="#services" className="hover:underline">Project management</a></li>
              <li><a href="#services" className="hover:underline">Digital marketing</a></li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-[#1d1d1f] dark:text-white mb-3">Products</div>
            <ul className="space-y-2 text-[#424245] dark:text-neutral-400">
              <li><a href="https://omnia.freizy.tech" target="_blank" rel="noopener noreferrer" className="hover:underline">Freizy Omnia Suite</a></li>
              <li><a href="https://lavida2.netlify.app" target="_blank" rel="noopener noreferrer" className="hover:underline">Lavida Health Buddy</a></li>
              <li><a href="https://ksm.autos" target="_blank" rel="noopener noreferrer" className="hover:underline">KSM Autos</a></li>
              <li><a href="#products" className="hover:underline">Freizy Exams Suite</a></li>
              <li><a href="#products" className="hover:underline">Oudy — Events App</a></li>
              <li><a href="#products" className="hover:underline">Freizy Hostel Hub</a></li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-[#1d1d1f] dark:text-white mb-3">Contact</div>
            <ul className="space-y-2 text-[#424245] dark:text-neutral-400">
              <li>Sales: <a href="tel:+233240352196" className="hover:underline">+233 24 035 2196</a></li>
              <li>Support: <a href="tel:+233266242703" className="hover:underline">+233 26 624 2703</a></li>
              <li><a href="mailto:info@freizy.tech" className="hover:underline">info@freizy.tech</a></li>
              <li><a href="https://freizy.tech" target="_blank" rel="noopener noreferrer" className="hover:underline">freizy.tech</a></li>
              <li><a href="#contact" className="hover:underline">Request a call</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-[12px] text-[#6e6e73] dark:text-neutral-500">
          <span>© {new Date().getFullYear()} Freizy Technologies. All rights reserved.</span>
          <span className="flex gap-4">
            <a href="#contact" className="hover:underline">Privacy</a>
            <a href="#contact" className="hover:underline">Terms</a>
            <a href="#hero" className="hover:underline">Back to top</a>
          </span>
        </div>
      </div>
    </footer>
  );
};
