// Duplicate-and-translate: render the content twice and slide the track by exactly
// half its width, so the loop is seamless. Figma draws three copies of the ticker,
// but that is just enough to fill 3495.8px of canvas — two is the minimum for the
// loop, and the visible region at rest is identical.
export default function Marquee({ children, duration = 20, className = '', trackClassName = '' }) {
  return (
    <div className={`relative flex items-center overflow-hidden bg-bg ${className}`}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-9.75 bg-bg"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-9.75 bg-bg"
      />

      <div
        className={`animate-marquee flex w-max shrink-0 ${trackClassName}`}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        <div className="flex shrink-0 items-center" aria-hidden={false}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
