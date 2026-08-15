import Image from 'next/image';
import ArrowUpRight from '@/components/common/Icon/ArrowUpRight';
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
  const hoverImage = featured ? '/images/plan-hover-green.png' : '/images/Plan-hover-white.png';

  return (
    <div
      className={`gradient-ring group relative flex h-155.75 w-145.75 shrink-0 flex-col gap-7.5 overflow-hidden rounded-md bg-bg-card p-7.5 transition-all duration-300 ${
        featured ? '' : 'ring-hover-white'
      }`}
    >
      {/* Hover Overlay Image */}
      <Image
        src={hoverImage}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="pointer-events-none absolute inset-0 z-30 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div
        className={`relative z-10 flex w-full flex-col gap-8.75 rounded-sm p-5 ${
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
            <span className="h-9.75 flex items-center rounded-sm bg-surface-faded px-3 py-1.5 text-xl leading-none font-normal text-ink-soft">
              {saveLabel}
            </span>
          )}
        </p>
      </div>

      <div className="relative z-40 w-full">
        <Button variant={featured ? 'primary' : 'white'} size="md" className="w-full">
          {cta}
          <ArrowUpRight />
        </Button>
      </div>

      <div className="relative z-40 flex w-full flex-col gap-3.75">
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
