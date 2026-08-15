import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/common/Footer';

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

// TODO: three 25x25 white vectors in Figma Frame 37 — export and confirm which
// platforms they are before wiring the hrefs.
const SOCIALS = [
  {
    id: 'social-1',
    src: '/images/social-media/facebook.png',
    label: 'Fintra on social media',
    href: '#',
  },
  {
    id: 'social-2',
    src: '/images/social-media/instagram.png',
    label: 'Fintra on social media',
    href: '#',
  },
  {
    id: 'social-3',
    src: '/images/social-media/linkedin.png',
    label: 'Fintra on social media',
    href: '#',
  },
];

const COMPANY = [
  { label: 'About Fintra', href: '/about' },
  { label: 'Careers', href: '#' },
  { label: 'Contact Support', href: '#' },
];

const LEGAL = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Risk Disclosure', href: '#' },
  { label: 'Refund Policy', href: '#' },
];

function LinkColumn({ heading, links, height }) {
  return (
    <div className={`flex w-full flex-col justify-between ${height}`}>
      <p className="text-base leading-3.5 font-medium text-ink-muted capitalize">{heading}</p>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-base leading-3.5 font-medium text-ink capitalize"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default function PreFooter() {
  return (
    <section data-section="prefooter" className="flex w-full flex-col items-center gap-25 lg:h-124">
      {/* Mobile: 362 content in a 402 viewport, stacked, 40px between blocks.
          Desktop: 1195 wide, four columns, space-between. */}
      <div className="flex w-full max-w-298.75 flex-col gap-10 px-5 lg:flex-row lg:justify-between lg:gap-0 lg:px-0">
        {/* Frame 151 — mobile 362x273 with a 30px gap; desktop 334x319 space-between */}
        <div className="flex w-full min-w-0 flex-col gap-7.5 lg:h-[319px] lg:w-[334px] lg:justify-between lg:gap-0">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3.75">
              <Image
                src="/images/logo.svg"
                alt="Fintra"
                width={160}
                height={40}
                className="h-10 w-40"
                unoptimized
              />
              <p className="w-full text-base leading-5.5 font-light text-ink-soft lg:w-83.5">
                Redefining the trading experience for the modern investor. Precision tools,
                institutional intelligence, and the speed you need to dominate the market.
              </p>
            </div>

            <div className="flex h-10 items-center gap-5.5">
              {STORE_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm"
                >
                  <Image
                    src={link.src}
                    alt={link.alt}
                    width={135}
                    height={40}
                    className="h-10 w-33.75"
                    unoptimized
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="flex h-15.5 w-full flex-col gap-2.5 lg:w-83.5">
            <p className="text-lg leading-6.75 font-semibold text-ink-soft capitalize">
              Follow our market updates
            </p>
            <div className="flex gap-3.5">
              {SOCIALS.map((s) => (
                <a key={s.id} href={s.href} aria-label={s.label} className="rounded-sm">
                  <Image
                    src={s.src}
                    alt=""
                    width={25}
                    height={25}
                    className="size-6.25"
                    unoptimized
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <LinkColumn heading="Company" links={COMPANY} height="h-29 lg:w-31.5" />
        <LinkColumn heading="Legal Links" links={LEGAL} height="h-37.75 lg:w-32.25" />

        {/* Figma's newsletter block is visible:false at BOTH breakpoints
            (11625:15801 desktop, 12590:17116 mobile) — deliberately not built. */}
        <div className="flex w-full min-w-0 flex-col gap-2.5 lg:w-83.5">
          <p className="text-lg leading-6 font-semibold text-ink-soft capitalize">
            Visit Our Office
          </p>
          <Image
            src="/images/office-map.png"
            alt="Map showing the Fintra office location"
            width={334}
            height={147}
            className="h-36.75 w-full rounded-sm object-cover lg:w-83.5"
            unoptimized
          />
        </div>
      </div>

      <Footer />
    </section>
  );
}
