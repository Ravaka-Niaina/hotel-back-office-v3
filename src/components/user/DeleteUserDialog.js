import React, { useState, useContext } from 'react';
import {Link as RouterLink} from "react-router-dom";
// material
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { sendDeletePartner } from '../../services/User';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import { ThemeContext } from '../context/Wrapper';
import Iconify from '../Iconify';

const DeleteUserDialog = ({ userDetails, userId, getAllUser }) => {
  const [open, setOpen] = useState(false);
  const context = useContext(ThemeContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePartner = (e) => {
    sendDeletePartner(userId)
    .then(res => {
      setOpen(false);
      if (res.data.status === 200) {
        getAllUser();
        context.changeResultSuccessMessage('Suppression effectuée');
        context.showResultSuccess(true);
      } else {
        context.changeResultErrorMessage('Une erreur s\'est produite');
        context.showResultError(true);
      }
    });
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
        <DialogTitle sx={{ backgroundColor: '#D6E3F3', color: 'red' }} id="alert-dialog-title">
          {'Confirmation de suppression'}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#D6E3F3' }}>
          <DialogContentText id="alert-dialog-description">
            Voulez vous vraiment supprimer l'utilisateur {`"${ userDetails.prenom } ${ userDetails.nom }"`} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#D6E3F3' }}>
          <Button onClick={handleClose}>Annuler</Button>
          <CustomizedButton onClick={deletePartner} text={'Supprimer'} component={RouterLink} to="#"/>
        </DialogActions>
      </Dialog>
    </>
  );
};
DeleteUserDialog.propTypes = {
};
export default DeleteUserDialog;
