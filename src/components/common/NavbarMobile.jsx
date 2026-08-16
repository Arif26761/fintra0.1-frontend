'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/common/Button';
import ArrowUpRight from '@/components/common/Icon/ArrowUpRight';

export default function NavbarMobile({ links, active }) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Main"
      className="w-full rounded-sm bg-[rgb(30_30_30/0.2)] p-2.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.15)] backdrop-blur-[12.5px] lg:hidden"
    >
      {/* Level 1 — 342x30 */}
      <div className="flex h-7.5 w-full items-center justify-between">
        <Link href="/" aria-label="Fintra home" className="shrink-0 pl-1.25">
          <Image
            src="/images/logo.svg"
            alt="Fintra"
            width={120}
            height={31}
            unoptimized
            priority
            className="h-5.75 w-22.5"
          />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="relative size-7.5 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <span
            className={`absolute left-1.25 h-0.5 w-5 rounded-pill bg-ink transition-all duration-300 ease-linear ${
              open ? 'top-4 rotate-45' : 'top-3'
            }`}
          />
          <span
            className={`absolute left-1.25 h-0.5 w-5 rounded-pill bg-ink transition-all duration-300 ease-linear ${
              open ? 'top-4 -rotate-45' : 'top-5'
            }`}
          />
        </button>
      </div>

      {/* Figma specifies only the closed navbar — no open-menu frame exists in the
          mobile file. This panel reuses the desktop nav items and CTAs; it is a
          draft and needs sign-off, same as the FAQ answer copy. */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows] duration-300 ease-linear ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex list-none flex-col gap-5 pt-5">
            {links.map((label) => (
              <li key={label}>
                <Link
                  href={`/${label.toLowerCase()}`}
                  aria-current={label === active ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={`text-base leading-6.75 font-medium ${
                    label === active ? 'text-ink' : 'text-ink-soft'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2.5 pt-5 pb-1.25">
            <Button href="/login" variant="ghostMuted" className="w-full">
              Login
            </Button>
            <Button href="/signup" variant="primary" className="w-full">
              Sign Up
              <ArrowUpRight />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
