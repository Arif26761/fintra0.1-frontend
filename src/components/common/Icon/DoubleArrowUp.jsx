export default function DoubleArrowUp({ direction, className = '' }) {
  const rotation = direction === 'down' ? 'rotate-180' : '';

  return (
    <svg
      viewBox="0 0 10 12"
      fill="none"
      aria-hidden="true"
      className={`${rotation} ${className}`.trim()}
    >
      <path
        d="M8.71973 10.314L4.73473 6.329L0.749726 10.314M8.71973 4.735L4.73473 0.749995L0.749727 4.73499"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
