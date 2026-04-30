'use client';

import dynamic from 'next/dynamic';
import { Filters } from '@/components/filters';

const MapComponent = dynamic(() => import('@/components/map-component').then((m) => m.MapComponent), { ssr: false });
const InfoPanel = dynamic(() => import('@/components/info-panel').then((m) => m.InfoPanel), { ssr: false });

export function DashboardClient() {
  return (
    <>
      <Filters />
      <MapComponent />
      <InfoPanel />
    </>
  );
}
