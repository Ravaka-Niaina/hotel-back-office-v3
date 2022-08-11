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

import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import { ThemeContext } from '../context/Wrapper';

const DeleteRoomTypeDialog = ({ row }) => {
  const [open, setOpen] = useState(false);
  const context = useContext(ThemeContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteRoomType = () => {
    // deleteOnePromotion(promotionId, type)
    //   .then(() => {
    setOpen(false);
    // reload();
    context.changeResultSuccessMessage('Enregistrement supprimé avec succès');
    context.showResultSuccess(true);
    //   })
    //   .catch((error) => {
    //     setOpen(false);
    //     handleClickSnackBar();
    //   });
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
        <DialogTitle sx={{color:"red"}} id="alert-dialog-title">{'Confirmation de suppression'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Souhaitez-vous vraiment supprimer le type de chambre " <b>{row && row.nom}</b> " ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <CustomizedButton handleClick={deleteRoomType} text={'Supprimer'} />
        </DialogActions>
      </Dialog>
    </>
  );
};
DeleteRoomTypeDialog.propTypes = {
  row: PropTypes.object
}
export default DeleteRoomTypeDialog;
