import Navbar from '@/components/common/Navbar';
import AppCta from '@/components/LandingPage/AppCta';
import Features from '@/components/LandingPage/Features';
import Hero from '@/components/LandingPage/Hero';

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-full min-h-dvh flex flex-col items-center gap-29.25">
      <div data-diff-hide className="fixed top-11.25 left-1/2 z-50 -translate-x-1/2">
        <Navbar />
      </div>

      <div className="w-full flex flex-col items-center">
        <Hero />
        <Features />
      </div>

      <AppCta />
    </main>
  );
}
