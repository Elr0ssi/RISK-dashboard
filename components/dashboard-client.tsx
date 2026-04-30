'use client';

import dynamic from 'next/dynamic';
import { Filters } from '@/components/filters';
import { useDashboardStore } from '@/lib/store';

const MapComponent = dynamic(() => import('@/components/map-component').then((m) => m.MapComponent), { ssr: false });
const InfoPanel = dynamic(() => import('@/components/info-panel').then((m) => m.InfoPanel), { ssr: false });

export function DashboardClient() {
  const theme = useDashboardStore((s) => s.theme);

  return (
    <div className={theme === 'light' ? 'rounded-2xl bg-slate-100 p-3 text-slate-900' : ''}>
      <Filters />
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(340px,1fr)]">
        <MapComponent />
        <InfoPanel />
      </section>
    </div>
  );
}
