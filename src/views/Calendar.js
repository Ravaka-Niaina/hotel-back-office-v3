import React , { useState , useEffect , useContext} from 'react';
import produce from 'immer';
import { format } from 'date-fns';
import moment from 'moment';
import { Stack , Grid } from '@mui/material';
import { DateRangePicker } from 'rsuite';
import DateRangeIcon from '@mui/icons-material/DateRange';

import "rsuite/dist/rsuite.min.css";
import { getFrenchDate } from '../utils/date';
import CalendarEditor from '../components/calendar/CalendarEditor';
import CalendarEditorSkeleton from '../components/calendar/CalendarEditorSkeleton';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedIconButton from '../components/CustomizedComponents/CustomizedIconButton';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';

import { ThemeContext } from '../components/context/Wrapper';

import { getTcTarifPrix } from '../services/TCTarif';


const Calendar = () => {
    
    const page='Calendrier';
    const context = useContext(ThemeContext);
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate()+7);
    const [dateRange, setDateRange] = useState([ moment(today) , moment(nextWeek) ]);
    const [open, setOpen] = useState(false);
    const [ roomList , setRoomList ] = useState([]);
    const [loading, setLoading]=useState(false);
    const [partialRoomLoading, setPartialRoomLoading] = useState('');
    
    const reloadOneRoom = (id) => {
        const roomIndex = roomList.findIndex((elem)=>elem._id === id); 
        if(roomIndex > -1)
        {
            setPartialRoomLoading(id);
            const payload = {
                dateDebut: format(dateRange[0].toDate(), 'yyyy-MM-dd'),
                dateFin: format(dateRange[1].toDate(), 'yyyy-MM-dd'),
            };
            // console.log(payload);
            context.showLoader(true);
            getTcTarifPrix(payload)
                .then((result) => {
                    console.log(result);
                    if (result.data.status === 200) {
                        const resultIndex = result.data.typeChambre.findIndex((elem)=>elem._id === id);
                        console.log(resultIndex);
                        if(resultIndex > -1)
                        {
                            // console.log('hahah');
                            setRoomList((prev) => produce(prev,condition => {
                                   condition[roomIndex] = JSON.parse(JSON.stringify(result.data.typeChambre[resultIndex]));
                                }));
                        }
                    }
                    else if(result.data.errors){
                    
                        const item = Object.keys(result.data.errors).filter((e, i) => i === 0)[0];
                        const indication = result.data.errors[item];
                        const message = `${item}: ${indication}`;
                        context.changeResultErrorMessage(message);
                        context.showResultError(true);
                    }
                    else {
                        context.changeResultErrorMessage('Une erreur est survenue lors du chargement des données');
                        context.showResultError(true);
                    }
                })
                .catch((error) => {
                    context.changeResultErrorMessage(error.message);
                    context.showResultError(true);
                })
                .finally(()=>{
                    context.showLoader(false);
                    setTimeout(() => {
                        setPartialRoomLoading('');
                    },1000);
                });
        }
    };
    const fetchData = (dateR) => {
        const payload = {
            dateDebut: format(dateR[0].toDate(), 'yyyy-MM-dd'),
            dateFin: format(dateR[1].toDate(), 'yyyy-MM-dd'),
        };
        context.showLoader(true);
        setLoading(true);
        getTcTarifPrix(payload)
            .then((result) => {
                if (result.data.status === 200) {
                    setRoomList(result.data.typeChambre);
                }
                else {
                    context.changeResultErrorMessage('Vous devez créer au moins un type chambre');
                    context.showResultError(true);
                }
            })
            .catch((error) => {
                context.changeResultErrorMessage(error.message);
                context.showResultError(true);
            })
            .finally(()=>{
                 context.showLoader(false);
                 setLoading(false);
                // console.log('ol');
            });
    };

    const handleClickOk = (dateR) => {
        fetchData(dateR.map((d)=>moment(new Date(d))));
        setOpen(false);
    };
    useEffect(() => {
        fetchData(dateRange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const firstDateElements = getFrenchDate(format(dateRange[0].toDate(), 'd MMMM yyyy'));
    const dateRangeBeginning = `${firstDateElements[0]} ${firstDateElements[1]} ${firstDateElements[2]}`;

    const secondDateElements = getFrenchDate(format(dateRange[1].toDate(), 'd MMMM yyyy'));
    const dateRangeEnding = `${secondDateElements[0]} ${secondDateElements[1]} ${secondDateElements[2]}`;

    return (
            <Stack spacing={4} sx={{p:2}}> 
                <CustomizedTitle text={page} />
                <Stack direction='row' spacing={4} justifyContent='start'  alignItems='flex-start' style={{ marginLeft: '0' }} >
                    
                    <DateRangePicker
                        onClick={()=>setOpen((prev)=>!prev)}
                        editable={false}
                        open={open}
                        onOk={(e)=>handleClickOk(e)}
                        placement='autoVerticalStart'
                        style={{
                            border:'2px #2476d2 solid',
                            borderRadius:'8px', 
                            marginLeft: '60px', 
                            bottom: '-18px',
                            position: 'relative',
                            zIndex: -1,
                        }}
                        value={[dateRange[0].toDate(), dateRange[1].toDate()]}
                        onChange={(val) => {
                            const newValue = JSON.parse(JSON.stringify(val));
                            for(let i = 0; i < newValue.length; i+=1){
                                newValue[i] = moment(new Date(newValue[i]));
                            }
                            setDateRange(newValue);
                            // if(newValue !== undefined && newValue[0] !== null && newValue[1] !== null){
                            //     getPrix(newValue);
                            // }
                        }}
                    />
                    <CustomizedPaperOutside 
                        onClick={()=>setOpen((prev)=>!prev)} 
                        sx={{
                            width:'400px',
                            height:'60px',
                            p:1,
                            background:'#E3EDF7',
                            borderRadius:1, 
                            marginLeft: '-230 px',
                            cursor: 'pointer',
                            position: 'absolute'
                        }}>
                        <Grid 
                           
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item xs={2}>
                                <CustomizedIconButton
                                    sx={{
                                        background: '#E3EDF7',
                                        opacity: 0.7,
                                        boxShadow: 'inset -4px -4px 5px rgba(255, 255, 255, 0.88), inset 4px 4px 5px #C1D5EE',
                                        borderRadius: '5px',
                                    }}
                                >
                                    <DateRangeIcon style={{ color: '#2476d2', width: '25px', height: '25px' }} />
                                </CustomizedIconButton>
                            </Grid>
                            <Grid item xs>
                                <div style={{lineHeight:'18px', border: '2px solid red'}}>
                                   <span
                                        style={{
                                            fontFamily: 'RalewayBold',
                                            fontStyle: 'normal',
                                            fontWeight: '700',
                                            fontSize: '18px',
                                            lineHeight:'20px',
                                            color: '#8B9EB0',
                                            letterSpacing: '-0.4px',
                                        }}
                                   >                                    
                                        plage de dates sélectionnée
                                   </span>
                                   <br/>
                                   <span
                                        style={{
                                            fontFamily: 'Raleway',
                                            fontStyle: 'normal',
                                            fontWeight: '700',
                                            fontSize: '13px',
                                            color: '#113A62',
                                        }}
                                   >
                                    {dateRangeBeginning} - {dateRangeEnding}
                                   </span>
                                </div>
                            </Grid>
                            
                        </Grid>
                    </CustomizedPaperOutside>
                </Stack>
                {
                    loading && roomList.length < 1 && (<CalendarEditorSkeleton />)
                }
                {
                    roomList.map((room,i)=>
                        loading || partialRoomLoading === room._id? 
                            (<CalendarEditorSkeleton key={i}/>) : 
                            (<CalendarEditor 
                                room={room} 
                                dateRange={dateRange} 
                                setDateRange={setDateRange} 
                                key={i} 
                                reloadRoom={reloadOneRoom}
                                fetchData={fetchData}
                            />)
                    )
                }
                
            </Stack>
    );
};

export default Calendar;