export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface RiskEvent {
  id: string;
  title: string;
  category: 'Climate' | 'Geopolitical' | 'Cyber' | 'Health' | 'Economic';
  region: string;
  countryCode: string;
  severity: RiskLevel;
  score: number;
  lat: number;
  lng: number;
  reportedAt: string;
}

export const mockRiskEvents: RiskEvent[] = [
  {
    id: 'r-1',
    title: 'Escalation near strategic maritime corridor',
    category: 'Geopolitical',
    region: 'Middle East',
    countryCode: 'OMN',
    severity: 'Critical',
    score: 91,
    lat: 23.5859,
    lng: 58.4059,
    reportedAt: '2026-04-20T08:15:00.000Z'
  },
  {
    id: 'r-2',
    title: 'Severe drought conditions impacting agriculture',
    category: 'Climate',
    region: 'East Africa',
    countryCode: 'KEN',
    severity: 'High',
    score: 82,
    lat: -1.2921,
    lng: 36.8219,
    reportedAt: '2026-04-20T10:35:00.000Z'
  },
  {
    id: 'r-3',
    title: 'Coordinated cyberattack on energy grid operator',
    category: 'Cyber',
    region: 'Europe',
    countryCode: 'DEU',
    severity: 'High',
    score: 79,
    lat: 52.52,
    lng: 13.405,
    reportedAt: '2026-04-21T03:22:00.000Z'
  },
  {
    id: 'r-4',
    title: 'Potential sovereign debt distress warning',
    category: 'Economic',
    region: 'South America',
    countryCode: 'ARG',
    severity: 'Moderate',
    score: 64,
    lat: -34.6037,
    lng: -58.3816,
    reportedAt: '2026-04-21T05:50:00.000Z'
  },
  {
    id: 'r-5',
    title: 'Regional disease cluster under investigation',
    category: 'Health',
    region: 'Southeast Asia',
    countryCode: 'THA',
    severity: 'Moderate',
    score: 58,
    lat: 13.7563,
    lng: 100.5018,
    reportedAt: '2026-04-20T16:05:00.000Z'
  }
];

export const weeklyTrend = [
  { day: 'Mon', riskIndex: 58 },
  { day: 'Tue', riskIndex: 62 },
  { day: 'Wed', riskIndex: 60 },
  { day: 'Thu', riskIndex: 69 },
  { day: 'Fri', riskIndex: 74 },
  { day: 'Sat', riskIndex: 66 },
  { day: 'Sun', riskIndex: 71 }
];
