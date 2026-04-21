import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Global Risk Monitoring Dashboard',
  description: 'Production-ready global geopolitical and environmental risk monitoring dashboard.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-risk-bg text-risk-text antialiased">{children}</body>
    </html>
  );
}
