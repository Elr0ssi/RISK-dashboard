import { NextResponse } from 'next/server';
import { getRiskTrend } from '@/lib/risk-service';

export const runtime = 'edge';

export async function GET() {
  const data = await getRiskTrend();
  return NextResponse.json({ data, generatedAt: new Date().toISOString() }, { status: 200 });
}
