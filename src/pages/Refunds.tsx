import { type FC } from 'react';
import { LegalPage } from '../components/layout/LegalPage';

export const Refunds: FC = () => (
  <LegalPage
    title="Refund & Cancellation Policy"
    updated="Last updated: October 2026"
    description="Freizy Technologies refund rules for services, subscriptions, Freizy Stays, Oudy and other products — how to request one and when refunds are refused."
    path="/refunds"
    sections={[
      {
        heading: 'General principles',
        body: 'Product-specific terms (Stays, Oudy, Omnia) override this policy where they state a specific rule. Approved refunds are made to the original payment method within 14 days (bank/MoMo processing may add 1\u20133 days). Questions: info@freizy.com — we answer within 3 business days.',
      },
      {
        heading: '1. Services (custom development & consulting)',
        body: 'Before work starts: your deposit is refundable minus any work actually performed and committed costs (e.g. third-party licences purchased for you). During a milestone project, fees for completed and accepted milestones are non-refundable; work in progress at cancellation is charged pro-rata for time spent, up to the remaining milestone value. Defects in delivered code are fixed free within the warranty period in your agreement (typically 90 days); issues not caused by us are quoted separately.',
      },
      {
        heading: '2. Digital products & subscriptions (Omnia Suite and similar)',
        body: 'Monthly plans: cancel any time before the next billing date; the current month is non-refundable and service continues to period end. Annual plans: full refund if requested within 14 days of first payment with minimal usage; after 14 days, refunds for unused full months are considered at our discretion for genuine issues only. Setup and migration fees are non-refundable once work begins.',
      },
      {
        heading: '3. Freizy Stays',
        body: 'Booking and deposit rules are stated in the Stays terms at checkout. Refunds follow the published cancellation window and property-partner policy shown before payment; where a listing is materially misrepresented, we mediate a fair resolution.',
      },
      {
        heading: '4. Oudy (events)',
        body: 'Event cancelled by the organiser: full refund of ticket price (including fees) within 14 days. Event postponed: request a full refund within 7 days of the announcement, or keep the ticket for the new date. Attendee cancellation: per the organiser\u2019s policy on the event page; if none is stated, refundable up to 7 days before the event, minus a 5% processing fee.',
      },
      {
        heading: '5. KSM Autos / Lavida / Exams',
        body: 'Charges for listings, subscriptions and institutional fees follow each product\u2019s terms. If a paid service is unusable due to our fault, you choose a refund or credit within 14 days of a verified fault.',
      },
      {
        heading: '6. When we may refuse a refund',
        body: 'Where the service was delivered as agreed and accepted; where the request is fraudulent or abusive; where a chargeback is opened while we are actively resolving an issue; or more than 30 days have passed since an issue arose (for digital goods), unless the law says otherwise.',
      },
      {
        heading: '7. Chargebacks',
        body: 'Please contact us first — most issues resolve in days. Opening a chargeback suspends the disputed service while we investigate.',
      },
      {
        heading: '8. Your statutory rights',
        body: 'This policy does not limit rights you have under Ghanaian consumer protection law or any mandatory law that cannot be waived.',
      },
    ]}
  />
);
