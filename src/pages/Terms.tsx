import { type FC } from 'react';
import { LegalPage } from '../components/layout/LegalPage';

export const Terms: FC = () => (
  <LegalPage
    title="Terms of Service"
    updated="Last updated: October 2026"
    description="Terms governing Freizy Technologies services: quotes and payment, your responsibilities, intellectual property, confidentiality, liability and governing law (Ghana)."
    path="/terms"
    sections={[
      {
        heading: '1. Our services',
        body: 'Freizy Technologies provides software development, applied AI, cybersecurity, robotics, hardware supply and network services, as described in a written proposal or agreement. Website descriptions are illustrative; the proposal governs where they differ.',
      },
      {
        heading: '2. Quotes and payment',
        body: 'Work begins after you accept a written quote. Fixed-price phases are invoiced on milestones; monthly support is billed in advance. Late payments may pause scheduled work after written notice.',
      },
      {
        heading: '3. Your responsibilities',
        body: 'You agree to provide timely access, content and decisions needed for delivery, and to confirm you hold the rights to any material you supply to us.',
      },
      {
        heading: '4. Intellectual property',
        body: 'On full payment, you own the custom work product built for you, excluding our pre-existing tools, libraries and product platforms (such as Omnia Suite), which remain ours and are licensed to you as agreed.',
      },
      {
        heading: '5. Confidentiality',
        body: 'Each party keeps the other\u2019s confidential information private and uses it only to deliver the engagement. Enquiries sent through this site are treated as confidential.',
      },
      {
        heading: '6. Liability',
        body: 'To the extent permitted by law, our liability is limited to the fees paid for the affected engagement. We are not liable for indirect or consequential losses.',
      },
      {
        heading: '7. Refunds and cancellations',
        body: 'Refund rules for services, subscriptions and each product are set out in our Refund & Cancellation Policy, which forms part of these terms.',
      },
      {
        heading: '8. Governing law',
        body: 'These terms are governed by the laws of Ghana. Disputes will first be addressed through good-faith discussion in Accra.',
      },
      {
        heading: '9. Contact',
        body: 'Questions about these terms: info@freizy.com, +233 24 035 2196.',
      },
    ]}
  />
);
