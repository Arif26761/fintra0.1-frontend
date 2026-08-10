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
      className={`gradient-ring relative flex shrink-0 flex-col items-start gap-7.5 rounded-md bg-bg-card p-7.5 ${className}`}
    >
      <div className={`relative shrink-0 overflow-hidden ${frameClassName}`}>
        <Image
          src={image}
          alt=""
          className={`absolute max-w-none ${imgClassName}`}
          fill
          sizes={sizes}
        />
        <div className="absolute inset-0" style={{ backgroundImage: gradient }} />
      </div>

      <div className="flex w-full flex-col items-start gap-1.25">
        <h3 className="w-full text-xl leading-8.75 font-semibold text-ink capitalize">{title}</h3>
        <p className="w-full text-base leading-6 font-light tracking-[0.16px] text-ink-soft">
          {description}
        </p>
      </div>
    </div>
  );
}
