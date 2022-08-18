import React, { useState, useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  FormControlLabel,
  RadioGroup,
  Typography,
  Stack,
} from '@mui/material';

import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';

import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';

const AddPoliticDialog = () => {
  const [open, setOpen] = useState(false);
  const [politic, setPolitic] = useState({
    frenchName: '',
    englishName: '',
    englishDescription: '',
    frenchDescription: '',
    type: '',
    refundable: false,
    datePrice: [],
    state: 1,
  });

  const dataPricePayload = {
    date: '',
    pourcentage: '',
  };

  const formatPayloadToSend = () => {
    const formatedPayload = {
      nom: politic.frenchName,
      name: politic.englishName,
      desc: politic.englishDescription,
      description: politic.frenchDescription,
      type: politic.type,
      datePrice: politic.datePrice,
      remboursable: politic.refundable,
      etat: politic.state,
    };
    return formatedPayload;
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolitic((politic) => ({ ...politic, [name]: value }));
    // setAccessRight((accessRight) => ({ ...accessRight, [name]: value }));
    // validate({ [name]: value });
    // formIsValid({
    //   ...accessRight,
    //   [name]: value,
    // });
  };
  useEffect(() => {
    console.log(politic);
  }, [politic]);
  const PoliticConditionsComponent = (
    <>
      <h4>Précisez les conditions</h4>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <CustomizedInput label={'Jour'} />
      </Stack>
    </>
  );
  return (
    <>
      <CustomizedButton text="Ajouter" onClick={handleClickOpen} component={RouterLink} to="#" />
      <Dialog open={open} onClose={handleClose} maxWidth={'xl'}>
        <CustomizedDialogTitle text="Ajouter politique d'annulation" />
        <DialogContent style={{ backgroundColor: '#E8F0F8', paddingTop: 15 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, textDecoration: 'underline' }}>
            Préférence d'annulation
          </Typography>
          <Typography>Il y a-t-il une période pendant laquelle le client peut annuler gratuitement?</Typography>
          <RadioGroup name="refundable" onChange={handleChange} defaultValue="Oui" row>
            <FormControlLabel value="true" control={<CustomizedRadio />} label="Oui" />
            <FormControlLabel value="false" control={<CustomizedRadio />} label="Non" />
          </RadioGroup>
          {politic?.refundable === 'true' && <>{PoliticConditionsComponent}</>}
          <Typography variant="subtitle1" sx={{ fontWeight: 800, textDecoration: 'underline', mb: 2 }}>
            Informations sur la politique d'annulation
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <CustomizedInput label={'Nom en français'} />
            <CustomizedInput label={'Nom en anglais'} />
          </Stack>
          <Stack sx={{ mb: 2 }}>
            <CustomizedInput label={'Description'} multiline />
            <CustomizedInput label={'Description en anglais'} multiline />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#E8F0F8' }}>
          <Button onClick={handleClose} sx={{ fontSize: 12 }}>
            Annuler
          </Button>
          <CustomizedButton text="Enregistrer" />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPoliticDialog;
