import React from 'react';
import { Stack } from '@mui/material';
import CalendarEditor from '../components/calendar/CalendarEditor';


const Calendar = () => {
    const page='CALENDAR';
    return (
            <Stack spacing={2} sx={{p:2}}> 
                <h1>{page}</h1>
                <CalendarEditor />
            </Stack>
    );
};

export default Calendar;