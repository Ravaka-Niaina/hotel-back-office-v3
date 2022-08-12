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
import {deleteRatePlan} from '../../services/RatePlan';

const DeleteRatePlanDialog = ({reload,ratePlanId}) => {
  
    const [open, setOpen] = useState(false);
    const context = useContext(ThemeContext);

    const handleClickDelete = () => {
        const payload={
          id:ratePlanId,
        }
        context.showLoader(true);
        deleteRatePlan(payload)
          .then((result) =>{
            if(result.data.status === 200){
              reload();
              setOpen(false);
              context.changeResultSuccessMessage('Suppression enregistré.');
              context.showResultSuccess(true);
            }
            else
            {
              context.changeResultErrorMessage('Suppression non effectué.');
              context.showResultError(true);
            }
          }).catch(() =>{
            context.changeResultErrorMessage('Une erreur interne est servenue.');
            context.showResultError(true);
          }).finally(() =>{
            context.showLoader(false);
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
          <Button   autoFocus onClick={handleClickDelete}>
            Supprimer
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
