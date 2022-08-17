import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, Button, Stack } from '@mui/material';

import { createAccessRight } from '../../services/AccessRight';
import { ThemeContext } from '../context/Wrapper';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import Iconify from '../Iconify';


const AddAccessRightDialog = (props) => {
  const { reload } = props;

  const context = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const [accessRight, setAccessRight] = useState({
    id: '',
    name: '',
  });

  const [errors, setErrors] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    if ('id' in fieldValues) temp.id = fieldValues.id ? '' : 'Ce champ est requis.';

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

  const addAccessRight = () => {
    validate(accessRight);
    if (formIsValid(accessRight)) {
      context.showLoader(true);
      createAccessRight(formatPayloadToSend())
        .then((result) => {
          if (result.data.status === 200) {
            setOpen(false);
            reload();
            context.changeResultSuccessMessage(`Droit d'accès ajouté avec succès.`);
            context.showResultSuccess(true);
          } else {
            context.showLoader(false);
            context.changeResultErrorMessage('Id existant');
            context.showResultError(true);
          }
        })
        .catch((e) => {
          context.showLoader(false);
          context.changeResultErrorMessage(e.message);
          context.showResultError(true);
        });
    }
  };

  return (
    <>
      <CustomizedButton
        onClick={handleClickOpen}
        text={`Ajouter`}
      />
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'}>
        <CustomizedDialogTitle text="Ajouter un nouveau droit d'accès" />
        <DialogContent style={{ backgroundColor: '#E8F0F8', paddingTop: 15 }}>
          <Stack spacing={2}>
            <CustomizedInput
              sx={{ width: 1 }}
              placeholder="Id"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="id"
              name="id"
              label="Id"
              type="text"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
            <CustomizedInput
              sx={{width:1}}
              placeholder="Nom"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="name"
              name="name"
              label="Nom"
              type="text"
              fullWidth
              required
              {...(errors.name && {
                error: true,
                helpertext: errors.name,
              })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#E8F0F8' }}>
          <Button onClick={handleClose} sx={{ fontSize: 12 }}>
            Annuler
          </Button>
          <CustomizedButton handleClick={addAccessRight} text="Valider" />
        </DialogActions>
      </Dialog>
    </>
  );
};

AddAccessRightDialog.propTypes = {
  reload: PropTypes.any,
};
export default AddAccessRightDialog;
