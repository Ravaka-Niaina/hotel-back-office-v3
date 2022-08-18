import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';

import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';

import { updateAccessRight } from '../../services/AccessRight';
import { ThemeContext } from '../context/Wrapper';

import Iconify from '../Iconify';

const ModifyPoliticDialog = ({ reload }) => {
  const [openModifyAccessRightDialog, setOpenModifyAccessRightDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenModifyAccessRightDialog(true);
  };
  const handleClose = () => {
    setOpenModifyAccessRightDialog(false);
  };
  const context = useContext(ThemeContext);

  const [politic, setPolitic] = useState({
    
  });
  const [errors, setErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
  };
  const validate = (fieldValues) => {
    const temp = { ...errors };
    if ('name' in fieldValues) temp.name = fieldValues.name ? '' : 'Ce champ est requis.';
    setErrors({
      ...temp,
    });
  };

  const formIsValid = (newAccessRight) => {
    const isValid = newAccessRight.name && Object.values(errors).every((x) => x === '');
    return isValid;
  };
  const formatPayloadToSend = () => {
    const payload = {
      
    };
    return payload;
  };
  const modifyAccessRight = () => {
    
  };
  return (
    <>
      <CustomizedIconButton variant="contained" onClick={handleClickOpen}>
        <Iconify icon="eva:edit-fill" width={20} height={20} color="rgba(140, 159, 177, 1)" />
      </CustomizedIconButton >
      <Dialog open={openModifyAccessRightDialog} maxwidth={'xl'}>
        <CustomizedDialogTitle text={`Modification`} />
        <DialogContent style={{ backgroundColor: '#E8F0F8', paddingTop: 15 }}>
          <CustomizedInput
            onChange={handleChange}
            margin="dense"
            id="name"
            name="name"
            label="Nom"
            type="text"
            fullWidth
            required
            defaultValue={`Default`}
            {...(errors.name && {
              error: true,
              helpertext: errors.name,
            })}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#E8F0F8' }}>
          <Button onClick={handleClose} sx={{ fontSize: 12 }}>
            Annuler
          </Button>
          <CustomizedButton handleClick={modifyAccessRight} text={`Valider`} />
        </DialogActions>
      </Dialog>
    </>
  );
};
ModifyPoliticDialog.propTypes = {
  reload: PropTypes.any,
  accessRightProp: PropTypes.any,
};
export default ModifyPoliticDialog;
