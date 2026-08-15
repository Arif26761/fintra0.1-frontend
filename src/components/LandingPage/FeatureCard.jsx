import Image from 'next/image';

export default function FeatureCard({
  title,
  description,
  image,
  frameClassName,
  imgClassName,
  gradient,
  gradientMobile,
  glow = false,
  className = '',
  sizes,
}) {
  return (
    <div
      className={`gradient-ring group relative isolate flex shrink-0 flex-col items-start gap-5.75 overflow-hidden rounded-md bg-bg-card p-3.75 transition-all duration-300 lg:gap-7.5 lg:p-7.5 ${className}`}
    >
      <Image
        src="/images/hover-glow.png"
        alt=""
        fill
        className="pointer-events-none absolute inset-0 z-30 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Ellipse 17 — a static decoration on card 1 only, 132x132 blur(127px) */}
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-28.5 left-28.75 z-[1] h-33 w-33 rounded-[50%] bg-brand blur-[127px] lg:hidden"
        />
      )}

      <div className={`relative z-0 shrink-0 overflow-hidden lg:z-10 ${frameClassName}`}>
        <Image
          src={image}
          alt=""
          className={`absolute max-w-none ${imgClassName}`}
          fill
          sizes={sizes}
        />
        {/* Per-breakpoint gradient — the angle differs between 332x160 and the
            desktop frame, so they cannot share one declaration. */}
        <div className="absolute inset-0 lg:hidden" style={{ backgroundImage: gradientMobile }} />
        <div className="absolute inset-0 hidden lg:block" style={{ backgroundImage: gradient }} />
      </div>

      <div className="relative z-[2] flex w-full flex-col items-start gap-1.25 lg:z-10">
        <h3 className="w-full text-lg leading-6 font-semibold text-ink capitalize lg:text-xl lg:leading-8.75">
          {title}
        </h3>
        <p className="w-full text-base leading-6 font-light tracking-[0.16px] text-ink-soft">
          {description}
        </p>
      </div>
    </div>
  );
}
