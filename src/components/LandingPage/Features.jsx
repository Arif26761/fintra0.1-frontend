import FeatureCard from './FeatureCard';

const FADE = 'linear-gradient(126.02deg, rgba(13,24,24,0) 38.231%, rgb(13,24,24) 89.571%)';
const FADE_ALT = 'linear-gradient(124.15deg, rgba(13,24,24,0) 23.794%, rgb(13,24,24) 83.105%)';

const WIDE = [
  {
    title: 'Advance Charts',
    description: 'A professional workspace that simplifies the most complex technical analysis.',
    image: '/images/feature-charts.png',
    frameClassName: 'h-[241px] w-[523px]',
    imgClassName: 'size-full object-cover',
    gradient: FADE,
    sizes: '523px',
  },
  {
    title: 'Real-Time Updates',
    description:
      'Stay ahead of every price movement with zero-latency data directly from the exchange.',
    image: '/images/feature-realtime.png',
    frameClassName: 'h-[241px] w-[523px]',
    imgClassName: 'size-full object-cover',
    gradient: FADE,
    sizes: '523px',
  },
];

const NARROW = [
  {
    title: 'Trade Now, Settle Later',
    description: 'Instant loans to keep your portfolio moving at full speed.',
    image: '/images/feature-loans.png',
    frameClassName: 'aspect-[2312/1064] w-full',
    imgClassName: 'size-full object-cover',
    gradient: FADE_ALT,
    sizes: '319px',
  },
  {
    title: 'Smart Market Filtering',
    description: 'Discover the next market leader using 50+ professional screening criteria.',
    image: '/images/feature-filter.png',
    frameClassName: 'aspect-[2312/1064] w-full',
    imgClassName: 'size-full object-cover',
    gradient: FADE,
    sizes: '319px',
  },
  {
    title: 'Instant Transactions',
    description: 'Move your money in and out with secure, lightning-fast banking integrations.',
    image: '/images/feature-payment.png',
    frameClassName: 'aspect-[2312/1064] w-full',
    imgClassName: 'size-full object-cover',
    gradient: FADE,
    sizes: '319px',
  },
];

export default function Features() {
  return (
    <section data-section="features" className="flex w-360 flex-col items-center gap-10">
      <div className="flex w-full items-center px-30.25">
        <div className="flex h-21 w-299.5 flex-col items-center justify-between whitespace-nowrap">
          <h2 className="text-3xl leading-8.75 font-semibold text-ink capitalize">
            Everything You Need to Trade Smarter
          </h2>
          <p className="text-base leading-6 font-light tracking-[0.16px] text-ink-soft">
            Powerful tools designed specifically for the Bangladeshi market
          </p>
        </div>
      </div>

      <div className="flex w-299 flex-col items-start gap-7.5">
        <div className="flex w-full items-center gap-7.5">
          {WIDE.map((card) => (
            <FeatureCard key={card.title} {...card} className="w-145.75" />
          ))}
        </div>
        <div className="flex w-full items-center gap-7.5">
          {NARROW.map((card) => (
            <FeatureCard key={card.title} {...card} className="w-[378.667px]" />
          ))}
        </div>
      </div>
    </section>
  );
}
