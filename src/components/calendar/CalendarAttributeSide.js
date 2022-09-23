import React from 'react';
import {  Stack } from '@mui/material';
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
                        <td style={{ textAlign: 'right', paddingRight: '10px' }}>Room to sell</td>
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