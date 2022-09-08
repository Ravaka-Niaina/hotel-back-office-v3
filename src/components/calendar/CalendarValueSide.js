import React from 'react';
import { Stack } from '@mui/material';
import { dateIHMFormat } from '../../services/Util';

const CalendarValueSide = ({list,chambre,ratePlanList}) => {
    return (
        <div className='calendarEditor value' style={{ overflowX: "auto" }}>
            <table>
                <thead>
                    <tr style={{ height: "150px" }}>
                        {
                            list.map((e) => {
                                const d = new Date(e);
                                return (
                                    <th 
                                        key={e} 
                                        {
                                            ...(d.getDay() === 0 && { 
                                                style: {
                                                    borderRight: '2px rgba(4, 120, 255, 1) solid'
                                                }
                                            })
                                        }
                                        
                                    >
                                        <Stack spacing={1}>
                                            {
                                                dateIHMFormat(e).split(' ').map((datePart)=>{
                                                    return (
                                                        <span>
                                                            {datePart}
                                                        </span>
                                                    )
                                                })
                                            }
                                        </Stack>
                                               
                                    </th>

                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            list.map((e) => {
                                return (
                                    <td className='status' key={e}>
                                        <div
                                            style={{
                                                paddingLeft: '0px !important',
                                                background: e % 4 ? '#FF0000' : '#64E986',
                                                height: '75%',

                                            }}
                                        />
                                    </td>

                                );
                            })
                        }

                    </tr>
                    <tr>
                        {
                            list.map((e,i) => {
                                return (
                                    <td key={e}>{(i+1)*10}</td>
                                );
                            })
                        }
                    </tr>
                    {
                        ratePlanList.map((tarifDetails, j) => {
                            return tarifDetails;
                        })
                    }

                </tbody>
            </table>
        </div>
    );
};

export default CalendarValueSide;