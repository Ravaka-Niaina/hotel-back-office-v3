import React from 'react';
import {Grid , Stack} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';

import EditorCustomizingDialog from './EditorCustomizingDialog';

const CalendarAttributeSide = ({chambre, ratePlanAttributeList , reloadRoom}) => {
    return (
        <div className='calendarEditor'>
            <table >
                <thead>
                    <tr style={{ height: "150px" }}>
                        <th>
                            <Stack
                                spacing={1}
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <CustomizedTitle text={chambre.nom} />
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <EditorCustomizingDialog chambre={chambre} reloadRoom={reloadRoom}/>
                                </Stack>

                            </Stack>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='status' style={{textAlign:'right',paddingRight:'10px'}}>
                            Status (Open or Closed)
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <Grid direction='row' spacing={1} justifyContent='space-around' container alignItems='center'>
                                <Grid item xs={8}>
                                    <Stack justifyContent='flex-start'>
                                        <p> Room to sell</p>
                                    </Stack>
                                </Grid>
                                <Grid item xs={2}>
                                    <Stack justifyContent='flex-end'>
                                        <CustomizedIconButton sx={{ width: 25, height: 25 }}>
                                            <EditIcon sx={{ width: 12, height: 12 }} />
                                        </CustomizedIconButton>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right', paddingRight: '10px' }}>Booked</td>
                    </tr>
                    {
                        ratePlanAttributeList.map((element)=>{
                            return element;
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default CalendarAttributeSide;