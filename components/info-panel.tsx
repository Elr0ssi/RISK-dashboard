'use client';

import { Globe2 } from 'lucide-react';
import { getCountryData } from '@/lib/data-service';
import { useDashboardStore } from '@/lib/store';

export function InfoPanel() {
  const selected = useDashboardStore((s) => s.selectedCountryIso3);
  const category = useDashboardStore((s) => s.selectedCategory);
  const subcategory = useDashboardStore((s) => s.selectedSubcategory);
  const theme = useDashboardStore((s) => s.theme);

  if (!selected) {
    return <section className={theme === 'light' ? 'rounded-2xl border border-slate-300 bg-white p-6 text-slate-600' : 'rounded-2xl border border-cyan-900/50 bg-[#070d18] p-6 text-slate-300'}>Sélectionnez un pays pour afficher les données.</section>;
  }

  const data = getCountryData(selected);
  const entries = Object.entries(data[category] as Record<string, number | string[] | string>).filter(([, v]) => typeof v === 'number');

  return (
    <section className={theme === 'light' ? 'rounded-2xl border border-slate-300 bg-white p-5 text-slate-900' : 'rounded-2xl border border-cyan-900/50 bg-[#070d18] p-5 text-slate-100'}>
      <div className="mb-4 flex items-center gap-2 text-[#2dd4bf]"><Globe2 size={16} /> {data.name}</div>
      <p className="mb-3 text-sm">Section active: <span className="font-semibold uppercase">{category}</span> · indicateur: <span className="font-semibold">{subcategory}</span></p>
      <div className="space-y-2">
        {entries.map(([key, value]) => (
          <div key={key} className={theme === 'light' ? 'rounded-lg border border-slate-200 bg-slate-50 p-3' : 'rounded-lg border border-cyan-900/40 bg-slate-950/50 p-3'}>
            <p className="text-xs uppercase tracking-wider text-slate-400">{key}</p>
            <p className="text-lg font-semibold text-[#78c8a3]">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
