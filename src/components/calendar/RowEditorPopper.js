import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import PropTypes from 'prop-types';
import AvailabilityRowEditor from './cells/rateplan/AvailabilityRowEditor';
import VersionRowEditor from './cells/rateplan/VersionRowEditor';
import RoomRowEditor from './cells/room/RoomRowEditor';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import InvisibleBackdrop from '../CustomizedComponents/InvisibleBackdrop';



const RowEditorPopper = ({ open, setOpen, chambre, item, reloadRoom, ...others}) => {
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'xs'}
                BackdropComponent={InvisibleBackdrop}
                PaperComponent={CustomizedPaperOutside}

            >
                <DialogContent
                    style={{
                        background: 'linear-gradient(308.48deg, rgba(255, 255, 255, 0.53) 2.36%, rgba(255, 255, 255, 0) 61.95%), #E3EDF7',
                        paddingTop: 15
                    }}
                >
                        <div {...others}>
                            {
                                item.name === 'availability' && (
                                    <AvailabilityRowEditor handleClose={handleClose} chambre={chambre} item={item} reloadRoom={reloadRoom}/>
                                )
                            }
                            {
                                item.name === 'version' && (
                                    <VersionRowEditor handleClose={handleClose} chambre={chambre} item={item} reloadRoom={reloadRoom}/>
                                )
                            }
                            {
                                item.name === 'room' && (
                                    <RoomRowEditor handleClose={handleClose} item={item} />
                                )
                            }
                        </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
RowEditorPopper.propTypes = {
    open: PropTypes.any,
    setOpen: PropTypes.any,
    chambre: PropTypes.any,
    item: PropTypes.any,
    reloadRoom: PropTypes.any,
}
export default RowEditorPopper;