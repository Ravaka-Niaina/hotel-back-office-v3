import React,{useState} from 'react';
import { Dialog, DialogActions, DialogContent, Button, Stack } from '@mui/material';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap,Marker,Popup,useMapEvents } from 'react-leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import 'leaflet/dist/leaflet.css';


const MapDialog = () => {
    const DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    const [position, setPosition] = useState(null)
    const LocationMarker = () => {
        
        
        const map = useMapEvents({
            click(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
            locationfound(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })
        const handleClickLocate = () => {
            map.locate();
        }

        return position === null ? null : (
            <Marker position={position} icon={DefaultIcon}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }
    const [open,setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <CustomizedButton onClick={handleClickOpen} text='Coordonnées gps' elevation={8} sx={{ width: '250px' }} variant='contained' />
            <Dialog open={open} onClose={handleClose} maxWidth={'xl'} sx={{ overflowY: "none !important", }}>
                <DialogContent sx={{ backgroundColor: '#E8F0F8', pr: 2, pl: 2 }}>
                    <MapContainer
                        style={{height:'500px',width:'700px'}}
                        center={{ lat: -18.933333, lng: 47.516667 }}
                        zoom={13}
                        scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                    </MapContainer>
                </DialogContent>
            </Dialog>
            
        </>
    );
};

export default MapDialog;