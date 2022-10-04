import React , { useEffect , useState , useContext }from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow ,Stack,Container , MenuItem , Grid } from '@mui/material';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Page from '../components/Page';
import ReservationRow from '../components/reservation/ReservationRow';

import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedPaperInset from '../components/CustomizedComponents/CustomizedPaperInset';
import CustomizedInput from '../components/CustomizedComponents/CustomizedInput';
import CustomizedSelect from '../components/CustomizedComponents/CustomizedSelect';
import CustomizedButton from '../components/CustomizedComponents/CustomizedButton';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';
import { getReservationList } from '../services/Reservation';
import {ThemeContext} from '../components/context/Wrapper';


const Booking = () => {
    const context = useContext(ThemeContext);
    const [reservationList, setReservationList] = useState([]);
    const [filter, setFilter] = useState({
        dateOf: 'check-in',
        dateFrom: '',
        dateUntil: '',
        status: 'ok',
    });
    console.log(reservationList);
    const fetchReservationList = () => {
        context.showLoader(true);
        const payload = {
            tableName: 'reservation',
            valuesToSearch: [],
            fieldsToPrint: [],
            nbContent: 5,
            numPage: 1,
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
                        <Grid container direction='row' justifyContent='flex-start' alignItems='flex-end' spacing={1}>
                            <Grid item xs={2}>
                                <CustomizedSelect
                                    label="Date de"
                                    sx={{ width: '150px' }}
                                    onChange={(e) => { console.log(e) }}
                                    onClick={() => { console.log('click') }}
                                >
                                    <MenuItem disabled value="">
                                        <em>Date de</em>
                                    </MenuItem>
                                    <MenuItem selected value='check-in'>
                                        depart
                                    </MenuItem>
                                    <MenuItem value='check-out'>arrive</MenuItem>
                                    <MenuItem value='reservatifdson'>reservation</MenuItem>
                                </CustomizedSelect>
                            </Grid>
                            <Grid item xs={2}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <MobileDatePicker
                                        label="Debut"
                                        inputFormat="dd/MM/yyyy"
                                        value={new Date()}
                                        // onChange={(e) =>
                                        //     setRatePlan({ ...ratePlan, start_date_of_booking: formatDate(e.toLocaleDateString('en-US')) })
                                        // }
                                        renderInput={(params) => <CustomizedInput sx={{ width: '150px' }} {...params} />}
                                    />

                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={2}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <MobileDatePicker
                                        label="Fin"
                                        inputFormat="dd/MM/yyyy"
                                        value={new Date()}
                                        // onChange={(e) =>
                                        //     setRatePlan({ ...ratePlan, end_date_of_booking: formatDate(e.toLocaleDateString('en-US')) })
                                        // }
                                        renderInput={(params) => <CustomizedInput sx={{ width: '150px' }} {...params} />}
                                    />

                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={2}>
                                <CustomizedSelect
                                    label="Status"
                                    sx={{ width: '150px' }}
                                    onChange={(e) => { console.log(e) }}
                                    onClick={() => { console.log('click') }}
                                >
                                    <MenuItem disabled value="">
                                        <em>Status</em>
                                    </MenuItem>
                                    <MenuItem selected value='check-in'>
                                        ok
                                    </MenuItem>
                                    <MenuItem value='check-out'>Annulé</MenuItem>
                                    <MenuItem value='reservatifdson'>Valide</MenuItem>
                                </CustomizedSelect>
                            </Grid>
                            <Grid item xs={2}>
                                <CustomizedButton text='filtrer' sx={{ width: '150px' }} />
                            </Grid>
                        </Grid>
                        <TableContainer component={CustomizedPaperInset}>
                            <Table aria-label="collapsible table">
                                <TableHead sx={{background:'black',height:'100px'}}>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>
                                            <CustomizedTitle text='Reservateur' level={0} />
                                        </TableCell>
                                        <TableCell>
                                            <CustomizedTitle text='Date de reservation' level={0} />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reservationList.map((row,i) => (
                                        <ReservationRow key={i} row={row} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </CustomizedPaperOutside>
            </Container>
        </Page>
    );
};

export default Booking;