import React , { useEffect , useState , useContext }from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow ,Stack,Container , MenuItem , Grid } from '@mui/material';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Page from '../components/Page';
import ReservationRow from '../components/reservation/ReservationRow';
import ReservationDetails from '../components/reservation/ReservationDetails';

import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedPaperInset from '../components/CustomizedComponents/CustomizedPaperInset';
import CustomizedInput from '../components/CustomizedComponents/CustomizedInput';
import CustomizedSelect from '../components/CustomizedComponents/CustomizedSelect';
import CustomizedButton from '../components/CustomizedComponents/CustomizedButton';
import {ThemeContext} from '../components/context/Wrapper';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';

import { getReservationList } from '../services/Reservation';
import { formatDate } from '../services/Util';


const Booking = () => {
    const context = useContext(ThemeContext);
    const [ location, setLocation] = useState('list');
    const [ currentReservation, setCurrentDetails] = useState(null);
    const [ currentItineraireIndex, setCurrentItineraireIndex] = useState(-1);
    const [ currentTarifIndex, setCurrentTarifIndex] = useState(-1);
    const [reservationList, setReservationList] = useState([]);
    const [filter, setFilter] = useState({
        dateOf: 'none',
        dateFrom: formatDate(new Date().toLocaleDateString()),
        dateUntil: formatDate(new Date().toLocaleDateString()),
        status: 'none',
    });
    console.log(filter);
    const navigate = (itinerary,detailsData = null,itineraireIndex = -1,tarifIndex = -1) => {
        setCurrentDetails(detailsData);
        setCurrentItineraireIndex(itineraireIndex);
        setCurrentTarifIndex(tarifIndex);
        if(itinerary === 'details')
        {
            setLocation('details');
        }
        else if(itinerary === 'list')
        {
            setLocation('list');
        }
    };
    const handleChangeFilters = (value,field) => {
        setFilter((prev)=>(
            {
                ...prev,
                [field]:value,
            }
        ));
    }
    const fetchFilter = () => {
        console.log(filter);
        const payload = {
            "filter": {
                "statut": filter.status,
                "dateToFind": filter.dateOf,
                "dateDebut": filter.dateFrom,
                "dateFin": filter.dateUntil,
            },
            "numPage":1,
            "nbContent":1,
        };
    };
    const fetchReservationList = () => {
        context.showLoader(true);
        const payload = {
            "filter": {
                "statut": "",
                "dateToFind": "dateReservation",
                "dateDebut": "2022-10-10",
                "dateFin": "2022-10-10"
            },
            "nbContent": 1,
            "numPage": 1
        };
        getReservationList(payload)
            .then((result) => {
                console.log(result);
                if(result.data.status === 200){
                    console.log(result.data);
                    setReservationList(result.data.list);
                }
                else if(result.data.errors)
                {
                    context.changeResultErrorMessage('errors');
                    context.showResultError(true);
                }
                else{
                    context.changeResultErrorMessage('others');
                    context.showResultError(true);
                }
            })
            .catch((e) => {
                context.changeResultErrorMessage(e.message);
                context.showResultError(true);
            })
            .finally(()=>{
                context.showLoader(false);
            })
        
    };
    useEffect(() => {
        console.log('useEffect and fecth');
        fetchReservationList();
    },[]);
    return (
        <Page title="AIOLIA | Reservations">
            <Container>
                {
                    location === 'details' && currentReservation !== null && currentItineraireIndex >-1 && 
                    currentTarifIndex >-1 && (
                        <ReservationDetails 
                            reservation={currentReservation} 
                            itineraireIndex={currentItineraireIndex} 
                            tarifIndex={currentTarifIndex}
                            navigate={navigate}
                        />
                    )
                }
                {
                    location === 'list' && (
                        <>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <CustomizedTitle size={20} text="Reservations" />
                            </Stack>

                            <CustomizedPaperOutside
                                sx={{
                                    ...lightBackgroundToTop,
                                    minHeight: '100vh',
                                    border: '1px white solid',
                                    color: 'white',
                                    padding: 5,
                                }}
                            >
                                <Stack spacing={2}>
                                    <Grid container direction='row' justifyContent='flex-start' alignItems='flex-end' spacing={4}>
                                        <Grid item xs={2}>
                                            <CustomizedSelect
                                                label="Date de"
                                                sx={{ width: '150px' }}
                                                onChange={(e)=>handleChangeFilters(e.target.value,'dateOf')}
                                                value={filter.dateOf}
                                            >
                                                <MenuItem disabled value="">
                                                    <em>Date de</em>
                                                </MenuItem>
                                                <MenuItem value='none'>
                                                    Pas de filtre
                                                </MenuItem>
                                                <MenuItem value='dateDepart'>
                                                    Depart
                                                </MenuItem>
                                                <MenuItem value='dateArrive'>Arrive</MenuItem>
                                                <MenuItem value='dateReservation'>Reservation</MenuItem>
                                            </CustomizedSelect>
                                        </Grid>
                                        {
                                            filter.dateOf !== 'none' && (
                                                <>
                                                    <Grid item xs={2}>
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>

                                                            <MobileDatePicker
                                                                disabled={filter.dateOf === 'none'}
                                                                label="Debut"
                                                                inputFormat="dd/MM/yyyy"
                                                                value={filter.dateFrom ? new Date(filter.dateFrom) : new Date()}
                                                                onChange={(e) => handleChangeFilters(formatDate(e.toLocaleDateString('en-US')), "dateFrom")}
                                                                renderInput={(params) => <CustomizedInput sx={{ width: '150px' }} {...params} />}
                                                            />

                                                        </LocalizationProvider>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>

                                                            <MobileDatePicker
                                                                disabled={filter.dateOf === 'none'}
                                                                label="Fin"
                                                                inputFormat="dd/MM/yyyy"
                                                                value={filter.dateUntil ? new Date(filter.dateUntil) : new Date()}
                                                                onChange={(e) => handleChangeFilters(formatDate(e.toLocaleDateString('en-US')), "dateUntil")}
                                                                renderInput={(params) => <CustomizedInput sx={{ width: '150px' }} {...params} />}
                                                            />

                                                        </LocalizationProvider>
                                                    </Grid>
                                                    
                                                </>
                                            )
                                        }
                                        <Grid item xs={2}>
                                            <CustomizedSelect
                                                label="Status"
                                                sx={{ width: '150px' }}
                                                onChange={(e) => handleChangeFilters(e.target.value, "status")}
                                                value={filter.status}
                                            >
                                                <MenuItem disabled value="">
                                                    <em>Status</em>
                                                </MenuItem>
                                                <MenuItem value='none'>Tous</MenuItem>
                                                <MenuItem selected value='ok'>ok</MenuItem>
                                                <MenuItem value='annulé'>Annulé</MenuItem>

                                            </CustomizedSelect>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <CustomizedButton text='filtrer' sx={{ width: '150px' }} onClick={fetchFilter}/>
                                        </Grid>
                                    </Grid>
                                    <TableContainer component={CustomizedPaperInset}>
                                        <Table aria-label="collapsible table">
                                            <TableHead sx={{background: `linear-gradient(270deg, #33647E 0%, #59A2BE 100%);`,height:'100px'}}>
                                                <TableRow>
                                                    <TableCell />
                                                    <TableCell>
                                                        <CustomizedTitle text='Reservateur' level={0} color="white"/>
                                                    </TableCell>
                                                    <TableCell>
                                                        <CustomizedTitle text='Date de reservation' level={0} color="white"/>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {reservationList.map((row,i) => (
                                                    <ReservationRow key={i+1} row={row} navigate={navigate}/>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Stack>
                            </CustomizedPaperOutside>
                        </>
                    )
                }
            </Container>
        </Page>
      );
};

export default Booking;