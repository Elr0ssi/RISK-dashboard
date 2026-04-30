'use client';

import 'leaflet/dist/leaflet.css';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import { useEffect, useMemo, useState } from 'react';
import type { Layer } from 'leaflet';
import type { FeatureCollection } from 'geojson';
import L from 'leaflet';
import { getMetricBounds, getMetricValue } from '@/lib/data-service';
import { useDashboardStore } from '@/lib/store';

const mapTiles = {
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
};

function colorForValue(value: number | null, min: number, max: number) {
  if (value === null) return 'transparent';
  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));
  const start = [18, 42, 34];
  const end = [132, 255, 194];
  const rgb = start.map((s, i) => Math.round(s + (end[i] - s) * ratio));
  return `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;
}

export function MapComponent() {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const category = useDashboardStore((s) => s.selectedCategory);
  const subcategory = useDashboardStore((s) => s.selectedSubcategory);
  const period = useDashboardStore((s) => s.selectedPeriod);
  const mapView = useDashboardStore((s) => s.mapView);
  const selectedCountryIso3 = useDashboardStore((s) => s.selectedCountryIso3);
  const setSelectedCountryIso3 = useDashboardStore((s) => s.setSelectedCountryIso3);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json').then((res) => res.json()).then((data) => setGeojson(data));
  }, []);

  const bounds = useMemo(() => getMetricBounds(category, subcategory, period), [category, subcategory, period]);

  return (
    <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-risk-border bg-risk-panel">
      <div className="h-[52vh] min-h-[340px] w-full">
        <MapContainer center={[20, 0]} zoom={2} className="h-full w-full" zoomControl>
          <TileLayer url={mapTiles[mapView]} attribution="&copy; OpenStreetMap / CARTO / Esri" />
          {geojson && (
            <GeoJSON
              data={geojson as GeoJSON.GeoJsonObject}
              style={(feature) => {
                const iso3 = feature?.id as string;
                const selected = selectedCountryIso3 === iso3;
                const value = getMetricValue(iso3, category, subcategory, period);
                return {
                  fillColor: selected ? colorForValue(value, bounds.min, bounds.max) : 'transparent',
                  weight: selected ? 1.2 : 0.9,
                  color: selected ? '#86efac' : '#64748b',
                  fillOpacity: selected ? 0.82 : 0
                };
              }}
              onEachFeature={(feature, layer: Layer) => {
                const iso3 = feature.id as string;
                const value = getMetricValue(iso3, category, subcategory, period);
                layer.on({
                  mouseover: () => (layer as L.Path).setStyle({ weight: 1.4, color: '#bbf7d0' }),
                  mouseout: () => (layer as L.Path).setStyle({ weight: selectedCountryIso3 === iso3 ? 1.2 : 0.9, color: selectedCountryIso3 === iso3 ? '#86efac' : '#64748b' }),
                  click: () => setSelectedCountryIso3(iso3)
                });
                layer.bindTooltip(`<strong>${feature.properties?.name ?? iso3}</strong><br/>${subcategory}: ${value ?? 'N/A'}`);
              }}
            />
          )}
        </MapContainer>
      </div>
    </section>
  );
}
