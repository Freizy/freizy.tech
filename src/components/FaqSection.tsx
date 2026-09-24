import { type FC } from 'react';
import { motion } from 'motion/react';

const faqs: { q: string; a: string }[] = [
  {
    q: 'What does Freizy Technologies do?',
    a: 'We design, build and support business software, applied AI systems, and the IT infrastructure they run on — servers, networks and cybersecurity. We are based in Accra, Ghana and work with teams worldwide.',
  },
  {
    q: 'How fast will you respond to my enquiry?',
    a: 'We reply within one business day. Leave your details through the contact form or the consultation button and a real person — usually an engineer — will get back to you.',
  },
  {
    q: 'Can I try your products before committing?',
    a: 'Yes. Every product page on this site includes a live demo running on sample data, and three products (Omnia Suite, Lavida Health Buddy and KSM Autos) have public sites you can open. For the rest, request a demo and we will walk through your own workflow on a call.',
  },
  {
    q: 'Do you provide support after delivery?',
    a: 'Yes — support is our differentiator. The six products on this page are maintained by us, so help comes from the people who wrote the code, not a third-party helpdesk.',
  },
  {
    q: 'Where are you located?',
    a: 'Freizy Technologies is based in Accra, Ghana. We serve clients across Ghana and remotely worldwide. Reach sales on +233 24 035 2196 and support on +233 26 624 2703.',
  },
  {
    q: 'How do we start a project with you?',
    a: 'Start a conversation: use the contact form, tap "Talk to engineers", or message us on WhatsApp. We will scope the work with you, then design, build, deploy and support it as one accountable team.',
  },
];

/**
 * Visible FAQ using native details/summary — content is in the DOM with
 * zero JavaScript required, and mirrors the FAQPage JSON-LD in index.html.
 */
export const FaqSection: FC = () => {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#f5f5f7] dark:bg-[#0b0b0d] transition-colors">
      <div className="max-w-[1120px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[680px] mb-12"
        >
          <p className="eyebrow mb-3">FAQ</p>
          <h2 className="text-[32px] sm:text-[48px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white leading-[1.08]">
            Questions, answered.
          </h2>
        </motion.div>

        <div className="max-w-[760px] divide-y divide-black/10 dark:divide-white/10 border-y border-black/10 dark:border-white/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-[17px] font-medium text-[#1d1d1f] dark:text-white focus-visible:ring-2 focus-visible:ring-[#ed1c24] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="text-[#ed1c24] text-[22px] leading-none font-normal transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-[#424245] dark:text-neutral-400 max-w-[640px]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
