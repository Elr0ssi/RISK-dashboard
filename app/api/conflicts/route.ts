import { NextResponse } from 'next/server';

const hotspots = [
  { id: 'ukr-1', country: 'Ukraine', iso3: 'UKR', lat: 48.3794, lng: 31.1656, title: 'Missile and drone strikes reported', severity: 'high' },
  { id: 'gza-1', country: 'Palestine', iso3: 'PSE', lat: 31.3547, lng: 34.3088, title: 'Urban combat and airstrikes', severity: 'critical' },
  { id: 'sdn-1', country: 'Sudan', iso3: 'SDN', lat: 15.5007, lng: 32.5599, title: 'Armed clashes near Khartoum', severity: 'high' },
  { id: 'mmr-1', country: 'Myanmar', iso3: 'MMR', lat: 19.7633, lng: 96.0785, title: 'Armed confrontation in northern regions', severity: 'high' },
  { id: 'yem-1', country: 'Yemen', iso3: 'YEM', lat: 15.5527, lng: 48.5164, title: 'Localized escalations and strikes', severity: 'moderate' }
];

export async function GET() {
  return NextResponse.json({ updatedAt: new Date().toISOString(), data: hotspots });
}
