import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Stack, RadioGroup, FormControlLabel } from '@mui/material'; 

import MapDialog from './MapDialog';
import ListPicturePreview from './ListPicturePreview';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';
import { lightBackgroundToTop } from '../CustomizedComponents/NeumorphismTheme';
import { ThemeContext } from '../context/Wrapper';
import { updateHotel , getHotelDetails } from '../../services/Hotel';
import config from '../../config/api';

const ModifyHotelDialog = () => {
  const context = useContext(ThemeContext);
  const [pictureList, setPictureList] = useState(new Array(0));
  const [logo, setLogo] = useState(new Array(0));
  const [banner, setBanner] = useState(new Array(0));
  const [errors, setErrors] = useState(false);
  const [hotel, setHotel] = useState({
    _id: '',
    name: '',
    url_name: '',
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
    politic: '',
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
      temp.tva = (hotel.is_tva_included === 'true' || (hotel.is_tva_included !== 'true' && fieldValues.tva)) ? '' : requiredFieldMessage;
    if ('location_lat' in fieldValues) temp.location_lat = fieldValues.location_lat ? '' : requiredFieldMessage;
    if ('location_lng' in fieldValues) temp.location_lng = fieldValues.location_lng ? '' : requiredFieldMessage;
    if (!pictureList || pictureList.length === 0) temp.photos = requiredFieldMessage;
    if (logo.length === 0 || logo.length > 1) temp.logo = 'Un logo est requis';
    if (banner.length === 0 || banner.length > 1) temp.banner = 'Une bannière est requise';
    if ('primary_button_color' in fieldValues)
      temp.primary_button_color = fieldValues.primary_button_color ? '' : requiredFieldMessage;
    if ('secondary_button_color' in fieldValues)
      temp.secondary_button_color = fieldValues.secondary_button_color ? '' : requiredFieldMessage;
    if ('typography_h1' in fieldValues) temp.typography_h1 = fieldValues.typography_h1 ? '' : requiredFieldMessage;
    if ('typography_h2' in fieldValues) temp.typography_h2 = fieldValues.typography_h2 ? '' : requiredFieldMessage;
    if ('typography_h3' in fieldValues) temp.typography_h3 = fieldValues.typography_h3 ? '' : requiredFieldMessage;
    if ('politic' in fieldValues) temp.politic = fieldValues.politic.trim() ? '' : requiredFieldMessage;
    if ('url_name' in fieldValues) {
      if (!/^[a-z0-9_-]+$/.test(fieldValues.url_name)) {
        temp.url_name = 'Tous les lettres doivent être en miniscules et les espaces remplacés par des tirets';
      } else {
        temp.url_name = '';
      } 
    }
    setErrors({
      ...temp,
    });
    return temp;
  };

  const formIsValid = (e) => {
    const isValid = Object.values(e).every((x) => x === '');
    return isValid;
  };

  const formatPayloadToSend = () => {
    const payload = {
      _id: hotel._id,
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
      photo: pictureList.map((e) => e.img),
      isTVAIncluded: hotel.is_tva_included === 'true',
      TVA: hotel.is_tva_included === 'true' ? 0 : Number.parseFloat(hotel.tva),
      location: { lat: Number.parseFloat(hotel.location_lat, 10), lng: Number.parseFloat(hotel.location_lng, 10) },
      logo: logo[0].img,
      banner: banner[0].img,
      typography_h1: hotel.typography_h1,
      typography_h2: hotel.typography_h2,
      typography_h3: hotel.typography_h3,
      primary_button_color: hotel.primary_button_color,
      secondary_button_color: hotel.secondary_button_color,
      politic: hotel.politic,
      urlName: hotel.url_name,
    };
    return payload;
  };
  const handlePhotoChange = (e, statePhoto, setStatePhoto, nameStatePhoto) => {
    const tmpPreview = [];
    setErrors({ ...errors, [nameStatePhoto]: '' });
    for (let i = 0; i < e.target.files.length; i += 1) {
      const img = e.target.files[i];
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
  const modifyHotel = (e) => {
    e.preventDefault();
    const errorsTemp = validate(hotel);
    if (formIsValid(errorsTemp)) {
      context.showLoader(true);
      const idToken = localStorage.getItem('id_token');
      updateHotel(formatPayloadToSend(), idToken)
        .then((result) => {
          if (result.data.status === 200) {
            context.changeResultSuccessMessage('Enregistrement effectué');
            context.showResultSuccess(true);
          } else if (result.data.errors) {
            const item = Object.keys(result.data.errors).filter((e, i) => i === 0)[0];
            const indication = result.data.errors[item];
            const message = `${item}: ${indication}`;
            context.changeResultErrorMessage(message);
            context.showResultError(true);
          }
          else{
            context.changeResultErrorMessage("Une erreur est servenue, Veuillez contacter l'administrateur.");
            context.showResultError(true);
          }
        })
        .catch((e) => {
          context.changeResultErrorMessage(e.message);
          context.showResultError(true);
        })
        .finally(()=>{
          context.showLoader(false);
        });
    }
  };   

  const loadPictureList = (photo) =>{
    const files = photo?.map((e)=>
      fetch(`${config.host}/${e}`)
        .then((result) =>
          result.blob()
        )
        .then(blobFile => 
            new File([blobFile],e, { type: "image/png" }),
        )
    )
    Promise.all(files).then((result)=>{
      const temp = {
        target: {
          files: result,
        }
      }
      handlePhotoChange(temp, pictureList, setPictureList, 'photos');
    });
    
   
  }
  const loadLogo = (logo) => {
    fetch(`${config.host}/${logo}`)
      .then((result) =>
        result.blob()
      )
      .then(blobFile => {
        const temp = {
          target: {
            files: [new File([blobFile], hotel.logo, { type: "image/png" })],
          }
        }
        handlePhotoChange(temp, logo, setLogo, 'logo')
      });
  };
  const loadBanner = (banner) => {
    fetch(`${config.host}/${ banner }`)
      .then((result) =>
        result.blob()
      )
      .then(blobFile => {
        const temp = {
          target: {
            files: [new File([blobFile], hotel.banner, { type: "image/png" })],
          }
        }
        handlePhotoChange(temp, banner, setBanner, 'banner')
      });
  }
  const fetchHotelDetails = () => {
    context.showLoader(true);
    getHotelDetails()
      .then((response) => {
        const hotelTemp = response.data.hotel;
        setHotel({
          _id: hotelTemp._id,
          name: hotelTemp.name,
          url_name: hotelTemp.urlName,
          link: hotelTemp.link,
          phone_number: hotelTemp.phoneNum,
          email_address: hotelTemp.emailAddress,
          check_in: hotelTemp.checkIn,
          check_out: hotelTemp.checkOut,
          address: hotelTemp.address,
          min_kid_age: hotelTemp.minKidAge,
          max_kid_age: hotelTemp.maxKidAge,
          tourist_sticker: hotelTemp.vignette,
          is_tva_included: hotelTemp.isTVAIncluded ? 'true' : 'false',
          tva: hotelTemp.TVA,
          location_lat: hotelTemp.location.lat,
          location_lng: hotelTemp.location.lng,
          primary_button_color: hotelTemp.theme.btn.primary,
          secondary_button_color: hotelTemp.theme.btn.secondary,
          typography_h1: hotelTemp.theme.typography.h1,
          typography_h2: hotelTemp.theme.typography.h2,
          typography_h3: hotelTemp.theme.typography.h3,
          photo: hotelTemp.photo,
          logo: hotelTemp.logo,
          banner: hotelTemp.banner,
          politic: hotelTemp.politic,
        });
        loadPictureList(hotelTemp.photo);
        loadLogo(hotelTemp.logo);
        loadBanner(hotelTemp.banner);
      })
      .catch((e) => {
        context.changeResultErrorMessage(e.message);
        context.showResultError(true);
      })
      .finally(() => {
        context.showLoader(false);
      });
  };

  useEffect(() => {
    fetchHotelDetails();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (logo.length > 1) setLogo([logo[0]]);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logo]);

  useEffect(() => {
    if (banner.length > 1) setBanner([banner[0]]);
  }, [banner]);

  return (
    <>
      
      <Stack direction="hotel" alignItems="center" justifyContent="space-between" mb={5}>
        <CustomizedTitle size={20} text="Modifier cet hotel" />
      </Stack>
      <CustomizedPaperOutside
        sx={{
          ...lightBackgroundToTop,
          minHeight: '100vh',
          border: '1px white solid',
          padding: 5,
          width: 0.8,
          margin: 'auto'
        }}
      >
        <Stack
          justifyContent="flex-start"
          alignItems="strech"
          direction={{ xs: 'column' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            <CustomizedTitle text='Information hotel' />
            <Stack direction="hotel" spacing={2} alignItems="flex-start" justifyContent='space-between'>
              <CustomizedInput
                value={hotel.name}
                placeholder="nom"
                sx={{ width: 1 }}
                id="nom"
                label="Nom"
                name="name"
                type="text"
                onChange={handleChange}
                fullWidth
                required
                {...(errors.name && {
                  error: true,
                  helpertext: errors.name,
                })}
              />
              <CustomizedInput
                value={hotel.link}
                placeholder="ex: www.nom-de-domaine.com"
                sx={{ width: 1 }}
                id="Lien"
                label="Lien"
                name="link"
                type="text"
                onChange={handleChange}
                fullWidth
                required
                {...(errors.link && {
                  error: true,
                  helpertext: errors.link,
                })}
              />
            </Stack>
            <Stack spacing={1}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CustomizedInput
                  sx={{ width: 1 }}
                  value={hotel.url_name}
                  label="Nom Url"
                  name="url_name"
                  type="text"
                  onChange={handleChange}
                  fullWidth
                  required
                  {...(errors.url_name && {
                    error: true,
                    helpertext: errors.url_name,
                  })}
                />
              </Stack>
            </Stack>
            <Stack direction="hotel" spacing={2} alignItems="flex-start" justifyContent='space-between'>
              <CustomizedInput
                value={hotel.phone_number}
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
                value={hotel.email_address}
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
            <CustomizedTitle text='Photos' />
            <Stack direction="hotel" spacing={2} alignItems="flex-start" justifyContent='space-between'>
              <CustomizedInput
                value={hotel.address}
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
                value={hotel.tourist_sticker}
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
            <CustomizedTitle text='Photos' />
            <Stack direction="hotel" spacing={2} alignItems="flex-start" justifyContent='space-between'>
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
            <Stack direction="hotel" spacing={2} alignItems="flex-start" justifyContent='space-between'>
              <CustomizedInput
                value={hotel.check_in}
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
                value={hotel.check_out}
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

            <CustomizedTitle text='Votre tarifs inclus déjà la TVA ?' />
            <Stack spacing={1} alignItems="flex-start">
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
              {hotel.is_tva_included === 'false' && (
                <CustomizedInput
                  value={hotel.TVA}
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
              <Stack direction="hotel" spacing={2} alignItems="flex-start" justifyContent='space-between'>
                <CustomizedInput
                  value={hotel.min_kid_age}
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
                  value={hotel.max_kid_age}
                  placeholder="ex: 11 ans"
                  sx={{ width: 1 }}
                  label="Jusqu'à"
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
            <CustomizedTitle text='Coordonnées gps' />
            <Stack spacing={1}>
              <MapDialog hotel={hotel} setHotel={setHotel} />
              <Stack direction="hotel" spacing={2} alignItems="flex-start" justifyContent='space-between'>
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
            <Stack spacing={1}>
              <Stack direction="hotel" spacing={2} alignItems="center">
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
              <ListPicturePreview itemData={logo} setPictureList={setLogo} />
            </Stack>
            <CustomizedTitle text='Themes (contenu front-office)' />
            <Stack spacing={1}>
              <Stack direction="hotel" spacing={2} alignItems="center">
                <CustomizedInput
                  sx={{ width: 1 }}
                  id="photos"
                  label="Bannière"
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
          <CustomizedTitle text='Thème principal' size={15} level={0} />
            <Stack spacing={1}>
              <Stack direction="hotel" spacing={2} alignItems="flex-start" justifyContent='space-between'>
                <CustomizedInput
                  sx={{ width: 1 }}
                  value={hotel.primary_button_color}
                  placeholder="ex: #F22323"
                  label="Couleur bouton primaire"
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
                  label="Couleur bouton secondaire"
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
            <CustomizedTitle text='Typography' size={15} level={0} />
            <Stack spacing={1}>
              <Stack direction="hotel" spacing={2} alignItems="flex-start" justifyContent='space-between'>
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
              <Stack direction="hotel" spacing={2} alignItems="center">
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
            <Stack spacing={1}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CustomizedInput
                  sx={{ width: 1 }}
                  value={hotel.politic}
                  label="Politique"
                  name="politic"
                  type="text"
                  onChange={handleChange}
                  fullWidth
                  required
                  {...(errors.politic && {
                    error: true,
                    helpertext: errors.politic,
                  })}
                />
              </Stack>
            </Stack>
            { JSON.parse(localStorage.getItem("user_details")).data.atribAR.some(({_id}) => _id === 'superAdmin' || _id === 'admin') && 
              <CustomizedButton text="Enregistrer" component={RouterLink} onClick={modifyHotel} to="#" />
            }
          </Stack>
        </CustomizedPaperOutside>
    </>
  );
};
ModifyHotelDialog.propTypes = {
  hotel: PropTypes.any,
  reload: PropTypes.func,
  newHotel: PropTypes.any,
};
export default ModifyHotelDialog;
