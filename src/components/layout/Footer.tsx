import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../BrandLogo';

/**
 * Product links for the footer. Stays first, Omnia last, matching the
 * showcase order. Live products go to their own site; the rest go to their
 * static product page. Plain anchors are required here: the /products/{slug}/
 * pages are prerendered HTML, not React Router routes.
 */
const products = [
  { name: 'Stays', href: 'https://stays.freizy.com', external: true },
  { name: 'Lavida Health Buddy', href: 'https://lavida2.netlify.app', external: true },
  { name: 'KSM Autos', href: 'https://ksm.autos', external: true },
  { name: 'Exams Suite', href: '/products/exams-suite/', external: false },
  { name: 'Oudy', href: '/products/oudy-events/', external: false },
  { name: 'Omnia Suite', href: '/products/omnia-suite/', external: false },
];

export const Footer: FC = () => {
  return (
    <footer className="bg-[#0b0b0d] text-white border-t-2 border-[#ed1c24] transition-colors">
      <div className="max-w-[1160px] mx-auto px-5 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-[13px]">
          <div className="col-span-2 md:col-span-1">
            <BrandLogo size="sm" invertedText />
            <p className="mt-4 text-neutral-400 leading-relaxed max-w-[240px]">
              Software, AI and infrastructure — designed, built and supported by one team in Accra, Ghana.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#ff6b70] mb-4">Services</div>
            <ul className="space-y-2.5 text-neutral-400">
              <li><Link to="/services#ai" className="hover:text-white transition-colors">Applied AI</Link></li>
              <li><Link to="/services#software" className="hover:text-white transition-colors">Software development</Link></li>
              <li><Link to="/services#services" className="hover:text-white transition-colors">Cybersecurity</Link></li>
              <li><Link to="/services#hardware" className="hover:text-white transition-colors">Hardware & networks</Link></li>
              <li><Link to="/services#process" className="hover:text-white transition-colors">Project management</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#ff6b70] mb-4">Products</div>
            <ul className="space-y-2.5 text-neutral-400">
              {products.map((product) => (
                <li key={product.name}>
                  <a
                    href={product.href}
                    target={product.external ? '_blank' : undefined}
                    rel={product.external ? 'noopener noreferrer' : undefined}
                    className="hover:text-white transition-colors"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#ff6b70] mb-4">Company</div>
            <ul className="space-y-2.5 text-neutral-400">
              <li>Sales: <a href="tel:+233240352196" className="hover:text-white transition-colors">+233 24 035 2196</a></li>
              <li>Support: <a href="tel:+233266242703" className="hover:text-white transition-colors">+233 26 624 2703</a></li>
              <li><a href="mailto:info@freizy.com" className="hover:text-white transition-colors">info@freizy.com</a></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/case-studies" className="hover:text-white transition-colors">Case studies</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-[12px] text-neutral-400">
          <span>© {new Date().getFullYear()} Freizy Technologies. All rights reserved.</span>
          <span className="flex gap-5">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/refunds" className="hover:text-white transition-colors">Refunds</Link>
          </span>
        </div>
      </div>
    </footer>
  );
};
