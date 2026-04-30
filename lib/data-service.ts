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

export const periodMultiplier: Record<Period, number> = {
  'real-time': 1,
  '1m': 0.98,
  '1y': 0.92
};

export type CountryMetrics = (typeof rawData)[keyof typeof rawData];

export const worldData = rawData;

export function getMetricValue(iso3: string, category: Category, subcategory: string, period: Period) {
  const country = worldData[iso3 as keyof typeof worldData];
  if (!country) return null;
  const value = (country[category] as Record<string, number | string[] | string>)[subcategory];
  if (typeof value !== 'number') return null;
  return Number((value * periodMultiplier[period]).toFixed(2));
}

export function getMetricBounds(category: Category, subcategory: string, period: Period) {
  const values = Object.keys(worldData)
    .map((iso3) => getMetricValue(iso3, category, subcategory, period))
    .filter((v): v is number => typeof v === 'number');

  return {
    min: Math.min(...values),
    max: Math.max(...values)
  };
}
