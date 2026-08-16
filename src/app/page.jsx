import Navbar from '@/components/common/Navbar';
import AppCta from '@/components/LandingPage/AppCta';
import Faq from '@/components/LandingPage/Faq';
import Features from '@/components/LandingPage/Features';
import Hero from '@/components/LandingPage/Hero';
import PreFooter from '@/components/LandingPage/PreFooter';
import Pricing from '@/components/LandingPage/Pricing';
import Testimonials from '@/components/LandingPage/Testimonials';

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-full min-h-dvh flex flex-col items-center gap-17 pt-3.25 lg:gap-29.25 lg:pt-0">
      <div
        data-diff-hide
        className="fixed top-5 right-0 left-0 z-50 flex justify-center px-5 lg:top-11.25 lg:px-0"
      >
        <Navbar />
      </div>

      <div className="w-full flex flex-col items-center gap-17 lg:gap-0">
        <Hero />
        <Features />
      </div>

      <AppCta />
      <Pricing />
      <Faq />
      <Testimonials />
      <PreFooter />
    </main>
  );
}
