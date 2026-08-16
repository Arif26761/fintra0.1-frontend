import PricingPlans from './PricingPlans';

export default function Pricing() {
  return (
    <section
      data-section="pricing"
      className="flex w-97 lg:w-full max-w-360 flex-col items-center gap-10"
    >
      <div className="flex h-24.5 w-full items-center justify-center px-5 lg:h-21 lg:px-30.25">
        <div className="flex h-full w-78 flex-col gap-3.75 text-center lg:w-full lg:max-w-299.5 lg:items-center lg:justify-between lg:gap-0">
          <h2 className="text-[23px] leading-8.75 font-bold text-ink capitalize lg:text-3xl lg:font-semibold">
            Choose Your Trading Power
          </h2>
          <p className="text-base leading-6 font-light text-ink capitalize lg:tracking-[0.16px] lg:text-ink-soft lg:normal-case">
            Flexible plans designed for every stage of your investment journey
          </p>
        </div>
      </div>

      <PricingPlans />
    </section>
  );
}
