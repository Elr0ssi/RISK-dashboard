import { NextResponse } from 'next/server';
import { getRiskEvents } from '@/lib/risk-service';

export const runtime = 'edge';

export async function GET() {
  const data = await getRiskEvents();
  return NextResponse.json({ data, generatedAt: new Date().toISOString() }, { status: 200 });
}
