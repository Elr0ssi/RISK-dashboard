'use client';

import { subcategoryMap, type Category, type Period } from '@/lib/data-service';
import { useDashboardStore, type MapView } from '@/lib/store';

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
  const setCategory = useDashboardStore((s) => s.setCategory);
  const setSubcategory = useDashboardStore((s) => s.setSubcategory);
  const setPeriod = useDashboardStore((s) => s.setPeriod);
  const setMapView = useDashboardStore((s) => s.setMapView);

  return (
    <div className="flex flex-wrap gap-3 rounded-xl border border-risk-border bg-risk-panel/90 p-4">
      <select className="rounded-md bg-slate-900 px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value as Category)}>{Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
      <select className="rounded-md bg-slate-900 px-3 py-2" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>{subcategoryMap[category].map((item) => <option key={item} value={item}>{item}</option>)}</select>
      <select className="rounded-md bg-slate-900 px-3 py-2" value={period} onChange={(e) => setPeriod(e.target.value as Period)}><option value="real-time">Temps réel</option><option value="1m">1 mois</option><option value="1y">1 an</option></select>
      <select className="rounded-md bg-slate-900 px-3 py-2" value={mapView} onChange={(e) => setMapView(e.target.value as MapView)}>
        <option value="dark">2D Dark</option>
        <option value="terrain">2D Terrain</option>
        <option value="satellite">Vue satellite</option>
      </select>
    </div>
  );
}
