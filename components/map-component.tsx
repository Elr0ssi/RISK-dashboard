'use client';

import 'leaflet/dist/leaflet.css';
import { CircleMarker, GeoJSON, MapContainer, TileLayer, Tooltip, useMapEvents } from 'react-leaflet';
import { useEffect, useMemo, useState } from 'react';
import type { Layer } from 'leaflet';
import type { FeatureCollection } from 'geojson';
import L from 'leaflet';
import { getMetricBounds, getMetricValue } from '@/lib/data-service';
import { useDashboardStore } from '@/lib/store';

type ConflictPoint = { id: string; country: string; iso3: string; lat: number; lng: number; title: string; severity: string };

const mapTiles = {
  light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
};

function ZoomTracker({ onZoom }: { onZoom: (z: number) => void }) { useMapEvents({ zoomend: (e) => onZoom(e.target.getZoom()) }); return null; }
function colorForValue(value: number | null, min: number, max: number) { if (value === null) return 'transparent'; const r = Math.max(0, Math.min(1, (value - min) / (max - min || 1))); const s=[38,84,72],e=[120,255,205]; const rgb=s.map((v,i)=>Math.round(v+(e[i]-v)*r)); return `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`; }

export function MapComponent() {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const [conflicts, setConflicts] = useState<ConflictPoint[]>([]);
  const [zoom, setZoom] = useState(2);
  const category = useDashboardStore((s) => s.selectedCategory);
  const subcategory = useDashboardStore((s) => s.selectedSubcategory);
  const period = useDashboardStore((s) => s.selectedPeriod);
  const mapView = useDashboardStore((s) => s.mapView);
  const selectedCountryIso3 = useDashboardStore((s) => s.selectedCountryIso3);
  const setSelectedCountryIso3 = useDashboardStore((s) => s.setSelectedCountryIso3);

  useEffect(() => { fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json').then((res) => res.json()).then((data) => setGeojson(data)); }, []);
  useEffect(() => { if (category === 'geopolitics' && subcategory === 'conflicts') fetch('/api/conflicts').then((r) => r.json()).then((d) => setConflicts(d.data ?? [])); }, [category, subcategory]);

  const isoCodes = useMemo(() => (geojson?.features ?? []).map((f) => String(f.id)), [geojson]);
  const bounds = useMemo(() => getMetricBounds(isoCodes, category, subcategory, period), [isoCodes, category, subcategory, period]);
  const showHeatmap = zoom <= 4.6;

  return (
    <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-cyan-900/70 bg-[#040913] shadow-[0_0_40px_rgba(6,182,212,0.12)]">
      <div className="h-[56vh] min-h-[380px] w-full">
        <MapContainer center={[20, 0]} zoom={2} className="h-full w-full" zoomControl>
          <ZoomTracker onZoom={setZoom} />
          <TileLayer url={mapTiles[mapView]} attribution="&copy; OpenStreetMap / Esri" />
          {geojson && <GeoJSON data={geojson as GeoJSON.GeoJsonObject} style={(feature) => { const iso3 = feature?.id as string; const value = getMetricValue(iso3, category, subcategory, period); return { fillColor: showHeatmap ? colorForValue(value, bounds.min, bounds.max) : 'transparent', weight: selectedCountryIso3 === iso3 ? 1.6 : 0.8, color: selectedCountryIso3 === iso3 ? '#2dd4bf' : '#3b82f6', fillOpacity: showHeatmap ? 0.68 : 0 }; }} onEachFeature={(feature, layer: Layer) => { const iso3 = feature.id as string; layer.on({ mouseover: () => (layer as L.Path).setStyle({ weight: 1.4, color: '#5eead4' }), mouseout: () => (layer as L.Path).setStyle({ weight: selectedCountryIso3 === iso3 ? 1.6 : 0.8, color: selectedCountryIso3 === iso3 ? '#2dd4bf' : '#3b82f6' }), click: () => setSelectedCountryIso3(iso3) }); layer.bindTooltip(`${feature.properties?.name ?? iso3}`); }} />}
          {category === 'geopolitics' && subcategory === 'conflicts' && conflicts.map((c) => (
            <CircleMarker key={c.id} center={[c.lat, c.lng]} radius={6} pathOptions={{ color: '#ef4444', fillColor: '#f97316', fillOpacity: 0.85 }}>
              <Tooltip>{c.title}</Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
