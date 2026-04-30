'use client';

import 'leaflet/dist/leaflet.css';
import { GeoJSON, MapContainer, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { useEffect, useMemo, useState } from 'react';
import type { Layer } from 'leaflet';
import type { FeatureCollection } from 'geojson';
import L from 'leaflet';
import { getMetricBounds, getMetricValue } from '@/lib/data-service';
import { useDashboardStore } from '@/lib/store';

function colorForValue(value: number | null, min: number, max: number) {
  if (value === null) return '#1e293b';
  const ratio = (value - min) / (max - min || 1);
  const stops = ['#183d31', '#2f7b61', '#56ad88', '#78c8a3'];
  return stops[Math.min(stops.length - 1, Math.floor(ratio * stops.length))];
}

function FitToCountry({ centroid }: { centroid?: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (centroid) map.flyTo([centroid[1], centroid[0]], 4, { duration: 0.8 });
  }, [centroid, map]);
  return null;
}

export function MapComponent() {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const [centroid, setCentroid] = useState<[number, number] | undefined>();
  const category = useDashboardStore((s) => s.selectedCategory);
  const subcategory = useDashboardStore((s) => s.selectedSubcategory);
  const period = useDashboardStore((s) => s.selectedPeriod);
  const selectedCountryIso3 = useDashboardStore((s) => s.selectedCountryIso3);
  const setSelectedCountryIso3 = useDashboardStore((s) => s.setSelectedCountryIso3);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
      .then((res) => res.json())
      .then((data) => setGeojson(data));
  }, []);

  const bounds = useMemo(() => getMetricBounds(category, subcategory, period), [category, subcategory, period]);

  return (
    <section className="overflow-hidden rounded-xl border border-risk-border bg-risk-panel">
      <div className="h-[70vh] min-h-[420px] w-full">
        <MapContainer center={[20, 0]} zoom={2} className="h-full w-full" zoomControl={false}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution="&copy; OpenStreetMap &copy; CARTO" />
          {centroid && <FitToCountry centroid={centroid} />}
          {geojson && (
            <GeoJSON
              data={geojson as GeoJSON.GeoJsonObject}
              style={(feature) => {
                const iso3 = feature?.id as string;
                const value = getMetricValue(iso3, category, subcategory, period);
                return {
                  fillColor: colorForValue(value, bounds.min, bounds.max),
                  weight: selectedCountryIso3 === iso3 ? 2.5 : 0.8,
                  color: selectedCountryIso3 === iso3 ? '#78c8a3' : '#334155',
                  fillOpacity: 0.8
                };
              }}
              onEachFeature={(feature, layer: Layer) => {
                const iso3 = feature.id as string;
                const value = getMetricValue(iso3, category, subcategory, period);
                layer.on({
                  mouseover: () => (layer as L.Path).setStyle({ weight: 2, color: '#a7f3d0' }),
                  mouseout: () => (layer as L.Path).setStyle({ weight: selectedCountryIso3 === iso3 ? 2.5 : 0.8, color: selectedCountryIso3 === iso3 ? '#78c8a3' : '#334155' }),
                  click: () => {
                    setSelectedCountryIso3(iso3);
                    const center = (layer as L.Polygon).getBounds().getCenter();
                    setCentroid([center.lng, center.lat]);
                  }
                });
                layer.bindTooltip(`<strong>${feature.properties?.name ?? iso3}</strong><br/>${subcategory}: ${value ?? 'N/A'}`);
              }}
            />
          )}
        </MapContainer>
      </div>
      <div className="flex items-center justify-between bg-slate-950/50 px-4 py-3 text-xs text-slate-300">
        <span>Légende ({subcategory})</span>
        <div className="h-2 w-52 rounded-full bg-gradient-to-r from-[#183d31] to-[#78c8a3]" />
      </div>
    </section>
  );
}
