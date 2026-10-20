import { type FC, type ReactNode } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { PageHeader } from './PageHeader';

interface LegalPageProps {
  title: string;
  updated: string;
  description: string;
  path: string;
  sections: { heading: string; body: string | ReactNode }[];
}

export const LegalPage: FC<LegalPageProps> = ({ title, updated, description, path, sections }) => {
  usePageMeta({ title: `${title} | Freizy Technologies`, description, path });

  return (
    <>
      <PageHeader eyebrow="Legal" title={title} lede={updated} />
      <section className="py-16 sm:py-20 bg-white dark:bg-[#0a0a0c] transition-colors">
        <div className="max-w-[760px] mx-auto px-5 prose-legal">
          {sections.map((s) => (
            <div key={s.heading} className="mb-7">
              <h3>{s.heading}</h3>
              <p>{s.body}</p>
            </div>
          ))}
          <div className="mt-10 pt-6 border-t border-black/10 dark:border-white/10 text-[13px] text-[#6e6e73] dark:text-neutral-500">
            Questions:{' '}
            <a href="mailto:info@freizy.com" className="link-arrow">info@freizy.com</a>
            {' · '}
            <a href="tel:+233240352196" className="link-arrow">+233 24 035 2196</a>
            {' · '}Freizy Technologies, Accra, Ghana
          </div>
        </div>
      </section>
    </>
  );
};
