import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { Stack, Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';
import { lightBackgroundToTop } from '../CustomizedComponents/NeumorphismTheme';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import { ThemeContext } from '../context/Wrapper';
import { getAllHotelsAssociatedToAUser, register } from '../../services/User';
import CustomizedCard from '../CustomizedComponents/CustomizedCard';
import CustomizedSwitch from '../CustomizedComponents/CustomizedSwitch';
import CustomizedLabel from '../CustomizedComponents/CustomizedLabel';

const AddUserDialog = ({reload, setLocation}) => {
  const context = useContext(ThemeContext);
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
  const [hotels, setHotels] = useState([]);
  const [associatedHotelsId, setAssociatedHotelsId] = useState([]);
  const [isUserAdminOrSuperAdmin, setIsUserAdminOrSuperAdmin] = useState(false);

  const getAllHotelsAssociatedToCurrentPartner = () => {
    const partnerId = JSON.parse(localStorage.getItem('user_details')).data.user._id;
    getAllHotelsAssociatedToAUser(partnerId)
      .then((result) => {
        setHotels(result.data.allHotelsAssociatedToAPartner);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getAllHotelsAssociatedToCurrentPartner();
    setIsUserAdminOrSuperAdmin(JSON
      .parse(localStorage.getItem('user_details'))
      .data
      .atribAR
      .some(accessRight => accessRight._id === 'admin' 
        || accessRight._id === 'superAdmin'
      ));
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
    setLocation('list');
  };

  const handleModifyAssociatedHotel = (hotelId) => {
    let hotelAlreadyAssociated = false;
    const tempAssociatedHotels = [...associatedHotelsId];
    for (let i = 0; i < associatedHotelsId.length; i += 1) {
      if (associatedHotelsId[i] === hotelId) {
        hotelAlreadyAssociated = true;
        tempAssociatedHotels.splice(i, 1);
        break;
      }
    }
    if (!hotelAlreadyAssociated) {
      tempAssociatedHotels.push(hotelId);
    }
    setAssociatedHotelsId(tempAssociatedHotels);
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
    context.showLoader(true);
    if (associatedHotelsId.length === 0) {
      context.changeResultErrorMessage("Veuillez associer l'utilisateur à au moins un hôtel");
      context.showResultError(true);
      context.showLoader(false);
      return;
    }
    
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
      associatedHotelsId,
    })
      .then(result => {
        context.showLoader(false);
        if (result.data.status === 200) {
          clearForm();
          setOpen(false);
          context.changeResultSuccessMessage('Enregistrement effectué');
          context.showResultSuccess(true);
          reload();
        }
        else if (result.data.errors) {
          const item = Object.keys(result.data.errors).filter((e, i) => i === 0)[0];
          const indication = result.data.errors[item];
          const message = `${item}: ${indication}`;
          context.changeResultErrorMessage(message);
          context.showResultError(true);
        }
        else if (result.data.msg) {
          context.changeResultErrorMessage(result.data.msg);
          context.showResultError(true);
        }
        else{
          context.changeResultErrorMessage();
          context.showResultError(true);
        }
      })
      .catch(err => {
        context.changeResultErrorMessage(err);
        context.showResultError(true);
        console.log(err);
      })
      .finally(()=>{
        context.showLoader(false);
      });
    return null;
  };
  
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <CustomizedTitle text={`Ajouter l'utilisateur ${user?.first_name} ${user?.last_name}`} size={20} />
        <CustomizedButton onClick={handleClose} text='retour' component={RouterLink} to="#" />
      </Stack>
        <CustomizedPaperOutside sx={{ ...lightBackgroundToTop, background: '#E3EDF7', p: 5, minHeight: '100vh',width:0.8,margin:'auto' }}>
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
            {
              isUserAdminOrSuperAdmin && (
              <>
                <CustomizedLabel label={`Associer hôtels`} />
                <CustomizedCard sx={{ background: '#E3EDF7', p: 5 }}>
                  <div style={{ columnCount: 2 }}>
                    {
                      hotels.map((hotel) => ( 
                        <div key={hotel._id}>
                          <CustomizedSwitch checked={associatedHotelsId.some(
                              associatedHotel => associatedHotel === hotel._id
                            )} 
                            onClick = { () => handleModifyAssociatedHotel(hotel._id) }
                          />
                          { hotel.name }
                        </div>
                      ))
                    }
                  </div>
                </CustomizedCard>
              </>
            ) }
            <Button onClick={() => {handleClose(); clearForm()}} sx={{ fontSize: 12 }}>
              Annuler
            </Button>
            <CustomizedButton onClick={createUser} text={`Valider`} component={RouterLink} to="#" />
          </Stack>
        </CustomizedPaperOutside>
    </>
  );
};

AddUserDialog.propTypes = {
  reload: PropTypes.any,
};
export default AddUserDialog;
