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
    <section
      data-section="app-cta"
      className="flex w-full max-w-360 flex-col items-center gap-10 lg:gap-22.5"
    >
      <div className="flex h-39 w-full items-center px-5 lg:h-21 lg:px-30.25">
        <div className="flex h-full w-full max-w-299.5 flex-col items-center gap-5 lg:flex-row lg:justify-between lg:gap-6.25">
          <div className="flex h-24.5 w-78 min-w-0 flex-col gap-3.75 text-center lg:h-full lg:w-109.75 lg:justify-between lg:gap-0 lg:text-left">
            <h2 className="text-[23px] leading-8.75 font-bold text-ink capitalize lg:text-3xl lg:font-semibold">
              Trade Anywhere, Anytime.
            </h2>
            <p className="text-base leading-6 font-light text-ink capitalize lg:tracking-[0.16px] lg:text-ink-soft lg:normal-case">
              Download the Fintra mobile app for iOS and Android
            </p>
          </div>

          <div className="flex h-9.5 w-full items-center justify-center gap-5.5 lg:h-full lg:w-92 lg:justify-start">
            {STORE_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                <Image
                  src={link.src}
                  alt={link.alt}
                  width={173}
                  height={51}
                  unoptimized
                  className="h-9.5 w-32.25 lg:h-12.75 lg:w-43.25"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <AppShowcase />
    </section>
  );
}
