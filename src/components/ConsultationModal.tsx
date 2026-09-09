import { useState, useEffect, useRef, type FC, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { submitEnquiry } from '../lib/contact';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialNotes?: string;
}

export const ConsultationModal: FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialService = 'General enquiry',
  initialNotes = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService);
  const [notes, setNotes] = useState(initialNotes);
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const startedAt = useRef(Date.now());

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitEnquiry({
        name,
        email,
        topic: service,
        message: notes,
        website: honeypot,
        startedAt: startedAt.current,
      });
      setDone(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (initialService) setService(initialService);
    if (initialNotes) setNotes(initialNotes);
  }, [initialService, initialNotes]);

  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>('input, select, textarea')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]'
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
    return () => {
      window.removeEventListener('keydown', onKey);
      (previouslyFocused.current as HTMLElement | null)?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const inputCls =
    'w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] dark:bg-white/5 border border-transparent focus:border-[#ed1c24] focus:bg-white dark:focus:bg-black focus:outline-none text-[14px] text-[#1d1d1f] dark:text-white placeholder-[#86868b]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-[520px] rounded-t-2xl sm:rounded-2xl bg-white dark:bg-[#1d1d1f] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/5 dark:bg-white/10 text-[#6e6e73] dark:text-neutral-300 focus-visible:ring-2 focus-visible:ring-[#ed1c24] focus-visible:ring-offset-2"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {done ? (
          <div className="py-8 text-center">
            <h3 className="text-[20px] font-semibold text-[#1d1d1f] dark:text-white">Thanks{name ? `, ${name}` : ''}.</h3>
            <p className="mt-2 text-[14px] text-[#424245] dark:text-neutral-400">
              We'll reply to {email || 'your email'} within one business day.
            </p>
            <button onClick={onClose} className="mt-6 px-5 py-2 rounded-full bg-[#ed1c24] text-white text-[14px] font-medium">
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-[22px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white">Talk to our team</h3>
            <p className="mt-1 text-[14px] text-[#6e6e73] dark:text-neutral-400">
              Leave your details — a real person replies, usually within a day.
            </p>
            <form
              className="mt-6 space-y-3"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="consult-name" className="sr-only">Your name</label>
                <input id="consult-name" required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor="consult-email" className="sr-only">Work email</label>
                <input id="consult-email" required type="email" placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor="consult-topic" className="sr-only">Service</label>
                <select id="consult-topic" value={service} onChange={(e) => setService(e.target.value)} className={inputCls}>
                <option>General enquiry</option>
                <option>Applied AI</option>
                <option>Software development</option>
                <option>Cybersecurity</option>
                <option>Robotics & automation</option>
                <option>Hardware & servers</option>
                <option>Networks</option>
                <option>Project management</option>
                <option>Digital marketing</option>
                <option>Product demo</option>
              </select>
              </div>
              <div>
                <label htmlFor="consult-notes" className="sr-only">Message</label>
                <textarea id="consult-notes" rows={4} placeholder="A sentence or two about what you need" value={notes} onChange={(e) => setNotes(e.target.value)} className={`${inputCls} resize-none`} />
              </div>
              <div className="hidden" aria-hidden="true">
                <label>
                  Website
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
              </div>
              {submitError && (
                <div role="alert" className="p-3.5 bg-[#ed1c24]/10 border border-[#ed1c24]/30 text-[13px] leading-relaxed text-[#1d1d1f] dark:text-neutral-200">
                  {submitError} You can also reach us on{' '}
                  <a href="https://wa.me/233240352196" target="_blank" rel="noopener noreferrer" className="link-arrow">WhatsApp</a>{' '}
                  or <a href="mailto:info@freizy.com" className="link-arrow">email</a>.
                </div>
              )}
              <button type="submit" disabled={isSubmitting} className="w-full py-2.5 rounded-full bg-[#ed1c24] hover:bg-[#c41218] text-white text-[15px] font-medium disabled:opacity-60">
                {isSubmitting ? 'Sending…' : 'Request a call back'}
              </button>
              <p className="text-center text-[12px] text-[#86868b]">No spam. No shared details. Ever.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
