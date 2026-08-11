'use client';

const OPTIONS = [
  { id: 'monthly', label: 'Monthly', size: 'w-39.75 font-medium' },
  { id: 'annually', label: 'Annually', note: '(30% Off)', size: 'w-38.5 font-medium' },
];

const PILL = {
  monthly: 'left-1.25 w-39.75',
  annually: 'left-42 w-38.5',
};

export default function BillingToggle({ value, onChange }) {
  return (
    <div
      role="group"
      aria-label="Billing period"
      className="gradient-ring gradient-ring-soft relative flex h-11.5 w-83.25 shrink-0 items-center gap-2.5 rounded-pill shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)] bg-bg-card p-1.25"
    >
      <span
        aria-hidden="true"
        className={`absolute top-1.25 w-39.75 h-9 rounded-pill items-center bg-brand transition-all duration-300 ${PILL[value]}`}
      />

      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          aria-pressed={value === option.id}
          className={`relative z-10 w-39.75 h-[36] flex items-center justify-center whitespace-nowrap rounded-pill px-5 text-base font-medium leading-4 capitalize transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${
            option.size
          } ${value === option.id ? 'text-black' : 'text-ink'}`}
        >
          {option.label}
          {option.note && (
            <span className="ml-1 text-[10px] font-medium text-ink-muted">{option.note}</span>
          )}
        </button>
      ))}
    </div>
  );
}
