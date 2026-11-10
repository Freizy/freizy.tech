import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { preloadRoute } from './lib/route-modules.tsx';
import './index.css';

const container = document.getElementById('root')!;

const app = (
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);

/**
 * Prerendered pages already contain the route markup. Resolve that route's
 * lazy chunk before hydrating so the wrapper in lib/route-modules can render
 * it synchronously and React keeps the server HTML. Other routes still load
 * on demand. In dev the container is empty, so this falls back to createRoot.
 */
async function start() {
  await preloadRoute(window.location.pathname);

  if (container.firstChild) {
    hydrateRoot(container, app);
  } else {
    createRoot(container).render(app);
  }
}

void start();
