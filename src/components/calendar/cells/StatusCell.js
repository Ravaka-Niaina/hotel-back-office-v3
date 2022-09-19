import React , { useState , useContext} from 'react';
import produce from 'immer';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';

import { ThemeContext } from '../../context/Wrapper';
import { changeOpenStatus } from '../../../services/RoomType';

const StatusCell = ({available,chambre,date,setChambre,index,...other}) => {
    const context = useContext(ThemeContext);
    const [loading,setLoading ] =  useState(false);
    const handleChangeStatus = () => {
        setLoading(true);
        const payload = {
            idRoomType: chambre._id,
            firstDate: date,
            lastDate: date,
            isRoomTypeOpen: !available,
        };
        console.log(payload);
        changeOpenStatus(payload)
            .then((result) => {
                console.log(result.data);
                if(result.data.status === 200)
                {
                    setChambre((prev) => { 
                        return produce(prev,condition => {
                            condition.statusDays[index].closed = !prev.statusDays[index].closed;
                        });
                    });
                }
                else
                {
                    context.changeResultErrorMessage(`Changement du status impossible.`);
                    context.showResultError(true);
                }
            })
            .catch((error) => {
                context.changeResultErrorMessage(error.message);
                context.showResultError(true);
            })
            .finally(() => {
                setLoading(false);
            })
    };
    return (
        <div
            style={{
                    paddingLeft: '0px !important',
                    background: available ? '#2FEFCC' : '#FF647C',
                    height: '75%',
            }}
            tabIndex={0}
            role="button"
            {
                ...(!loading && {
                    onClick: handleChangeStatus,
                    onKeyDown:handleChangeStatus,
                })
            }
            {
                ...other
            }
        >
            {
                loading && (<CircularProgress size={18} sx={{ color:'#2476d2'}}/>)
            }
            {
                !loading && (
                    available ?(<EventAvailableIcon style={{ color: 'white', width: '18px', height: '18px' }} />):
                    (<EventBusyIcon style={{ color: 'white', width: '18px', height: '18px' }} />)
                )
            }
        </div>
    );
};
StatusCell.protoTypes = {
    available:PropTypes.any,
}
export default StatusCell;