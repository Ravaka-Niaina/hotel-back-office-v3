import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';

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
      <CustomizedButton onClick={handleClickOpen} text={`Ajouter`} component={RouterLink} to="#" />
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'}>
        <CustomizedDialogTitle text="Ajouter hotel" />
        <DialogContent style={{ backgroundColor: '#E8F0F8', paddingTop: 15 }}>Content</DialogContent>
        <DialogActions sx={{ backgroundColor: '#E8F0F8' }}>
          <Button onClick={handleClose} sx={{ fontSize: 12 }}>
            Annuler
          </Button>
          <CustomizedButton text="Enregistrer" />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddHotelDialog;
