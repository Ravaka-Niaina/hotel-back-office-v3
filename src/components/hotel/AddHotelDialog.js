import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Stack, RadioGroup, FormControlLabel } from '@mui/material';

import MapDialog from './MapDialog';
import ListPicturePreview from './ListPicturePreview';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import { lightBackgroundToTop } from '../CustomizedComponents/NeumorphismTheme';
import { ThemeContext } from '../context/Wrapper';
import { createHotel } from '../../services/Hotel';

const AddHotelDialog = (props) => {
  const { reload , navigate} = props;
  const context = useContext(ThemeContext);
  const [pictureList, setPictureList] = useState(new Array(0));
  const [logo, setLogo] = useState(new Array(0));
  const [banner, setBanner] = useState(new Array(0));
  const [errors, setErrors] = useState(false);
  const [hotel, setHotel] = useState({
    name: '',
    link: '',
    phone_number: '',
    email_address: '',
    check_in: '',
    check_out: '',
    address: '',
    min_kid_age: '',
    max_kid_age: '',
    tourist_sticker: '',
    is_tva_included: 'true',
    tva: '',
    location_lat: '',
    location_lng: '',
    primary_button_color: '',
    secondary_button_color: '',
    typography_h1: '',
    typography_h2: '',
    typography_h3: '',
  });

  const handleChange = (e) => {
    const temp = hotel;
    const { name, value } = e.target;
    temp[name] = value;
    setHotel({ ...temp });
    validate({ [name]: value });
  };
  const validate = (fieldValues) => {
    const temp = { ...errors };
    if ('name' in fieldValues) temp.name = fieldValues.name ? '' : 'Ce champ est requis.';
    if ('link' in fieldValues) temp.link = fieldValues.link ? '' : 'Ce champ est requis.';
    if ('phone_number' in fieldValues) temp.phone_number = fieldValues.phone_number ? '' : 'Ce champ est requis.';
    if ('email_address' in fieldValues) {
      temp.email_address = fieldValues.email_address ? '' : 'Ce champ est requis.';
      if (fieldValues.email_address) {
        temp.email_address = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email_address) ? '' : 'Email invalide.';
      }
    }
    const requiredFieldMessage = 'Ce champ est requis.';
    if ('phone_number' in fieldValues) temp.phone_number = fieldValues.phone_number ? '' : requiredFieldMessage;
    if ('check_in' in fieldValues) temp.check_in = fieldValues.check_in ? '' : requiredFieldMessage;
    if ('check_out' in fieldValues) temp.check_out = fieldValues.check_out ? '' : requiredFieldMessage;
    if ('address' in fieldValues) temp.address = fieldValues.address ? '' : requiredFieldMessage;
    if ('min_kid_age' in fieldValues) temp.min_kid_age = fieldValues.min_kid_age ? '' : requiredFieldMessage;
    if ('max_kid_age' in fieldValues) temp.max_kid_age = fieldValues.max_kid_age ? '' : requiredFieldMessage;
    if ('tourist_sticker' in fieldValues)
      temp.tourist_sticker = fieldValues.tourist_sticker ? '' : requiredFieldMessage;
    if ('tva' in fieldValues)
      temp.tva = fieldValues.tva || hotel.is_tva_included === 'false' ? '' : requiredFieldMessage;
    if ('location_lat' in fieldValues) temp.location_lat = fieldValues.location_lat ? '' : requiredFieldMessage;
    if ('location_lng' in fieldValues) temp.location_lng = fieldValues.location_lng ? '' : requiredFieldMessage;
    if (!pictureList || pictureList.length === 0) temp.photos = requiredFieldMessage;
    if (logo.length === 0 || logo.length > 1) temp.logo = 'Un logo est requis';
    if (banner.length === 0 || banner.length > 1) temp.banner = 'Une banni??re est requise';
    if ('primary_button_color' in fieldValues)
      temp.primary_button_color = fieldValues.primary_button_color ? '' : requiredFieldMessage;
    if ('secondary_button_color' in fieldValues)
      temp.secondary_button_color = fieldValues.secondary_button_color ? '' : requiredFieldMessage;
    if ('typography_h1' in fieldValues) temp.typography_h1 = fieldValues.typography_h1 ? '' : requiredFieldMessage;
    if ('typography_h2' in fieldValues) temp.typography_h2 = fieldValues.typography_h2 ? '' : requiredFieldMessage;
    if ('typography_h3' in fieldValues) temp.typography_h3 = fieldValues.typography_h3 ? '' : requiredFieldMessage;
    setErrors({
      ...temp,
    });

    return temp;
  };

  const formIsValid = (errors) => {
    const isValid = Object.values(errors).every((x) => x === '');
    return isValid;
  };
  const cleanHotelState = () => {
    setHotel({
      name: '',
      link: '',
      phone_number: '',
      email_address: '',
      check_in: '',
      check_out: '',
      address: '',
      min_kid_age: '',
      max_kid_age: '',
      tourist_sticker: '',
      is_tva_included: 'true',
      tva: '',
      location_lat: '',
      location_lng: '',
      logo: '',
      banner: '',
      typography_h1: '',
      typography_h2: '',
      typography_h3: '',
      primary_button_color: '',
      secondary_button_color: '',
    });
    setErrors(false);
    setPictureList(new Array(0));
  };
  const formatPayloadToSend = () => {
    const payload = {
      name: hotel.name,
      link: hotel.link,
      phoneNum: hotel.phone_number,
      emailAddress: hotel.email_address,
      checkIn: hotel.check_in,
      checkOut: hotel.check_out,
      address: hotel.address,
      minKidAge: Number.parseFloat(hotel.min_kid_age, 10),
      maxKidAge: Number.parseFloat(hotel.max_kid_age, 10),
      vignette: Number.parseFloat(hotel.tourist_sticker, 10),
      isTVAIncluded: hotel.is_tva_included === 'true',
      TVA: hotel.is_tva_included === 'true' ? Number.parseFloat(hotel.tva) : 0,
      photo: pictureList.map((e) => e.img),
      location: { lat: Number.parseFloat(hotel.location_lat, 10), lng: Number.parseFloat(hotel.location_lng, 10) },
      logo: logo[0].img,
      banner: banner[0].img,
      typography_h1: hotel.typography_h1,
      typography_h2: hotel.typography_h2,
      typography_h3: hotel.typography_h3,
      primary_button_color: hotel.primary_button_color,
      secondary_button_color: hotel.secondary_button_color,
    };
    return payload;
  };
  const handlePhotoChange = (e, statePhoto, setStatePhoto, nameStatePhoto) => {
    const tmpPreview = [];
    setErrors({ ...errors, [nameStatePhoto]: '' });
    for (let i = 0; i < e.target.files.length; i += 1) {
      const img = e.target.files[i];
      console.log(img);
      const r = /^image/;
      if (r.test(img.type)) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const im = new Image();
          im.src = evt.target.result;
          im.onload = (a) => {
            tmpPreview.push({
              img: evt.target.result,
              width: a.currentTarget.width,
              height: a.currentTarget.height,
            });
            if (i + 1 === e.target.files.length) setStatePhoto([...tmpPreview, ...statePhoto]);
          };
        };
        reader.readAsDataURL(img);
      }
    }
  };
  const addOneHotel = (e) => {
    e.preventDefault();
    const errors = validate(hotel);
    if (formIsValid(errors)) {
      const idToken = localStorage.getItem('id_token');
      context.showLoader(true);
      createHotel(formatPayloadToSend(), idToken)
        .then((result) => {
          if (result.data.status === 200) {
            handleClose();
            cleanHotelState();
            reload();
            context.changeResultSuccessMessage('Enregistrement effectu??');
            context.showResultSuccess(true);
          }else if (result.data.errors) {
            const item = Object.keys(result.data.errors).filter((e, i) => i === 0)[0];
            const indication = result.data.errors[item];
            const message = `${item}: ${indication}`;
            context.changeResultErrorMessage(message);
            context.showResultError(true);
          }
          else{
            context.changeResultErrorMessage(`Une erreur est servenue, Veuillez contacter l'administrateur.`);
            context.showResultError(true);
          }
        })
        .catch(() => {
          context.changeResultErrorMessage(e.message);
          context.showResultError(true);
        })
        .finally(() => {
          context.showLoader(false);
        })
    }
  };
  const handleClose = () => {
    navigate('list');
  };

  useEffect(() => {
    if (logo.length > 1) setLogo([logo[0]]);
  }, [logo]);

  useEffect(() => {
    if (banner.length > 1) setBanner([banner[0]]);
  }, [banner]);

  return (
    <>
      
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <CustomizedTitle size={20} text="Ajouter un nouvel hotel" />
        <CustomizedButton onClick={handleClose} text="retour" variant="contained" component={RouterLink} to="#" />
      </Stack>
      <CustomizedPaperOutside
        sx={{
          ...lightBackgroundToTop,
          minHeight: '100vh',
          border: '1px white solid',
          padding: 5,
          width:0.8,
          margin:'auto'
        }}
      >
          <Stack
            justifyContent="flex-start"
            alignItems="strech"
            direction={{ xs: 'column' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <CustomizedTitle text='Information hotel' />
            <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent='space-between' >
              <CustomizedInput
                placeholder="nom"
                sx={{ width: 1 }}
                id="nom"
                label="Nom"
                name="name"
                type="text"
                onChange={handleChange}
                required
                {...(errors.name && {
                  error: true,
                  helpertext: errors.name,
                })}
              />
              <CustomizedInput
                placeholder="ex: www.nom-de-domaine.com"
                sx={{ width: 1 }}
                id="Lien"
                label="Lien"
                name="link"
                type="text"
                onChange={handleChange}
                required
                {...(errors.link && {
                  error: true,
                  helpertext: errors.link,
                })}
              />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent='space-between'>
              <CustomizedInput
                placeholder="telephone"
                sx={{ width: 1 }}
                id="Telephone"
                label="Telephone"
                name="phone_number"
                type="number"
                onChange={handleChange}
                fullWidth
                required
                {...(errors.phone_number && {
                  error: true,
                  helpertext: errors.phone_number,
                })}
              />
              <CustomizedInput
                placeholder="ex: xxx@yyyy.com"
                sx={{ width: 1 }}
                id="Email"
                label="Email"
                name="email_address"
                type="text"
                onChange={handleChange}
                fullWidth
                required
                {...(errors.email_address && {
                  error: true,
                  helpertext: errors.email_address,
                })}
              />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent='space-between'>
              <CustomizedInput
                placeholder="ex:  Alarobia Antananarivo Antananarivo, 101"
                sx={{ width: 1 }}
                id="Adresse"
                label="Adresse"
                name="address"
                type="text"
                onChange={handleChange}
                fullWidth
                required
                {...(errors.address && {
                  error: true,
                  helpertext: errors.address,
                })}
              />
              <CustomizedInput
                placeholder="vignette touristique"
                sx={{ width: 1 }}
                id="Vignette touristique"
                label="Vignette touristique"
                name="tourist_sticker"
                type="number"
                onChange={handleChange}
                fullWidth
                required
                {...(errors.tourist_sticker && {
                  error: true,
                  helpertext: errors.tourist_sticker,
                })}
              />
            </Stack>
            <CustomizedTitle text='Photos'/>
            <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent='space-between'>
              <CustomizedInput
                sx={{ width: 1 }}
                id="photos"
                label="Ajouter photos"
                type="file"
                inputProps={{
                  multiple: true,
                }}
                onChange={(e) => handlePhotoChange(e, pictureList, setPictureList, 'photos')}
                fullWidth
                required
                {...(errors.photos && {
                  error: true,
                  helpertext: errors.photos,
                })}
              />
            </Stack>
            <ListPicturePreview itemData={pictureList} setPictureList={setPictureList} />
            <CustomizedTitle text='Horaire' />
            <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent='space-between'>
              <CustomizedInput
                sx={{ width: 1 }}
                label="checkIn"
                name="check_in"
                type="time"
                onChange={handleChange}
                fullWidth
                required
                {...(errors.check_in && {
                  error: true,
                  helpertext: errors.check_in,
                })}
              />
              <CustomizedInput
                sx={{ width: 1 }}
                label="checkOut"
                name="check_out"
                type="time"
                onChange={handleChange}
                fullWidth
                required
                {...(errors.check_out && {
                  error: true,
                  helpertext: errors.check_out,
                })}
              />
            </Stack>
            <CustomizedTitle text='Votre tarifs inclus d??j?? la TVA ?' />
            <Stack spacing={1} alignItems="flex-start" justifyContent='space-between'>
              <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="is_tva_included">
                <FormControlLabel
                  control={<CustomizedRadio checked={hotel.is_tva_included === 'true'} />}
                  onClick={handleChange}
                  label="Oui"
                  value="true"
                />
                <FormControlLabel
                  control={<CustomizedRadio checked={hotel.is_tva_included === 'false'} />}
                  onClick={handleChange}
                  label="Non"
                  value="false"
                />
              </RadioGroup>
              {hotel.is_tva_included === 'true' && (
                <CustomizedInput
                  placeholder="tva"
                  sx={{ width: 1 }}
                  label="Taxes communale"
                  name="tva"
                  type="number"
                  onChange={handleChange}
                  fullWidth
                  required
                  {...(errors.tva && {
                    error: true,
                    helpertext: errors.tva,
                  })}
                />
              )}
            </Stack>
            <CustomizedTitle text='Age' />
            <Stack spacing={1}>
              <CustomizedTitle text='Enfant' level={0} size={15} />
              <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent='space-between'>
                <CustomizedInput
                  placeholder="ex: 4 ans"
                  sx={{ width: 1 }}
                  label="A partir de"
                  name="min_kid_age"
                  type="number"
                  onChange={handleChange}
                  fullWidth
                  required
                  {...(errors.min_kid_age && {
                    error: true,
                    helpertext: errors.min_kid_age,
                  })}
                />
                <CustomizedInput
                  placeholder="ex: 11 ans"
                  sx={{ width: 1 }}
                  label="Jusqu'??"
                  name="max_kid_age"
                  type="number"
                  onChange={handleChange}
                  fullWidth
                  required
                  {...(errors.max_kid_age && {
                    error: true,
                    helpertext: errors.max_kid_age,
                  })}
                />
              </Stack>
            </Stack>
            <CustomizedTitle text='Coordonn??es gps' />
            <Stack spacing={1}>
              <MapDialog hotel={hotel} setHotel={setHotel} errors={errors} setErrors={setErrors} />
              <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent='space-between'>
                <CustomizedInput
                  sx={{ width: 1 }}
                  value={hotel.location_lat}
                  placeholder="ex: -18.147632345"
                  label="Latitude"
                  name="location_lat"
                  type="number"
                  onChange={handleChange}
                  fullWidth
                  required
                  {...(errors.location_lat && {
                    error: true,
                    helpertext: errors.location_lng,
                  })}
                />
                <CustomizedInput
                  sx={{ width: 1 }}
                  value={hotel.location_lng}
                  placeholder="ex: 45.43244536456"
                  label="Longitude"
                  name="location_lng"
                  type="number"
                  onChange={handleChange}
                  fullWidth
                  required
                  {...(errors.location_lng && {
                    error: true,
                    helpertext: errors.location_lng,
                  })}
                />
              </Stack>
            </Stack>
            <CustomizedTitle text='Themes (contenu front-office)' />
            <Stack spacing={1}>
              <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent='space-between'>
                <CustomizedInput
                  sx={{ width: 1 }}
                  id="photos"
                  label="Logo"
                  type="file"
                  inputProps={{
                    multiple: false,
                  }}
                  onChange={(e) => handlePhotoChange(e, logo, setLogo, 'logo')}
                  fullWidth
                  required
                  {...(errors.logo && {
                    error: true,
                    helpertext: errors.logo,
                  })}
                />
              </Stack>
              <ListPicturePreview itemData={logo} setPictureList={setPictureList} />
            </Stack>
            <Stack spacing={1}>
            <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent='space-between'>
                <CustomizedInput
                  sx={{ width: 1 }}
                  id="photos"
                  label="Banni??re"
                  type="file"
                  inputProps={{
                    multiple: false,
                  }}
                  onChange={(e) => handlePhotoChange(e, banner, setBanner, 'banner')}
                  fullWidth
                  required
                  {...(errors.banner && {
                    error: true,
                    helpertext: errors.banner,
                  })}
                />
              </Stack>
              <ListPicturePreview itemData={banner} setPictureList={setBanner} />
            </Stack>
            <CustomizedTitle text='Th??me principal' size={15} level={0} />
            <Stack spacing={1}>
              <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent='space-between'>
                <CustomizedInput
                  sx={{ width: 1 }}
                  value={hotel.primary_button_color}
                  placeholder="ex: #F22323"
                  label="Couleur  primaire"
                  name="primary_button_color"
                  type="text"
                  onChange={handleChange}
                  fullWidth
                  required
                  {...(errors.primary_button_color && {
                    error: true,
                    helpertext: errors.primary_button_color,
                  })}
                />
                <CustomizedInput
                  sx={{ width: 1 }}
                  value={hotel.secondary_button_color}
                  placeholder="ex: #F22323"
                  label="Couleur secondaire"
                  name="secondary_button_color"
                  type="text"
                  onChange={handleChange}
                  fullWidth
                  required
                  {...(errors.secondary_button_color && {
                    error: true,
                    helpertext: errors.secondary_button_color,
                  })}
                />
              </Stack>
            </Stack>
            <CustomizedTitle text='Typography' size={15} level={0}/>
            <Stack spacing={1}>
              <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent='space-between'>
                <CustomizedInput
                  sx={{ width: 1 }}
                  value={hotel.typography_h1}
                  placeholder="ex: Montserrat"
                  label="Typography h1"
                  name="typography_h1"
                  type="text"
                  onChange={handleChange}
                  fullWidth
                  required
                  {...(errors.typography_h1 && {
                    error: true,
                    helpertext: errors.typography_h1,
                  })}
                />
                <CustomizedInput
                  sx={{ width: 1 }}
                  value={hotel.typography_h2}
                  placeholder="ex: Montserrat"
                  label="Typography h2"
                  name="typography_h2"
                  type="text"
                  onChange={handleChange}
                  fullWidth
                  required
                  {...(errors.typography_h2 && {
                    error: true,
                    helpertext: errors.typography_h2,
                  })}
                />
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CustomizedInput
                  sx={{ width: 1 }}
                  value={hotel.typography_h3}
                  placeholder="ex: Montserrat"
                  label="Typography h3"
                  name="typography_h3"
                  type="text"
                  onChange={handleChange}
                  fullWidth
                  required
                  {...(errors.typography_h3 && {
                    error: true,
                    helpertext: errors.typography_h3,
                  })}
                />
              </Stack>
            </Stack>
            <Button onClick={handleClose} sx={{ fontSize: 12, height: '100%' }}>
              Annuler
            </Button>
            <CustomizedButton text="Enregistrer" onClick={addOneHotel} component={RouterLink} to="#" />
          </Stack>

        </CustomizedPaperOutside>
    </>
  );
};
AddHotelDialog.propTypes = {
  reload : PropTypes.any,
  navigate: PropTypes.any,
}
export default AddHotelDialog;
