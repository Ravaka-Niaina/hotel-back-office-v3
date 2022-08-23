import React, { useState,useContext} from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { Dialog, DialogActions, DialogContent, Button, Stack, RadioGroup, FormControlLabel } from '@mui/material';

import MapDialog from './MapDialog';
import ListPicturePreview from './ListPicturePreview';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import Iconify from '../Iconify';
import {ThemeContext} from '../context/Wrapper';
import { updateHotel } from '../../services/Hotel';

const ModifyHotelDialog = (props) => {
    const { row , reload} = props;
    const context = useContext(ThemeContext);
    const [open, setOpen] = useState(false);
    const [pictureList, setPictureList] = useState(new Array(0));
    const [errors, setErrors] = useState(false);
    const [hotel, setHotel] = useState({
        "name": '',
        "link": '',
        "phone_number": '',
        "email_address": '',
        "check_in": '',
        "check_out": '',
        "address": '',
        "min_baby_age": '',
        "max_baby_age": '',
        "min_kid_age": '',
        "max_kid_age": '',
        "tourist_sticker": '',
        "is_tva_included": 'true',
        "tva": '',
        "location_lat": '',
        "location_lng": '',
    });

    const handleChange = (e) => {
        const temp = hotel;
        const { name, value } = e.target;
        temp[name] = value;
        setHotel({ ...temp });
        validate({ [name]: value });
        formIsValid({
            ...hotel,
            [name]: value,
        });
        console.log(hotel);
    };
    const validate = (fieldValues) => {
        const temp = { ...errors };
        if ('name' in fieldValues) temp.name = fieldValues.name ? '' : 'Ce champ est requis.';
        if ('link' in fieldValues) temp.link = fieldValues.link ? '' : 'Ce champ est requis.';
        if ('phone_number' in fieldValues) temp.phone_number = fieldValues.phone_number ? '' : 'Ce champ est requis.';
        if ('email_address' in fieldValues) {
            temp.email_address = fieldValues.email_address ? "" : "Ce champ est requis.";
            if (fieldValues.email_address) {
                temp.email_address = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email_address)
                    ? ""
                    : "Email invalide.";
            };
        }
        if ('phone_number' in fieldValues) temp.phone_number = fieldValues.phone_number ? '' : 'Ce champ est requis.';
        if ('check_in' in fieldValues) temp.check_in = fieldValues.check_in ? '' : 'Ce champ est requis.';
        if ('check_out' in fieldValues) temp.check_out = fieldValues.check_out ? '' : 'Ce champ est requis.';
        if ('address' in fieldValues) temp.address = fieldValues.address ? '' : 'Ce champ est requis.';
        if ('min_baby_age' in fieldValues) temp.min_baby_age = fieldValues.min_baby_age ? '' : 'Ce champ est requis.';
        if ('max_baby_age' in fieldValues) temp.max_baby_age = fieldValues.max_baby_age ? '' : 'Ce champ est requis.';
        if ('min_kid_age' in fieldValues) temp.min_kid_age = fieldValues.min_kid_age ? '' : 'Ce champ est requis.';
        if ('max_kid_age' in fieldValues) temp.max_kid_age = fieldValues.max_kid_age ? '' : 'Ce champ est requis.';
        if ('tourist_sticker' in fieldValues) temp.tourist_sticker = fieldValues.tourist_sticker ? '' : 'Ce champ est requis.';
        if ('tva' in fieldValues) temp.tva = fieldValues.tva || hotel.is_tva_included === 'false' ? '' : 'Ce champ est requis.';
        if ('location_lat' in fieldValues) temp.location_lat = fieldValues.location_lat ? '' : 'Ce champ est requis.';
        if ('location_lng' in fieldValues) temp.location_lng = fieldValues.location_lng ? '' : 'Ce champ est requis.';
        setErrors({
            ...temp,
        });
    };

    const formIsValid = (newHotel) => {
        const isValid = Object.values(errors).every((x) => x === '');
        return isValid;
    };

    const formatPayloadToSend = () => {
        const payload = {
            "_id":  row._id,
            "name": hotel.name,
            "link": hotel.link,
            "phoneNum": hotel.phone_number,
            "emailAddress": hotel.email_address,
            "checkIn": hotel.check_in,
            "checkOut": hotel.check_out,
            "address": hotel.address,
            "minBabyAge": Number.parseFloat(hotel.min_baby_age, 10),
            "maxBabyAge": Number.parseFloat(hotel.max_baby_age, 10),
            "minKidAge": Number.parseFloat(hotel.min_kid_age, 10),
            "maxKidAge": Number.parseFloat(hotel.max_kid_age, 10),
            "vignette": Number.parseFloat(hotel.tourist_sticker, 10),
            "photo": pictureList.map((e) => e.img),
            "isTVAIncluded": hotel.is_tva_included === 'true',
            "TVA": hotel.is_tva_included === 'true' ? hotel.tva : 0,
            "location": { "lat": Number.parseFloat(hotel.location_lat, 10), "lng": Number.parseFloat(hotel.location_lng, 10) },
        };
        return payload;
    };
    const handlePhotoChange = (e) => {
        const tmpPreview = [];

        for (let i = 0; i < e.target.files.length; i += 1) {
            const img = e.target.files[i];
            const r = /^image/;
            if (r.test(img.type)) {
                console.log('type image');
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const im = new Image()
                    im.src = evt.target.result;
                    im.onload = (a) => {
                        tmpPreview.push({
                            img: evt.target.result,
                            width: a.currentTarget.width,
                            height: a.currentTarget.height,
                        });
                        if (i + 1 === e.target.files.length) setPictureList([...tmpPreview, ...pictureList]);
                    }

                }
                reader.readAsDataURL(img);
            } else {
                console.log('else lery');
            }

        }

    }
    const cleanHotelState = () => {
        setHotel({
            "name": '',
            "link": '',
            "phone_number": '',
            "email_address": '',
            "check_in": '',
            "check_out": '',
            "address": '',
            "min_baby_age": '',
            "max_baby_age": '',
            "min_kid_age": '',
            "max_kid_age": '',
            "tourist_sticker": '',
            "is_tva_included": 'true',
            "tva": '',
            "location_lat": '',
            "location_lng": '',
        })
        setErrors(false);
        setPictureList(new Array(0));
    };
    const modifyHotel = () => {
        validate(hotel);
        if (formIsValid(hotel)) {
            console.log('updating...');
            context.showLoader(true);
            updateHotel(formatPayloadToSend())
                .then((result) => {
                    if (result.data.status === 200) {
                        setOpen(false);
                        cleanHotelState();
                        reload();
                        context.changeResultSuccessMessage('Enregistrement effectué');
                        context.showResultSuccess(true);
                    }
                    else if (result.data.errors) {
                        const item = Object.keys(result.data.errors).filter((e, i) => i === 0)[0];
                        const indication = result.data.errors[item];
                        const message = `${item}: ${indication}`;
                        context.showLoader(false);
                        context.changeResultErrorMessage(message);
                        context.showResultError(true);
                    }
                })
                .catch(() => {
                    context.showLoader(false);
                    context.changeResultErrorMessage('Enregistrement non effectué');
                    context.showResultError(true);
                })

        }
    };
    const handleClickOpen = () => {
        setOpen(true);
        
        console.log(row);
        setHotel({
            "name": row.name,
            "link": row.link,
            "phone_number": row.phoneNum,
            "email_address": row.emailAddress,
            "check_in": row.checkIn,
            "check_out": row.checkOut,
            "address": row.address,
            "min_baby_age": row.minBabyAge,
            "max_baby_age": row.maxBabyAge,
            "min_kid_age": row.minKidAge,
            "max_kid_age": row.maxKidAge,
            "tourist_sticker": row.vignette,
            "is_tva_included": row.isTVAIncluded?'true':'false',
            "tva": row.TVA,
            "location_lat": row.location.lat,
            "location_lng": row.location.lng,
        });
    };

    const handleClose = () => {
        setOpen(false);
        cleanHotelState();
        reload();
    };

    return (
        <>
            <CustomizedIconButton variant="contained" onClick={handleClickOpen}>
                <Iconify icon="eva:edit-fill" width={20} height={20} color="rgba(140, 159, 177, 1)" />
            </CustomizedIconButton>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} sx={{ overflowY: "inherit !important", }}>
                <CustomizedDialogTitle text="Modifier hotel" />
                <DialogContent sx={{ backgroundColor: '#E8F0F8', pr: 2, pl: 2, overflowX: 'inherit !important' }}>
                    <Stack justifyContent="space-between"
                        alignItems="flex-start"
                        direction={{ xs: 'column' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        sx={{ p: 2, width: 1 }}
                    >
                        <Stack direction='row' spacing={2} alignItems='flex-start'>
                            <CustomizedInput
                                defaultValue={row.name}
                                placeholder="nom"
                                sx={{ width: 1 }}
                                id="nom"
                                label="Nom"
                                name='name'
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
                                defaultValue={row.link}
                                placeholder="ex: www.nom-de-domaine.com"
                                sx={{ width: 1 }}
                                id="Lien"
                                label="Lien"
                                name='link'
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
                        <Stack direction='row' spacing={2} alignItems='flex-start'>
                            <CustomizedInput
                                defaultValue={row.phoneNum}
                                placeholder="telephone"
                                sx={{ width: 1 }}
                                id="Telephone"
                                label="Telephone"
                                name='phone_number'
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
                                defaultValue={row.emailAddress}
                                placeholder="ex: xxx@yyyy.com"
                                sx={{ width: 1 }}
                                id="Email"
                                label="Email"
                                name='email_address'
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
                        <Stack direction='row' spacing={2} alignItems='flex-start'>
                            <CustomizedInput
                                defaultValue={row.address}
                                placeholder='ex:  Alarobia Antananarivo Antananarivo, 101'
                                sx={{ width: 1 }}
                                id="Adresse"
                                label="Adresse"
                                name='address'
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
                                defaultValue={row.vignette}
                                placeholder="vignette touristique"
                                sx={{ width: 1 }}
                                id="Vignette touristique"
                                label="Vignette touristique"
                                name='tourist_sticker'
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
                        <h4>Photos</h4>
                        <Stack direction='row' spacing={2} alignItems='center'>
                            <CustomizedInput
                                sx={{ width: 1 }}
                                id="photos"
                                label="Ajouter photos"
                                type="file"
                                inputProps={{
                                    multiple: true
                                }}
                                onChange={handlePhotoChange}
                                fullWidth
                                required
                            />
                        </Stack>
                        <ListPicturePreview itemData={pictureList} setPictureList={setPictureList} />

                        <h4>Horaire</h4>
                        <Stack direction='row' spacing={2} alignItems='flex-start'>
                            <CustomizedInput
                                defaultValue={row.checkIn}
                                sx={{ width: 1 }}
                                label="checkIn"
                                name='check_in'
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
                                defaultValue={row.checkOut}
                                sx={{ width: 1 }}
                                label="checkOut"
                                name='check_out'
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

                        <h4>Votre tarifs inclus déjà la TVA ?</h4>
                        <Stack spacing={1} alignItems='flex-start' >
                            <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name='is_tva_included'>
                                <FormControlLabel
                                    control={<CustomizedRadio checked={hotel.is_tva_included === 'true'} />}
                                    onClick={handleChange}
                                    label="Oui"

                                    value='true'
                                />
                                <FormControlLabel
                                    control={<CustomizedRadio checked={hotel.is_tva_included === 'false'} />}
                                    onClick={handleChange}
                                    label="Non"
                                    value='false'
                                />
                            </RadioGroup>
                            {
                                hotel.is_tva_included === 'true' &&
                                <CustomizedInput
                                    defaultValue={row.TVA}
                                    placeholder='tva'
                                    sx={{ width: 1 }}
                                    label="Taxes communale"
                                    name='tva'
                                    type="number"
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.tva && {
                                        error: true,
                                        helpertext: errors.tva,
                                    })}
                                />
                            }

                        </Stack>
                        <h4>Age</h4>
                        <Stack spacing={1}>
                            <h5>Bebe:</h5>
                            <Stack direction='row' spacing={2} alignItems='flex-start'>
                                <CustomizedInput
                                    defaultValue={row.minBabyAge}
                                    placeholder='ex: 3 mois'
                                    sx={{ width: 1 }}
                                    label="A partir de"
                                    name='min_baby_age'
                                    type="number"
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.min_baby_age && {
                                        error: true,
                                        helpertext: errors.min_baby_age,
                                    })}
                                />
                                <CustomizedInput
                                    defaultValue={row.maxBabyAge}
                                    placeholder='ex: 2 ans'
                                    sx={{ width: 1 }}
                                    label="Jusqu'à"
                                    name='max_baby_age'
                                    type="number"
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    {...(errors.max_baby_age && {
                                        error: true,
                                        helpertext: errors.max_baby_age,
                                    })}
                                />
                            </Stack>
                        </Stack>
                        <Stack spacing={1}>
                            <h5>Enfant:</h5>
                            <Stack direction='row' spacing={2} alignItems='flex-start'>
                                <CustomizedInput
                                    defaultValue={row.minKidAge}
                                    placeholder='ex: 4 ans'
                                    sx={{ width: 1 }}
                                    label="A partir de"
                                    name='min_kid_age'
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
                                    defaultValue={row.maxKidAge}
                                    placeholder='ex: 11 ans'
                                    sx={{ width: 1 }}
                                    label="Jusqu'à"
                                    name='max_kid_age'
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
                        <h4>Coordonnées gps</h4>
                        <Stack spacing={1}>
                            <MapDialog hotel={hotel} setHotel={setHotel} />
                            <Stack direction='row' spacing={2} alignItems='center'>
                                <CustomizedInput
                                    sx={{ width: 1 }}
                                    value={hotel.location_lat}
                                    placeholder='ex: -18.147632345'
                                    label="Latitude"
                                    name='location_lat'
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
                                    placeholder='ex: 45.43244536456'
                                    label="Longitude"
                                    name='location_lng'
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
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#E8F0F8',height:'150px' }}>
                    <Stack direction='row' spacing={2} alignItems='flex-end' >
                        <Button onClick={handleClose} sx={{ fontSize: 12, height: '100%' }}>
                            Annuler
                        </Button>
                        <CustomizedButton text="Enregistrer" component={RouterLink} onClick={modifyHotel} to='#' />
                    </Stack>                
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModifyHotelDialog;