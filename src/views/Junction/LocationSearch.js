import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L, { marker } from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider, SearchControl } from "leaflet-geosearch";

import icon from "./Search";
import { junctionService } from "../../services/junction.service";

// Cordinates of Marcillac

const purpleOptions = { color: "white" };

function LeafletgeoSearch(props) {
    const [check, setCheck] = useState(0)
    const map = useMap();
    const [realLatLng, setRealLatLng] = useState([])
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
        provider: provider,
        showMarker: false,
        marker: {
            icon: icon
        }, // use custom marker, not working?
    });
    useEffect(() => {
        console.log("permission: ", props.permission)

        map.addControl(searchControl);
        marker.addTo(map)
        marker.on('dragend', function (e) {
            if (props.permission.length != 0 && props.permission[0].edit == true) {
                marker.setLatLng({ "lat": e.target._latlng.lat, "lng": e.target._latlng.lng });
                // console.log(e.target._latlng)
                props.setLatLng([e.target._latlng.lat, e.target._latlng.lng])
            }
        });

        map.on('click', function (e) {
            if (props.permission.length != 0 && props.permission[0].edit == true) {
                marker.setLatLng({ "lat": e.latlng.lat, "lng": e.latlng.lng });
                // console.log(e.target._latlng)
                props.setLatLng([e.latlng.lat, e.latlng.lng])
            }
        })
        console.log(props.latLng)

    }, []);

    var marker = L.marker(new L.LatLng(100000, 100000), {
        draggable: true,
        autoPan: true,
        icon: icon
    })


    useEffect(() => {
        if (searchControl.resultList.selected === -1 && check < 1) {
            setCheck(check + 1)
            // marker.clearLayer
            map.on('geosearch/showlocation', function (e) {
                // e.forEach(function (Location) {
                //     // Location.Label = full address
                //     // Location.X = longitude
                //     // Location.Y = latitude
                //     // Location.bounds = boundaries
                //     console.log(Location)
                // });
                // console.log(e)
                // marker.setLatLng({ "lat": e.location.y, "lng": e.location.x })
                // if (check == 1) {
                //     marker.setLatLng({ "lat": props.latLng[0], "lng": props.latLng[1] })
                // }

                props.setLatLng([e.location.y, e.location.x])
                marker.setLatLng({ "lat": e.location.y, "lng": e.location.x });
            });
            // searchControl.options.marker.on('dragend', function (e) {
            //     console.log(e)
            // });
        }

    }, [searchControl.resultList]);

    useEffect(() => {
        if (props.pathID != 0) {
            junctionService.getJunctionByID(props.pathID).then(data => {
                marker.setLatLng({ "lat": data.latitude, "lng": data.longitude })
                props.setLatLng([data.latitude, data.longitude])
            })
        }
    }, [props.pathID])
    // useEffect(() => {
    //     if (props.latLng.length != 0 && check < 1) {
    //         // var marker = L.marker(new L.LatLng(props.latLng[0], props.latLng[1]), {
    //         //     draggable: true,
    //         //     icon: icon
    //         // }).addTo(map);
    //         // marker.setLatLng({ "lat": props.latLng[0], "lng": props.latLng[1] })
    //         console.log(props.latLng)
    //         setCheck(check + 1)
    //     }
    // }, [props.latLng]);

    return null;
}

const MyMap = (props) => {
    const [center, setCenter] = useState([]);
    useEffect(() => {
        if (props.pathID != 0) {
            junctionService.getJunctionByID(props.pathID).then(data => {
                setCenter([data.latitude, data.longitude])
            })
        }
        else {
            setCenter([13.505, 100.09])
        }
    }, [props.pathID])
    return (
        <div id="mapid">
            {center.length > 0 && < MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: "100vh" }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LeafletgeoSearch setLatLng={props.setGlobalPosition} latLng={props.globalPosition} pathID={props.pathID} permission={props.permission} />
            </MapContainer>}
        </div >
    );
}

export default MyMap;
