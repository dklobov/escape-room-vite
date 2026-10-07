import 'leaflet/dist/leaflet.css';

import {Icon, Marker, layerGroup, map, tileLayer} from 'leaflet';
import {useEffect, useRef} from 'react';

type MapProps = {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  markerTitle: string;
};

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_LAYER_ATTRIBUTE = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const DEFAULT_MARKER_ICON_SIZE = 40;
const DEFAULT_MARKER_ICON_ANCHOR = 20;

const defaultCustomIcon = new Icon({
  iconUrl: '/img/svg/pin-default.svg',
  iconSize: [DEFAULT_MARKER_ICON_SIZE, DEFAULT_MARKER_ICON_SIZE],
  iconAnchor: [DEFAULT_MARKER_ICON_ANCHOR, DEFAULT_MARKER_ICON_SIZE],
});

function Map({center, zoom, markerTitle}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return undefined;
    }

    const leafletMap = map(mapRef.current).setView(center, zoom);
    const markerLayer = layerGroup().addTo(leafletMap);

    tileLayer(TILE_LAYER, {
      attribution: TILE_LAYER_ATTRIBUTE,
    }).addTo(leafletMap);

    Marker.prototype.options.icon = defaultCustomIcon;

    new Marker(center, {
      title: markerTitle,
    }).addTo(markerLayer);

    const timeoutId = setTimeout(() => {
      leafletMap.invalidateSize();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      leafletMap.remove();
    };
  }, [center, markerTitle, zoom]);

  return <div className="map__container" ref={mapRef}></div>;
}

export default Map;
