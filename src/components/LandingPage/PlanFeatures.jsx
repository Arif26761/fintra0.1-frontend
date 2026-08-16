'use client';

import { useState } from 'react';
import Check from '@/components/common/Check';
import Caret from '../common/Icon/Caret';

export default function PlanFeatures({ featured, featuresLabel, features }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative z-40 flex w-full flex-col ${open ? 'pb-1.25 lg:pb-0' : ''}`}>
      {/* Frame 883 — 333.5x26, mobile only. Desktop shows the list unconditionally. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex h-6.5 w-full items-center justify-center gap-2.5 py-1.25 text-base leading-4 font-medium text-ink-soft capitalize lg:hidden"
      >
        View Features
        <Caret open={open} className="mt-0.75 h-[5.14px] w-2.25 text-[#d9d9d9]" />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-linear lg:grid-rows-[1fr] ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          {/* Frame 887 — pad 0 10px on mobile, flush on desktop */}
          <div className="flex w-full flex-col gap-3.75 px-2.5 pt-3.75 lg:px-0 lg:pt-0">
            <p className="hidden text-base leading-4 font-medium text-ink-soft capitalize lg:block">
              {featuresLabel}
            </p>

            {/* Frame 854 — gap 13 */}
            <ul className="flex w-full flex-col gap-3.25">
              {features.map((feature) => (
                <li key={feature} className="flex w-full items-start gap-4.5 lg:h-5.5">
                  <Check className={featured ? 'text-brand' : 'text-ink'} />
                  <span className="text-base leading-5.5 font-light text-ink-soft capitalize">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
