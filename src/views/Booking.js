import React , { useEffect , useState , useContext }from 'react';
import {format} from 'date-fns';
import { Typography,Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow ,Stack,Container , MenuItem , Grid } from '@mui/material';

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
import CustomizedLinearProgress from '../components/CustomizedComponents/CustomizedLinearProgress';
import {ThemeContext} from '../components/context/Wrapper';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';

import { getReservationList,getNotificationReservationList } from '../services/Reservation';
import { formatDate } from '../services/Util';


const Booking = () => {
    const context = useContext(ThemeContext);
    const [ loadingFetchNewReservationList, setLoadingFetchNewReservationList] = useState(false);
    const [loadingFetchReservationList, setLoadingFetchReservationList] = useState(false);
    const [ location, setLocation] = useState('list');
    const [ currentReservation, setCurrentDetails] = useState(null);
    const [ currentItineraireIndex, setCurrentItineraireIndex] = useState(-1);
    const [ currentTarifIndex, setCurrentTarifIndex] = useState(-1);
    const [reservationList, setReservationList] = useState([]);
    const [newReservationList, setNewReservationList] = useState([]);
    const [resultCount, setResultCount] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filter, setFilter] = useState({
        dateOf: 'none',
        dateFrom: formatDate(new Date().toLocaleDateString('en-US')),
        dateUntil: formatDate(new Date().toLocaleDateString('en-US')),
        status: 'none',
    });
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
    const handleChangePage = (e,p,row = rowsPerPage) => {
        fetchFilter(p+1,row);
    }
    const handleChangeRowsPerPage = (e) => {
        const row = parseInt(e.target.value,10);
        handleChangePage(null,0,row);
    };
    
    const fetchFilter = (p = 1,row = rowsPerPage) => {
        setLoadingFetchNewReservationList(true);
        setPage(p);
        setRowsPerPage(row);
        const payload = {
            "filter": {
                "statut": filter.status,
                "dateToFind": filter.dateOf,
                "dateDebut": filter.dateFrom,
                "dateFin": filter.dateUntil,
            },
            "nbContent": row,
            "numPage": p,
        };
        getReservationList(payload)
            .then((result) => {
                if (result.data.status === 200) {
                    setReservationList(result.data.list);
                    setResultCount(result.data.nbResult);
                }
                else if (result.data.errors) {
                    const item = Object.keys(result.data.errors).filter((e, i) => i === 0)[0];
                    const indication = result.data.errors[item];
                    const message = `${item}: ${indication}`;
                    context.changeResultErrorMessage(message);
                    context.showResultError(true);
                }
                else if(result.data.message){
                    context.changeResultErrorMessage(result.data.message);
                    context.showResultError(true);
                }
                else{
                    context.changeResultErrorMessage('Une erreur est survenue: Liste de reservstion.');
                    context.showResultError(true);
                }
            })
            .catch((e) => {
                context.changeResultErrorMessage(e.message);
                context.showResultError(true);
            })
            .finally(() => {
                setLoadingFetchNewReservationList(false);
            })
    };
    const fetchReservationList = async () => {
        setLoadingFetchReservationList(true);
        const payload = {
            "filter": {
                "statut": "",
                "dateToFind": "none",
                "dateDebut": "2022-10-10",
                "dateFin": "2022-10-10"
            },
            "nbContent": rowsPerPage,
            "numPage": 1
        };
        try {
            const result = await getReservationList(payload);
            if(result.data.status === 200){
                setReservationList(result.data.list);
                setResultCount(result.data.nbResult);
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
            setLoadingFetchReservationList(false);
        } catch (e) {
            context.changeResultErrorMessage(e.message);
            setLoadingFetchReservationList(false);
        }
        
    };
    const fetchNewReservationList = async () => {
        setLoadingFetchNewReservationList(true);
        try {
            const result = await getNotificationReservationList();
            if(result.data.status === 200){
                setNewReservationList(result.data.list);
            }
            else{
                context.changeResultErrorMessage(`Une erreur est survenue: Nouvelle reservation.`);
                context.showResultError(true);
            }
            setLoadingFetchNewReservationList(false);
        } catch (err) {
            context.changeResultErrorMessage(err.message);
            context.showResultError(true);
            setLoadingFetchNewReservationList(false);   
        }
    };
    useEffect(() => {
        fetchNewReservationList();
        fetchReservationList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return (
        <Page title="AIOLIA | Reservations">
            <Container sx={{maxWidth: '100%!important'}}>
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
                                    <Grid container direction='row' justifyContent='space-between' alignItems='flex-end'>
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
                                            <CustomizedButton text='filtrer' sx={{ width: '150px' }} onClick={()=>fetchFilter()}/>
                                        </Grid>
                                    </Grid>
                                    <TableContainer component={CustomizedPaperInset}>
                                        <Table aria-label="collapsible table">
                                            <TableHead sx={{background: `linear-gradient(270deg, #33647E 0%, #59A2BE 100%);`,height:'100px'}}>
                                                <TableRow>
                                                    <TableCell />
                                                    <TableCell>
                                                        <CustomizedTitle text='Reservateur' level={2} color="white" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <CustomizedTitle text='Date de reservation' level={2} color="white"/>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    (loadingFetchNewReservationList || loadingFetchReservationList) && (
                                                        <TableRow>
                                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                                    <Box sx={{ margin: 1, textAlign: 'center' }} >
                                                                        <CustomizedLinearProgress />
                                                                    </Box>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }
                                                { !loadingFetchNewReservationList && !loadingFetchReservationList && reservationList.map((row,i) => (
                                                    <ReservationRow key={i+1} row={{...row,new:newReservationList.find((elem)=>elem._id === row._id)}} navigate={navigate}/>
                                                ))}
                                                {
                                                    !loadingFetchNewReservationList && !loadingFetchReservationList && reservationList.length < 1 && (
                                                        <TableRow>
                                                            <TableCell style={{ textAlign:'center' }} colSpan={6}>
                                                                <CustomizedTitle text={`Pas de résultats`} color='#212B36' level={3}/>
                                                                <Typography variant="body2" align="center">
                                                                    Pas de réservations trouvés pour &nbsp;
                                                                    <strong>
                                                                        &quot; 
                                                                        Statut: &nbsp; {filter.status === 'none'? ' tous ,':`${filter.status} ,`} 
                                                                        {
                                                                            filter.dateOf !== 'none' && `  ${filter.dateOf} entre le ${format(new Date(filter.dateFrom), 'dd MMMM yyyy')} et ${format(new Date(filter.dateUntil), 'dd MMMM yyyy') }.`
                                                                        }
                                                                        &quot;
                                                                    </strong>.
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 15]}
                                        component="div"
                                        count={resultCount}
                                        rowsPerPage={rowsPerPage}
                                        page={page-1}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelRowsPerPage='Lignes par page'
                                        labelDisplayedRows={({ from, to, count, page })=>`Page ${page+1} :   ${from} - ${to} sur ${count}`}
                                    />
                                    
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