import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`${selector}[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/**
 * Per-route title / description / canonical / OG tags.
 * Home defaults live in index.html; every other page calls this on mount.
 */
export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMeta('meta', 'name', 'description', description);
    setMeta('meta', 'property', 'og:title', title);
    setMeta('meta', 'property', 'og:description', description);
    setMeta('meta', 'property', 'og:url', `https://freizy.com${path}`);
    setMeta('meta', 'name', 'twitter:title', title);
    setMeta('meta', 'name', 'twitter:description', description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://freizy.com${path}`);
  }, [title, description, path]);
}
