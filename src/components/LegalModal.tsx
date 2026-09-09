import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export type LegalKind = 'terms' | 'privacy';

interface LegalModalProps {
  open: LegalKind | null;
  onClose: () => void;
}

const CONTENT: Record<LegalKind, { title: string; updated: string; sections: { heading: string; body: string }[] }> = {
  terms: {
    title: 'Terms of Service',
    updated: 'Last updated: September 2026',
    sections: [
      {
        heading: '1. Our services',
        body: 'Freizy Technologies provides software development, applied AI, cybersecurity, robotics, hardware supply and network services, as described in a written proposal or agreement. Website descriptions are illustrative; the proposal governs where they differ.',
      },
      {
        heading: '2. Quotes and payment',
        body: 'Work begins after you accept a written quote. Fixed-price phases are invoiced on milestones; monthly support is billed in advance. Late payments may pause scheduled work after written notice.',
      },
      {
        heading: '3. Your responsibilities',
        body: 'You agree to provide timely access, content and decisions needed for delivery, and to confirm you hold the rights to any material you supply to us.',
      },
      {
        heading: '4. Intellectual property',
        body: 'On full payment, you own the custom work product built for you, excluding our pre-existing tools, libraries and product platforms (such as Omnia Suite), which remain ours and are licensed to you as agreed.',
      },
      {
        heading: '5. Confidentiality',
        body: 'Each party keeps the other\u2019s confidential information private and uses it only to deliver the engagement. Enquiries sent through this site are treated as confidential.',
      },
      {
        heading: '6. Liability',
        body: 'To the extent permitted by law, our liability is limited to the fees paid for the affected engagement. We are not liable for indirect or consequential losses.',
      },
      {
        heading: '7. Governing law',
        body: 'These terms are governed by the laws of Ghana. Disputes will first be addressed through good-faith discussion in Accra.',
      },
      {
        heading: '8. Contact',
        body: 'Questions about these terms: info@freizy.com, +233 24 035 2196.',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: September 2026',
    sections: [
      {
        heading: '1. What we collect',
        body: 'When you contact us or request a demo, we collect your name, email, company and anything you include in your message. Our products process only the data needed to provide the requested service.',
      },
      {
        heading: '2. How we use it',
        body: 'We use your details to respond to enquiries, prepare proposals and deliver contracted work. We do not sell personal data and we send no marketing without consent.',
      },
      {
        heading: '3. Sharing',
        body: 'We share data only with service providers essential to delivery (for example hosting or payment processors), bound by confidentiality, or where required by Ghanaian law.',
      },
      {
        heading: '4. Retention',
        body: 'Enquiry records are kept for up to 24 months. Client project records follow the retention terms in the applicable agreement.',
      },
      {
        heading: '5. Your rights',
        body: 'You may request access, correction or deletion of your personal data at any time by writing to info@freizy.com. We respond within 30 days.',
      },
      {
        heading: '6. Security',
        body: 'We apply access controls, encryption in transit and need-to-know handling to personal data. No method is perfectly secure, and we will notify affected individuals of any material breach.',
      },
      {
        heading: '7. Contact',
        body: 'Privacy questions or requests: info@freizy.com, +233 24 035 2196.',
      },
    ],
  },
};

export const LegalModal: React.FC<LegalModalProps> = ({ open, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;
    panelRef.current?.querySelector<HTMLElement>('button')?.focus();
    const panel = panelRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      (previouslyFocused.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;
  const doc = CONTENT[open];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={doc.title}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-[560px] bg-white dark:bg-[#1d1d1f] shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/5 dark:bg-white/10 text-[#6e6e73] dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#6e6e73] dark:text-neutral-500 font-medium">
          Freizy Technologies
        </p>
        <h3 className="mt-1 text-[24px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white">
          {doc.title}
        </h3>
        <p className="mt-1 text-[12px] text-[#6e6e73] dark:text-neutral-500">{doc.updated}</p>

        <div className="mt-6 space-y-5">
          {doc.sections.map((s) => (
            <div key={s.heading}>
              <h4 className="text-[14px] font-semibold text-[#1d1d1f] dark:text-white mb-1">
                {s.heading}
              </h4>
              <p className="text-[14px] leading-relaxed text-[#424245] dark:text-neutral-400">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full py-2.5 bg-[#1d1d1f] dark:bg-white dark:text-black text-white text-[14px] font-medium hover:opacity-90 transition-opacity"
        >
          Close
        </button>
      </div>
    </div>
  );
};
