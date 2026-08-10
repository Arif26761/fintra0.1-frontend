'use client';

import Button from '@/components/common/Button';
import ArrowUp from '../common/Icon/ArrowUp';

export default function JumpToTop() {
  return (
    <Button
      variant="brand600"
      size="xs"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
    >
      <span className="capitalize">Jump to top</span>
      <ArrowUp />
    </Button>
  );
}
