import Image from 'next/image';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export const metadata = {
  title: 'About Fintra',
  description: 'Redefining the trading experience for the modern investor.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-full min-h-dvh flex flex-col items-center gap-16 lg:gap-29.2 pb-0 pt-40 bg-bg">
      {/* Pinned Navbar */}
      <div
        data-diff-hide
        className="fixed top-11.25 left-0 right-0 z-50 flex justify-center px-6 lg:px-0"
      >
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-299.5 flex flex-col gap-10 lg:gap-20">
        {/* Header Block */}
        <section className="flex flex-col gap-1.25">
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight lg:leading-17.5 text-ink capitalize">
            About the Company
          </h1>
        </section>

        {/* Intro Block (Body Copy + Component 506 placeholder) */}
        <section className="flex flex-col gap-12">
          <div className="flex flex-col gap-6 text-base font-light leading-6.75 text-ink-soft max-w-299.5">
            <p>
              At Fintra, we believe investing should feel clear, accessible, and empowering. In a
              market where finance can often feel distant, complex, or difficult to navigate, we are
              building a more welcoming gateway into Bangladesh’s capital market. Fintra combines
              technology, research, and client-focused service to help investors make
              better-informed decisions with confidence. Whether someone is opening their first BO
              account, learning how the stock market works, or managing a growing portfolio, our
              goal is to make every step simpler, more transparent, and more human. We are not just
              another brokerage. We are a platform, a partner, and a movement to make investing in
              Bangladesh easier to understand and easier to access.
            </p>
            <p className="font-medium text-ink">Invest with clarity. Trade with confidence.</p>
          </div>

          {/* Component 506 (Stats Strip) */}
          <div className="w-full h-auto min-h-15 border border-line rounded-md bg-bg-card flex flex-wrap items-center justify-around gap-6 px-8 py-4 lg:py-0 text-base font-medium text-ink-soft">
            <div className="flex items-center gap-2">
              <span className="text-brand">600+</span>
              <span>Active Traders</span>
            </div>
            <div className="hidden lg:block w-px h-5 bg-line" />
            <div className="flex items-center gap-2">
              <span className="text-brand">0.01s</span>
              <span>Execution Latency</span>
            </div>
            <div className="hidden lg:block w-px h-5 bg-line" />
            <div className="flex items-center gap-2">
              <span className="text-brand">T+2</span>
              <span>Standard Settlement</span>
            </div>
          </div>
        </section>

        {/* Start Card Section (Chairman Quote, overlapping elements, ellipses) */}
        <section className="relative w-full border border-line rounded-md bg-bg-card p-6 lg:p-7.5 overflow-visible min-h-[420px] lg:min-h-[356px] flex flex-col justify-between gap-6 lg:gap-0">
          {/* Quote & Author Info */}
          <div className="flex flex-col gap-6 max-w-full lg:max-w-[819px] z-20">
            <p className="text-base lg:text-xl font-light leading-relaxed lg:leading-7 text-ink-soft italic">
              &ldquo;For decades, the standard retail investor has been forced to play a game where
              the rules are skewed against them—stuck with delayed feeds, rigid settlement cycles,
              and opaque data. At Fintra, we believe that access to wealth-building tools should be
              democratic, transparent, and lightning-fast. Our mission isn&rsquo;t merely to build
              software; it&rsquo;s to build the infrastructure for the next generation of financial
              independence in Bangladesh. We are giving you the transparency you deserve and the
              velocity your capital demands. The future of the Dhaka Stock Exchange is digital,
              decentralised, and driven by data. Welcome to that future.&rdquo;
            </p>
            <div className="flex flex-col gap-1.25">
              <span className="text-lg lg:text-xl font-semibold text-brand capitalize">
                Shaheen M.
              </span>
              <span className="text-sm lg:text-base font-light text-ink-muted leading-tight">
                Chairman, Fintra Securities Ltd.
              </span>
            </div>
          </div>

          {/* Logo Vector — Figma: (912, 0), 282x357. Flush to the card's right edge. */}
          <div className="hidden lg:block absolute right-0 top-0 w-[282px] z-0 pointer-events-none select-none">
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

          {/* Gemini Image of Chairman — Figma: (798, -69), 395x424. Also flush right,
              overhanging the card top by 69px (424 - 69 = 355 ≈ the card's 356 height). */}
          <div className="z-10 mx-auto w-[260px] h-[280px] overflow-hidden rounded-md lg:absolute lg:right-0 lg:top-[-69px] lg:mx-0 lg:w-[395px] lg:h-[424px]">
            <Image
              src="/images/Chairman.png"
              alt="Shaheen M."
              width={395}
              height={424}
              unoptimized
              className="w-full h-auto object-cover object-top rounded-md"
            />
          </div>

          {/* Glowing Ellipses */}
          <div className="absolute left-[261px] top-[341px] w-[673px] h-[44px] rounded-full bg-brand/10 blur-xl pointer-events-none hidden lg:block" />
          <div className="absolute left-[41px] top-[393px] w-[1113px] h-[72px] rounded-full bg-brand/5 blur-2xl pointer-events-none hidden lg:block" />
        </section>

        {/* Mission & Vision Columns */}
        <section className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-10 w-full">
          {/* Mission */}
          <div className="flex-1 max-w-full lg:max-w-[579px] flex flex-col gap-3.75">
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink capitalize">Our Mission</h2>
            <p className="text-base font-light leading-6.75 text-ink-soft">
              To democratize access to Bangladesh&rsquo;s capital market by making investing
              simpler, more transparent, and more client-focused. We exist to empower every investor
              &mdash; from first-time participants to experienced traders &mdash; with the tools,
              knowledge, service, and confidence they need to take control of their financial
              future.
            </p>
          </div>

          {/* Vision */}
          <div className="flex-1 max-w-full lg:max-w-[579px] flex flex-col gap-3.75">
            <h2 className="text-2xl lg:text-3xl font-semibold text-ink capitalize">Our Vision</h2>
            <p className="text-base font-light leading-6.75 text-ink-soft">
              To become Bangladesh&rsquo;s most trusted and accessible investment platform,
              transforming how people understand, access, and participate in the capital market. We
              envision a future where investing is no longer intimidating or exclusive, but clear,
              digital, inclusive, and built around the long-term financial well-being of every
              client.
            </p>
          </div>
        </section>
      </div>

      {/* Footer bar */}
      <div className="w-full mt-10 lg:mt-20">
        <Footer />
      </div>
    </main>
  );
}
