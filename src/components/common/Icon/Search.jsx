export default function Search({ className = 'size-4.5 text-[#aab2b2]' }) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <circle cx="7.5" cy="7.5" r="6" />
      <path d="M12 12l4.5 4.5" />
    </svg>
  );
}
