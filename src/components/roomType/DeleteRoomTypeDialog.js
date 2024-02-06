import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { deleteRoomType } from '../../services/RoomType';

// material

import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import { ThemeContext } from '../context/Wrapper';
import Iconify from '../Iconify';

const DeleteRoomTypeDialog = ({ row, reload, }) => {
  const [open, setOpen] = useState(false);
  const context = useContext(ThemeContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendDeleteRoomType = () => {
    deleteRoomType({ _id: row._id, tableName: 'typeChambre' })
    .then((result) => {
      if (result.status === 200) {
        setOpen(false);
        reload();
        context.changeResultSuccessMessage('Enregistrement supprimé avec succès');
        context.showResultSuccess(true);
      }
    })
    .catch((error) => {
      console.error(error);
      setOpen(false);
      // handleClickSnackBar();
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
        <DialogTitle sx={{color:"red"}} id="alert-dialog-title">{'Confirmation de suppression'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Souhaitez-vous vraiment supprimer le type de chambre " <b>{row && row.nom}</b> " ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <CustomizedButton onClick={sendDeleteRoomType} text={'Supprimer'} />
        </DialogActions>
      </Dialog>
    </>
  );
};
DeleteRoomTypeDialog.propTypes = {
  row: PropTypes.object
}
export default DeleteRoomTypeDialog;
