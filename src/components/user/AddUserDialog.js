import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import React, { useEffect, useState,  } from 'react';
import { Stack, Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';

import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import { register } from '../../services/User';

const AddUserDialog = ({reload}) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    last_name: '',
    first_name: '',
    email: '',
    backup_email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    last_name: '',
    first_name: '',
    email: '',
    backup_email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    validate({ [name]: value });
  };

  const validate = (fieldValues) => {
    const temp = { ...errors };

    if ('first_name' in fieldValues) temp.first_name = fieldValues.first_name ? '' : 'Ce champ est requis.';
    if ('last_name' in fieldValues) temp.last_name = fieldValues.last_name ? '' : 'Ce champ est requis.';
    if ('email' in fieldValues) {
      temp.email = fieldValues.email ? '' : 'Ce champ est requis.';
      if (fieldValues.email) temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email) ? '' : 'Email invalide.';
    }
    if ('phone_number' in fieldValues) temp.phone_number = fieldValues.phone_number ? '' : 'Ce champ est requis.';

    setErrors({
      ...temp,
    });
  };

  const clearForm = () => {
    setUser({
      last_name: '',
      first_name: '',
      email: '',
      backup_email: '',
      phone_number: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({
      last_name: '',
      first_name: '',
      email: '',
      backup_email: '',
      phone_number: '',
      password: '',
      confirmPassword: '',
    });
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const createUser = (event) => {
    event.preventDefault();
    let errorExists = false;
    const errorsTmp = { ...errors };
    Object.keys(user).forEach(key => {
      if (!user[key].trim()) {
        errorsTmp[key] = 'Ce champs est requis';
        errorExists = true;
      } else {
        errorsTmp[key] = '';
      };
    });
    if (user.password !== user.confirmPassword) {
      errorsTmp.confirmPassword = 'Confirmation mot de passe non identique au mot de passe';
    }
    setErrors(errorsTmp);
    if (errorExists) return 0;
    register({
      isPartner: true,
      name: user.last_name,
      first_name: user.first_name,
      email: user.email,
      backupEmail: user.backup_email,
      password: user.password,
      confirmed_password: user.confirmPassword,
      companie: '',
      phone: user.phone_number,
      professional_phone: '',
      country : '',
      address_1: '',
      address_type: '',
      town: '',
      postal_code: '',

    }).then(result => {
      console.log(result);
      if (result.data.status === 200) {
        clearForm();
        setOpen(false);
        reload();
      }
    }).catch(err => console.error(err));
    return null;
  };
  
  return (
    <>
      <CustomizedButton text={`Ajouter`} component={RouterLink} to="#" onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'md'}>
        <CustomizedDialogTitle text={`Modifier l'utilisateur ${user?.first_name} ${user?.last_name}`} />
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
              {...(errors.backup_email && {
                error: true,
                helpertext: errors.backup_email,
              })}
              value={user.backup_email}
              placeholder="Adresse e-mail de secours"
              name="backup_email"
              label="Adresse e-mail de secours"
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
              autoComplete={false}
            />
            <CustomizedInput
              onChange={handleChange}
              required
              {...(errors.password && {
                error: true,
                helpertext: errors.password,
              })}
              value={user.password}
              placeholder="Mot de passe"
              name="password"
              label="Mot depasse"
              type="password"
              autoComplete={false}
            />
            <CustomizedInput
              onChange={handleChange}
              required
              {...(errors.confirmPassword && {
                error: true,
                helpertext: errors.confirmPassword,
              })}
              value={user.confirmPassword}
              placeholder="Confirmation mot de passe"
              name="confirmPassword"
              label="confirmPassword"
              type="password"
              autoComplete={false}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#E8F0F8', height: '150px' }}>
          <Button onClick={() => {handleClose(); clearForm()}} sx={{ fontSize: 12 }}>
            Annuler
          </Button>
          <CustomizedButton onClick={createUser} text={`Valider`} component={RouterLink} to="#" />
        </DialogActions>
      </Dialog>
    </>
  );
};

AddUserDialog.propTypes = {
  reload: PropTypes.any,
};
export default AddUserDialog;
