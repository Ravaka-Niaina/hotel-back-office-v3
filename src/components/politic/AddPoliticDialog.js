import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types'
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
import Iconify from '../Iconify';

import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';

import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import { createPolitic } from '../../services/Politic';
import { ThemeContext } from '../context/Wrapper';

const AddPoliticDialog = ({ reload }) => {
  const context = useContext(ThemeContext);
  // Open or close the dialog
  const [open, setOpen] = useState(false);
  // State of the politic to create (in english)
  const [politic, setPolitic] = useState({
    frenchName: '',
    englishName: '',
    englishDescription: '',
    frenchDescription: '',
    type: 'jour',
    refundable: false,
    datePrice: [],
    state: 1,
  });

  // Function to format the 'datePrice' payload to give to the 'conditions' tab
  const formatToDatePricePayload = (obj) => {
    const datePricePayload = {
      date: obj?.date,
      pourcentage: obj?.percentage,
    };
    return datePricePayload;
  };

  // State of the conditions (if it's refundable) 
  // NOTE : CONDITIONS SHOULD BE PASSED INSIDE POLITIC.DATEPRICE
  const [conditions, setConditions] = useState([
    {
      ...formatToDatePricePayload({
        date: 0,
        percentage: 0,
      }),
    },
  ]);

  // Function to add a condition to 'conditions'
  const addToConditions = () => {
    const datePrice = {
      ...formatToDatePricePayload({
        date: 0,
        percentage: 0,
      }),
    };
    setConditions([...conditions, datePrice]);
  };

  // Function to remove from "conditions" the values that are undefined
  const reIndexingConditions = (conditions) => {
    let newConditions = [];
    for (let i = 0; i < conditions.length; i += 1) {
      if (conditions[i] !== undefined) {
        newConditions = [...newConditions, conditions[i]];
      }
    }
    return newConditions;
  };

  // Function to delete from conditions using reIndexingConditions to avoid null values
  const deleteFromConditions = (index) => {
    if (conditions.length > 0) {
      const newConditions = [...conditions];
      delete newConditions[index];
      setConditions(reIndexingConditions([...newConditions]));
    }
  };
  // Function that handles changes to conditions
  const handleChangeCondition = (index, e) => {
    const { name, value } = e.target
    setConditions([...(conditions.map((cond, key) => {
      if (index === key) {
        cond[name] = value
      }
      return cond;
    }))])
  }

  // UseEffect to set politics.datePrice to be values from conditions
  useEffect(() => {
    setPolitic((politic) => ({ ...politic, datePrice: [...conditions] }))
  }, [conditions]);

  // Function to format the payload to send to the politics state
  const formatPayloadToSend = async () => {
    const politicDatePrice = politic.datePrice;
    const politicRefundable = politic.refundable;
    let newPoliticDatePrice = []
    for (let i = 0; i < politicDatePrice.length; i += 1) {
      if (politicRefundable === "true" || politicRefundable === true) {
        if (politicDatePrice[i]?.date !== null && politicDatePrice[i]?.date > 0 && politicDatePrice[i]?.pourcentage !== null && politicDatePrice[i]?.pourcentage > 0) {
          newPoliticDatePrice = [...newPoliticDatePrice, conditions[i]];
        } else {
          throw Error("Le jour/heure et pourcentage doivent contenir une valeur supérieur à 0 et si la politique est remboursable")
        }
      } else {
        newPoliticDatePrice = [...newPoliticDatePrice, conditions[i]];
      }
    }
    // Si c'est vide
    if (newPoliticDatePrice.length <= 0) {
      if (politicRefundable === "false") {
        newPoliticDatePrice = [{
          date: 1,
          pourcentage: 1
        }]
      }
    }
    const newRefundableValue = politic.refundable === "true" || politic.refundable === true
    // Formated Payload
    const formatedPayload = {
      nom: politic.frenchName,
      name: politic.englishName,
      desc: politic.englishDescription,
      description: politic.frenchDescription,
      type: politic.type,
      datePrice: newPoliticDatePrice,
      remboursable: newRefundableValue,
      etat: politic.state,
    };
    return formatedPayload;
  };

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to format a string to have the first letter uppercase
  const formatLabel = (str) => {
    const res = str.replace(str[0], str[0].toUpperCase())
    return res
  }
  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function that handles the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolitic((politic) => ({ ...politic, [name]: value }));
  };

  // UseEffect to console politic state each time it changes

  // Fonction pour enregistrer un politique
  const addPolitic = () => {
    context.showLoader(true)
    formatPayloadToSend().then((politicToAdd) => {
      createPolitic(politicToAdd).then((datas) => {
        const status = datas?.data?.status
        if (status) {
          if (status === 200) {
            context.changeResultSuccessMessage(`Politique ajoutée avec succès`)
            context.showResultSuccess(true)
          } else {
            context.showLoader(false)
            context.changeResultErrorMessage(`Une erreur est survenue`)
            context.showResultError(true)
          }
        }
      }).catch(() => {
        context.showLoader(false)
        context.changeResultErrorMessage('Une erreur est survenue')
        context.showResultError(true)
      }).finally(() => {
        setOpen(false)
        reload()
      })
    }).catch(err => {
      context.showLoader(false)
      context.changeResultErrorMessage(err.message)
      context.showResultError(true)
    }).finally(() => {
    })
  }
  // Composant à afficher remboursable est coché
  const PoliticConditionsComponent = (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: 800, textDecoration: 'underline' }}>
        Précisez les conditions
      </Typography>
      <RadioGroup name="type" onChange={handleChange} defaultValue="jour" row>
        <FormControlLabel value="jour" control={<CustomizedRadio />} label="Jour" />
        <FormControlLabel value="heure" control={<CustomizedRadio />} label="Heure" />
      </RadioGroup>
      <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
        {conditions &&
          conditions.map(
            (data, key) =>
              data && (
                <div key={key}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {politic?.type && <CustomizedInput type="number" name="date" value={conditions[key]?.date} onChange={(e) => handleChangeCondition(key, e)} label={formatLabel(politic?.type)} />}
                    <CustomizedInput type="number" name="pourcentage" value={conditions[key]?.pourcentage} onChange={(e) => handleChangeCondition(key, e)} label={'Pourcentage'} />
                    <CustomizedIconButton
                      // variant="contained"
                      onClick={() => {
                        deleteFromConditions(key);
                      }}
                    >
                      <Iconify icon="eva:trash-2-fill" width={20} height={20} color="rgba(140, 159, 177, 1)" />
                    </CustomizedIconButton>
                  </Stack>
                </div>
              )
          )}
        <Button onClick={addToConditions} variant="contained" sx={{ fontSize: 25 }}>
          +
        </Button>
        <></>
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
          <RadioGroup name="refundable" onChange={handleChange} value={politic?.refundable} row>
            <FormControlLabel value="true" control={<CustomizedRadio />} label="Oui" />
            <FormControlLabel value="false" control={<CustomizedRadio />} label="Non" />
          </RadioGroup>
          {politic?.refundable === 'true' && <>{PoliticConditionsComponent}</>}
          <Typography variant="subtitle1" sx={{ fontWeight: 800, textDecoration: 'underline', mb: 2 }}>
            Informations sur la politique d'annulation
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <CustomizedInput name="frenchName" value={politic?.frenchName} onChange={handleChange} label={'Nom en français'} />
            <CustomizedInput name="englishName" value={politic?.englishName} onChange={handleChange} label={'Nom en anglais'} />
          </Stack>
          <Stack sx={{ mb: 2 }}>
            <CustomizedInput name="frenchDescription" value={politic?.frenchDescription} onChange={handleChange} label={'Description'} multiline />
            <CustomizedInput name="englishDescription" value={politic?.englishDescription} onChange={handleChange} label={'Description en anglais'} multiline />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#E8F0F8', borderTop: "1px solid grey" }}>
          <Button onClick={handleClose} sx={{ fontSize: 12 }}>
            Annuler
          </Button>
          <CustomizedButton onClick={addPolitic} text="Enregistrer" />
        </DialogActions>
      </Dialog>
    </>
  );
};

AddPoliticDialog.propTypes = {
  reload: PropTypes.any
}
export default AddPoliticDialog;
