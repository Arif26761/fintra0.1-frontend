import Link from 'next/link';

const LINKS = ['Market', 'Analysis', 'Chart', 'Screener', 'Features'];

export default function Navbar({ active = 'Features' }) {
  return (
    <nav
      aria-label="Main"
      className="flex w-309 items-center justify-between rounded-md bg-[rgb(30_30_30/0.2)] py-2.5 pr-2.5 pl-5 shadow-[inset_0_0_0_2px_rgb(255_255_255/0.15)] backdrop-blur-md"
    >
      <Link href="/" aria-label="Fintra home" className="h-[31px] w-[120px] bg-ink" />

      <ul className="flex h-11.25 list-none items-center gap-10">
        {LINKS.map((label) => (
          <li key={label} className="relative flex h-full items-center">
            <Link
              href={`/${label.toLowerCase()}`}
              aria-current={label === active ? 'page' : undefined}
              className="text-base leading-6.75 font-medium text-ink-soft"
            >
              {label}
            </Link>
            {label === active && (
              <span className="absolute inset-x-0 -bottom-2.5 h-0.5 rounded-pill bg-brand" />
            )}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2.5">
        <Link
          href="/login"
          className="inline-flex h-11.25 items-center justify-center rounded-pill bg-[rgb(255_255_255/0.1)] px-7.5 text-base leading-5.5 font-medium text-ink-soft"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="inline-flex h-11.25 items-center justify-center gap-2.5 rounded-pill bg-brand px-7.5 text-base leading-5.5 font-medium text-black"
        >
          Sign Up
          <svg className="size-2.5" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M1 9 L9 1 M3 1 H9 V7" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
