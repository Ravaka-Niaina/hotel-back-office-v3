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
import { ThemeContext } from '../context/Wrapper';

const DeleteRatePlanDialog = ({reload,ratePlanId}) => {
  
    const [open, setOpen] = useState(false);
    const context = useContext(ThemeContext);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
            Voulez vous vraiment supprimer cet enregistrement {ratePlanId} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button   autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
DeleteRatePlanDialog.propTypes={
    reload:PropTypes.any,
    ratePlanId:PropTypes.any,
}
export default DeleteRatePlanDialog;
