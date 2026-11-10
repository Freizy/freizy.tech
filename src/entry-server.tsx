import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { preloadAllRoutes } from './lib/route-modules';

/**
 * Render one URL to full HTML at build time.
 *
 * Every non-home route chunk is resolved before rendering so no Suspense
 * boundary has to fall back. `renderToString` is deliberate: the streaming
 * renderers append an inline bootstrap script for suspended boundaries, and
 * the strict `script-src 'self'` CSP in public/_headers would block it.
 */
export async function render(url: string): Promise<string> {
  await preloadAllRoutes();

  return renderToString(
    <ErrorBoundary>
      <ThemeProvider>
        <MemoryRouter initialEntries={[url]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
