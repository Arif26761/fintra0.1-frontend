import Image from 'next/image';

const FADE = 'linear-gradient(140.57deg, rgba(13,24,24,0) 29.15%, #0D1818 59.09%)';
const STEP = 123;

export default function AppShowcaseMobile({ items, active }) {
  return (
    <div className="flex w-full flex-col gap-3.75 px-5 lg:hidden">
      {/* Loader — 362x2 track, fill is exactly one quarter (90.5px) */}
      <div className="h-0.5 w-full overflow-hidden rounded-pill bg-line">
        <div
          className="h-0.5 w-1/4 rounded-pill bg-ink transition-transform duration-300 ease-linear"
          style={{ transform: `translateX(${active * 100}%)` }}
        />
      </div>

      {/* Headers — one item visible, the column slides under it */}
      <div className="h-22 overflow-hidden">
        <ul
          className="flex flex-col gap-8.75 transition-transform duration-300 ease-linear"
          style={{ transform: `translateY(-${active * STEP}px)` }}
        >
          {items.map((item, index) => (
            <li
              key={item.title}
              aria-hidden={index !== active}
              className="flex h-22 w-full shrink-0 flex-col gap-1.25"
            >
              <span className="text-lg leading-6 font-semibold text-ink capitalize">
                {item.title}
              </span>
              <span className="text-base leading-6 font-light tracking-[0.16px] text-ink-soft">
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Component 2 — 362x462, pad 30/30/0, no gradient ring at this breakpoint */}
      <div className="h-115.5 w-full overflow-hidden rounded-md bg-bg-card px-7.5 pt-7.5">
        <div className="relative h-108 w-full overflow-hidden">
          {items.map((item, index) => (
            <Image
              key={item.title}
              src={item.image}
              alt=""
              width={475}
              height={1002}
              priority={index === 0}
              className={`absolute top-1 -left-px h-159.25 w-75.5 max-w-none transition-transform duration-300 ease-linear ${
                index === active
                  ? 'z-10 translate-y-0 delay-300'
                  : 'z-0 translate-y-[532px] delay-0'
              }`}
            />
          ))}
          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{ backgroundImage: FADE }}
          />
        </div>
      </div>
    </div>
  );
}
