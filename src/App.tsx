import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { ConsultationProvider } from './context/ConsultationContext';
import { lazyRoute } from './lib/route-modules';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

// Home and 404 stay in the entry chunk; every other page is fetched on first
// visit. The Suspense boundary lives inside RootLayout so the header and
// footer do not disappear while a route chunk loads. lazyRoute() checks the
// preload cache first, which keeps the initial hydration synchronous.
const About = lazyRoute('/about');
const Services = lazyRoute('/services');
const Products = lazyRoute('/products');
const CaseStudiesPage = lazyRoute('/case-studies');
const Contact = lazyRoute('/contact');
const Privacy = lazyRoute('/privacy');
const Terms = lazyRoute('/terms');
const Refunds = lazyRoute('/refunds');

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
