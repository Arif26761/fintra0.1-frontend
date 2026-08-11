'use client';

import Button from '@/components/common/Button';
import ArrowUp from './Icon/ArrowUp';

export default function Footer() {
  return (
    <div className="flex h-19.25 w-full bg-brand px-6 py-5 lg:px-30.25">
      <div className="flex h-9.25 w-full items-center justify-between">
        <p className="text-lg leading-6.75 font-medium text-black">
          © 2026 Fintra Securities Ltd. All Rights Reserved.
        </p>
        <Button
          variant="brand600"
          size="xs"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          <span className="capitalize">Jump to top</span>
          <ArrowUp />
        </Button>
      </div>
    </div>
  );
}
