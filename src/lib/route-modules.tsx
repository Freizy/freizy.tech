import { lazy, type ComponentType } from 'react';

type RouteComponent = ComponentType;

/**
 * Every non-home page is still a separate chunk, but the initial route's
 * chunk is resolved before hydration (see src/main.tsx). `lazyRoute` checks
 * the cache synchronously so the first client render matches the server HTML
 * instead of suspending and discarding it.
 */
const loaders: Record<string, () => Promise<RouteComponent>> = {
  '/about': () => import('../pages/About').then((m) => m.About),
  '/services': () => import('../pages/Services').then((m) => m.Services),
  '/products': () => import('../pages/Products').then((m) => m.Products),
  '/case-studies': () => import('../pages/CaseStudies').then((m) => m.CaseStudiesPage),
  '/contact': () => import('../pages/Contact').then((m) => m.Contact),
  '/privacy': () => import('../pages/Privacy').then((m) => m.Privacy),
  '/terms': () => import('../pages/Terms').then((m) => m.Terms),
  '/refunds': () => import('../pages/Refunds').then((m) => m.Refunds),
};

const loaded = new Map<string, RouteComponent>();

export function normalisePath(pathname: string): string {
  const path = pathname.replace(/\/+$/, '');
  return path === '' ? '/' : path;
}

export async function preloadRoute(pathname: string): Promise<void> {
  const path = normalisePath(pathname);
  const loader = loaders[path];
  if (!loader || loaded.has(path)) return;

  try {
    loaded.set(path, await loader());
  } catch {
    // Leave the cache empty; the React.lazy wrapper below retries and lets
    // the ErrorBoundary handle a genuine chunk failure.
  }
}

/**
 * Resolve every route up front for the build-time render. Unlike
 * preloadRoute, failures propagate so a broken page fails the build instead
 * of quietly shipping a loading fallback.
 */
export async function preloadAllRoutes(): Promise<void> {
  await Promise.all(
    Object.entries(loaders).map(async ([path, loader]) => {
      if (!loaded.has(path)) loaded.set(path, await loader());
    })
  );
}

export function lazyRoute(path: string) {
  const loader = loaders[path];
  if (!loader) throw new Error(`No route loader registered for ${path}`);

  const Lazy = lazy(() =>
    loader().then((Component) => {
      loaded.set(path, Component);
      return { default: Component };
    })
  );

  const RouteComponent = () => {
    const Cached = loaded.get(path);
    return Cached ? <Cached /> : <Lazy />;
  };

  return RouteComponent;
}
