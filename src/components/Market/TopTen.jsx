import { getTopTen } from '@/lib/data/market';
import TopTenTable from './TopTenTable';

export default async function TopTen() {
  const [trade, value, volume] = await Promise.all([
    getTopTen('trade'),
    getTopTen('value'),
    getTopTen('volume'),
  ]);

  return <TopTenTable lists={{ trade, value, volume }} />;
}
