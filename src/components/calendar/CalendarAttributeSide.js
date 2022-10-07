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
                    <tr style={{ height: "170px" }}>
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
                        <td>
                            <Grid direction='row' spacing={1} justifyContent='space-around' container alignItems='center'>
                                <Grid item xs={8}>
                                    <Stack justifyContent='flex-start'>
                                        <p> Room to sell</p>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </td>
                    </tr>
                    <tr>
                        <td style={{paddingLeft:'16px'}}>Booked</td>
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