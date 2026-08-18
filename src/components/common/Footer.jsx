'use client';

import Button from '@/components/common/Button';
import ArrowUp from './Icon/ArrowUp';

export default function Footer({ className = '' }) {
  return (
    <footer
      className={`sticky bottom-0 mt-auto relative isolate flex h-16.25 w-full items-start bg-brand px-3.75 pt-7 pb-2.5 lg:h-19.25 lg:items-center lg:px-30.25 lg:py-5 ${className}`}
    >
      <div className="mx-auto flex w-full flex-col items-center lg:h-9.25 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-xs leading-6.75 font-medium text-black lg:text-lg">
          © 2026 Fintra Securities Ltd. All Rights Reserved.
        </p>

        <Button
          variant="brand600"
          size="xs"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute -top-4.25 left-1/2 -translate-x-1/2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black lg:static lg:translate-x-0"
        >
          <span className="capitalize">Jump to top</span>
          <ArrowUp />
        </Button>
      </div>
    </footer>
  );
}
