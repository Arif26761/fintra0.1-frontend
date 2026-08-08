import Image from 'next/image';
import AppShowcase from './AppShowcase';

const STORE_LINKS = [
  {
    href: 'https://www.apple.com/app-store/',
    src: '/images/badge-appstore.svg',
    alt: 'Download on the App Store',
  },
  {
    href: 'https://play.google.com/store',
    src: '/images/badge-googleplay.svg',
    alt: 'Get it on Google Play',
  },
];

export default function AppCta() {
  return (
    <section data-section="app-cta" className="flex h-159 w-360 flex-col items-center gap-22.5">
      <div className="flex h-21 w-full items-center px-30.25">
        <div className="flex h-full w-299.5 items-center justify-between gap-6.25">
          <div className="flex h-full w-109.75 flex-col justify-between">
            <h2 className="text-3xl leading-8.75 font-semibold text-ink capitalize">
              Trade Anywhere, Anytime.
            </h2>
            <p className="text-base leading-6 font-light tracking-[0.16px] text-ink-soft">
              Download the Fintra mobile app for iOS and Android
            </p>
          </div>

          <div className="flex h-full w-92 items-center gap-5.5">
            {STORE_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                <Image src={link.src} alt={link.alt} width={173} height={51} unoptimized />
              </a>
            ))}
          </div>
        </div>
      </div>

      <AppShowcase />
    </section>
  );
}
