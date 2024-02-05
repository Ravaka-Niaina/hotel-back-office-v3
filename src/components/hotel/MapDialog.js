import React, { useEffect, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom';
import { Dialog, DialogContent, Stack } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import CancelIcon from '@mui/icons-material/Cancel';
import PanToolIcon from '@mui/icons-material/PanTool';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
// eslint-disable-next-line 
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/assets/css/leaflet.css';

const MapDialog = (props) => {
  const [defaultCenter, setDefaultCenter] = useState({ lat: -18.933333, lng: 47.516667 }); // Centre a madagascar
  const DefaultIcon = L.icon({
    iconUrl: 'https://img.icons8.com/material-sharp/32/E32727/marker.png',
  });
  const [mapReference, setMapReference] = useState(null);
  const { hotel, setHotel, errors, setErrors } = props;
  const [position, setPosition] = useState(null);
  const [open, setOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [navigateMode, setNavigateMode] = useState(true);

  useEffect(() => {
    const pro = new OpenStreetMapProvider();
    pro.search({ query: 'Ambatoroka' }).then(() => {
      // console.log(result);
    });
  }, []);

  const SearchBar = (props) => {
    const { map } = props;
    useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider: new OpenStreetMapProvider(),
        style: 'bar',
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: false,
        searchLabel: 'rechercher',
      }).addTo(map);
      map.on('geosearch/showlocation', (e) => {
        setPosition(e.marker._latlng);
      });
      // console.log(map);
      // map.addControl(searchControl); // this is how you add a control in vanilla leaflet
      return () => map.removeControl(searchControl);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  };
  const LocationMarker = () => {
    const markerRef = useRef(null);
    const mapEvents = useMapEvents({
      click(e) {
        if (!navigateMode) {
          setPosition(e.latlng);
        }
        mapEvents.flyTo(e.latlng, mapEvents.getZoom());
      },
      locationfound(e) {
        setPosition(e.latlng);
        mapEvents.flyTo(e.latlng, mapEvents.getZoom());
      },
    });
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );

    return position === null ? null : (
      <Marker
        draggable={!navigateMode}
        position={position}
        icon={DefaultIcon}
        eventHandlers={eventHandlers}
        ref={markerRef}
      >
        <Popup>You are here</Popup>
      </Marker>
    );
  };
  const handleChangeMode = () => {
    setNavigateMode(!navigateMode);
  };

  const handleShowSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };
  const handleClickLocate = () => {
    if (mapReference) {
      mapReference.locate();
    }
  };
  const handleClickValidate = () => {
    setHotel({
      ...hotel,
      location_lat: `${position.lat}`,
      location_lng: `${position.lng}`,
    });
    setErrors({
      ...errors,
      location_lat: '',
      location_lng: '',
    });
    setOpen(false);
  };
  const handleClickCancel = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
    const defaultLatlng = L.latLng(-18.933333, 47.516667);
    const currentPosition =
      hotel.location_lat && hotel.location_lng ? L.latLng(hotel.location_lat, hotel.location_lng) : defaultLatlng;
    setPosition(currentPosition);
    setDefaultCenter({ lat: currentPosition.lat, lng: currentPosition.lng });
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CustomizedButton
        component={RouterLink}
        to="#"
        onClick={handleClickOpen}
        text="Coordonnées gps"
        elevation={8}
        sx={{ width: '250px' }}
        variant="contained"
      />
      <Dialog open={open} onClose={handleClose} maxWidth={'xl'} sx={{ overflowY: 'none !important' }}>
        <DialogContent sx={{ backgroundColor: '#E8F0F8', pr: 2, pl: 2 }}>
          {mapReference && (
            <Stack direction="row" justifyContent="space-between">
              <Stack sx={{ p: 1 }} direction="row" spacing={2}>
                <CustomizedIconButton onClick={handleClickLocate}>
                  <MyLocationIcon sx={{ width: 20, height: 20 }} />
                </CustomizedIconButton>

                <CustomizedIconButton onClick={handleShowSearchBar}>
                  <FindReplaceIcon sx={{ width: 20, height: 20 }} />
                </CustomizedIconButton>

                <CustomizedIconButton onClick={handleChangeMode}>
                  {!navigateMode ? (
                    <EditLocationAltIcon sx={{ width: 20, height: 20 }} />
                  ) : (
                    <PanToolIcon sx={{ width: 20, height: 20 }} />
                  )}
                </CustomizedIconButton>
              </Stack>
              <Stack sx={{ p: 1 }} direction="row" spacing={2} alignItems="center">
                <h5>Lat: {position ? position.lat : ''}</h5>
                <h5>Lng: {position ? position.lng : ''}</h5>
                <Stack direction="row" spacing={1}>
                  <CustomizedIconButton onClick={handleClickValidate}>
                    <CheckCircleIcon sx={{ width: 20, height: 20 }} />
                  </CustomizedIconButton>
                  <CustomizedIconButton onClick={handleClickCancel}>
                    <CancelIcon sx={{ width: 20, height: 20 }} />
                  </CustomizedIconButton>
                </Stack>
              </Stack>
            </Stack>
          )}
          <MapContainer
            style={{ height: '500px', width: '700px' }}
            center={defaultCenter}
            zoom={13}
            scrollWheelZoom={false}
            ref={setMapReference}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            {showSearchBar && mapReference && <SearchBar map={mapReference} />}
          </MapContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};
MapDialog.propTypes = {
    hotel: PropTypes.any,
    setHotel: PropTypes.any,
    errors: PropTypes.any,
    setErrors: PropTypes.any,
    // result: PropTypes.any,
    map: PropTypes.any,
}
export default MapDialog;
