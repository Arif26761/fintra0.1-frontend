'use client';

import Image from 'next/image';
import { useState } from 'react';

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

  return (
    <div className="flex h-115.5 w-299 shrink-0 gap-15">
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
                <span className="block h-0.75 w-full shrink-0">
                  <span className="block h-0.5 w-full bg-line" />
                </span>

                <span
                  className={`flex w-full items-center text-xl leading-8.75 font-semibold capitalize ${
                    isOpen ? 'shrink-0 text-ink' : 'grow text-ink-muted'
                  }`}
                >
                  {item.title}
                </span>

                {isOpen && (
                  <span className="w-full shrink-0 text-base leading-6 font-light tracking-[0.16px] text-ink-soft">
                    {item.description}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Figma parks the phones at top:445 — 13px below the card — as the
      start keyframe for a slide-up entrance, which is why the static
      export shows an empty card. Resting position here is 0; the Day-5
      reveal will interpolate 445 → 0. */}
      <div className="gradient-ring relative h-115.5 w-168.25 shrink-0 overflow-hidden rounded-md bg-bg-card px-7.5 pt-7.5">
        <div className="relative h-108 w-153.25">
          {ITEMS.map((item, index) => (
            <Image
              key={item.title}
              src={item.image}
              alt=""
              width={475}
              height={1002}
              priority={index === 0}
              className={`absolute top-[8px] left-[69px] max-w-none transition-opacity duration-300 ${
                index === active ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
