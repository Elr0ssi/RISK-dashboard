'use client';

import useSWR from 'swr';
import { Globe2 } from 'lucide-react';
import { getCountryData } from '@/lib/data-service';
import { useDashboardStore } from '@/lib/store';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function InfoPanel() {
  const selected = useDashboardStore((s) => s.selectedCountryIso3);
  const category = useDashboardStore((s) => s.selectedCategory);
  const subcategory = useDashboardStore((s) => s.selectedSubcategory);
  const theme = useDashboardStore((s) => s.theme);
  const { data: conflictData } = useSWR(category === 'geopolitics' && subcategory === 'conflicts' ? '/api/conflicts' : null, fetcher);

  if (!selected) {
    return <section className={theme === 'light' ? 'rounded-2xl border border-slate-300 bg-white p-6 text-slate-600' : 'rounded-2xl border border-cyan-900/50 bg-[#070d18] p-6 text-slate-300'}>Sélectionnez un pays pour afficher les données.</section>;
  }

  const data = getCountryData(selected);
  const entries = Object.entries(data[category] as Record<string, number | string[] | string>).filter(([, v]) => typeof v === 'number');
  const conflicts = (conflictData?.data ?? []).filter((c: { iso3: string }) => c.iso3 === selected).slice(0, 3);

  return (
    <section className={theme === 'light' ? 'rounded-2xl border border-slate-300 bg-white p-5 text-slate-900' : 'rounded-2xl border border-cyan-900/50 bg-[#070d18] p-5 text-slate-100'}>
      <div className="mb-4 flex items-center gap-2 text-[#2dd4bf]"><Globe2 size={16} /> {data.name}</div>
      <p className="mb-3 text-sm">Section active: <span className="font-semibold uppercase">{category}</span> · indicateur: <span className="font-semibold">{subcategory}</span></p>
      <div className="space-y-2">
        {entries.map(([key, value]) => (
          <div key={key} className={theme === 'light' ? 'rounded-lg border border-slate-200 bg-slate-50 p-3' : 'rounded-lg border border-cyan-900/40 bg-slate-950/50 p-3'}>
            <p className="text-xs uppercase tracking-wider text-slate-400">{key}</p>
            <p className="text-lg font-semibold text-[#78c8a3]">{category === 'economy' && ['gdp', 'debt'].includes(key) ? `${(Number(value) / 1_000_000_000).toFixed(0)} mds€` : value}</p>
          </div>
        ))}
      </div>
      {category === 'geopolitics' && subcategory === 'conflicts' && (
        <div className="mt-4 rounded-lg border border-rose-400/40 bg-rose-950/30 p-3">
          <p className="mb-2 text-sm font-semibold text-rose-300">Conflits actifs (zone sélectionnée)</p>
          {conflicts.length === 0 ? <p className="text-sm text-slate-300">Aucun événement conflictuel majeur trouvé pour ce pays actuellement.</p> : conflicts.map((item: { id: string; title: string; severity: string }) => <p className="text-sm text-slate-200" key={item.id}>• {item.title} ({item.severity})</p>)}
        </div>
      )}
    </section>
  );
}
