import Image from 'next/image';
import Glow from '../common/Glow';

export default function ChairmanCard() {
  return (
    <section className="gradiant-ring relative flex w-full flex-col rounded-md bg-bg-card p-6 lg:p-7.5 overflow-visible lg:h-89 justify-between gap-6 lg:gap-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-md"
      >
        <Glow />
      </div>

      <div className="flex flex-col gap-6 max-w-full lg:max-w-204.75 z-20 overflow-hidden">
        <p className="text-base font-light leading-relaxed lg:leading-7 text-ink-soft">
          &ldquo;For decades, the standard retail investor has been forced to play a game where the
          rules are skewed against them <br /> —stuck with delayed feeds, rigid settlement cycles,
          and opaque data. At Fintra, we believe that access to wealth-building tools should be
          democratic, transparent, and lightning-fast. <br />
          Our mission isn&rsquo;t merely to build software; it&rsquo;s to build the infrastructure
          for the next generation of financial independence in Bangladesh. We are giving you the
          transparency you deserve and the velocity your capital demands. The future of the Dhaka
          Stock Exchange is digital, decentralised, and driven by data. Welcome to that
          future.&rdquo;
        </p>
        <div className="flex flex-col gap-1.25">
          <span className="text-lg lg:text-xl font-semibold text-brand capitalize">Shaheen M.</span>
          <span className="text-sm lg:text-base font-light text-ink-muted leading-tight">
            Chairman, Fintra Securities Ltd.
          </span>
        </div>
      </div>

      {/* Logo Vector — Figma: (912, 0), 282x357. Flush to the card's right edge. */}
      <div className="hidden lg:block absolute right-0 top-0 w-70.5 z-0 pointer-events-none select-none">
        <Image
          src="/images/about-logo.png"
          alt=""
          aria-hidden="true"
          width={282}
          height={357}
          unoptimized
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto w-65 h-70 overflow-hidden rounded-br-md lg:absolute lg:right-0 lg:-top-17 lg:mx-0 lg:w-98.75 lg:h-106">
        <Image
          src="/images/Chairman.png"
          alt="Shaheen M."
          width={395}
          height={424}
          unoptimized
          className="w-full h-auto object-cover object-top rounded-md"
        />
      </div>
    </section>
  );
}
