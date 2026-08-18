'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/common/Button';
import ArrowUpRight from '@/components/common/Icon/ArrowUpRight';

export default function Navbar({ links, active = 'Features' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const itemRefs = useRef([]);
  const activeIndex = links.findIndex((label) => label === active);
  const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex !== -1 ? activeIndex : 0;

  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const targetEl = itemRefs.current[targetIndex];
    if (targetEl) {
      setLineStyle({
        left: targetEl.offsetLeft,
        width: targetEl.offsetWidth,
        opacity: 1,
      });
    }
  }, [targetIndex]);

  return (
    <nav
      aria-label="Main"
      className="hidden w-full max-w-309 items-center justify-between rounded-md bg-[rgb(30_30_30/0.2)] py-2.5 pr-2.5 pl-5 shadow-[inset_0_0_0_2px_rgb(255_255_255/0.15)] backdrop-blur-md lg:flex"
    >
      <Link href="/" aria-label="Fintra home" className="shrink-0">
        <Image src="/images/logo.svg" alt="Fintra" width={120} height={31} unoptimized priority />
      </Link>

      <ul
        onMouseLeave={() => setHoveredIndex(null)}
        className="relative flex h-11.25 list-none items-center gap-10"
      >
        {links.map((label, index) => {
          const isActive = label === active;
          const isHovered = hoveredIndex === index;

          return (
            <li
              key={label}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              className="relative flex h-full items-center"
            >
              <Link
                href={label.toLowerCase() === 'features' ? '/' : `/${label.toLowerCase()}`}
                aria-current={isActive ? 'page' : undefined}
                className={`text-base leading-6.75 font-medium transition-colors duration-300 ease-linear ${
                  isActive || isHovered ? 'text-ink' : 'text-ink-soft'
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}

        {/* Sliding Active / Hover Indicator Line */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2.5 h-0.5 rounded-pill bg-brand transition-all duration-300 ease-linear"
          style={{
            left: `${lineStyle.left}px`,
            width: `${lineStyle.width}px`,
            opacity: lineStyle.opacity,
          }}
        />
      </ul>

      <div className="flex items-center gap-2.5">
        <Button href="/login" variant="ghostMuted">
          Login
        </Button>
        <Button href="/signup" variant="primary">
          Sign Up
          <ArrowUpRight />
        </Button>
      </div>
    </nav>
  );
}
