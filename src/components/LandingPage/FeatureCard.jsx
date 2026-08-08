import Image from 'next/image';

export default function FeatureCard({
  title,
  description,
  image,
  frameClassName,
  imgClassName,
  gradient,
  className = '',
}) {
  return (
    <div
      className={`flex shrink-0 flex-col items-start gap-7.5 rounded-md shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)] bg-bg-card p-7.5 ${className}`}
    >
      <div className={`relative shrink-0 overflow-hidden ${frameClassName}`}>
        <Image src={image} alt="" className={`absolute max-w-none ${imgClassName}`} fill />
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
