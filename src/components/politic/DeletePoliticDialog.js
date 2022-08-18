import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

// material
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';


import { ThemeContext } from '../context/Wrapper';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import Iconify from '../Iconify'; 

const DeletePoliticDialog = ({ reload }) => {
  const [open, setOpen] = useState(false);
  const context = useContext(ThemeContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatPayloadToSend = () => {
    const payload = {
    };
    return payload;
  };

  const deleteAccessRight = async () => {
    // setDisabledDeleteButton(true);
    // deleteOnePromotion(promotionId, type)
    //   .then(() => {
  };
  return (
    <>
      <CustomizedIconButton variant="contained" onClick={handleClickOpen}>
        <Iconify icon="eva:trash-2-fill" width={20} height={20} color="rgba(140, 159, 177, 1)" />
      </CustomizedIconButton >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ backgroundColor: '#D6E3F3', color:'red' }} id="alert-dialog-title">
          {'Confirmation de suppression'}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#D6E3F3' }}>
          <DialogContentText id="alert-dialog-description">
            Voulez vous vraiment supprimer cet enregistrement ?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#D6E3F3' }}>
          <Button onClick={handleClose}>Annuler</Button>
          <CustomizedButton handleClick={deleteAccessRight} text={'Supprimer'} />
        </DialogActions>
      </Dialog>
    </>
  );
};
DeletePoliticDialog.propTypes = {
  reload: PropTypes.any,
  accessRightId: PropTypes.any,
};
export default DeletePoliticDialog;
