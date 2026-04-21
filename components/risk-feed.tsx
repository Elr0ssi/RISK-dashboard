'use client';

import useSWR from 'swr';
import type { RiskEvent } from '@/data/mock-risks';
import { useDashboardStore } from '@/lib/store';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const severityStyles = {
  Low: 'text-risk-success',
  Moderate: 'text-risk-info',
  High: 'text-risk-warning',
  Critical: 'text-risk-danger'
};

export function RiskFeed() {
  const { data, isLoading } = useSWR<{ data: RiskEvent[] }>('/api/risks', fetcher, { refreshInterval: 60000 });
  const minScore = useDashboardStore((state) => state.minScore);
  const selectedSeverity = useDashboardStore((state) => state.selectedSeverity);
  const events = (data?.data ?? []).filter((event) => event.score >= minScore && (selectedSeverity === 'All' || event.severity === selectedSeverity));

  return (
    <aside className="rounded-xl border border-risk-border bg-risk-panel p-4">
      <h2 className="mb-4 text-lg font-semibold">Live Risk Feed</h2>
      <ul className="space-y-3">
        {isLoading && <li className="text-sm text-slate-400">Loading incidents...</li>}
        {events.map((event) => (
          <li key={event.id} className="rounded-lg border border-risk-border/70 bg-slate-950/40 p-3">
            <p className="text-sm font-medium text-white">{event.title}</p>
            <p className="mt-1 text-xs text-slate-400">{event.region}</p>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className={severityStyles[event.severity]}>{event.severity}</span>
              <span className="text-slate-300">Score {event.score}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
