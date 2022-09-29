import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import AvailabilityRowEditor from './cells/rateplan/AvailabilityRowEditor';
import VersionRowEditor from './cells/rateplan/VersionRowEditor';
import RoomRowEditor from './cells/room/RoomRowEditor';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import InvisibleBackdrop from '../CustomizedComponents/InvisibleBackdrop';



const RowEditorPopper = ({ open, setOpen, anchorEl, chambre, item, ...others}) => {
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
                        <div>
                            {
                                item.name === 'availability' && (
                                    <AvailabilityRowEditor handleClose={handleClose} />
                                )
                            }
                            {
                                item.name === 'version' && (
                                    <VersionRowEditor />
                                )
                            }
                            {
                                item.name === 'room' && (
                                    <RoomRowEditor />
                                )
                            }
                        </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default RowEditorPopper;