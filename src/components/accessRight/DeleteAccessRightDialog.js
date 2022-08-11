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
import { deleteAccessRight as Delete } from '../../services/AccessRight';
import { ThemeContext } from '../context/Wrapper';
import CustomizedButton from '../../template/Form/CustomizedButton';

const DeleteAccessRightDialog = ({ reload, accessRightId }) => {
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
      access_right_id: accessRightId,
    };
    return payload;
  };

  const deleteAccessRight = async () => {
    // setDisabledDeleteButton(true);
    // deleteOnePromotion(promotionId, type)
    //   .then(() => {
    setOpen(true);
    context.showLoader(true);
    Delete(formatPayloadToSend())
      .then((result) => {
        if (result.data.status === 200) {
          context.changeResultSuccessMessage(`Droit d'accès supprimé avec succès.`);
          context.showResultSuccess(true);
          reload();
        } else {
          context.changeResultErrorMessage(`Suppression de droit d'accès refusée.`);
          context.showResultError(true);
        }
      })
      .catch((e) => {
        context.changeResultErrorMessage(e.message);
        context.showResultError(true);
      })
      .finally(() => {
        context.showLoader(false);
        setOpen(false);
      });
  };
  return (
    <>
      <ListItemText onClick={handleClickOpen} primary="| Supprimer" primaryTypographyProps={{ variant: 'body2' }} />
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
            Voulez vous vraiment supprimer cet enregistrement "{accessRightId}" ?
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
DeleteAccessRightDialog.propTypes = {
  reload: PropTypes.any,
  accessRightId: PropTypes.any,
};
export default DeleteAccessRightDialog;
