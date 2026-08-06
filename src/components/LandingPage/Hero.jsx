/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Button from '@/components/common/Button';
import ArrowUpRight from '@/components/common/Icon/ArrowUpRight';

export default function Hero() {
  return (
    <section data-section="hero" className="relative h-315.5 w-full">
      <div className="absolute inset-x-0 top-0 flex h-226.5 flex-col items-center justify-center p-4.5">
        <div className="relative isolate flex h-219.5 w-full flex-col items-center justify-center gap-2.5 overflow-hidden rounded-[18px] bg-rich-green px-25.75 pb-52.5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-160.5 left-0 -z-10 h-175 w-350.75"
          >
            <div className="absolute inset-[-57.14%_-28.51%]">
              <img src="/images/hero-glow.svg" alt="" className="block size-full max-w-none" />
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-1.25 py-7.5">
            <div className="flex items-center justify-center gap-2.5 rounded-[44px] bg-[rgb(255_255_255/0.15)] py-1.25 pr-3.75 pl-1.25">
              <Image
                src="/images/hero-avatars.png"
                alt=""
                width={64}
                height={24}
                className="h-6 w-16 shrink-0 object-contain"
                priority
              />
              <span className="text-base whitespace-nowrap text-ink capitalize">
                Trusted by over 600 traders all over bangladesh
              </span>
            </div>

            <h1 className="text-center text-5xl leading-17.5 font-bold text-ink capitalize">
              Invest with clarity.
              <br />
              trade with confidence
            </h1>

            <p className="w-full text-center text-base font-light text-ink capitalize">
              Empowering Every Investor in Bangladesh&rsquo;s Capital Market
            </p>
          </div>

          <div className="flex w-107.25 items-start justify-center gap-2.5 py-5">
            <Button href="/login" variant="primary" size="md" className="min-w-0 flex-1">
              Login
              <ArrowUpRight />
            </Button>
            <Button href="/about" variant="ghost" size="md" className="min-w-0 flex-1">
              About Us
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute top-145.25 left-1/2 h-141.75 w-239.75 -translate-x-1/2 overflow-hidden">
        <Image
          src="/images/hero-dashboard.png"
          alt=""
          width={958}
          height={681}
          className="absolute top-0 left-1/2 h-170.25 w-239.5 max-w-none -translate-x-1/2 rounded-[12px] object-cover"
        />
        <div
          className="absolute inset-0 rounded-[12px]"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,12,12,0) 23.8%, #000c0c 79.8%)',
          }}
        />
      </div>
    </section>
  );
}
