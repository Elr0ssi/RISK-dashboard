'use client';

import dynamic from 'next/dynamic';
import { Filters } from '@/components/filters';
import { useDashboardStore } from '@/lib/store';

const MapComponent = dynamic(() => import('@/components/map-component').then((m) => m.MapComponent), { ssr: false });
const InfoPanel = dynamic(() => import('@/components/info-panel').then((m) => m.InfoPanel), { ssr: false });

export function DashboardClient() {
  const theme = useDashboardStore((s) => s.theme);

  return (
    <div className={theme === 'light' ? 'rounded-2xl bg-slate-100 p-3 text-slate-900' : 'rounded-2xl bg-[#020712] p-3 text-slate-100'}>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-widest text-cyan-400">HÉGÉMON</h2>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/70">Réseau mondial de renseignements</p>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">● EN DIRECT</span>
      </div>
      <Filters />
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(330px,1fr)]">
        <MapComponent />
        <InfoPanel />
      </section>
    </div>
  );
}
