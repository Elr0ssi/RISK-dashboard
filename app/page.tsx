import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { RiskFeed } from '@/components/risk-feed';
import { RiskFilters } from '@/components/risk-filters';
import { SummaryCards } from '@/components/summary-cards';

const RiskMap = dynamic(() => import('@/components/risk-map').then((mod) => mod.RiskMap), {
  ssr: false,
  loading: () => <div className="h-[420px] animate-pulse rounded-xl bg-risk-panel/80" />
});

const TrendChart = dynamic(() => import('@/components/trend-chart').then((mod) => mod.TrendChart), {
  ssr: false,
  loading: () => <div className="h-[320px] animate-pulse rounded-xl bg-risk-panel/80" />
});

export const revalidate = 300;

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8">
      <DashboardHeader />
      <SummaryCards />
      <RiskFilters />
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense fallback={<div className="h-[420px] animate-pulse rounded-xl bg-risk-panel/80" />}>
            <RiskMap />
          </Suspense>
        </div>
        <RiskFeed />
      </section>
      <Suspense fallback={<div className="h-[320px] animate-pulse rounded-xl bg-risk-panel/80" />}>
        <TrendChart />
      </Suspense>
    </main>
  );
}
