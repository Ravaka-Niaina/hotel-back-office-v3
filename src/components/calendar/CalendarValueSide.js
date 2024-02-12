import React from 'react';
import { PropTypes } from 'prop-types';
import { Stack } from '@mui/material';
import { dateIHMFormat } from '../../services/Util';
// import StatusCell from './cells/StatusCell';
const { format } = require('date-fns');
const { getFrenchDate } = require('../../utils/date');

const CalendarValueSide = ({list,ratePlanList,roomDetails}) => (
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
                                                <span key={e} style={{
                                                    fontFamily: 'RalewayBold',
                                                    fontStyle: 'normal',
                                                    fontWeight: '700', 
                                                    // fontSize: '18px',
                                                    color: '#8B9EB0',
                                                }}>
                                                    <div>{getFrenchDate(format(e, 'dd MMMM yyyy'))[0]}</div>
                                                    <div>{getFrenchDate(format(e, 'dd MMMM yyyy'))[1]}</div>
                                                    <div>{getFrenchDate(format(e, 'dd MMMM yyyy'))[2]}</div>
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
    );
CalendarValueSide.propTypes = {
    list: PropTypes.any,
    chambre: PropTypes.any,
    ratePlanList: PropTypes.any,
    roomDetails: PropTypes.any,
}
export default CalendarValueSide;