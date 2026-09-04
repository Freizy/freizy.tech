import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ContactSectionProps {
  initialNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialNotes = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    topic: 'General enquiry',
    message: initialNotes,
  });
  const [sent, setSent] = useState(false);

  React.useEffect(() => {
    if (initialNotes) setFormData((prev) => ({ ...prev, message: initialNotes }));
  }, [initialNotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputCls =
    'w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/15 text-[14px] text-[#1d1d1f] dark:text-white placeholder-[#86868b] focus:outline-none focus:border-[#ed1c24]';

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <p className="eyebrow mb-3">Contact</p>
            <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white leading-[1.1]">
              Tell us what you're trying to do.
            </h2>
            <p className="mt-4 text-[15px] text-[#424245] dark:text-neutral-400 leading-relaxed">
              A short message is enough. We'll reply within one business day
              and suggest a 20-minute call if it helps.
            </p>
            <div className="mt-6 space-y-2 text-[14px] text-[#424245] dark:text-neutral-300">
              <div>Sales: <a href="tel:+233240352196" className="link-arrow">+233 24 035 2196</a></div>
              <div>Support: <a href="tel:+233266242703" className="link-arrow">+233 26 624 2703</a></div>
              <div>Email: <a href="mailto:info@freizy.tech" className="link-arrow">info@freizy.tech</a></div>
              <div className="text-[#6e6e73] dark:text-neutral-500 text-[13px] pt-1">
                Prefer email? Include your timeline and budget range — it helps us reply faster.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, clipPath: 'inset(4% 3% 4% 3%)' }}
            whileInView={{ opacity: 1, x: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 clip-reveal"
          >
            <div className="apple-panel rounded-2xl p-6 sm:p-8">
              {sent ? (
                <div className="py-10 text-center">
                  <h3 className="text-[20px] font-semibold text-[#1d1d1f] dark:text-white">Thanks — message noted.</h3>
                  <p className="mt-2 text-[14px] text-[#424245] dark:text-neutral-400">
                    Hi {formData.name || 'there'}, we'll get back to {formData.email || 'you'} within one business day.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-[14px] link-arrow"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] text-[#424245] dark:text-neutral-300 mb-1.5">Name</label>
                      <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#424245] dark:text-neutral-300 mb-1.5">Work email</label>
                      <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@company.com" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] text-[#424245] dark:text-neutral-300 mb-1.5">Company <span className="text-[#86868b]">(optional)</span></label>
                      <input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Company" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#424245] dark:text-neutral-300 mb-1.5">Topic</label>
                      <select value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} className={inputCls}>
                        <option>General enquiry</option>
                        <option>Software project</option>
                        <option>Product demo (Omnia / Lavida / KSM)</option>
                        <option>Hardware or network</option>
                        <option>Support for existing work</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#424245] dark:text-neutral-300 mb-1.5">Message</label>
                    <textarea rows={5} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="What are you working on, and what does success look like?" className={`${inputCls} resize-none`} />
                  </div>
                  <button type="submit" className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#ed1c24] hover:bg-[#c41218] text-white text-[15px] font-medium transition-colors">
                    Send message
                  </button>
                  <p className="text-[12px] text-[#6e6e73] dark:text-neutral-500">
                    We treat enquiries as confidential. No newsletters, no sharing your details.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
