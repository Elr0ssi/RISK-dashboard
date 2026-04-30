import { DashboardClient } from '@/components/dashboard-client';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 px-4 py-4 md:px-8">
      <h1 className="text-2xl font-semibold text-white md:text-3xl">Global Risk Intelligence Map</h1>
      <p className="text-sm text-slate-300">Dashboard géopolitique, économique et scientifique (MVP simulé).</p>
      <DashboardClient />
    </main>
  );
}
