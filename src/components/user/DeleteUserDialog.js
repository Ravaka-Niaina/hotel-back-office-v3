import React, { useState } from 'react';
// material
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import Iconify from '../Iconify';

const DeleteUserDialog = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = async () => {};
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
        <DialogTitle sx={{ backgroundColor: '#D6E3F3', color: 'red' }} id="alert-dialog-title">
          {'Confirmation de suppression'}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#D6E3F3' }}>
          <DialogContentText id="alert-dialog-description">
            Voulez vous vraiment supprimer l'utilisateur "xxx" ?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#D6E3F3' }}>
          <Button onClick={handleClose}>Annuler</Button>
          <CustomizedButton handleClick={deleteUser} text={'Supprimer'} />
        </DialogActions>
      </Dialog>
    </>
  );
};
DeleteUserDialog.propTypes = {
};
export default DeleteUserDialog;
