import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, Button, ListItemText } from '@mui/material';

import CustomizedInput from '../../template/Form/CustomizedInput';
import CustomizedButton from '../../template/Form/CustomizedButton';
import CustomizedDialogTitle from '../../template/Form/CustomizedDialogTitle';

import { updateAccessRight } from '../../services/AccessRight';
import { ThemeContext } from '../context/Wrapper';

const ModifyAccessRightDialog = ({ reload, accessRightProp }) => {
  const [openModifyAccessRightDialog, setOpenModifyAccessRightDialog] = useState(false);

  const handleOpenEditAccess = () => {
    setOpenModifyAccessRightDialog(true);
  };
  const handleCloseEditAccess = () => {
    setOpenModifyAccessRightDialog(false);
  };
  const context = useContext(ThemeContext);

  const [accessRight, setAccessRight] = useState({
    id: accessRightProp._id,
    name: accessRightProp.nom,
  });
  const [errors, setErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccessRight((accessRight) => ({ ...accessRight, [name]: value }));
    validate({ [name]: value });
    formIsValid({
      ...accessRight,
      [name]: value,
    });
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
      id: accessRight.id,
      nom: accessRight.name,
    };
    return payload;
  };
  const modifyAccessRight = () => {
    validate(accessRight);
    if (formIsValid(accessRight)) {
      context.showLoader(true);
      updateAccessRight(formatPayloadToSend())
        .then((result) => {
          if (result.data.status === 200) {
            setOpenModifyAccessRightDialog(false);
            reload();
            context.changeResultSuccessMessage(`Droit d'accès modifié avec succès.`);
            context.showResultSuccess(true);
          } else {
            context.showLoader(false);
            context.changeResultErrorMessage(`Une erreur s'est produite lors de la modification du droit d'accès.`);
            context.showResultError(true);
          }
        })
        .catch(() => {
          context.showLoader(false);
          context.changeResultErrorMessage(`Une erreur s'est produite lors de la modification du droit d'accès.`);
          context.showResultError(true);
        });
    }
  };
  return (
    <>
      <ListItemText
        onClick={handleOpenEditAccess}
        primary="|  Modifier"
        primaryTypographyProps={{ variant: 'body2' }}
        maxwidth={'sm'}
      />
      <Dialog open={openModifyAccessRightDialog} onClose={handleCloseEditAccess} maxwidth={'xl'}>
        <CustomizedDialogTitle text={`Modifier le droit d'accès "${accessRight.id}"`} />
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
            defaultValue={accessRight.name}
            {...(errors.name && {
              error: true,
              helpertext: errors.name,
            })}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#E8F0F8' }}>
          <Button onClick={handleCloseEditAccess} sx={{ fontSize: 12 }}>
            Annuler
          </Button>
          <CustomizedButton handleClick={modifyAccessRight} text={`Valider`} />
        </DialogActions>
      </Dialog>
    </>
  );
};
ModifyAccessRightDialog.propTypes = {
  reload: PropTypes.any,
  accessRightProp: PropTypes.any,
};
export default ModifyAccessRightDialog;
