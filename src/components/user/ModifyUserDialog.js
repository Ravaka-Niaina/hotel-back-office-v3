import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink , useNavigate } from 'react-router-dom';

import { Stack, Button } from '@mui/material';

import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import { lightBackgroundToTop } from '../CustomizedComponents/NeumorphismTheme';
import { ThemeContext } from '../context/Wrapper';
import { addAccessRight, updateUser , getAllHotelsAssociatedToAUser, } from '../../services/User';

import CustomizedLabel from '../CustomizedComponents/CustomizedLabel';
import CustomizedCard from '../CustomizedComponents/CustomizedCard';
import CustomizedSwitch from '../CustomizedComponents/CustomizedSwitch';
import { getAccessRightList } from '../../services/AccessRight';
import { getAssociatedHotelsId } from '../../services/Hotel';

const ModifyUserDialog = ({ userDetails, userId, reload, accessRights, setLocation }) => {
  const context = useContext(ThemeContext);
  const [errors, setErrors] = useState({
    last_name: '',
    first_name: '',
    email: '',
    backup_email: '',
    phone_number: '',
    user_access_rights: '',
  });
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
  const [hotels, setHotels] = useState([]);
  const [associatedHotelsId, setAssociatedHotelsId] = useState([]);
  const [isUserAdminOrSuperAdmin, setIsUserAdminOrSuperAdmin] = useState(false);
  const [localAccessRights, setLocalAccessRights] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    if (userDetails) {
      setUser({
        id: userDetails?._id,
        last_name: userDetails?.nom,
        first_name: userDetails?.prenom,
        email: userDetails?.email,
        backup_email: userDetails?.backupEmail,
        phone_number: userDetails?.telephone,
        user_access_rights: userDetails?.idDroitAcces,
      });
      setAssociatedHotelsId(userDetails.hotelPartenaire.map(association => association.hotel[0]._id));
    } else {
      const userDetails = JSON.parse(localStorage.getItem('user_details'));
      const {
        _id,
        nom, 
        prenom, 
        email, 
        backupEmail, 
        telephone,
      } = userDetails.data.user;
      const userAccessRights = userDetails.data.atribAR.map(accessRight => accessRight._id);
      setUser({
        _id,
        last_name: nom,
        first_name: prenom,
        email,
        backup_email: backupEmail,
        phone_number: telephone,
        user_access_rights: userAccessRights,
      });
      getAccessRights();
      getAssociatedHotels(_id);
    }
  };

  const getAccessRights = async () => {
    try {
      const result = await getAccessRightList();
      if(result.status !== 200) return
      if (!result.data) return
      if(result.data.status !== 200) return
      if(!result.data?.list) return
      setLocalAccessRights(result?.data?.list);
    } catch(e) {
      context.changeResultErrorMessage(e.message);      
      context.showResultError(true);
    }
  }

  const getAssociatedHotels = async (partnerId) => {
    try {
      const data = await getAssociatedHotelsId({ partner_id: partnerId });
      setAssociatedHotelsId(data.data.associated_hotels);
    } catch (e) {
      console.error(e);
    }
  };

  const getClearedErrors = () => ({
      last_name: '',
      first_name: '',
      email: '',
      backup_email: '',
      phone_number: '',
      user_access_rights: [],
  });

  const getAllHotelsAssociatedToCurrentPartner = () => {
    const partnerId = JSON.parse(localStorage.getItem('user_details'))?.data.user._id;
    getAllHotelsAssociatedToAUser(partnerId)
      .then((result) => {
        setHotels(result.data.allHotelsAssociatedToAPartner);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (!userDetails && !JSON.parse(localStorage.getItem('user_details'))) {
      navigate('/login');
      return;
    }
    fetchData();
    getAllHotelsAssociatedToCurrentPartner();
    setIsUserAdminOrSuperAdmin(JSON
      .parse(localStorage.getItem('user_details'))
      ?.data
      .atribAR
      .some(accessRight => accessRight._id === 'admin' 
        || accessRight._id === 'superAdmin'
      ));
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
    const errorsTemp = { ...errors, email: '', backup_email: '', user_access_rights: '' };
    const isValid =
      newUser.first_name &&
      newUser.last_name &&
      newUser.email &&
      newUser.backup_email &&
      newUser.phone_number &&
      Object.values(errorsTemp).every((x) => x === '');
    return isValid;
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setLocation('list');
  };

  const formatPayloadToSend = () => {
    const payload = {
      isPartner: true,
      _id: userId,
      nom: user.last_name,
      prenom: user.first_name,
      email: user.email,
      backup_email: user.backup_email,
      phone_number: user.phone_number,
      idDroitAcces: user.user_access_rights,
      associatedHotelsId,
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
            setErrors({ ...getClearedErrors(), ...result.data.errors });
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

  const handleModifyAccessRight = (idAccessRight) => {
    const tempUser = { ...user };
    const tempUserAccessRights = tempUser?.user_access_rights;
    let newAccessRights = tempUserAccessRights.filter((accessRight) => accessRight !== idAccessRight);
    if (newAccessRights.length === tempUserAccessRights.length) {
      if (idAccessRight === 'superAdmin' || idAccessRight === 'admin') {
        for (let i = 0; i < accessRights.length; i += 1) {
          const accessRightAlreadyChecked = newAccessRights.some(newAccessRight => 
            accessRights[i]._id === newAccessRight 
            || accessRights[i]._id === idAccessRight);
          if (!accessRightAlreadyChecked) {
            newAccessRights.push(accessRights[i]._id);
          }
        }
        const exception = idAccessRight === 'superAdmin' ? 'admin' : 'superAdmin';
        newAccessRights = newAccessRights.filter(newAccessRight => newAccessRight !== exception);
      }
      newAccessRights.push(idAccessRight);
    }
    setUser({
      ...tempUser,
      user_access_rights: [...newAccessRights]
    })
  };
  
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <CustomizedTitle text={`Modifier l'utilisateur ${user?.first_name} ${user?.last_name}`} size={20} />
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
            />
            <CustomizedLabel label={`Droits d'acces de l'utilisateur`} />
            <CustomizedCard sx={{ background: '#E3EDF7', p: 5 }}>
              <div style={{ columnCount: 2 }}>
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
                  ))
                }
                {localAccessRights &&
                  localAccessRights.map((accessRight, index) => (
                    <div key={index}>
                      <CustomizedSwitch
                        checked={user.user_access_rights.some(
                          (userAccessRight) => userAccessRight === accessRight?._id
                        )}
                        onClick={() => handleModifyAccessRight(accessRight?._id)}
                      />
                      {accessRight?.nom}
                    </div>
                  ))
                }
              </div>
            </CustomizedCard>
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
            <Button onClick={handleClose} sx={{ fontSize: 12 }}>
            Annuler
          </Button>
          <CustomizedButton onClick={modifyUser} text={`Valider`} component={RouterLink} to="#" />
        </Stack>
        </CustomizedPaperOutside>
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
