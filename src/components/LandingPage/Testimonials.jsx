import ArrowUpRight from '@/components/common/Icon/ArrowUpRight';
import Button from '@/components/common/Button';
import TestimonialSlider from './TestimonialSlider';
import Glow from '../common/Glow';

export default function Testimonials() {
  return (
    <section
      data-section="testimonials"
      className="gradient-ring relative flex w-full max-w-90.5 lg:max-w-299.5 flex-col gap-10 lg:gap-12.5 overflow-hidden rounded-md bg-bg-card px-5 pt-5 pb-12.5 lg:flex-row lg:p-15 [--ring-angle:126.2deg] [--ring-from:-3.9%] [--ring-to:37.6%]"
    >
      <Glow />

      <div className="relative z-10 flex lg:h-61 lg:w-128.5 lg:shrink-0 w-full flex-col gap-7.5">
        <div className="flex flex-col gap-3.75">
          <h2 className="text-3xl leading-10.25 lg:leading-10 font-semibold text-ink capitalize">
            Elevate Your Strategy
            <br />
            Dominate the Market
          </h2>
          <p className="text-sm lg:text-base leading-5 lg:leading-6 font-light tracking-[0.14px] lg:tracking-[0.16px] text-ink-soft">
            Stop trading in the dark. Join thousands of elite investors using Fintra to outpace the
            market with real-time data, instant liquidity, and institutional-grade insights. Your
            next big move starts here.
          </p>
        </div>

        <Button variant="primary" size="md" className="w-full lg:w-auto lg:self-start">
          Start My Journey
          <ArrowUpRight />
        </Button>
      </div>

      <TestimonialSlider />
    </section>
  );
}
