import React , { useState , useContext} from 'react';
import { format } from 'date-fns';
import produce from 'immer';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';

import { ThemeContext } from '../../context/Wrapper';
import { changeOpenStatus as saveRoomAvailability } from '../../../services/RoomType';
import { saveRatePlanAvailability } from '../../../services/TCTarif';

// const getItemData = (item) => {
//     if (typeof item !== 'string') {
//         return null;
//     };
//     const dataSplited = item.split('@');
//     return {
//         "date": dataSplited[0],
//         "rate_plan_index": parseInt(dataSplited[1], 10),
//         "version_index": parseInt(dataSplited[2], 10),
//     };
// };
const StatusCell = ({available,chambre,date,setChambre,index,isRatePlan = false,subIndex = -1,...other}) => {
    const context = useContext(ThemeContext);
    const [loading,setLoading ] =  useState(false);
    const forRatePlan = () => {
        const formatedDate = format(new Date(date), 'yyyy-MM-dd');
        const payload = {
            dateDebut: formatedDate,
            dateFin: formatedDate,
            idTypeChambre: chambre._id,
            idTarif: chambre.planTarifaire[index]._id,
            isTarifOpen: !available,
        };
        console.log('ety ny maso');                  
        saveRatePlanAvailability(payload)
            .then((result) => {
                console.log(result.data);
                if (result.data.status === 200) {
                    setChambre((prev) =>  
                        produce(prev, condition => {
                            condition.planTarifaire[index].prixTarif[subIndex].closed = !prev.planTarifaire[index].prixTarif[subIndex].closed;
                        })
                    );
                }
                else if(result.data.errors){
                    const item = Object.keys(result.data.errors).filter((e, i) => i === 0)[0];
                    const indication = result.data.errors[item];
                    const message = `${item}: ${indication}`;
                    context.changeResultErrorMessage(message);
                    context.showResultError(true);
                }
                else {
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
    const forRoom = () => {
        const payload = {
            idRoomType: chambre._id,
            firstDate: date,
            lastDate: date,
            isRoomTypeOpen: !available,
        };
        console.log(payload);
        saveRoomAvailability(payload)
            .then((result) => {
                // console.log(result.data);
                if (result.data.status === 200) {
                    setChambre((prev) => 
                        produce(prev, condition => {
                            condition.statusDays[index].closed = !prev.statusDays[index].closed;
                        })
                    );
                }
                else {
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
    const handleChangeStatus = () => {
        setLoading(true);
        if(isRatePlan)
        {   
            forRatePlan();
        }
        else{
            forRoom();
        }
        
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
                    available ?(<EventAvailableIcon style={{ color: 'white', width: '22px', height: '22px' }} />):
                    (<EventBusyIcon style={{ color: 'white', width: '22px', height: '22px' }} />)
                )
            }
        </div>
    );
};
StatusCell.propTypes = {
    available:PropTypes.any,
    chambre: PropTypes.any,
    date:PropTypes.any,
    setChambre:PropTypes.any,
    index:PropTypes.any,
    isRatePlan:PropTypes.any,
    subIndex:PropTypes.any,
}
export default StatusCell;