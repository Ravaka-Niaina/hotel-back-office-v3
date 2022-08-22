import React,{useEffect, useState , useRef , useMemo} from 'react';
import { Dialog, DialogContent, Button, Stack } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import SearchIcon from '@mui/icons-material/Search';
import PanToolIcon from '@mui/icons-material/PanTool';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import L from 'leaflet';
import { MapContainer, TileLayer,Marker,Popup,useMapEvents,useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider, } from 'leaflet-geosearch';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/assets/css/leaflet.css';

const MapDialog = () => {
    const DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    const [mapReference,setMapReference] = useState(null);
    const [position, setPosition] = useState(null);
    const [open,setOpen] = useState(false);
    const [showSearchBar,setShowSearchBar] = useState(false);
    const [navigateMode,setNavigateMode] = useState(true);

    useEffect(() => {
        const pro =  new OpenStreetMapProvider();
        pro.search({query:'Ambatoroka'})
        .then((result)=>{
            console.log(result);
        })
    },[])

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
                searchLabel: 'rechercher'
            }).addTo(map);
            // console.log(map);
            // map.addControl(searchControl); // this is how you add a control in vanilla leaflet
        return () => map.removeControl(searchControl)
    }, [])
    }
    const LocationMarker = () => {
        const markerRef = useRef(null);
        const mapEvents = useMapEvents({
            click(e) {
                if(!navigateMode)
                {
                    setPosition(e.latlng) 
                }
                
                mapEvents.flyTo(e.latlng, mapEvents.getZoom())
            },
            locationfound(e) {
                setPosition(e.latlng)
                mapEvents.flyTo(e.latlng, mapEvents.getZoom())
            },
        })
        const eventHandlers = useMemo(
            () => ({
              dragend() {
                const marker = markerRef.current
                if (marker != null) {
                  setPosition(marker.getLatLng())
                }
              },
            }),
            [],
          )

        return position === null ? null : (
            <Marker draggable={!navigateMode} position={position} icon={DefaultIcon} eventHandlers={eventHandlers} ref={markerRef}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }
    const handleChangeMode = () => {
        setNavigateMode(!navigateMode);
    };

    const handleShowSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    }
    const handleClickLocate = () => {
        if(mapReference)
        {
            mapReference.locate();
        }
    };
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
                    {
                        mapReference && 
                        <Stack direction="row" justifyContent="space-between">
                            <Stack sx={{p:1}} direction='row' spacing={2} >
                                <CustomizedIconButton onClick={handleClickLocate}>
                                    <MyLocationIcon />
                                </CustomizedIconButton>
                                
                                <CustomizedIconButton onClick={handleShowSearchBar}>
                                    <FindReplaceIcon />
                                </CustomizedIconButton>

                                <CustomizedIconButton onClick={handleChangeMode}>
                                    { !navigateMode ? <PanToolAltIcon  /> : <PanToolIcon  />}
                                </CustomizedIconButton>
                            </Stack>
                            <Stack sx={{p:1}} direction='row' spacing={2}>
                                <CustomizedInput 
                                    value={position ? position.lat : ""}
                                    placeholder="latitude "
                                    sx={{
                                        height:"40px !important",
                                        width:"150px !important",
                                    }}
                                />
                                <CustomizedInput 
                                    value={position ? position.lng : ""}
                                    placeholder="longitude"
                                    sx={{
                                        height:"40px !important",
                                        width:"150px !important",
                                    }}
                                />
                                <CustomizedIconButton>
                                    <SearchIcon />
                                </CustomizedIconButton>
                            </Stack>
                        </Stack>
                    }
                    <MapContainer
                        style={{height:'500px',width:'700px'}}
                        center={{ lat: -18.933333, lng: 47.516667 }}
                        zoom={13}
                        scrollWheelZoom={false}
                        ref={setMapReference}
                    >
                        
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                        {
                            showSearchBar && mapReference && 
                            <SearchBar map={mapReference}/>
                        }
                    </MapContainer>
                    
                    
                </DialogContent>
            </Dialog>
            
        </>
    );
};

export default MapDialog;