'use client';

import { useState } from 'react';
import BillingToggle from './BillingToggle';
import PricingCard from './PricingCard';

const PLANS = [
  {
    name: 'Essential',
    description: 'Curated tools for casual tracking and market entry',
    cta: 'Get Started',
    featuresLabel: 'Features',
    featured: false,
    pricing: {
      monthly: { price: 'Free' },
      annually: { price: 'Free' },
    },
    features: [
      'Basic indicators and timeframes.',
      'Daily gainers, losers, and unchanged lists.',
      'Track up to 10 of your favorite stocks.',
      'Real-time balance and position monitoring.',
      'General DSE news and announcements.',
      'Basic filtering by sector and price.',
    ],
  },
  {
    name: 'Fintra+',
    description: 'Professional tools for traders who demand an advantage.',
    cta: 'Upgrade Now',
    featuresLabel: 'Everything in essential, plus',
    featured: true,
    pricing: {
      monthly: { price: '৳ 1,000', unit: '/Month' },
      annually: { price: '৳ 8,400', unit: '/Year', save: 'Save ৳3600' },
    },
    features: [
      'Direct-from-exchange market feeds with no delay.',
      'Institutional-grade indicators and drawing tools.',
      'Exclusive eligibility for instant cash to trade during settlement.',
      '50+ deep-tier filters to find hidden alpha.',
      'Access to pro-level deep dives and dividend analysis.',
      'Be the first to know about Price Sensitive Information.',
      '24/7 priority access to our dedicated assistance team.',
    ],
  },
];

export default function PricingPlans() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="flex w-full flex-col items-center gap-7.5 lg:contents">
      <BillingToggle value={billing} onChange={setBilling} />

      <div className="flex w-full flex-col-reverse items-center gap-7.5 lg:flex-row lg:flex-wrap lg:justify-center">
        {PLANS.map((plan) => {
          const { price, unit, save } = plan.pricing[billing];

          return (
            <PricingCard
              key={plan.name}
              name={plan.name}
              description={plan.description}
              price={price}
              priceUnit={unit}
              saveLabel={save}
              cta={plan.cta}
              featuresLabel={plan.featuresLabel}
              features={plan.features}
              featured={plan.featured}
            />
          );
        })}
      </div>
    </div>
  );
}
