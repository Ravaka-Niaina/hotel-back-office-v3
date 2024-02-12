import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { ThemeContext } from '../context/Wrapper';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import Iconify from '../Iconify';
import { deleteHotel } from '../../services/Hotel';

const DeleteHotelDialog = (props) => {
  const { hotelId, reload } = props;
  const context = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const formatPayloadToSend = () => {
    const payload = {
      tableName: 'hotel',
      _id: hotelId,
    };
    return payload;
  };

  const deleteOneHotel = () => {
    context.showLoader(true);
    deleteHotel(formatPayloadToSend())
      .then((result) => {
        if (result.data.status === 200) {
          context.changeResultSuccessMessage('Enregistrement supprimé avec succès');
          context.showResultSuccess(true);
          reload();
        } else {
          context.changeResultErrorMessage(`Une erreur est servenue lors du suppression de l'hotel`);
          context.showResultError(true);
        }
      })
      .catch(() => {
        context.changeResultErrorMessage(`Une erreur est servenue lors du suppression de l'hotel`);
        context.showResultError(true);
      })
      .finally(() => {
        context.showLoader(false);
        setOpen(false);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomizedIconButton variant="contained" onClick={handleClickOpen}>
        <Iconify icon="eva:trash-2-fill" width={20} height={20} color="rgba(140, 159, 177, 1)" />
      </CustomizedIconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation !</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez vous vraiment supprimer cet enregistrement?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={deleteOneHotel} autoFocus>
            supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
DeleteHotelDialog.propTypes = {
  hotelId: PropTypes.any,
  reload: PropTypes.func,
};
export default DeleteHotelDialog;
