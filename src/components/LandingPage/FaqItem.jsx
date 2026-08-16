'use client';

import Image from 'next/image';
import Caret from '../common/Icon/Caret';

export default function FaqItem({ id, question, answer, open, onToggle, className = '' }) {
  return (
    <div
      onClick={onToggle}
      className={`gradient-ring group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-md bg-bg-card p-3.75 transition-all duration-300 linear lg:p-7.5 ${className} ${
        open ? 'gap-7.5 ring-toggled-green' : 'gap-0 ring-hover-white'
      }`}
      data-open={open ? 'true' : 'false'}
    >
      {/* Hover Image (Shown when hovered and NOT open) */}
      <Image
        src="/images/faq-hover.png"
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 100vw"
        className={`pointer-events-none absolute inset-0 z-30 object-cover transition-opacity duration-300 linear ${
          open ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
        }`}
      />

      {/* Toggle Image (Instant on open) */}
      <Image
        src="/images/faq-toggle.png"
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 100vw"
        className={`pointer-events-none absolute inset-0 z-30 object-cover transition-opacity duration-300 linear ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <h3 className="flex">
        <button
          type="button"
          id={`faq-${id}`}
          aria-expanded={open}
          aria-controls={`faq-panel-${id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="relative z-40 flex w-full items-center justify-between gap-2 text-left text-base leading-5.5 font-medium capitalize text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand lg:h-[35px] lg:gap-5 lg:leading-[35px]"
        >
          <span>{question}</span>
          <Caret open={open} className="mt-0.75 h-[5.14px] w-2.25 text-[#d9d9d9]" />
        </button>
      </h3>

      {/* Animated Card Expansion */}
      <div
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-${id}`}
        className={`grid transition-[grid-template-rows] duration-300 linear ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="relative z-40 text-base leading-6 font-light tracking-[0.16px] text-ink-soft pt-1 transition-opacity duration-300 delay-300 linear">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
