import { useEffect } from 'react';

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  /** Keep the page out of search results (used by the 404 page). */
  noindex?: boolean;
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
 * The same values live in src/data/page-meta.json so the post-build
 * prerender step can write them into static HTML for crawlers.
 */
export function usePageMeta({ title, description, path, noindex = false }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMeta('meta', 'name', 'description', description);
    setMeta('meta', 'property', 'og:title', title);
    setMeta('meta', 'property', 'og:description', description);
    setMeta('meta', 'property', 'og:url', `https://freizy.com${path}`);
    setMeta('meta', 'name', 'twitter:title', title);
    setMeta('meta', 'name', 'twitter:description', description);

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.setAttribute('name', 'robots');
        document.head.appendChild(robots);
      }
      robots.setAttribute('content', 'noindex, follow');
    } else if (robots) {
      robots.setAttribute('content', 'index, follow');
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (noindex) {
      canonical?.remove();
      return;
    }
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://freizy.com${path}`);
  }, [title, description, path, noindex]);
}
