'use client';

import { AlertTriangle, BarChart3, FlaskConical, Globe2 } from 'lucide-react';
import { worldData } from '@/lib/data-service';
import { useDashboardStore } from '@/lib/store';

export function InfoPanel() {
  const selected = useDashboardStore((s) => s.selectedCountryIso3);
  const category = useDashboardStore((s) => s.selectedCategory);
  const subcategory = useDashboardStore((s) => s.selectedSubcategory);
  const theme = useDashboardStore((s) => s.theme);

  const panelClass = theme === 'light' ? 'rounded-xl border border-slate-300 bg-white p-5 text-slate-900' : 'rounded-xl border border-risk-border bg-risk-panel p-5';
  const cardClass = theme === 'light' ? 'rounded-lg border border-slate-200 bg-slate-50 p-4' : 'rounded-lg bg-slate-950/40 p-4';
  const textClass = theme === 'light' ? 'text-sm text-slate-700' : 'text-sm text-slate-300';

  if (!selected || !(selected in worldData)) {
    return <section className={theme === 'light' ? 'rounded-xl border border-slate-300 bg-white p-6 text-slate-600' : 'rounded-xl border border-risk-border bg-risk-panel p-6 text-slate-400'}>Cliquez sur un pays pour afficher les données détaillées.</section>;
  }

  const data = worldData[selected as keyof typeof worldData];
  const categoryData = data[category] as Record<string, number | string[] | string>;
  const mainValue = categoryData[subcategory];

  return (
    <section className={panelClass}>
      <article className={cardClass}>
        <div className="mb-2 flex items-center gap-2 text-[#78c8a3]"><Globe2 size={16} />{data.name}</div>
        <p className={textClass}>Catégorie active: <span className="font-medium">{category}</span></p>
        <p className={textClass}>Indicateur actif: <span className="font-medium">{subcategory}</span></p>
        <p className={textClass}>Valeur: <span className="font-semibold text-[#0f9f6e]">{String(mainValue ?? 'N/A')}</span></p>
      </article>
      <article className={cardClass}>
        <div className="mb-2 mt-3 flex items-center gap-2 text-[#78c8a3]"><AlertTriangle size={16} />Événements</div>
        <ul className={textClass}>{data.geopolitics.events.map((event) => <li key={event}>• {event}</li>)}</ul>
      </article>
      <article className={cardClass}>
        <div className="mb-2 mt-3 flex items-center gap-2 text-[#78c8a3]"><FlaskConical size={16} />Comparatif rapide</div>
        <p className={textClass}>Innovation: {data.science.innovation}</p>
        <p className={textClass}>Renouvelables: {data.energy.renewables}%</p>
      </article>
      <article className={cardClass}>
        <div className="mb-2 mt-3 flex items-center gap-2 text-[#78c8a3]"><BarChart3 size={16} />Impact potentiel</div>
        <p className={textClass}>{data.geopolitics.impact}</p>
      </article>
    </section>
  );
}
