import React,{useState} from 'react';
import { Dialog, DialogActions, DialogContent, Button, Stack } from '@mui/material';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';

const MapDialog = () => {

    const [open,setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <CustomizedButton onClick={handleClickOpen} text='Coordonnées gps' elevation={8} sx={{ width: '250px' }} variant='contained' />
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} sx={{ 'overflow-y': "none !important", }}>
                <DialogContent sx={{ backgroundColor: '#E8F0F8', pr: 2, pl: 2 }}>
                    Our map
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MapDialog;