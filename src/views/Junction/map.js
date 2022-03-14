import { Button } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React, { useState } from 'react';
import { MapContainer, useMapEvents, Popup, Marker, TileLayer } from "react-leaflet"
import { useNavigate } from 'react-router-dom';
import icon from './Search'

function LocationMarker(props) {
    const map = useMapEvents({

    })
    const navigate = useNavigate();
    return props.junctionList === null ? null : (
        props.junctionList.map((junction, index) => (
            <Marker position={{ "lat": junction.latitude, "lng": junction.longitude }} icon={icon}>
                <Popup>
                    <Button
                        onClick={() => {
                            navigate(`/app/junction/${junction.id}`, { replace: true });
                        }}
                    >
                        <Edit />
                        แก้ไขข้อมูล
                    </Button>
                </Popup>
            </Marker >
        ))
    )
}


const Map = (props) => {
    return (

        <MapContainer
            center={{ lat: 13.505, lng: 100.09 }}
            zoom={15}
            style={{ height: '1000px' }}
            scrollWheelZoom={false}
            whenCreated={map => { props.setMap(map) }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker junctionList={props.junctionList} />
        </MapContainer>

    );
};

export default Map;