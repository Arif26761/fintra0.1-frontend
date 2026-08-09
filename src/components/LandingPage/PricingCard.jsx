import ArrowUpRight from '@/components/common/icon/ArrowUpRight';
import Button from '@/components/common/Button';
import Check from '@/components/common/Check';

export default function PricingCard({
  name,
  description,
  price,
  priceUnit,
  saveLabel,
  cta,
  featuresLabel,
  features,
  featured = false,
}) {
  return (
    <div className="gradient-ring relative flex h-155.75 w-145.75 shrink-0 flex-col gap-7.5 rounded-md bg-bg-card p-7.5">
      <div
        className={`flex w-full flex-col gap-8.75 rounded-sm p-5 ${
          featured ? 'bg-surface-alt' : 'bg-surface'
        }`}
      >
        <div className="flex w-full flex-col gap-1.25">
          <h3
            className={`text-xl leading-8.75 font-medium capitalize ${
              featured ? 'text-brand' : 'text-ink'
            }`}
          >
            {name}
          </h3>
          <p className="text-base leading-6 font-light tracking-[0.16px] text-ink-soft">
            {description}
          </p>
        </div>

        <p className="flex w-full items-center justify-between capitalize">
          <span className="flex items-baseline gap-2.5 text-4xl leading-13.5 font-semibold text-ink">
            {price}
            {priceUnit && <span className="text-xl leading-none font-normal">{priceUnit}</span>}
          </span>

          {saveLabel && (
            <span className="rounded-sm bg-surface-faded px-3 py-1.5 text-xl leading-none font-normal text-ink-ghost">
              {saveLabel}
            </span>
          )}
        </p>
      </div>

      <Button variant={featured ? 'primary' : 'white'} size="md" className="w-full">
        {cta}
        <ArrowUpRight />
      </Button>

      <div className="flex w-full flex-col gap-3.75">
        <p className="text-base leading-4 font-medium text-ink-soft capitalize">{featuresLabel}</p>

        <ul className="flex w-full flex-col gap-3.25">
          {features.map((feature) => (
            <li key={feature} className="flex h-5.5 w-full gap-4.5">
              <Check className={featured ? 'text-brand' : 'text-ink'} />
              <span className="text-base leading-5.5 font-light text-ink-soft capitalize">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
