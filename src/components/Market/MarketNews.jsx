import InfoDot from '@/components/common/Icon/InfoDot';

export default function MarketNews({ items = [] }) {
  return (
    <section
      data-section="market-news"
      className="gradient-ring no-ring-hover relative flex h-96.75 w-full max-w-299 flex-col gap-5 rounded-md bg-bg-card p-7.5"
    >
      {/* Title Bar — 1136x18, gap 7 */}
      <div className="flex h-4.5 items-center gap-1.75">
        <span className="text-sm leading-3.5 font-medium text-ink-soft capitalize">
          Latest News
        </span>
        <InfoDot />
      </div>

      {/* Frame 675 — 1136x289 scrollable list */}
      <ul className="flex h-72.25 w-full flex-col gap-2.5 overflow-y-auto scrollbar-none">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-5 border-b border-[#52525b] pb-5 last:border-b-0 last:pb-0"
          >
            {/* Frame 669 — Headline & Timestamp */}
            <div className="flex h-4.75 w-full items-center justify-between">
              <h3 className="text-sm leading-4.75 font-medium text-ink">{item.headline}</h3>
              <time className="text-[12px] leading-4 font-normal text-ink-muted">
                {item.displayAt}
              </time>
            </div>
            {/* Summary paragraph */}
            <p className="h-4 w-full self-stretch text-[12px] leading-4 font-light text-ink-muted">
              {item.summary}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
