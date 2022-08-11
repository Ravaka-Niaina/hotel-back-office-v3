import { useState, useContext } from 'react';
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
import { deletePromotion as Delete } from '../../services/Promotion';
import { ThemeContext } from '../context/Wrapper';

const DeletePromotionDialog = ({ promotionId, reload }) => {
  const [open, setOpen] = useState(false);
  const [disabledDeleteButton, setDisabledDeleteButton] = useState(false);
  const context = useContext(ThemeContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatPayloadToSend = () => {
    const payload = {
      tableName: 'promotion',
      _id: promotionId.toString(),
    };
    return payload;
  };

  const deletePromotion = async () => {
    setDisabledDeleteButton(true);
    setOpen(true);
    context.showLoader(true);
    Delete(formatPayloadToSend())
      .then((result) => {
        if (result.data.status === 200) {
          context.changeResultSuccessMessage('Enregistrement supprimé avec succès');
          context.showResultSuccess(true);
          reload();
        } else {
          context.changeResultErrorMessage('Une erreur est servenue lors du suppression du promotion');
          context.showResultError(true);
        }
      })
      .catch(() => {
        context.changeResultErrorMessage('Une erreur est servenue lors du suppression du promotion');
        context.showResultError(true);
      })
      .finally(() => {
        context.showLoader(false);
        setOpen(false);
      });
  };
  return (
    <>
      <ListItemText onClick={handleClickOpen} primary="Supprimer" primaryTypographyProps={{ variant: 'body2' }} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirmation !'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez vous vraiment supprimer cet enregistrement {promotionId} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button disabled={disabledDeleteButton} onClick={deletePromotion} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeletePromotionDialog.propTypes = {
  promotionId: PropTypes.any,
  reload: PropTypes.any,
};

export default DeletePromotionDialog;
