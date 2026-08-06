import Link from 'next/link';

const BASE = 'inline-flex items-center justify-center gap-2.5 rounded-pill whitespace-nowrap';

const VARIANTS = {
  primary: 'bg-brand text-black font-medium',
  ghost: 'bg-[rgb(255_255_255/0.1)] text-ink font-semibold',
  ghostMuted: 'bg-[rgb(255_255_255/0.1)] text-ink-soft font-medium',
};

const SIZES = {
  sm: 'h-11.25 px-7.5 text-base leading-5.5', // navbar — 45px tall
  md: 'px-10 py-2.5 text-lg leading-[27px]', // hero — 47px from 10+27+10
};

export default function Button({
  href,
  variant = 'primary',
  size = 'sm',
  className = '',
  children,
  ...props
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
