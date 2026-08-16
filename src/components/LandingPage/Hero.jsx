import HeroDesktop from './HeroDesktop';
import HeroMobile from './HeroMobile';

const COPY = {
  headingTop: 'Invest with clarity.',
  headingBottom: 'trade with confidence',
  subhead: 'Empowering Every Investor in Bangladesh\u2019s Capital Market',
};

export default function Hero() {
  return (
    <section data-section="hero" className="relative w-full lg:h-315.5 px-4">
      <HeroMobile copy={COPY} />
      <HeroDesktop copy={COPY} />
    </section>
  );
}
