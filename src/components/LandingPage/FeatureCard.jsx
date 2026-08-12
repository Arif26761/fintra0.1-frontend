import Image from 'next/image';

export default function FeatureCard({
  title,
  description,
  image,
  frameClassName,
  imgClassName,
  gradient,
  className = '',
  sizes,
}) {
  return (
    <div
      className={`gradient-ring group relative flex shrink-0 flex-col items-start gap-7.5 overflow-hidden rounded-md bg-bg-card p-7.5 transition-all duration-300 ${className}`}
    >
      {/* Hover Glow Image Overlay */}
      <Image
        src="/images/hover-glow.png"
        alt=""
        fill
        className="pointer-events-none absolute inset-0 z-30 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Alternative CSS Ellipse (Uncomment to use instead of PNG):
      <div
        aria-hidden="true"
        className="feature-card-glow pointer-events-none absolute top-1/2 left-1/2 z-30 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B7FF64] opacity-0 blur-[90px] transition-opacity duration-300 group-hover:opacity-25"
      />
      */}

      <div className={`relative shrink-0 overflow-hidden z-10 ${frameClassName}`}>
        <Image
          src={image}
          alt=""
          className={`absolute max-w-none ${imgClassName}`}
          fill
          sizes={sizes}
        />
        <div className="absolute inset-0" style={{ backgroundImage: gradient }} />
      </div>

      <div className="relative z-10 flex w-full flex-col items-start gap-1.25">
        <h3 className="w-full text-xl leading-8.75 font-semibold text-ink capitalize">{title}</h3>
        <p className="w-full text-base leading-6 font-light tracking-[0.16px] text-ink-soft">
          {description}
        </p>
      </div>
    </div>
  );
}
