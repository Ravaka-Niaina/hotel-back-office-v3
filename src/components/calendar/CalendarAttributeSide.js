import React from 'react';
import {  Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';

import EditorCustomizingDialog from './EditorCustomizingDialog';

const CalendarAttributeSide = ({chambre,ratePlanAttributeList}) => {
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
                                <h3>{chambre.nom}</h3>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <EditorCustomizingDialog chambre={chambre}/>
                                    <span>customize</span>
                                </Stack>

                            </Stack>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='status'>
                            Status (Open or Closed)
                        </td>
                    </tr>
                    <tr>
                        <td>Room to sell</td>
                    </tr>
                    <tr>
                        <td>Booked</td>
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