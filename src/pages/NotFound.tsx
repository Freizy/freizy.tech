import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import pageMeta from '../data/page-meta.json';

export const NotFound: FC = () => {
  usePageMeta({ ...pageMeta.notFound, noindex: true });

  return (
    <section className="py-28 sm:py-36 bg-white dark:bg-[#0a0a0c] transition-colors">
      <div className="max-w-[1160px] mx-auto px-5 text-center">
        <p className="eyebrow mb-5">404</p>
        <h1 className="text-[36px] sm:text-[48px] font-semibold tracking-tight leading-[1.1]">
          This page does not exist.
        </h1>
        <p className="mt-4 text-[16px] text-[#6e6e73] dark:text-neutral-400 max-w-[440px] mx-auto">
          The link may be old, or the address was typed wrong.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-primary">Back to home</Link>
          <Link to="/contact" className="btn btn-outline">Contact us</Link>
        </div>
      </div>
    </section>
  );
};
