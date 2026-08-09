export default function Check({ className = '' }) {
  return (
    <span className={`block h-3.75 w-2 shrink-0 pt-2.25 ${className}`}>
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
        <path
          d="M1 3L3 5L7 1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
