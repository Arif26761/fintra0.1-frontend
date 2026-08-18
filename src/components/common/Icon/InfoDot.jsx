export default function InfoDot() {
  // Frame 161 — 18x18, 1px #EAEBF4 ring, r:50, holding a 5x10.24 "i".
  return (
    <span
      aria-hidden="true"
      className="flex size-4.5 shrink-0 items-center justify-center rounded-full ring-1 ring-ink-muted"
    >
      <svg viewBox="0 0 5 11" className="h-[10.24px] w-1.25 fill-ink-muted">
        <path d="M2.5 0a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2zM1.6 3.6h1.8V11H1.6z" />
      </svg>
    </span>
  );
}
