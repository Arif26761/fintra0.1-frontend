import PricingPlans from './PricingPlans';

export default function Pricing() {
  return (
    <section data-section="pricing" className="flex w-full max-w-360 flex-col items-center gap-10">
      <div className="flex h-21 w-full items-center px-6 lg:px-30.25">
        <div className="flex h-full w-full max-w-299.5 flex-col items-center justify-between">
          <h2 className="text-3xl leading-8.75 font-semibold text-ink capitalize">
            Choose Your Trading Power
          </h2>
          <p className="text-base leading-6 font-light tracking-[0.16px] text-ink-soft">
            Flexible plans designed for every stage of your investment journey
          </p>
        </div>
      </div>

      <PricingPlans />
    </section>
  );
}
