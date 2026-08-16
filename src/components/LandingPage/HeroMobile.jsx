import Image from 'next/image';
import Button from '@/components/common/Button';
import ArrowUpRight from '@/components/common/Icon/ArrowUpRight';

const BADGE = 'Trusted by over 600 BD traders';

// Figma "Start" — 372x799 at a 15px gutter, pad 110/30/0, space-between,
// bg #061D1D, r:14. The dashboard sits INSIDE this card, which is the one
// difference from desktop that classes cannot express.
export default function HeroMobile({ copy, inView }) {
  return (
    <div className="relative isolate mx-auto flex h-199.75 w-full flex-col items-center justify-between overflow-hidden rounded-[14px] bg-rich-green px-7.5 pt-27.5 lg:hidden">
      {/* Ellipse 1 — 385x352 @ top 644. blur(110px) is Dev Mode's own value;
          the raw tree says LAYER_BLUR 220, so the divisor is 2, not 3. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-161 left-1/2 h-88 w-96.25 -translate-x-1/2 rounded-[50%] bg-brand blur-[110px]"
      />

      <div className="relative z-10 mx-auto flex w-78 flex-col">
        {/* Frame 152 — gap 15, pad-bottom 30 */}
        <div className="flex flex-col items-center justify-center gap-3.75 pb-7.5">
          <div className="flex h-8.5 items-center gap-2.5 rounded-[44px] bg-[rgb(255_255_255/0.15)] py-1.25 pr-3.75 pl-1.25">
            <Image
              src="/images/hero-avatars.png"
              alt=""
              width={60}
              height={24}
              className="h-6 w-15 shrink-0 object-contain"
              priority
            />
            <span className="text-xs leading-6 font-normal whitespace-nowrap text-ink capitalize">
              {BADGE}
            </span>
          </div>

          {/* 30/35 w700 — the box is 105 tall over three lines */}
          <h1 className="w-full text-center text-[30px] leading-8.75 font-bold text-ink capitalize">
            {copy.headingTop}
            <br />
            {copy.headingBottom}
          </h1>

          <p className="w-full text-center text-base leading-6 font-light text-ink capitalize">
            {copy.subhead}
          </p>
        </div>

        {/* Frame 2 — stacked full-width buttons, gap 10 */}
        <div className="flex w-full flex-col items-center gap-2.5">
          <Button href="/login" variant="primary" size="md" className="w-full">
            Login
            <ArrowUpRight />
          </Button>
          <Button href="/about" variant="ghost" size="md" className="w-full">
            About Us
          </Button>
        </div>
      </div>

      {/* Component 7 — 362x287, flush to the card's bottom. The image is staged
          at bottom:-316px; that is the entrance animation's start position. */}
      <div className="relative z-20 h-71.75 w-90.5 overflow-hidden">
        <Image
          src="/images/mobile-dashboard.png"
          alt=""
          width={346}
          height={287}
          priority
          data-inview={inView ? 'true' : 'false'}
          className="animate-hero-dashboard-mobile absolute top-0 left-1/2 h-71.75 w-86.5 max-w-none -translate-x-1/2 object-cover"
        />
      </div>
    </div>
  );
}
