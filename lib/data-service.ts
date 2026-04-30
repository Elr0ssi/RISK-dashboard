import rawData from '@/data/world-data.json';

export type Category = 'economy' | 'geopolitics' | 'science' | 'environment' | 'energy';
export type Period = 'real-time' | '1m' | '1y';

export const subcategoryMap: Record<Category, string[]> = {
  economy: ['gdp', 'inflation', 'debt'],
  geopolitics: ['conflicts', 'alliances', 'risks'],
  science: ['innovation', 'ai', 'research'],
  environment: ['co2', 'climateRisk', 'biodiversity'],
  energy: ['oilDependency', 'renewables', 'gridStress']
};

export const periodMultiplier: Record<Period, number> = { 'real-time': 1, '1m': 0.98, '1y': 0.92 };
export const worldData = rawData;

function seeded(iso3: string, salt: number) {
  return [...iso3].reduce((acc, ch) => acc + ch.charCodeAt(0) * (salt + 3), 0);
}

function generatedCountry(iso3: string) {
  const b1 = seeded(iso3, 7);
  const b2 = seeded(iso3, 11);
  return {
    name: iso3,
    economy: { gdp: 100_000_000_000 + (b1 % 32000) * 1_000_000_000, inflation: Number((1 + (b2 % 95) / 10).toFixed(1)), debt: Number((20 + (b1 % 140)).toFixed(1)) },
    geopolitics: { conflicts: Number(((b1 % 80) / 10).toFixed(1)), alliances: Number(((b2 % 100) / 10).toFixed(1)), risks: Number(((b1 % 70) / 10).toFixed(1)), events: ['Mise à jour régionale', 'Signal de marché local'], impact: 'Impact potentiel modéré selon les tendances régionales.' },
    science: { innovation: 30 + (b2 % 70), ai: 25 + (b1 % 75), research: 20 + (b2 % 80) },
    environment: { co2: Number(((b1 % 180) / 10).toFixed(1)), climateRisk: Number(((b2 % 85) / 10).toFixed(1)), biodiversity: Number(((b1 % 100) / 10).toFixed(1)) },
    energy: { oilDependency: 10 + (b1 % 85), renewables: 5 + (b2 % 80), gridStress: Number(((b2 % 90) / 10).toFixed(1)) }
  };
}

export function getCountryData(iso3: string) {
  return worldData[iso3 as keyof typeof worldData] ?? generatedCountry(iso3);
}

export function getMetricValue(iso3: string, category: Category, subcategory: string, period: Period) {
  const country = getCountryData(iso3);
  const value = (country[category] as Record<string, number | string[] | string>)[subcategory];
  if (typeof value !== 'number') return null;
  return Number((value * periodMultiplier[period]).toFixed(2));
}

export function getMetricBounds(isoCodes: string[], category: Category, subcategory: string, period: Period) {
  const values = isoCodes.map((iso3) => getMetricValue(iso3, category, subcategory, period)).filter((v): v is number => typeof v === 'number');
  return { min: Math.min(...values), max: Math.max(...values) };
}
