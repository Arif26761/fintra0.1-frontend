'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Search from '../common/Icon/Search';

export default function MarketSearch({ companies }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    inputRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  const q = query.trim().toLowerCase();
  const list = companies || [];
  const results = q
    ? list.filter(
        (c) => (c.name || '').toLowerCase().includes(q) || (c.code || '').toLowerCase().includes(q),
      )
    : list;

  return (
    <div ref={wrapRef} className="relative h-full grow">
      {/* Collapsed: Frame 625 at 999. A button, not an input — Figma's trigger is
          "on click, open overlay", and a button is what announces that to a screen
          reader. The real input lives in the overlay. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="gradient-ring no-ring-hover flex h-full w-full cursor-text items-center gap-2.5 rounded-sm bg-bg-card px-5 py-3.75 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <Search />
        <span className="text-base leading-5.5 font-normal text-[#9da6ab]">
          Search 650+ companies
        </span>
      </button>

      {open && (
        // Frame 877 — 1196x372. -left-49.25 is -(167 + 30): the wrapper starts
        // 197px into the row, so this pulls the overlay back to the row's origin
        // and it spans the full 1196, covering the DSEX chip.
        <div
          role="dialog"
          aria-label="Search companies"
          className="absolute top-0 -left-49.25 z-40 flex w-299 flex-col items-center gap-2.5 rounded-sm bg-[rgb(0_12_12/0.2)] backdrop-blur-[15px]"
        >
          <div className="flex h-14.75 w-full items-center gap-2.5 rounded-sm bg-bg-card px-5 py-3.75">
            <Search />
            <label htmlFor="market-search" className="sr-only">
              Search companies
            </label>
            <input
              ref={inputRef}
              id="market-search"
              type="search"
              role="combobox"
              aria-expanded="true"
              aria-controls="market-search-results"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 650+ companies"
              className="w-full bg-transparent text-base leading-5.5 font-normal text-ink placeholder:text-[#9da6ab] focus:outline-none"
            />
          </div>

          {/* Component 492 — 1196x303, pad-bottom 22 */}
          <div className="flex h-75.75 w-full flex-col gap-2.5 rounded-sm bg-bg-card pb-5.5">
            {/* Level 1 — 1196x45, pad 22px 22px 0 */}
            <div className="flex h-11.25 w-full items-center justify-between px-5.5 pt-5.5">
              <span className="text-xs leading-4 font-normal text-ink-soft">Search Results</span>
            </div>

            {/* Options — 1196x226, gap 5 */}
            <ul
              id="market-search-results"
              role="listbox"
              className="flex h-56.5 w-full flex-col gap-1.25 overflow-y-auto scrollbar-none"
            >
              {results.map((c) => (
                <li key={c.code} role="option" aria-selected="false" className="w-full shrink-0">
                  <button
                    type="button"
                    className="group flex h-18 w-full cursor-pointer items-center gap-2.5 px-5.5 py-1.5 text-left transition-colors duration-150 hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
                  >
                    <Image
                      src={c.logo}
                      alt={c.name || ''}
                      width={120}
                      height={120}
                      unoptimized
                      className="size-15 shrink-0 rounded-full bg-surface object-cover"
                    />
                    <span className="flex flex-col gap-0.75">
                      <span className="text-base leading-5.5 font-medium text-ink transition-colors duration-150 group-hover:text-brand group-focus-visible:text-brand">
                        {c.name}
                      </span>
                      <span className="text-xs leading-4 font-light text-ink-soft">
                        Trading code: {c.code}
                      </span>
                    </span>
                  </button>
                </li>
              ))}

              {!results.length && (
                <li className="px-5.5 py-1.5 text-base leading-5.5 font-light text-ink-soft">
                  No companies match “{query}”.
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
