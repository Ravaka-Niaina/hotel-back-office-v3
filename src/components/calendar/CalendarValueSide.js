import React from 'react';
import { Stack } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';

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
                                                        <span key={datePart}>
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
                                const rand = Math.round(Math.random() * 2);
                                return (
                                    <td className='status' key={e}>
                                        <div
                                            style={{
                                                paddingLeft: '0px !important',
                                                background: rand === 1 ? '#FF0000' : '#64E986',
                                                height: '75%',

                                            }}
                                        >
                                            {
                                                rand === 1 ? (<EventBusyIcon style = {{ color: 'white', width: '18px', height: '18px' }} />) : (<EventAvailableIcon style={{ color: 'white', width: '18px', height: '18px' }} />)
                                            }
                                        </div>
                                    </td>

                                );
                            })
                        }
                    </tr>
                    
                    <tr>
                        {
                            list.map((e,i) => {
                                return (
                                    <td key={e}>20</td>
                                );
                            })
                        }
                    </tr>
                    <tr>
                        {
                            list.map((e, i) => {
                                return (
                                    <td key={e}>{Math.round(Math.random()*20)}</td>
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