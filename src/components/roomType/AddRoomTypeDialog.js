import { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
// components
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import Iconify from '../Iconify';
import AddImageCrop from './AddImageCrop';

const AddRoomTypeDialog = () => {
  const [open, setOpen] = useState(false);
  // const [errors, setErrors] = useState({});
  const errors = {};
  const [roomType, setRoomType] = useState({
    nameInFrench: '',
    nameInEnglish: '',
    numberOfRoom: '',
    areaSize: '',
    stageNumber: '',
    adultNumber: '',
    childNumber: '',
    descriptionInFrench: '',
    descriptionInEnglish: '',
    tariffPlan: [],
    equipments: [],
    videos: [],
    photo: [],
    imgCrop: '',
  });

  const addCropedImage = useCallback((cropedImage) => {
    setRoomType((roomType) => ({ ...roomType, imgCrop: cropedImage }));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setRoomType((roomType) => ({ ...roomType, [name]: value }));
    // validate({ [name]: value });
    // formIsValid({
    //   ...accessRight,
    //   [name]: value,
    // });
  };
  useEffect(() => {
    // console.log(roomType)
  }, [roomType]);

  const addRoomType = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomizedButton onClick={handleClickOpen} text={`Ajouter`} />
      <Dialog open={open} onClose={handleClose} maxWidth={'xl'}>
        <CustomizedDialogTitle text="Ajouter un nouveau type de chambre" />

        <DialogContent style={{ backgroundColor: '#E8F0F8', paddingTop: 15 }}>
          <Stack sx={{ p: 2 }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <CustomizedInput
              placeholder="nom"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="nom"
              name="nameInFrench"
              label="Nom"
              type="text"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
            <CustomizedInput
              placeholder="name"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="name"
              name="nameInEnglish"
              label="Name"
              type="text"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
          </Stack>
          <Stack sx={{ p: 2 }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <CustomizedInput
              placeholder="Nombre de chambre"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="nombre_de_chambre"
              name="numberOfRoom"
              label="Nombre de chambre"
              type="number"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
            <CustomizedInput
              placeholder="Superficie"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="superficie"
              name="areaSize"
              label="Superficie"
              type="text"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
            <CustomizedInput
              placeholder="nombre d'étage"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="etage"
              name="stageNumber"
              label="Nombre d'étage"
              type="text"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
          </Stack>
          <h4>Occupation</h4>
          <Stack sx={{ p: 2 }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <CustomizedInput
              placeholder="nombre d'adulte"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="nombre_adulte"
              name="adultNumber"
              label="Nombre d'adulte"
              type="text"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
            <CustomizedInput
              placeholder="nombre d'enfant"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="nombre_enfant"
              name="childNumber"
              label="Nombre d'enfant"
              type="text"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
          </Stack>
          <h4>Description</h4>
          <Stack sx={{ p: 2 }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <CustomizedInput
              placeholder="description"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="description"
              name="descriptionInFrench"
              label="Description"
              type="text"
              fullWidth
              required
              multiline
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
            <CustomizedInput
              placeholder="description en anglais"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="description_anglais"
              name="descriptionInEnglish"
              label="Description en anglais"
              type="text"
              fullWidth
              required
              multiline
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
          </Stack>
          <h4>Choisir une image pour l'aperçu de la chambre</h4>
          <Stack sx={{ p: 2 }} direction="row" spacing={2}>
            <AddImageCrop addCropedImage={addCropedImage} />
          </Stack>
          <h4>Images de la chambre</h4>
          <Stack sx={{ p: 2 }} direction="row" spacing={2}>
            <CustomizedButton text={`Choisir à partir de la gallerie`} />
            <CustomizedButton text={`Uploader une image`} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#E8F0F8' }}>
          <Button onClick={handleClose}>Annuler</Button>
          <CustomizedButton onClick={addRoomType} text={`Valider`} />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddRoomTypeDialog;
