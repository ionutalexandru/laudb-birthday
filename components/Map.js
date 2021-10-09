import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import * as React from "react";

const ChangeView = ({ position = null }) => {
  const map = useMap();
  if (!position) return null;
  const [lat, lng] = position;
  map.setView({ lat, lng });
  return null;
};

export default function Map({ locations, onClickMarker, selectedPlace }) {
  const center = locations[0].position;
  const panToPosition = selectedPlace ? selectedPlace.data.position : null;

  return (
    <MapContainer center={center} zoom={16} scrollWheelZoom={false}>
      <ChangeView position={panToPosition} />
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map(({ position, id }) => (
        <Marker
          key={`marker_${id}`}
          position={position}
          draggable={false}
          animate={true}
          eventHandlers={{
            click: (e) => {
              onClickMarker(id);
            },
          }}
        />
      ))}
    </MapContainer>
  );
}
