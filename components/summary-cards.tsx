'use client';

import { useMemo } from 'react';
import useSWR from 'swr';
import type { RiskEvent } from '@/data/mock-risks';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function SummaryCards() {
  const { data } = useSWR<{ data: RiskEvent[] }>('/api/risks', fetcher, { refreshInterval: 60000 });

  const metrics = useMemo(() => {
    const events = data?.data ?? [];
    const avgScore = events.length
      ? Math.round(events.reduce((sum, event) => sum + event.score, 0) / events.length)
      : 0;
    const critical = events.filter((event) => event.severity === 'Critical').length;
    const high = events.filter((event) => event.severity === 'High').length;
    return { avgScore, critical, high };
  }, [data]);

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <Card title="Global Risk Index" value={String(metrics.avgScore)} accent="text-risk-danger" />
      <Card title="Critical Events" value={String(metrics.critical)} accent="text-risk-warning" />
      <Card title="High Severity" value={String(metrics.high)} accent="text-risk-info" />
    </section>
  );
}

function Card({ title, value, accent }: { title: string; value: string; accent: string }) {
  return (
    <article className="rounded-xl border border-risk-border bg-risk-panel p-4">
      <p className="text-sm text-slate-400">{title}</p>
      <p className={`mt-2 text-3xl font-bold ${accent}`}>{value}</p>
    </article>
  );
}
