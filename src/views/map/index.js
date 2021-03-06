import React ,{useState}from 'react';
import {MapContainer,useMapEvents,Popup,Marker,TileLayer} from "react-leaflet"


function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

 
const Map = () => {
  return (
 
    <MapContainer
    center={{ lat: 51.505, lng: -0.09 }}
    zoom={20}
    style={{height : '1000px'}}
    scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LocationMarker />
  </MapContainer>
 
  );
};

export default Map;