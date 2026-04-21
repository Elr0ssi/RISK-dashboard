'use client';

import { useDashboardStore } from '@/lib/store';

const levels = ['All', 'Moderate', 'High', 'Critical'] as const;

export function RiskFilters() {
  const minScore = useDashboardStore((state) => state.minScore);
  const selectedSeverity = useDashboardStore((state) => state.selectedSeverity);
  const setMinScore = useDashboardStore((state) => state.setMinScore);
  const setSelectedSeverity = useDashboardStore((state) => state.setSelectedSeverity);

  return (
    <section className="rounded-xl border border-risk-border bg-risk-panel p-4">
      <div className="flex flex-wrap items-end gap-4">
        <label className="text-sm">
          <span className="mb-2 block text-slate-300">Minimum risk score: {minScore}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={minScore}
            onChange={(event) => setMinScore(Number(event.target.value))}
            className="w-64"
          />
        </label>
        <label className="text-sm">
          <span className="mb-2 block text-slate-300">Severity</span>
          <select
            value={selectedSeverity}
            onChange={(event) => setSelectedSeverity(event.target.value as typeof selectedSeverity)}
            className="rounded-md border border-risk-border bg-slate-900 px-3 py-2"
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
