'use client';

import useSWR from 'swr';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TrendChart() {
  const { data } = useSWR<{ data: Array<{ day: string; riskIndex: number }> }>('/api/trends', fetcher, {
    refreshInterval: 120000
  });

  return (
    <section className="rounded-xl border border-risk-border bg-risk-panel p-4">
      <h2 className="mb-4 text-lg font-semibold">7-Day Risk Index Trend</h2>
      <div className="h-[280px] w-full">
        <ResponsiveContainer>
          <AreaChart data={data?.data ?? []}>
            <defs>
              <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#334155" strokeDasharray="4 4" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" domain={[40, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.5rem'
              }}
            />
            <Area type="monotone" dataKey="riskIndex" stroke="#38bdf8" strokeWidth={2} fill="url(#riskGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
