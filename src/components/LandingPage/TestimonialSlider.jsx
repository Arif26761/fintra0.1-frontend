'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Each testimonial is a flat image fill in Figma (Test 1..5 inside the Slider
// instance I11625:11055), exported rather than rebuilt as markup — same artwork,
// and no risk of misquoting a named person.
// Test 1 renders at 514x244; the rest at 414x197. Same 2.1:1 aspect either way.
const TESTIMONIALS = [
  {
    id: 'ariful-haque',
    src: '/images/testimonials/ariful-haque.png',
    srcMobile: '/images/testimonials/mobile/ariful-haque.png',
    alt: 'Testimonial from Ariful Haque, Full-Time Trader — rated 5 out of 5',
  },
  {
    id: 'kamrul-islam',
    src: '/images/testimonials/kamrul-islam.png',
    srcMobile: '/images/testimonials/mobile/kamrul-islam.png',
    alt: 'Testimonial from Kamrul Islam, Corporate Executive — rated 5 out of 5',
  },
  {
    id: 'nuzhat-chowdhury',
    src: '/images/testimonials/nuzhat-chowdhury.png',
    srcMobile: '/images/testimonials/mobile/nuzhat-chowdhury.png',
    alt: 'Testimonial from Nuzhat Chowdhury, Entrepreneur — rated 5 out of 5',
  },
  {
    id: 'tanvir-ahmed',
    src: '/images/testimonials/tanvir-ahmed.png',
    srcMobile: '/images/testimonials/mobile/tanvir-ahmed.png',
    alt: 'Testimonial from Tanvir Ahmed, Tech Lead and Part-Time Trader — rated 5 out of 5',
  },
  {
    id: 'sarah-karim',
    src: '/images/testimonials/sarah-karim.png',
    srcMobile: '/images/testimonials/mobile/sarah-karim.png',
    alt: 'Testimonial from Sarah Karim, Investment Analyst — rated 5 out of 5',
  },
];

export default function TestimonialSlider() {
  const [active, setActive] = useState(0);
  // const cardRefs = useRef([]);
  const trackRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      // Each non-active card is 414px (w-103.5) with 65px (gap-16.25) = 479px step
      const offset = active * 479;
      trackRef.current.style.transform = `translateX(-${offset}px)`;
    }
  }, [active]);

  return (
    <>
      {/* Component 494 — a 322x246 viewport over a 1226-tall column. */}
      <div
        className="relative z-10 h-61.5 w-full overflow-hidden lg:hidden"
        role="region"
        aria-label="What our traders say"
      >
        <div
          className="flex flex-col items-center gap-7.5 transition-transform duration-300 ease-linear"
          style={{ transform: `translateY(-${active * 245}px)` }}
        >
          {TESTIMONIALS.map((item, i) => (
            <Image
              key={item.id}
              src={item.srcMobile}
              alt={item.alt}
              width={644}
              height={492}
              unoptimized
              className={`shrink-0 rounded-md transition-all duration-300 ease-linear ${
                i === active ? 'h-61.5 w-80.5' : 'h-53.75 w-70.5'
              } ${i < active ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop — horizontal track, unchanged apart from the breakpoint gate. */}
      <div
        className="relative z-10 hidden h-61 w-full max-w-128.5 shrink-0 items-center overflow-hidden lg:flex"
        tabIndex={0}
        role="region"
        aria-label="What our traders say"
      >
        <div ref={trackRef} className="testimonial-track flex items-center gap-16.25">
          {TESTIMONIALS.map((item, i) => {
            const isActive = i === active;
            const isPast = i < active;

            return (
              <div
                key={item.id}
                className={`shrink-0 transition-all duration-300 ease-linear ${
                  isPast ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={isActive ? 514 : 414}
                  height={isActive ? 244 : 197}
                  priority={i === 0}
                  unoptimized
                  className={`shrink-0 rounded-md transition-all duration-300 ease-linear ${
                    isActive ? 'h-61 w-128.5' : 'h-49.25 w-103.5'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
