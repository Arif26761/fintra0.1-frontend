import Image from 'next/image';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Intro from '@/components/About/Intro';
import ChairmanCard from '@/components/About/ChairmanCard';
import Vision from '@/components/About/Vision';

export const metadata = {
  title: 'About Fintra',
  description: 'Redefining the trading experience for the modern investor.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-full min-h-dvh flex flex-col items-center gap-16 lg:gap-29.2 pb-0 pt-40 bg-bg">
      <Navbar />

      {/* Main Content Area */}
      <div className="w-full max-w-299.5 flex flex-col gap-10 lg:gap-20">
        <Intro />
        <ChairmanCard />
        <Vision />
      </div>

      {/* Footer bar */}
      <div className="w-full mt-10 lg:mt-20">
        <Footer />
      </div>
    </main>
  );
}
