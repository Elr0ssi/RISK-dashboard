'use client';

import { subcategoryMap, type Category, type Period } from '@/lib/data-service';
import { useDashboardStore, type MapView, type ThemeMode } from '@/lib/store';

const categoryLabels: Record<Category, string> = {
  economy: 'Économie',
  geopolitics: 'Géopolitique',
  science: 'Science',
  environment: 'Environnement',
  energy: 'Énergie'
};

export function Filters() {
  const category = useDashboardStore((s) => s.selectedCategory);
  const subcategory = useDashboardStore((s) => s.selectedSubcategory);
  const period = useDashboardStore((s) => s.selectedPeriod);
  const mapView = useDashboardStore((s) => s.mapView);
  const theme = useDashboardStore((s) => s.theme);
  const setCategory = useDashboardStore((s) => s.setCategory);
  const setSubcategory = useDashboardStore((s) => s.setSubcategory);
  const setPeriod = useDashboardStore((s) => s.setPeriod);
  const setMapView = useDashboardStore((s) => s.setMapView);
  const setTheme = useDashboardStore((s) => s.setTheme);
  const selectClass = theme === 'light' ? 'rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900' : 'rounded-md bg-slate-900 px-3 py-2';

  return (
    <div className={theme === 'light' ? 'mb-3 flex flex-wrap gap-3 rounded-xl border border-slate-300 bg-slate-50 p-4' : 'mb-3 flex flex-wrap gap-3 rounded-xl border border-risk-border bg-risk-panel/90 p-4'}>
      <select className={selectClass} value={category} onChange={(e) => setCategory(e.target.value as Category)}>{Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
      <select className={selectClass} value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>{subcategoryMap[category].map((item) => <option key={item} value={item}>{item}</option>)}</select>
      <select className={selectClass} value={period} onChange={(e) => setPeriod(e.target.value as Period)}><option value="real-time">Temps réel</option><option value="1m">1 mois</option><option value="1y">1 an</option></select>
      <select className={selectClass} value={mapView} onChange={(e) => setMapView(e.target.value as MapView)}><option value="light">2D Light</option><option value="terrain">2D Terrain</option><option value="satellite">Satellite</option></select>
      <select className={selectClass} value={theme} onChange={(e) => setTheme(e.target.value as ThemeMode)}><option value="dark">Thème sombre</option><option value="light">Thème clair</option></select>
    </div>
  );
}
