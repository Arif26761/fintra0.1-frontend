import LogoSlider from '@/components/About/LogoSlider';

export default function Intro() {
  return (
    <>
      <div className="flex flex-col gap-1.25">
        <h1 className="text-3xl lg:text-5xl font-bold leading-tight lg:leading-17.5 text-ink capitalize">
          About the Company
        </h1>
      </div>

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6 text-base font-light leading-6 text-ink-soft max-w-299.5">
          <p>At Fintra, we believe investing should feel clear, accessible, and empowering.</p>
          <p>
            In a market where finance can often feel distant, complex, or difficult to navigate, we
            are building a more welcoming gateway into Bangladesh’s capital market. Fintra combines
            technology, research, and client-focused service to help investors make better-informed
            decisions with confidence.
            <br />
            Whether someone is opening their first BO account, learning how the stock market works,
            or managing a growing portfolio, our goal is to make every step simpler, more
            transparent, and more human.
          </p>
          <p>
            We are not just another brokerage.
            <br />
            We are a platform, a partner, and a movement to make investing inBangladesh easier to
            understand and easier to access.
          </p>
          <p className="text-base font-medium italic leading-8 text-ink">
            Invest with clarity. Trade with confidence.
          </p>
        </div>

        <LogoSlider />
      </div>
    </>
  );
}
