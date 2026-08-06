export default function ArrowUpRight({ className = 'size-2.5' }) {
  return (
    <svg className={className} viewBox="0 0 10 10" aria-hidden="true">
      <path d="M1 9 L9 1 M3 1 H9 V7" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
