import React , {useState} from 'react';
import { format } from 'date-fns';
import moment from 'moment';
import { Stack , Grid } from '@mui/material';
import { DateRangePicker } from 'rsuite';
import DateRangeIcon from '@mui/icons-material/DateRange';

import "rsuite/dist/rsuite.min.css";
import CalendarEditor from '../components/calendar/CalendarEditor';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedIconButton from '../components/CustomizedComponents/CustomizedIconButton';


const Calendar = () => {
    const page='CALENDAR';
    const [value, setValue] = useState([ moment(new Date()) , moment(new Date(new Date().getDate()+30)) ]);
    const [open, setOpen] = useState(false);
    console.log(format(value[0].toDate(), 'd MMMM yyyy'));
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
    
    return (
            <Stack spacing={2} sx={{p:2}}> 
                <h1>{page}</h1>
                <Stack direction='row' spacing={2} justifyContent='center'  alignItems='flex-end' >
                    
                    <DateRangePicker
                        onClick={()=>setOpen((prev)=>!prev)}
                        editable={false}
                        open={open}
                        onOk={()=>setOpen(false)}
                        placement='autoVerticalStart'
                        style={{border:'2px #2476d2 solid',borderRadius:'8px',width:'200px'}}
                        value={[value[0].toDate(), value[1].toDate()]}
                        onChange={(val) => {
                            const newValue = JSON.parse(JSON.stringify(val));
                            for(let i = 0; i < newValue.length; i+=1){
                                newValue[i] = moment(new Date(newValue[i]));
                            }
                            setValue(newValue);
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
                                        {format(value[0].toDate(), 'd MMMM yyyy')} - {format(value[1].toDate(), 'd MMMM yyyy')}
                                   </span>
                                </div>
                            </Grid>
                            
                        </Grid>
                    </CustomizedPaperOutside>
                </Stack>
                <CalendarEditor />
            </Stack>
    );
};

export default Calendar;