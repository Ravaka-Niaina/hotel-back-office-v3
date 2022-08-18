import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import { Dialog, DialogActions, DialogContent, Button , Stack ,RadioGroup,FormControlLabel} from '@mui/material';

import MapDialog from './MapDialog';
import ListPicturePreview from './ListPicturePreview';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';

import Iconify from '../Iconify';

const AddHotelDialog = () => {
  const [open, setOpen] = useState(false);
  const [pictureList,setPictureList] = useState(new Array(0));


  const  handlePhotoChange = (e) => {
    const tmpPhoto = [];
    const tmpPreview = [];
    console.log(e.target.files);
    for (let i = 0; i < e.target.files.length; i+=1) {
      const u = i;
      const img = e.target.files[i];
      const r = /^image/;
      console.log(img.type);
      if (r.test(img.type)) {
        console.log('type image');
        const reader = new FileReader();
        reader.onload = (evt) => {
          tmpPhoto[i] = evt.target.result;
          tmpPreview[i] = evt.target.result;
          console.log(i);
          if (i === e.target.files.length-1) {
            setPictureList(tmpPreview);
            console.log(tmpPreview);
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
        <CustomizedDialogTitle text="Ajouter hotel" />
        <DialogContent sx={{ backgroundColor: '#E8F0F8', pr: 2, pl: 2}}>
          <Stack justifyContent="space-between"
            alignItems="flex-start"
            direction={{ xs: 'column' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ p: 2, width: 1 }}
          >
            <Stack direction='row' spacing={2} alignItems='center'>
              <CustomizedInput
                placeholder="Nom"
                sx={{ width: 1 }}
                id="nom"
                label="Nom"
                type="text"
                fullWidth
                required
              />
              <CustomizedInput
                placeholder="Lien"
                sx={{ width: 1 }}
                id="Lien"
                label="Lien"
                type="text"
                fullWidth
                required
              />
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center'>
              <CustomizedInput
                placeholder="Telephone"
                sx={{ width: 1 }}
                id="Telephone"
                label="Telephone"
                type="text"
                fullWidth
                required
              />
              <CustomizedInput
                placeholder="Email"
                sx={{ width: 1 }}
                id="Email"
                label="Email"
                type="text"
                fullWidth
                required
              />
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center'>
              <CustomizedInput
                placeholder="Adresse"
                sx={{ width: 1 }}
                id="Adresse"
                label="Adresse"
                type="text"
                fullWidth
                required
              />
              <CustomizedInput
                placeholder="Vignette touristique"
                sx={{ width: 1 }}
                id="Vignette touristique"
                label="Vignette touristique"
                type="text"
                fullWidth
                required
              />
            </Stack>
            <h4>Photos</h4>
            <ListPicturePreview itemData={pictureList}/>
            <Stack direction='row' spacing={2} alignItems='center'>
              <CustomizedInput
                sx={{ width: 1 }}
                id="Vignette touristique"
                label="checkIn"
                type="file"
                inputProps={{
                  multiple: true
                }}
                onChange={handlePhotoChange}
                fullWidth
                required
              />
            </Stack>
            <h4>Horaire</h4>
            <Stack direction='row' spacing={2} alignItems='center'>
              <CustomizedInput
                sx={{ width: 1 }}
                id="Vignette touristique"
                label="checkIn"
                type="time"
                fullWidth
                required
              />
              <CustomizedInput
                sx={{ width: 1 }}
                id="Vignette touristique"
                label="checkOut"
                type="time"
                fullWidth
                required
              />        
            </Stack>
            
            <h4>Votre tarifs inclus déjà la TVA ?</h4>
            <Stack spacing={1} alignItems='flex-start' >
              <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
                <FormControlLabel
                  control={<CustomizedRadio  />}
                  label="Oui"
                />
                <FormControlLabel
                  control={<CustomizedRadio  />}
                  label="Non"
                />
              </RadioGroup>
              <CustomizedInput
                sx={{ width: 1 }}
                id="Vignette touristique"
                label="Taxes communale"
                type="number"
                fullWidth
                required
              />
            </Stack>
            <h4>Age</h4>
            <Stack spacing={1}>
              <h5>Bebe:</h5>
              <Stack direction='row' spacing={2} alignItems='center'>
                  <CustomizedInput
                    placeholder='ex: 3 mois'
                    sx={{ width: 1 }}
                    label="A partir de"
                    type="number"
                    fullWidth
                    required
                  />
                  <CustomizedInput
                    placeholder='ex: 2 ans'
                    sx={{ width: 1 }}
                    label="Jusqu'à"
                    type="number"
                    fullWidth
                    required
                  />
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <h5>Enfant:</h5>
              <Stack direction='row' spacing={2} alignItems='center'>
                <CustomizedInput
                  placeholder='ex: 4 ans'
                  sx={{ width: 1 }}
                  label="A partir de"
                  type="number"
                  fullWidth
                  required
                />
                <CustomizedInput
                  placeholder='ex: 11 ans'
                  sx={{ width: 1 }}
                  label="Jusqu'à"
                  type="number"
                  fullWidth
                  required
                />
              </Stack>
            </Stack>
            <h4>Coordonnées gps</h4>
            <Stack spacing={1}>
              <MapDialog />
              <Stack direction='row' spacing={2} alignItems='center'>
                <CustomizedInput
                  sx={{ width: 1 }}
                  id="Vignette touristique"
                  label="Latitude"
                  type="number"
                  fullWidth
                  required
                />
                <CustomizedInput
                  sx={{ width: 1 }}
                  id="Vignette touristique"
                  label="Longitude"
                  type="number"
                  fullWidth
                  required
                />
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#E8F0F8' }}>
          <Button onClick={handleClose} sx={{ fontSize: 12 }}>
            Annuler
          </Button>
          <CustomizedButton text="Enregistrer" component={RouterLink} to='#'/>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddHotelDialog;
