import FeatureCard from './FeatureCard';

const FADE = 'linear-gradient(126.02deg, rgba(13,24,24,0) 38.231%, rgb(13,24,24) 89.571%)';
const FADE_ALT = 'linear-gradient(124.15deg, rgba(13,24,24,0) 23.794%, rgb(13,24,24) 83.105%)';

const WIDE = [
  {
    title: 'Advance Charts',
    description: 'A professional workspace that simplifies the most complex technical analysis.',
    image: '/images/feature-charts.png',
    frameClassName: 'h-[160.46px] w-full lg:h-[241px] lg:w-[523px]',
    imgClassName: 'size-full object-cover',
    gradient: FADE,
    // Mobile angles differ per card — they fall out of the 332x160 box, the
    // same way the gradient-ring angles do.
    gradientMobile: 'linear-gradient(107.34deg, rgba(13,24,24,0) 38.29%, #0D1818 73.64%)',
    glow: true, // Ellipse 17 — card 1 only
    sizes: '523px',
  },
  {
    title: 'Real-Time Updates',
    description:
      'Stay ahead of every price movement with zero-latency data directly from the exchange.',
    image: '/images/feature-realtime.png',
    frameClassName: 'h-[160.46px] w-full lg:h-[241px] lg:w-[523px]',
    imgClassName: 'size-full object-cover',
    gradient: FADE,
    gradientMobile: 'linear-gradient(105.87deg, rgba(13,24,24,0) 38.36%, #0D1818 75.12%)',
    sizes: '523px',
  },
];

const NARROW = [
  {
    title: 'Trade Now, Settle Later',
    description: 'Instant loans to keep your portfolio moving at full speed.',
    image: '/images/feature-loans.png',
    frameClassName: 'h-[160.46px] w-full lg:h-auto lg:aspect-[2312/1064]',
    imgClassName: 'size-full object-cover',
    gradient: FADE_ALT,
    gradientMobile: 'linear-gradient(107.34deg, rgba(13,24,24,0) 23.79%, #0D1818 83.1%)',
    sizes: '319px',
  },
  {
    title: 'Smart Market Filtering',
    description: 'Discover the next market leader using 50+ professional screening criteria.',
    image: '/images/feature-filter.png',
    frameClassName: 'h-[160.46px] w-full lg:h-auto lg:aspect-[2312/1064]',
    imgClassName: 'size-full object-cover',
    gradient: FADE,
    gradientMobile: 'linear-gradient(104.61deg, rgba(13,24,24,0) 38.42%, #0D1818 77.8%)',
    sizes: '319px',
  },
  {
    title: 'Instant Transactions',
    description: 'Move your money in and out with secure, lightning-fast banking integrations.',
    image: '/images/feature-payment.png',
    frameClassName: 'h-[160.46px] w-full lg:h-auto lg:aspect-[2312/1064]',
    imgClassName: 'size-full object-cover',
    gradient: FADE,
    gradientMobile: 'linear-gradient(104.99deg, rgba(13,24,24,0) 38.4%, #0D1818 78.95%)',
    sizes: '319px',
  },
];

// Mobile shows all five in one track; cards 4 and 5 are wider by design.
const ALL = [...WIDE, ...NARROW];
const MOBILE_WIDTH = ['w-90.5', 'w-90.5', 'w-90.5', 'w-[378.67px]', 'w-[378.67px]'];

export default function Features() {
  return (
    <section
      data-section="features"
      className="flex w-97 lg:w-full lg:max-w-360 flex-col items-center gap-7.5 lg:gap-10"
    >
      <div className="flex w-full items-center justify-center px-5 lg:px-30.25">
        <div className="flex w-78 flex-col items-center gap-3.75 lg:h-21 lg:w-full lg:max-w-299.5 lg:justify-between lg:gap-0 lg:whitespace-nowrap">
          {/* 23px/35 w700 on mobile — not the desktop 35px/35 w600 */}
          <h2 className="text-center text-[23px] leading-8.75 font-bold text-ink capitalize lg:text-3xl lg:font-semibold">
            Everything You Need to Trade Smarter
          </h2>
          <p className="text-center text-base leading-6 font-light text-ink capitalize lg:tracking-[0.16px] lg:text-ink-soft lg:normal-case">
            Powerful tools designed specifically for the Bangladeshi market
          </p>
        </div>
      </div>

      {/* Mobile — one scroll-snap track, five cards, gap 17 */}
      <div className="flex w-full snap-x snap-mandatory gap-4.25 overflow-x-auto px-5 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {ALL.map((card, i) => (
          <FeatureCard key={card.title} {...card} className={`${MOBILE_WIDTH[i]} snap-start`} />
        ))}
      </div>

      {/* Desktop — 2 wide + 3 narrow, unchanged */}
      <div className="hidden w-full max-w-299 flex-col items-start gap-7.5 lg:flex">
        <div className="flex w-full flex-wrap items-center gap-7.5">
          {WIDE.map((card) => (
            <FeatureCard key={card.title} {...card} className="min-w-0 w-145.75" />
          ))}
        </div>
        <div className="flex w-full flex-wrap items-center gap-7.5">
          {NARROW.map((card) => (
            <FeatureCard key={card.title} {...card} className="min-w-0 w-[378.667px]" />
          ))}
        </div>
      </div>
    </section>
  );
}
