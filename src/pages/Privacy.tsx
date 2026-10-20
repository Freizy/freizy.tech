import { type FC } from 'react';
import { LegalPage } from '../components/layout/LegalPage';

export const Privacy: FC = () => (
  <LegalPage
    title="Privacy Policy"
    updated="Last updated: October 2026"
    description="How Freizy Technologies collects, uses, shares and protects personal data — and your rights to access, correct or delete it."
    path="/privacy"
    sections={[
      {
        heading: '1. What we collect',
        body: 'When you contact us or request a demo, we collect your name, email, company and anything you include in your message. Our products process only the data needed to provide the requested service.',
      },
      {
        heading: '2. How we use it',
        body: 'We use your details to respond to enquiries, prepare proposals and deliver contracted work. We do not sell personal data and we send no marketing without consent.',
      },
      {
        heading: '3. Sharing',
        body: 'We share data only with service providers essential to delivery (for example hosting or payment processors), bound by confidentiality, or where required by Ghanaian law.',
      },
      {
        heading: '4. Retention',
        body: 'Enquiry records are kept for up to 24 months. Client project records follow the retention terms in the applicable agreement.',
      },
      {
        heading: '5. Your rights',
        body: 'You may request access, correction or deletion of your personal data at any time by writing to info@freizy.com. We respond within 30 days.',
      },
      {
        heading: '6. Security',
        body: 'We apply access controls, encryption in transit and need-to-know handling to personal data. No method is perfectly secure, and we will notify affected individuals of any material breach.',
      },
      {
        heading: '7. Cookies and analytics',
        body: 'This website uses privacy-friendly analytics that set no cookies and track no individuals. We do not run advertising trackers or cross-site profiling.',
      },
      {
        heading: '8. Governing law',
        body: 'This policy is governed by the laws of Ghana, including the Data Protection Act, 2012 (Act 843).',
      },
    ]}
  />
);
