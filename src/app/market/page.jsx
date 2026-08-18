import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import Header from '@/components/Market/Header';
import MarketNews from '@/components/Market/MarketNews';
import MarketTicker from '@/components/Market/MarketTicker';
import SectionIntro from '@/components/Market/SectionIntro';
import TopTen from '@/components/Market/TopTen';
import { getMarketNews } from '@/lib/data/market';

export default async function MarketPage() {
  const news = await getMarketNews();

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-full flex-col items-center gap-10 bg-bg pt-37.5">
      <Navbar active="Market" />

      <Header />
      <MarketTicker />

      <SectionIntro />
      <TopTen />
      <MarketNews items={news} />

      <div className="w-full pt-15">
        <Footer />
      </div>
    </main>
  );
}
