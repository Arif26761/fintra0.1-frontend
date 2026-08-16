export default function Caret({ open, className = '' }) {
  const sizeAndColor = className || 'h-2.25 w-4 text-ink-muted';
  return (
    <svg
      viewBox="0 0 16 9"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-300 linear ${
        open ? 'rotate-180' : ''
      } ${sizeAndColor}`}
    >
      <path d="M0 0h16L8 9z" fill="currentColor" />
    </svg>
  );
}
