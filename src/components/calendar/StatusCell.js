import React from 'react';
import PropTypes from 'prop-types';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const StatusCell = ({available,...other}) => {
    return (
        <div
            style={{
                    paddingLeft: '0px !important',
                    background: available ?  '#64E986' : '#FF0000',
                    height: '75%',

            }}
            {
                ...other
            }
        >
            {
                available ? (<EventAvailableIcon style={{ color: 'white', width: '18px', height: '18px' }} />) : (<EventBusyIcon style={{ color: 'white', width: '18px', height: '18px' }} />)
            }
        </div>
    );
};
StatusCell.protoTypes = {
    available:PropTypes.any,
}
export default StatusCell;