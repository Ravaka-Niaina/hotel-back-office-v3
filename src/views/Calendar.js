import React , { useState , useEffect , useContext , useRef} from 'react';
import produce from 'immer';
import { format, parse } from 'date-fns';
import moment from 'moment';
import { Stack , Grid } from '@mui/material';
import { DateRangePicker } from 'rsuite';
import DateRangeIcon from '@mui/icons-material/DateRange';

import "rsuite/dist/rsuite.min.css";
import CalendarEditor from '../components/calendar/CalendarEditor';
import CalendarEditorSkeleton from '../components/calendar/CalendarEditorSkeleton';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedIconButton from '../components/CustomizedComponents/CustomizedIconButton';

import { ThemeContext } from '../components/context/Wrapper';

import { getTcTarifPrix } from '../services/TCTarif';


const Calendar = () => {
    
    const page='CALENDAR';
    const context = useContext(ThemeContext);
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate()+7);
    const [dateRange, setDateRange] = useState([ moment(today) , moment(nextWeek) ]);
    const [open, setOpen] = useState(false);
    const [ roomList , setRoomList ] = useState([]);
    const [loading,setLoading]=useState(false);
    // console.log(format(value[0].toDate(), 'd MMMM yyyy'));
    // function getNDigits(number, digit){
    //     digit = `${digit}`;
    //     const remain = number - digit.length;
    //     for(let i = 0; i < remain; i+=1){
    //         digit = `0${digit}`;
    //     }
    //     return digit;
    // }
    
    // function getDate(date){
    //     date = new Date(date);
    //     const year = date.getFullYear();
    //     const month = getNDigits(2, date.getMonth() + 1);
    //     const day = getNDigits(2, date.getDate());
    //     date = `${year}-${month}-${day}`;
    //     return date;
    // }
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
                    context.changeResultErrorMessage('Chargement des données  non autorisées');
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
    }, []);
    return (
            <Stack spacing={2} sx={{p:2}}> 
                <h1>{page}</h1>
                <Stack direction='row' spacing={2} justifyContent='center'  alignItems='flex-end' >
                    
                    <DateRangePicker
                        onClick={()=>setOpen((prev)=>!prev)}
                        editable={false}
                        open={open}
                        onOk={(e)=>handleClickOk(e)}
                        placement='autoVerticalStart'
                        style={{border:'2px #2476d2 solid',borderRadius:'8px',width:'200px'}}
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
                    <CustomizedPaperOutside sx={{width:'300px',height:'60px',p:1,background:'#E3EDF7',borderRadius:1}}>
                        <Grid 
                           
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item xs={2}>
                                <CustomizedIconButton
                                    onClick={()=>setOpen(true)}
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
                                <div style={{lineHeight:'18px'}}>
                                   <span
                                        style={{
                                            fontFamily: 'Raleway',
                                            fontStyle: 'normal',
                                            fontWeight: '500',
                                            fontSize: '10px',
                                            lineHeight:'5px',
                                            color: '#8B9EB0',
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
                                    {format(dateRange[0].toDate(), 'd MMMM yyyy')} - {format(dateRange[1].toDate(), 'd MMMM yyyy')}
                                   </span>
                                </div>
                            </Grid>
                            
                        </Grid>
                    </CustomizedPaperOutside>
                </Stack>
                {
                    loading && roomList.length<1 && (<CalendarEditorSkeleton />)
                }
                {
                    roomList.map((room,i)=>
                        loading ? 
                            (<CalendarEditorSkeleton key={i}/>) : 
                            (<CalendarEditor room={room} dateRange={dateRange} key={i}/>)
                    )
                }
                
            </Stack>
    );
};

export default Calendar;