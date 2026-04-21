'use client';

import { AlertTriangle, Globe2, ShieldAlert } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="rounded-xl border border-risk-border bg-risk-panel/80 p-5 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Global Risk Intelligence</p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Global Risk Monitoring Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Real-time situational awareness for geopolitical, climate, health, cyber, and macroeconomic events.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-xs">
          <StatChip icon={<Globe2 className="h-4 w-4" />} label="Regions" value="18" />
          <StatChip icon={<AlertTriangle className="h-4 w-4" />} label="Open Alerts" value="43" />
          <StatChip icon={<ShieldAlert className="h-4 w-4" />} label="Critical" value="8" />
        </div>
      </div>
    </header>
  );
}

function StatChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <article className="rounded-lg border border-risk-border bg-slate-950/60 p-3">
      <div className="mb-1 text-sky-300">{icon}</div>
      <p className="text-slate-400">{label}</p>
      <p className="text-base font-semibold text-white">{value}</p>
    </article>
  );
}
