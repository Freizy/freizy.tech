import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const HardwareNetworkShowcase: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yLeft = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const yRight = useTransform(scrollYProgress, [0, 1], [48, -48]);

  return (
    <section ref={ref} id="hardware" className="py-20 sm:py-28 bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[680px] mb-12"
        >
          <p className="eyebrow mb-3">Infrastructure</p>
          <h2 className="text-[32px] sm:text-[48px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white leading-[1.08]">
            The hardware and network, handled.
          </h2>
          <p className="mt-4 text-[17px] text-[#424245] dark:text-neutral-400 leading-relaxed">
            We specify, install and document office systems, servers and
            networks — and pick up the phone when something stops working.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div style={{ y: yLeft }} className="parallax-layer">
            <motion.div
              initial={{ opacity: 0, y: 28, clipPath: 'inset(6% 3% 6% 3%)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="clip-reveal apple-panel rounded-2xl p-7 h-full"
            >
              <h3 className="text-[19px] font-semibold text-[#1d1d1f] dark:text-white mb-2">Hardware we supply & support</h3>
              <ul className="space-y-2.5 mt-4">
                {[
                  'Office workstations and laptops, set up ready to use',
                  'Servers and storage for on-site systems',
                  'CCTV, access control and basic IoT where needed',
                ].map((li) => (
                  <li key={li} className="text-[14px] text-[#424245] dark:text-neutral-300 flex gap-2">
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-[#6e6e73] flex-shrink-0" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          <motion.div style={{ y: yRight }} className="parallax-layer">
            <motion.div
              initial={{ opacity: 0, y: 28, clipPath: 'inset(6% 3% 6% 3%)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="clip-reveal apple-panel rounded-2xl p-7 h-full"
            >
              <h3 className="text-[19px] font-semibold text-[#1d1d1f] dark:text-white mb-2">Networks we install</h3>
              <ul className="space-y-2.5 mt-4">
                {[
                  'Structured cabling, Wi-Fi surveys and installation',
                  'Firewalls, VPNs and guest networks',
                  'Monitoring and a written network map you keep',
                ].map((li) => (
                  <li key={li} className="text-[14px] text-[#424245] dark:text-neutral-300 flex gap-2">
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-[#6e6e73] flex-shrink-0" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
