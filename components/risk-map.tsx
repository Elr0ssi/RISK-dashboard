'use client';

import 'leaflet/dist/leaflet.css';
import useSWR from 'swr';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import type { RiskEvent } from '@/data/mock-risks';
import { useDashboardStore } from '@/lib/store';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const marker = new L.DivIcon({
  className: 'custom-risk-marker',
  html: '<div style="width:14px;height:14px;border-radius:999px;background:#fb7185;box-shadow:0 0 0 6px rgba(251,113,133,.25);"></div>'
});

export function RiskMap() {
  const { data } = useSWR<{ data: RiskEvent[] }>('/api/risks', fetcher, { refreshInterval: 60000 });
  const minScore = useDashboardStore((state) => state.minScore);
  const selectedSeverity = useDashboardStore((state) => state.selectedSeverity);
  const events = (data?.data ?? []).filter((event) => event.score >= minScore && (selectedSeverity === 'All' || event.severity === selectedSeverity));

  return (
    <section className="h-[420px] overflow-hidden rounded-xl border border-risk-border bg-risk-panel">
      <MapContainer center={[20, 0]} zoom={2} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map((event) => (
          <Marker key={event.id} position={[event.lat, event.lng]} icon={marker}>
            <Popup>
              <strong>{event.title}</strong>
              <br />
              {event.region} · {event.severity} · Score {event.score}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}
