import tickerFixture from './fixtures/ticker.json';
import companiesFixture from './fixtures/companies.json';
import topTenFixture from './fixtures/topTen.json';
import marketNewsFixture from './fixtures/marketnews.json';

export async function getTicker() {
  return tickerFixture;
}

export async function getIndexSummary(symbol = 'DSEX') {
  return { symbol, value: 'XXXX.XX', change: '+78.60', changePct: '3.15%', turnover: 'XXX.XX B' };
}

export async function searchCompanies(query = '') {
  const q = query.trim().toLowerCase();
  if (!q) return companiesFixture;
  return companiesFixture.filter(
    (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q),
  );
}

export async function getTopTen(metric = 'trade') {
  void metric;
  return topTenFixture;
}

export async function getMarketNews() {
  return marketNewsFixture;
}
