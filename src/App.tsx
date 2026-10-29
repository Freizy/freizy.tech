import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { ConsultationProvider } from './context/ConsultationContext';
import { Home } from './pages/Home';

// Home stays in the entry chunk; every other page is fetched on first visit.
// The Suspense boundary lives inside RootLayout so the header and footer do
// not disappear while a route chunk loads.
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const Products = lazy(() => import('./pages/Products').then((m) => ({ default: m.Products })));
const CaseStudiesPage = lazy(() =>
  import('./pages/CaseStudies').then((m) => ({ default: m.CaseStudiesPage }))
);
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const Privacy = lazy(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then((m) => ({ default: m.Terms })));
const Refunds = lazy(() => import('./pages/Refunds').then((m) => ({ default: m.Refunds })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

export default function App() {
  return (
    <ConsultationProvider>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refunds" element={<Refunds />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ConsultationProvider>
  );
}
