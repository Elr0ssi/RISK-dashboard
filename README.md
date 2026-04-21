# Global Risk Monitoring Dashboard

Production-ready Next.js (App Router) dashboard for monitoring global risk events across climate, geopolitical, cyber, health, and economic domains.

## Features

- Next.js App Router with serverless API route handlers (`/app/api/*`)
- Vercel-ready architecture (no custom server required)
- Supabase integration with mock-data fallback
- Interactive Leaflet world map with event markers
- Recharts risk trend visualization
- Zustand-powered client-side filters
- TailwindCSS-based responsive UI
- Dynamic imports for heavy visualization components

## Tech Stack

- Next.js 15 + React 19 + TypeScript
- TailwindCSS
- Recharts
- React-Leaflet / Leaflet
- Zustand
- Supabase JS client

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

## Deploy on Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import into Vercel.
3. Add env vars from `.env.example` (optional; app uses mock data if omitted).
4. Deploy.

## Optional Supabase schema

Create tables:

- `risk_events` with columns matching `data/mock-risks.ts` `RiskEvent`
- `risk_trends` with columns: `day (text)`, `riskIndex (int)`, `sortOrder (int)`

