'use client';

// 16x9 solid triangle — Figma "Vector", fill #a1a1aa.
function Caret({ open }) {
  return (
    <svg
      viewBox="0 0 16 9"
      aria-hidden="true"
      className={`h-2.25 w-4 shrink-0 text-ink-muted transition-transform duration-200 ${
        open ? 'rotate-180' : ''
      }`}
    >
      <path d="M0 0h16L8 9z" fill="currentColor" />
    </svg>
  );
}

export default function FaqItem({ id, question, answer, open, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className="gradient-ring relative flex w-full cursor-pointer flex-col gap-7.5 rounded-md bg-bg-card p-7.5"
    >
      <h3 className="flex">
        <button
          type="button"
          id={`faq-${id}`}
          aria-expanded={open}
          aria-controls={`faq-panel-${id}`}
          className="flex h-8.75 w-full cursor-pointer items-center justify-between gap-1.25 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <span className="text-base leading-8.75 font-medium text-ink capitalize">{question}</span>
          <Caret open={open} />
        </button>
      </h3>

      {open && (
        <p
          id={`faq-panel-${id}`}
          role="region"
          aria-labelledby={`faq-${id}`}
          className="text-base leading-6 font-light tracking-[0.16px] text-ink-soft"
        >
          {answer}
        </p>
      )}
    </div>
  );
}
