import ArrowUpRight from '@/components/common/Icon/ArrowUpRight';
import Button from '@/components/common/Button';
import TestimonialSlider from './TestimonialSlider';

function Glow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute -left-6.5 top-76.25 h-30 w-312.75 rounded-[50%] bg-brand-800 opacity-40 blur-[67px]" />
      <span className="absolute left-6 top-88.25 h-13.75 w-289.75 rounded-[50%] bg-brand-700 opacity-50 blur-[41px]" />
      <span className="absolute left-55 top-88.25 h-6.25 w-190 rounded-[50%] bg-brand blur-xs" />
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      data-section="testimonials"
      className="gradient-ring relative flex h-91 w-299.5 gap-12.5 overflow-hidden rounded-md bg-bg-card p-15 [--ring-angle:126.2deg] [--ring-from:-3.9%] [--ring-to:37.6%]"
    >
      <Glow />

      <div className="relative z-10 flex h-61 w-128.5 shrink-0 flex-col gap-7.5">
        <div className="flex flex-col gap-3.75">
          <h2 className="text-3xl leading-10 font-semibold text-ink capitalize">
            Elevate Your Strategy
            <br />
            Dominate the Market
          </h2>
          <p className="text-base leading-6 font-light tracking-[0.16px] text-ink-soft">
            Stop trading in the dark. Join thousands of elite investors using Fintra to outpace the
            market with real-time data, instant liquidity, and institutional-grade insights. Your
            next big move starts here.
          </p>
        </div>

        <Button variant="primary" size="md" className="self-start">
          Start My Journey
          <ArrowUpRight />
        </Button>
      </div>

      <TestimonialSlider />
    </section>
  );
}
