import Navbar from '@/components/common/Navbar';
import Header from '@/components/Market/Header';
import MarketTicker from '@/components/Market/MarketTicker';

export default function MarketPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-360 flex-col items-center gap-10 bg-bg pt-37.5">
      <div
        data-diff-hide
        className="fixed top-11.25 right-0 left-0 z-50 flex justify-center px-6 lg:px-0"
      >
        <Navbar active="Market" />
      </div>

      <Header />
      <MarketTicker />
    </main>
  );
}
