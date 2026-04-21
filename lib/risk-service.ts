import { mockRiskEvents, weeklyTrend } from '@/data/mock-risks';
import { supabase } from '@/lib/supabase';

export async function getRiskEvents() {
  if (!supabase) {
    return mockRiskEvents;
  }

  const { data, error } = await supabase
    .from('risk_events')
    .select('*')
    .order('reportedAt', { ascending: false })
    .limit(50);

  if (error || !data) {
    return mockRiskEvents;
  }

  return data;
}

export async function getRiskTrend() {
  if (!supabase) {
    return weeklyTrend;
  }

  const { data, error } = await supabase
    .from('risk_trends')
    .select('day, riskIndex')
    .order('sortOrder', { ascending: true });

  if (error || !data) {
    return weeklyTrend;
  }

  return data;
}
