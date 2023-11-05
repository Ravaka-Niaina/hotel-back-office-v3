import React from 'react';
import { PropTypes } from 'prop-types';
import { Stack } from '@mui/material';
// import StatusCell from './cells/StatusCell';
import { format } from 'date-fns';
import { dateIHMFormat } from '../../services/Util';

const CalendarValueSide = ({list,ratePlanList,roomDetails}) => {
    console.log(list);
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
                                                <span key={e}>
                                                    {format(e, 'dd MMMM yyyy')}
                                                </span>
                                            }
                                        </Stack>
                                               
                                    </th>

                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(roomDetails).map((key) => (
                                <tr key={key}>
                                    {
                                        roomDetails[key].map((cell)=> cell)
                                    }
                                </tr>
                            )
                        )
                    }
                    {
                        ratePlanList.map((tarifDetails) => tarifDetails)
                    }

                </tbody>
            </table>
        </div>
    )
};
CalendarValueSide.propTypes = {
    list: PropTypes.any,
    chambre: PropTypes.any,
    ratePlanList: PropTypes.any,
    roomDetails: PropTypes.any,
}
export default CalendarValueSide;