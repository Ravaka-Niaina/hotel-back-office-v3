import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Stack, Dialog, DialogActions, DialogContent, Button } from '@mui/material';

import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import { ThemeContext } from '../context/Wrapper';
import { addAccessRight, updateUser } from '../../services/User';
import Iconify from '../Iconify';
import CustomizedLabel from '../CustomizedComponents/CustomizedLabel';
import CustomizedCard from '../CustomizedComponents/CustomizedCard';
import CustomizedSwitch from '../CustomizedComponents/CustomizedSwitch';

const ModifyUserDialog = ({ userDetails, userId, reload, accessRights }) => {
  const context = useContext(ThemeContext);
  const [errors, setErrors] = useState(false);
  const [open, setOpen] = useState(false);
  const initialAccessRights = userDetails?.idDroitAcces

  const [user, setUser] = useState({
    last_name: '',
    first_name: '',
    email: '',
    backup_email: '',
    phone_number: '',
    user_access_rights: [],
  });

  const fetchData = async () => {
    setUser({
      id: userDetails?._id,
      last_name: userDetails?.nom,
      first_name: userDetails?.prenom,
      email: userDetails?.email,
      backup_email: userDetails?.backupEmail,
      phone_number: userDetails?.telephone,
      user_access_rights: userDetails?.idDroitAcces,
    });
  };

  useEffect(() => {
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
      temp.email = fieldValues.email ? '' : 'Ce champ est requis.';
      if (fieldValues.email) temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email) ? '' : 'Email invalide.';
    }
    // if ('backup_email' in fieldValues) {
    //   temp.backup_email = fieldValues.backup_email ? "" : "Ce champ est requis.";
    //   if (fieldValues.backup_email)
    //     temp.backup_email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.backup_email)
    //       ? ""
    //       : "Email invalide.";
    // };
    if ('phone_number' in fieldValues) temp.phone_number = fieldValues.phone_number ? '' : 'Ce champ est requis.';

    setErrors({
      ...temp,
    });
  };

  const formIsValid = (newUser) => {
    const isValid =
      newUser.first_name &&
      newUser.last_name &&
      newUser.email &&
      newUser.backup_email &&
      newUser.phone_number &&
      Object.values(errors).every((x) => x === '');
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
      idDroitAcces: user.user_access_rights
    };
    return payload;
  };
  const addAccessRights = async(idUser , accessRightsList) => {
    const newAccessRights = accessRightsList.filter(elem => !initialAccessRights.includes(elem) )
    const addedAccessRights = newAccessRights.map(async(elem)=>{
      const res = await addAccessRight({
        idUser,
        idDroitAcces: elem
      })
      return res
    })
    return Promise.all(addedAccessRights)
  }
  const modifyUser = () => {
    validate(user);
    if (formIsValid(user)) {
      context.showLoader(true);
      const payloadToSend = formatPayloadToSend()
      updateUser(payloadToSend)
        .then(async(result) => {
          if (result.data.status === 200) {
            await addAccessRights(user?.id, user?.user_access_rights)
            setOpen(false);
            reload();
            context.changeResultSuccessMessage('Modification effectuée');
            context.showResultSuccess(true);
          } else {
            context.changeResultErrorMessage('Une erreur est servenue lors de la modification des données');
            context.showResultError(true);
          }
        })
        .catch((e) => {
          console.log(e)
          context.changeResultErrorMessage('Une erreur est servunue lors de la modification des données');
          context.showResultError(true);
        })
        .finally(() => {
          context.showLoader(false);
        });
    } else {
      context.changeResultErrorMessage("Une erreur s'est produite");
      context.showResultError(true);
    }
  };
  useEffect(() => {
    // console.log(user)
  }, [user]);
  const handleModifyAccessRight = (idAccessRight) => {
    const tempUser = { ...user };
    const tempUserAccessRights = tempUser?.user_access_rights;
    const newAccessRights = tempUserAccessRights.filter((accessRight) => accessRight !== idAccessRight);
    if(newAccessRights.length === tempUserAccessRights.length) newAccessRights.push(idAccessRight)
    setUser({
      ...tempUser,
      user_access_rights: [...newAccessRights]
    })
  };
  useEffect(()=>{
    console.log(initialAccessRights)
    console.log(user.user_access_rights)
  },[user])
  return (
    <>
      <CustomizedIconButton variant="contained" onClick={handleClickOpen}>
        <Iconify icon="eva:edit-fill" width={20} height={20} color="rgba(140, 159, 177, 1)" />
      </CustomizedIconButton>
      {user && (
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
              <CustomizedLabel label={`Droits d'acces de l'utilisateur`} />
              <CustomizedCard sx={{ background: '#E3EDF7', p: 5 }}>
                {accessRights &&
                  accessRights.map((accessRight, index) => (
                    <div key={index}>
                      <CustomizedSwitch
                        checked={user.user_access_rights.some(
                          (userAccessRight) => userAccessRight === accessRight?._id
                        )}
                        onClick={() => handleModifyAccessRight(accessRight?._id)}
                      />
                      {accessRight?.nom}
                    </div>
                  ))}
              </CustomizedCard>
              {/* <button onClick={()=>{console.log(user?.user_access_rights)}}>Click</button> */}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#E8F0F8', height: '150px' }}>
            <Button onClick={handleClose} sx={{ fontSize: 12 }}>
              Annuler
            </Button>
            <CustomizedButton onClick={modifyUser} text={`Valider`} component={RouterLink} to="#" />
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
ModifyUserDialog.propTypes = {
  userId: PropTypes.any,
  reload: PropTypes.any,
  accessRights: PropTypes.any,
  userDetails: PropTypes.any,
};
export default ModifyUserDialog;
