import Image from 'next/image';
import ArrowUpRight from '@/components/common/Icon/ArrowUpRight';
import Button from '@/components/common/Button';
import Check from '@/components/common/Check';
import PlanFeatures from './PlanFeatures';

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
      // card root
      className={`gradient-ring group relative flex w-90.875 shrink-0 flex-col gap-7.5 overflow-hidden rounded-md bg-bg-card p-3.75 transition-all duration-300 lg:h-155.75 lg:w-145.75 lg:p-7.5 ${
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
        // header box — pad 15/20 mobile, 20 all round desktop
        className={`relative z-10 flex w-full flex-col gap-8.75 rounded-sm px-5 py-3.75 lg:p-5 ${
          featured ? 'bg-surface-alt' : 'bg-surface'
        }`}
      >
        <div className="flex w-full flex-col gap-1.25">
          <h3
            // name  18/24 → 20/35
            className={`text-lg leading-6 font-medium capitalize lg:text-xl lg:leading-8.75 ${
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
          <span className="flex items-baseline gap-2.5 text-3xl leading-10.25 font-semibold text-ink lg:text-4xl lg:leading-13.5">
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

      <PlanFeatures featured={featured} featuresLabel={featuresLabel} features={features} />
    </div>
  );
}
