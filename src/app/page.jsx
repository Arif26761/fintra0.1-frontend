import Navbar from '@/components/common/Navbar';
import Features from '@/components/LandingPage/Features';
import Hero from '@/components/LandingPage/Hero';

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-full min-h-dvh">
      <div data-diff-hide className="fixed top-11 left-1/2 z-50 -translate-x-1/2">
        <Navbar />
      </div>
      <Hero />
      <Features />
    </main>
  );
}
