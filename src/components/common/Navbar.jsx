import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/common/Button';
import ArrowUpRight from '@/components/common/Icon/ArrowUpRight';

const LINKS = ['Market', 'Analysis', 'Chart', 'Screener', 'Features'];

export default function Navbar({ active = 'Features' }) {
  return (
    <nav
      aria-label="Main"
      className="flex w-309 items-center justify-between rounded-md bg-[rgb(30_30_30/0.2)] py-2.5 pr-2.5 pl-5 shadow-[inset_0_0_0_2px_rgb(255_255_255/0.15)] backdrop-blur-md"
    >
      <Link href="/" aria-label="Fintra home" className="shrink-0">
        <Image src="/images/logo.svg" alt="Fintra" width={120} height={31} unoptimized priority />
      </Link>

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
        <Button href="/login" variant="ghostMuted">
          Login
        </Button>
        <Button href="/signup" variant="primary">
          Sign Up
          <ArrowUpRight />
        </Button>
      </div>
    </nav>
  );
}
