import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export default function Map({ coords }) {
  return (
    <MapContainer
      center={[40.416775, -3.70379]}
      zoom={14}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coords.map((c) => (
        <Marker
          key={`${c[0]}-${c[1]}`}
          position={c}
          draggable={false}
          animate={true}
        ></Marker>
      ))}
    </MapContainer>
  );
}
