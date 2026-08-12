'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const FADE = 'linear-gradient(126.02deg, rgba(13,24,24,0) 38.231%, rgb(13,24,24) 89.571%)';

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
    // Disable auto-play if reduced-motion is requested
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (mediaQuery?.matches) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % ITEMS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [active]);

  return (
    <div className="flex h-115.5 w-299 shrink-0 gap-15">
      {/* Left Section - Items List */}
      <ul className="flex w-115.75 shrink-0 flex-col gap-7.5">
        {ITEMS.map((item, index) => {
          const isOpen = index === active;

          return (
            <li key={item.title} className="h-23.25 w-full">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-expanded={isOpen}
                className="flex h-full w-full cursor-pointer flex-col gap-1.25 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                {/* Active Indicator Line */}
                <span className="relative block h-0.75 w-full shrink-0 overflow-hidden">
                  <span className="block h-0.5 w-full bg-line" />
                  <span
                    className={`absolute inset-0 h-0.5 bg-ink transition-all duration-300 ease-linear ${
                      isOpen ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </span>

                {/* Title */}
                <span
                  className={`flex w-full items-center text-xl leading-8.75 font-semibold capitalize transition-colors duration-300 ease-linear ${
                    isOpen ? 'shrink-0 text-ink' : 'grow text-ink-muted'
                  }`}
                >
                  {item.title}
                </span>

                {/* Animated Description Slide-Up */}
                <div
                  className={`grid transition-all duration-300 ease-linear ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <span className="block w-full text-base leading-6 font-light tracking-[0.16px] text-ink-soft">
                      {item.description}
                    </span>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Right Section - Phone Images (Bottom-Up Swap) */}
      <div className="gradient-ring no-ring-hover relative h-115.5 w-168.25 shrink-0 overflow-hidden rounded-md bg-bg-card px-7.5 pt-7.5">
        <div className="relative h-108 w-153.25 overflow-hidden">
          {ITEMS.map((item, index) => {
            const isActive = index === active;

            return (
              <Image
                key={item.title}
                src={item.image}
                alt=""
                width={475}
                height={1002}
                priority={index === 0}
                className={`absolute top-2 left-17.25 max-w-none transition-all duration-300 ease-linear ${
                  isActive
                    ? 'translate-y-0 opacity-100 z-10 delay-300'
                    : 'translate-y-111.25 opacity-0 z-0 delay-0 pointer-events-none'
                }`}
              />
            );
          })}
          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{ backgroundImage: FADE }}
          />
        </div>
      </div>
    </div>
  );
}
