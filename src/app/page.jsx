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
    <main className="mx-auto w-full max-w-full min-h-dvh flex flex-col items-center gap-16 lg:gap-29.25">
      <div
        data-diff-hide
        className="fixed top-11.25 left-0 right-0 z-50 flex justify-center px-6 lg:px-0"
      >
        <Navbar />
      </div>

      <div className="w-full flex flex-col items-center">
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
