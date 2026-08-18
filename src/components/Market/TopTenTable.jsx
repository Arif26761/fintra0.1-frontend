'use client';

import { useEffect, useRef, useState } from 'react';
import InfoDot from '../common/Icon/InfoDot';

const TABS = [
  { id: 'trade', label: 'By Trade', metric: 'Trade' },
  { id: 'value', label: 'By Value', metric: 'Value' },
  { id: 'volume', label: 'By Volume', metric: 'Volume' },
];

// Figma rows use justify-content: space-between in a 1106px box, so the free
// space is split evenly across three gaps. These are the resulting slots — each
// cell plus its share of the gaps — which makes table-fixed reproduce Figma's
// text positions exactly. By Trade uses narrower cells than the other two tabs.
const COLUMNS = {
  trade: ['19.82%', '30.77%', '33.48%', '15.93%'],
  value: ['24.71%', '31.89%', '25.29%', '18.11%'],
  volume: ['24.71%', '31.89%', '25.29%', '18.11%'],
};

const TONE = {
  up: 'text-brand',
  down: 'text-[#ff2c2c]',
  flat: 'text-ink',
};

export default function TopTenTable({ lists }) {
  const [tab, setTab] = useState('trade');
  const itemRefs = useRef([]);
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const activeIndex = TABS.findIndex((t) => t.id === tab);
  const active = TABS[activeIndex] || TABS[0];
  const rows = lists[tab];
  const widths = COLUMNS[tab];

  useEffect(() => {
    const targetEl = itemRefs.current[activeIndex];
    if (targetEl) {
      setLineStyle({
        left: targetEl.offsetLeft,
        width: targetEl.offsetWidth,
        opacity: 1,
      });
    }
  }, [activeIndex]);

  return (
    <section
      data-section="market-top10"
      className="gradient-ring no-ring-hover relative flex h-146.5 w-full max-w-299 flex-col gap-5 rounded-md bg-bg-card p-7.5"
    >
      {/* Title — 1136x18, gap 7 */}
      <div className="flex h-4.5 items-center gap-1.75">
        <span className="text-sm leading-3.5 font-medium text-ink capitalize">Top 10 Shares</span>
        <InfoDot />
      </div>

      {/* Frame 609 — three 366 tabs, gap 19, on a 1px #212F2F divider */}
      <div
        role="tablist"
        className="relative flex h-6 w-full items-start gap-4.75 border-b border-[#212f2f]"
      >
        {TABS.map((t, index) => {
          const isActive = t.id === tab;
          return (
            <button
              key={t.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              role="tab"
              aria-selected={isActive}
              onClick={() => setTab(t.id)}
              className="flex grow cursor-pointer flex-col items-center gap-1.25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <span
                className={`text-sm leading-4.75 font-medium transition-colors duration-300 ease-linear ${
                  isActive ? 'text-brand' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {t.label}
              </span>
            </button>
          );
        })}

        {/* Sliding Active Indicator Line */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[1px] h-[1.5px] bg-brand transition-all duration-300 ease-linear"
          style={{
            left: `${lineStyle.left}px`,
            width: `${lineStyle.width}px`,
            opacity: lineStyle.opacity,
          }}
        />
      </div>

      <table className="w-full table-fixed border-separate border-spacing-0">
        <colgroup>
          {widths.map((w, i) => (
            <col key={i} style={{ width: w }} />
          ))}
        </colgroup>

        <thead>
          <tr>
            {['Trading code', 'LTP Change %', 'Moving Range (52w)', active.metric].map(
              (label, i) => (
                <th
                  key={label}
                  scope="col"
                  className={`h-13.5 bg-surface-head px-0 py-2.5 text-sm leading-3.5 font-medium text-ink capitalize ${
                    i === 0 ? 'rounded-tl-md pl-3.75 text-left' : ''
                  } ${i === 3 ? 'rounded-tr-md pr-3.75 text-right' : ''} ${
                    i === 1 || i === 2 ? 'text-center' : ''
                  }`}
                >
                  {label}
                </th>
              ),
            )}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row.code}-${i}`} className={i % 2 === 1 ? 'bg-surface' : ''}>
              <td className="h-9.75 pl-3.75 text-sm leading-4.75 font-normal text-ink">
                {row.code}
              </td>
              <td
                className={`h-9.75 text-center text-sm leading-4.75 font-normal uppercase ${TONE[row.direction]}`}
              >
                {row.ltpChange}
              </td>
              <td className="h-9.75 text-center text-sm leading-4.75 font-normal text-ink uppercase">
                <span className="inline-flex w-33 justify-between">
                  <span>{row.low}</span>
                  <span>{row.high}</span>
                </span>
              </td>
              <td className="h-9.75 pr-3.75 text-right text-sm leading-4.75 font-normal text-ink uppercase">
                {row.metric}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
