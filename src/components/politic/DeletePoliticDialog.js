import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
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

import { deletePolitic } from '../../services/Politic';
import { ThemeContext } from '../context/Wrapper';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import Iconify from '../Iconify';

const DeletePoliticDialog = ({ reload, politic }) => {
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
      id: politic?._id,
      nom: politic?.nom
    };
    return payload;
  };

  const handleDeletePolitic = () => {
    context.showLoader(true)
    const payloadToSend = formatPayloadToSend();
    deletePolitic(payloadToSend).then((datas) => {
      const { status } = datas.data
      if (status === 200) {
        context.changeResultSuccessMessage(`Suppression de la politique ${payloadToSend?.nom} avec succès.`)
        context.showResultSuccess(true)
        setOpen(false)
      } else {
        context.changeResultSuccessMessage(`Erreur lors de la suppression de la politique ${payloadToSend?.nom}`);
        context.showResultError(true)
      }
    }).catch(err => {
      context.changeResultErrorMessage(err?.message)
      context.showResultError(true)
      reload()
    }).finally(() => {
      reload()
    })
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
        <DialogTitle sx={{ backgroundColor: '#D6E3F3', color: 'red' }} id="alert-dialog-title">
          {'Confirmation de suppression'}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#D6E3F3' }}>
          <DialogContentText id="alert-dialog-description">
            Souhaitez-vous vraiment supprimer la politique {politic?.names.fr} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#D6E3F3' }}>
          <Button onClick={handleClose}>Annuler</Button>
          <CustomizedButton onClick={handleDeletePolitic} text={'Supprimer'} component={RouterLink} to="#"/>
        </DialogActions>
      </Dialog>
    </>
  );
};
DeletePoliticDialog.propTypes = {
  reload: PropTypes.any,
  politic: PropTypes.any,
};
export default DeletePoliticDialog;
