import React,{useState} from 'react';

import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import { Dialog, DialogActions, DialogContent, Button} from '@mui/material';

import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';

import Iconify from '../Iconify';

const AddHotelDialog = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                variant="contained"
                component={RouterLink}
                to="#"
                startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{
                    background: `linear-gradient(270deg, #33647E 0%, #59A2BE 100%);`,
                    boxShadow:
                        ' -4px -4px 15px  #FFFFFF, 4px 4px 20px rgba(111, 140, 176, 0.41),2px 2px 4px rgba(114, 142, 171, 0.1)',
                    fontSize: 12,
                    px: 5,
                    py: 1,
                }}
            >
                Ajouter
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'sm'}>
                <CustomizedDialogTitle text="Ajouter hotel" />
                <DialogContent style={{ backgroundColor: '#E8F0F8', paddingTop: 15 }}>
                    Content
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#E8F0F8' }}>
                    <Button onClick={handleClose} sx={{ fontSize: 12 }}>
                        Annuler
                    </Button>
                    <CustomizedButton  text="Enregistrer" />
                </DialogActions>
            </Dialog>  
        </>
    );
};

export default AddHotelDialog;