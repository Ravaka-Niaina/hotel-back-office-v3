import React from 'react';
import { Grid ,Skeleton } from '@mui/material';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';

const CalendarEditorSkeleton = () => (
        <CustomizedPaperOutside elevation={12} sx={{ background: '#E3EDF7', p: 5 }}>
           <Grid container spacing={2}>
                <Grid item xs={4} container direction='column' spacing={1}>
                    <Grid item xs={6} >
                        <Skeleton variant='rectangular' width={'100%'} height={'90%'}/>
                    </Grid>
                    {
                        [...new Array(5)].map((e,i)=>(
                            <Grid item xs container direction='column' key={i}>
                                <Skeleton variant='rounded' width={'100%'} height={'100%'}/>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid item xs={8} >
                    <Skeleton  variant='rounded' width={'100%'} height={400}/>
                </Grid>
            </Grid>
        </CustomizedPaperOutside>
);

export default CalendarEditorSkeleton;