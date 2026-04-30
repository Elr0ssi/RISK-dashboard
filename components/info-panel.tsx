'use client';

import { AlertTriangle, BarChart3, FlaskConical, Globe2 } from 'lucide-react';
import { worldData } from '@/lib/data-service';
import { useDashboardStore } from '@/lib/store';

export function InfoPanel() {
  const selected = useDashboardStore((s) => s.selectedCountryIso3);
  const category = useDashboardStore((s) => s.selectedCategory);
  const subcategory = useDashboardStore((s) => s.selectedSubcategory);

  if (!selected || !(selected in worldData)) {
    return <section className="rounded-xl border border-risk-border bg-risk-panel p-6 text-slate-400">Cliquez sur un pays pour afficher les données détaillées.</section>;
  }

  const data = worldData[selected as keyof typeof worldData];
  const categoryData = data[category] as Record<string, number | string[] | string>;
  const mainValue = categoryData[subcategory];

  return (
    <section className="grid gap-4 rounded-xl border border-risk-border bg-risk-panel p-5">
      <article className="rounded-lg bg-slate-950/40 p-4">
        <div className="mb-2 flex items-center gap-2 text-[#78c8a3]"><Globe2 size={16} />{data.name}</div>
        <p className="text-sm text-slate-300">Catégorie active: <span className="font-medium text-white">{category}</span></p>
        <p className="text-sm text-slate-300">Indicateur actif: <span className="font-medium text-white">{subcategory}</span></p>
        <p className="mt-1 text-sm text-slate-200">Valeur: <span className="text-[#86efac]">{String(mainValue ?? 'N/A')}</span></p>
      </article>
      <article className="rounded-lg bg-slate-950/40 p-4">
        <div className="mb-2 flex items-center gap-2 text-[#78c8a3]"><AlertTriangle size={16} />Événements</div>
        <ul className="space-y-1 text-sm text-slate-300">{data.geopolitics.events.map((event) => <li key={event}>• {event}</li>)}</ul>
      </article>
      <article className="rounded-lg bg-slate-950/40 p-4">
        <div className="mb-2 flex items-center gap-2 text-[#78c8a3]"><FlaskConical size={16} />Comparatif rapide</div>
        <p className="text-sm text-slate-300">Innovation: {data.science.innovation}</p>
        <p className="text-sm text-slate-300">Renouvelables: {data.energy.renewables}%</p>
      </article>
      <article className="rounded-lg bg-slate-950/40 p-4">
        <div className="mb-2 flex items-center gap-2 text-[#78c8a3]"><BarChart3 size={16} />Impact potentiel</div>
        <p className="text-sm text-slate-300">{data.geopolitics.impact}</p>
      </article>
    </section>
  );
}
