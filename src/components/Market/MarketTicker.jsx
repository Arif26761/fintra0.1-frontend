import Marquee from '@/components/common/Marquee';
import DoubleArrowUp from '@/components/common/Icon/DoubleArrowUp';
import { getTicker } from '@/lib/data/market';

function Arrow({ direction }) {
  const tone =
    direction === 'up' ? 'text-brand' : direction === 'down' ? 'text-[#ff2c2c]' : 'text-ink-muted';

  return <DoubleArrowUp direction={direction} className={`h-3 w-2.5 shrink-0 ${tone}`} />;
}

export default async function MarketTicker() {
  const rows = await getTicker();

  const chips = rows.map((row) => {
    const direction = row.changePct > 0 ? 'up' : row.changePct < 0 ? 'down' : 'flat';
    const sign = row.changePct < 0 ? '-' : '+';
    const pct = `${sign}${Math.abs(row.changePct).toFixed(2)}%`;

    return (
      <div
        key={row.symbol}
        className="mr-2.5 flex h-8 shrink-0 items-center gap-1.75 rounded-[5px] bg-bg-card px-1.5 py-0.75"
      >
        <Arrow direction={direction} />
        <div className="flex h-6.5 flex-col">
          <span className="text-[10px] leading-3.5 font-medium text-ink">{row.symbol}</span>
          <span className="text-[9px] leading-3 font-normal text-ink">
            {row.price} {pct}
          </span>
        </div>
      </div>
    );
  });

  return (
    <Marquee duration={45} className="h-14.25 w-full max-w-299" trackClassName="pl-5">
      {chips}
    </Marquee>
  );
}
