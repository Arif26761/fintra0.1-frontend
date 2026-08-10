import PreFooter from '@/components/LandingPage/PreFooter';

export const metadata = {
  title: 'About Fintra',
  description: 'Redefining the trading experience for the modern investor.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-full flex-col items-center gap-29.25">
      <section className="flex w-360 flex-col items-center gap-10 px-30.5 pt-60">
        <h1 className="text-3xl leading-8.75 font-semibold text-ink capitalize">About Fintra</h1>
        <p className="w-160 text-center text-base leading-6 font-light tracking-[0.16px] text-ink-soft">
          Redefining the trading experience for the modern investor. Precision tools, institutional
          intelligence, and the speed you need to dominate the market.
        </p>
      </section>

      <PreFooter />
    </main>
  );
}
