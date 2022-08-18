import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from '@mui/material';

import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import { ThemeContext } from '../context/Wrapper';
import { getUserDetails,updateUser} from '../../services/User';
import Iconify from '../Iconify';

const ModifyUserDialog = ({ userId,reload }) => {
  const context = useContext(ThemeContext);
  const [errors, setErrors] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    last_name: '',
    first_name: '',
    email: '',
    backup_email: '',
    phone_number: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      getUserDetails(userId)
        .then((result) => {
          console.log(userId);
          console.log(result);
          if (result.data.status === 200) {
            setUser({
              last_name: result.data.user.nom,
              first_name: result.data.user.prenom,
              email: result.data.user.email,
              backup_email: result.data.user.backupEmail,
              phone_number: result.data.user.telephone,
            });
          } else {
            context.changeResultErrorMessage('Une erreur est servenue lors du chargement des anciennes valeurs');
            context.showResultError(true);
          }
        })
        .catch(() => {
          context.changeResultErrorMessage('Une erreur est servenue lors du chargement des anciennes valeurs');
          context.showResultError(true);
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    validate({ [name]: value });
    formIsValid({
      ...user,
      [name]: value,
    });
  };

  const validate = (fieldValues) => {
    const temp = { ...errors };

    if ('first_name' in fieldValues) temp.first_name = fieldValues.first_name ? '' : 'Ce champ est requis.';
    if ('last_name' in fieldValues) temp.last_name = fieldValues.last_name ? '' : 'Ce champ est requis.';
    if ('email' in fieldValues) {
      temp.email = fieldValues.email ? "" : "Ce champ est requis.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email invalide.";
    };
    if ('backup_email' in fieldValues) {
      temp.backup_email = fieldValues.backup_email ? "" : "Ce champ est requis.";
      if (fieldValues.backup_email)
        temp.backup_email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.backup_email)
          ? ""
          : "Email invalide.";
    };
    if ('phone_number' in fieldValues) temp.phone_number = fieldValues.phone_number ? '' : 'Ce champ est requis.';

    setErrors({
      ...temp,
    });
  };

  const formIsValid = (newUser) => {
    const isValid = newUser.first_name && newUser.last_name && newUser.email &&
    newUser.backup_email && newUser.phone_number && Object.values(errors).every((x) => x === '');
    return isValid;
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const formatPayloadToSend = () => {
    const payload = {
      isPartner: true,
      _id: userId,
      nom: user.last_name,
      prenom: user.first_name,
      email: user.email,
    }
    return payload;
  }
  const modifyUser = () => {
    validate(user);
    if(formIsValid(user)){
      context.showLoader(true);
      updateUser(formatPayloadToSend())
      .then((result) => {
        if(result.data.status === 200)
        {
            setOpen(false);
            reload();
          context.changeResultSuccessMessage('Modification effectué');
            context.showResultSuccess(true);
        }
        else{
          
          context.changeResultErrorMessage('Une erreure est servunue lors du modification des données');
          context.showResultError(true);
        }
      }).catch(() => {
        context.changeResultErrorMessage('Une erreure est servunue lors du modification des données');
        context.showResultError(true);
      }).finally(()=>{
        context.showLoader(false);
      });
    }
  };
  return (
    <>
      <CustomizedIconButton variant="contained" onClick={handleClickOpen}>
        <Iconify icon="eva:edit-fill" width={20} height={20} color="rgba(140, 159, 177, 1)" />
      </CustomizedIconButton >
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'}>
        <CustomizedDialogTitle text={`Modifier l'utilisateur "${`xxx`}"`} />
        <DialogContent style={{ backgroundColor: '#E8F0F8', paddingTop: 15, paddingRight: 20, paddingLeft: 20 }}>
          <Stack spacing={1}>
            <CustomizedInput
              onChange={handleChange}
              required
              {...(errors.last_name && {
                error: true,
                helpertext: errors.last_name,
              })}
              value={user.last_name}
              placeholder="Nom"
              name="last_name"
              label="Nom"
            />
            <CustomizedInput
              onChange={handleChange}
              required
              {...(errors.first_name && {
                error: true,
                helpertext: errors.first_name,
              })}
              value={user.first_name}
              placeholder="Prenom"
              name="first_name"
              label="Prenom"
            />

            <CustomizedInput
              onChange={handleChange}
              required
              {...(errors.email && {
                error: true,
                helpertext: errors.email,
              })}
              value={user.email}
              placeholder="Adresse e-mail"
              name="email"
              label="Adresse e-mail"
            />
            <CustomizedInput
              onChange={handleChange}
              required
              {...(errors.phone_number && {
                error: true,
                helpertext: errors.phone_number,
              })}
              value={user.phone_number}
              type="text"
              placeholder="Telephone"
              name="phone_number"
              label="Telephone"
            />
            <CustomizedInput
              onChange={handleChange}
              required
              {...(errors.backup_email && {
                error: true,
                helpertext: errors.backup_email,
              })}
              value={user.backup_email}
              placeholder="Adresse e-mail de secours"
              name="backup_email"
              label="Adresse e-mail de secours"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#E8F0F8' }}>
          <Button onClick={handleClose} sx={{ fontSize: 12 }}>
            Annuler
          </Button>
          <CustomizedButton handleClick={modifyUser} text={`Valider`} />
        </DialogActions>
      </Dialog>
    </>
  );
};
ModifyUserDialog.propTypes = {
  userId: PropTypes.any,
  reload: PropTypes.any,
};
export default ModifyUserDialog;
