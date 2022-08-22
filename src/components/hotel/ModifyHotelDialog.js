import React, { useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { Dialog, DialogActions, DialogContent, Button, Stack, RadioGroup, FormControlLabel } from '@mui/material';

import MapDialog from './MapDialog';
import ListPicturePreview from './ListPicturePreview';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';

const ModifyHotelDialog = () => {
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
        if ('tva' in fieldValues && hotel.is_tva_included === 'true') temp.tva = fieldValues.tva ? '' : 'Ce champ est requis.';
        if ('location_lat' in fieldValues) temp.location_lat = fieldValues.location_lat ? '' : 'Ce champ est requis.';
        if ('location_lng' in fieldValues) temp.location_lng = fieldValues.location_lng ? '' : 'Ce champ est requis.';
        setErrors({
            ...temp,
        });
    };

    const formIsValid = (newHotel) => {
        const isValid = newHotel.name && Object.values(errors).every((x) => x === '');

        return isValid;
    };

    const formatPayloadToSend = () => {
        const payload = {
            "name": "adrhotel2(DUPLICATE)",
            "link": "adrhotel.com",
            "phoneNum": "0342379788",
            "emailAddress": "adrhotel@gmail.com",
            "checkIn": "12:00",
            "checkOut": "10:00",
            "address": "Soavimasoandro",
            "minBabyAge": 1,
            "maxBabyAge": 3,
            "minKidAge": 4,
            "maxKidAge": 9,
            "vignette": 5000,
            "isTVAIncluded": false,
            "TVA": 5000,
            "photo": ["data:image/jpeg;base64,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"],
            "location": { "lat": 1, "lng": 2 }
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <CustomizedButton onClick={handleClickOpen} text='Ajouter' variant="contained" component={RouterLink}
                to="#" />
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
                <DialogActions sx={{ backgroundColor: '#E8F0F8' }}>
                    <Button onClick={handleClose} sx={{ fontSize: 12, height: '100%' }}>
                        Annuler
                    </Button>
                    <CustomizedButton text="Enregistrer" component={RouterLink} to='#' />
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModifyHotelDialog;