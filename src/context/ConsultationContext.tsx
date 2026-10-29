import { createContext, useContext, useState, useCallback, type FC, type ReactNode } from 'react';
import { ConsultationModal, consultationTopics } from '../components/ConsultationModal';

interface ConsultationContextType {
  openConsultation: (topic?: string) => void;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);
const serviceTopics = new Set<string>(consultationTopics);

export const ConsultationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState('General enquiry');
  const [notes, setNotes] = useState('');

  const openConsultation = useCallback((t?: string) => {
    const value = t?.trim();
    if (!value || serviceTopics.has(value)) {
      setTopic(value || 'General enquiry');
      setNotes('');
    } else {
      // Product-specific CTA (e.g. "Freizy Omnia Suite"): the select only has
      // service categories, so open a product demo and put the product in the
      // message instead of silently falling back to "General enquiry".
      setTopic('Product demo');
      setNotes(`I'd like a demo of ${value}.`);
    }
    setOpen(true);
  }, []);

  return (
    <ConsultationContext.Provider value={{ openConsultation }}>
      {children}
      {open && (
        <ConsultationModal
          isOpen
          onClose={() => setOpen(false)}
          initialService={topic}
          initialNotes={notes}
        />
      )}
    </ConsultationContext.Provider>
  );
};

export const useConsultation = (): ConsultationContextType => {
  const ctx = useContext(ConsultationContext);
  if (!ctx) throw new Error('useConsultation must be used within ConsultationProvider');
  return ctx;
};
