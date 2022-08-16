import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// material
import { ListItemText, Stack, Button, Dialog, DialogActions, DialogContent } from '@mui/material';

// components
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import { ThemeContext } from '../context/Wrapper';
import Iconify from '../Iconify';

// Nesoriko leh prop row (Cedric)
const ModifyRoomTypeDialog = ({ row }) => {
  const context = useContext(ThemeContext);
  const [open, setOpen] = React.useState(false);
  const errors = {};
  const [roomType, setRoomType] = useState(null);
  useEffect(() => {
    setRoomType(row)
  }, [row]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleChange = (e) => {
  // const { name, value } = e.target;
  // setPromotion((promotion) => ({ ...promotion, [name]: value }));
  // validate({ [name]: value });
  // formIsValid({
  //   ...promotion,
  //   [name]: value,
  // });
  // };

  const modifyPromotion = async () => {
    context.showLoader(false);
  };
  //   const validate = (fieldValues) => {
  //     const temp = { ...errors };

  //     if ('name' in fieldValues) temp.name = fieldValues.name ? '' : 'Ce champ est requis.';

  //     setErrors({
  //       ...temp,
  //     });
  //   };

  // const isPromotionEqual = (object1, object2) => {
  //   const isEqual = object1.name === object2.name;
  //   return isEqual;
  // };

  // const formIsValid = (newPromotion) => {
  // const isEqual = isPromotionEqual(oldPromotion, newPromotion);
  // if (!isEqual) {
  //   const isValid = promotion.name && Object.values(errors).every((x) => x === '');
  //   setDisabledModifyButton(isValid);
  // } else {
  //   setDisabledModifyButton(false);
  // }
  // };

  return (
    <>
      <CustomizedIconButton variant="contained" onClick={handleClickOpen}>
        <Iconify icon="eva:edit-fill" width={20} height={20} color="rgba(140, 159, 177, 1)" />
      </CustomizedIconButton >
      <Dialog open={open} onClose={handleClose} maxWidth={'xl'}>
        <CustomizedDialogTitle text={`Modifier le type de chambre " ${roomType && roomType.nom} "`} />

        <DialogContent style={{ backgroundColor: '#E8F0F8', paddingTop: 15 }}>
          <Stack sx={{ p: 2 }} direction="row" spacing={2}>
            <CustomizedInput
              placeholder="nom"
              // onChange={handleChange}
              error={false}
              margin="dense"
              id="nom"
              name="nom"
              label="nom"
              type="text"
              fullWidth
              required
              defaultValue={roomType && roomType.nom}
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
            <CustomizedInput
              placeholder="name"
              // onChange={handleChange}
              error={false}
              margin="dense"
              id="name"
              name="name"
              label="name"
              type="text"
              fullWidth
              required
              defaultValue={roomType && roomType.nom}
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
          </Stack>
          <Stack sx={{ p: 2 }} direction="row" spacing={2}>
            <CustomizedInput
              placeholder="Superficie"
              // onChange={handleChange}
              error={false}
              margin="dense"
              id="superficie"
              name="superficie"
              label="superficie"
              type="text"
              fullWidth
              required
              defaultValue={roomType && roomType.superficie}
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
            <CustomizedInput
              placeholder="nombre d'étage"
              // onChange={handleChange}
              error={false}
              margin="dense"
              id="etage"
              name="etage"
              label="nombre d'étage"
              type="number"
              fullWidth
              required
              defaultValue={roomType && roomType.etage}
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
          </Stack>
          <h4>Occupation</h4>
          <Stack sx={{ p: 2 }} direction="row" spacing={2}>
            <CustomizedInput
              placeholder="nombre d'adulte"
              // onChange={handleChange}
              error={false}
              margin="dense"
              id="nombre_adulte"
              name="nombre_adulte"
              label="nombre d'adulte"
              type="text"
              fullWidth
              required
              defaultValue={roomType && roomType.nbAdulte}
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
            <CustomizedInput
              placeholder="nombre d'enfant"
              // onChange={handleChange}
              error={false}
              margin="dense"
              id="nombre_enfant"
              name="nombre_enfant"
              label="nombre d'enfant"
              type="text"
              fullWidth
              required
              defaultValue={roomType && roomType.nbEnfant}
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
          </Stack>
          <h4>Description</h4>
          <Stack sx={{ p: 2 }} direction="column" spacing={2}>
            <CustomizedInput
              placeholder="description"
              // onChange={handleChange}
              error={false}
              margin="dense"
              id="description"
              name="description"
              label="description"
              type="text"
              fullWidth
              required
              multiline
              defaultValue={roomType && roomType.description}
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
            <CustomizedInput
              placeholder="description en anglais"
              // onChange={handleChange}
              error={false}
              margin="dense"
              id="description_anglais"
              name="description_anglais"
              label="Description en anglais"
              type="text"
              fullWidth
              required
              multiline
              defaultValue={roomType && roomType.description}
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#E8F0F8' }}>
          <Button onClick={handleClose}>Annuler</Button>
          <CustomizedButton handleClick={modifyPromotion} text={`Valider`} />
        </DialogActions>
      </Dialog>
    </>
  );
};

ModifyRoomTypeDialog.propTypes = {
  row: PropTypes.any,
};
export default ModifyRoomTypeDialog;
