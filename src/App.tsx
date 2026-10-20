import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { ConsultationProvider } from './context/ConsultationContext';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Products } from './pages/Products';
import { CaseStudiesPage } from './pages/CaseStudies';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Refunds } from './pages/Refunds';
import { NotFound } from './pages/NotFound';

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
