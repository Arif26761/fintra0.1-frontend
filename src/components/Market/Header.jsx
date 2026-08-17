import { getIndexSummary, searchCompanies } from '@/lib/data/market';
import MarketSearch from './MarketSearch';
import DoubleArrowUp from '../common/Icon/DoubleArrowUp';

export default async function Header() {
  const [index, companies] = await Promise.all([getIndexSummary('DSEX'), searchCompanies('')]);

  return (
    // Frame 152 — 167 + 30 + 999 = 1196
    <section
      data-section="market-header"
      className="flex h-14.75 w-full max-w-299 items-center gap-7.5"
    >
      {/* Frame 817 — 167x59, pad 5/8, gap 5, r:7 */}
      <div className="gradient-ring no-ring-hover relative flex h-full w-41.75 shrink-0 items-center gap-1.25 rounded-[7px] bg-bg-card px-2 py-1.25">
        <span className="flex w-15 flex-col text-sm leading-4.75 font-medium text-ink-soft">
          <span>{index.symbol}</span>
          <span>{index.value}</span>
        </span>

        <span className="flex w-21.5 flex-col text-right text-sm leading-4.75 font-medium text-brand">
          <span>
            {index.change} {index.changePct}
          </span>
          <span>{index.turnover}</span>
        </span>

        {/* Figma places this arrow absolutely at (52.5, 13), overlapping both columns */}
        <DoubleArrowUp className="absolute top-3.25 left-[52.5px] h-[9.56px] w-[7.97px] text-brand z-2" />
      </div>

      {/* Frame 625 collapsed at 999, expanding to the 1196 overlay on click */}
      <MarketSearch companies={companies} />
    </section>
  );
}
