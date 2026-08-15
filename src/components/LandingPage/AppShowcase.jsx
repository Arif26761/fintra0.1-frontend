'use client';

import { useEffect, useState } from 'react';
import AppShowcaseDesktop from './AppShowcaseDesktop';
import AppShowcaseMobile from './AppShowcaseMobile';

const ITEMS = [
  {
    title: 'Trade Fast, Trade Easy',
    description: 'Master the market with a high-velocity interface built for decisive action.',
    image: '/images/app-buysell.png',
  },
  {
    title: 'Instant Portfolio Insights',
    description:
      "Transform raw data into clarity with real-time analytics of your wealth's performance.",
    image: '/images/app-portfolio.png',
  },
  {
    title: 'Track Your Favorite Stocks',
    description: 'Keep an eye on the assets that drive your strategy with custom watchlists.',
    image: '/images/app-favstocks.png',
  },
  {
    title: 'Your Trading Hub at a Glance',
    description:
      'A unified dashboard that centralizes every critical metric into one powerful view',
    image: '/images/app-hub.png',
  },
];

export default function AppShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Disable auto-play if reduced-motion is requested. This is also what keeps the
    // pixel diff deterministic — the harness sets reducedMotion:'reduce', so capture
    // always happens with active === 0.
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (mediaQuery?.matches) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % ITEMS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [active]);

  return (
    <>
      <AppShowcaseMobile items={ITEMS} active={active} />
      <AppShowcaseDesktop items={ITEMS} active={active} onSelect={setActive} />
    </>
  );
}
