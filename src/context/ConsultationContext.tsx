import { createContext, useContext, useState, useCallback, type FC, type ReactNode } from 'react';
import { ConsultationModal } from '../components/ConsultationModal';

interface ConsultationContextType {
  openConsultation: (topic?: string) => void;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

export const ConsultationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState('General enquiry');

  const openConsultation = useCallback((t?: string) => {
    setTopic(t || 'General enquiry');
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
          initialNotes=""
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
