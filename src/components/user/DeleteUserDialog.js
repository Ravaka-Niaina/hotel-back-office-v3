import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

// material
import {
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import CustomizedButton from '../../template/Form/CustomizedButton';

const DeleteUserDialog = ({ row }) => {
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
      <ListItemText onClick={handleClickOpen} primary="| Supprimer" primaryTypographyProps={{ variant: 'body2' }} />
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
  row: PropTypes.any,
};
export default DeleteUserDialog;
