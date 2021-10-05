import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export default function Map({ locations, onClickMarker }) {
  return (
    <MapContainer
      center={locations[0].position}
      zoom={14}
      scrollWheelZoom={false}
    >
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
            click: () => {
              onClickMarker(id);
            },
          }}
        ></Marker>
      ))}
    </MapContainer>
  );
}
