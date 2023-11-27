import React, { useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink } from "react-router-dom";
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';
import { modifyPolitic } from '../../services/Politic';
import { fetchListLanguages } from '../../services/Common';
import { ThemeContext } from '../context/Wrapper';

import Iconify from '../Iconify';

const ModifyPoliticDialog = ({ reload, politic: politicToModify }) => {

  const context = useContext(ThemeContext);
  // Open or close the dialog
  const [open, setOpen] = useState(false);
  // State of the politic to create (in english)
  const [politic, setPolitic] = useState({
    names: politicToModify?.names,
    descriptions: politicToModify?.descriptions,
    type: politicToModify?.type,
    refundable: politicToModify?.remboursable,
    datePrice: politicToModify?.datePrice,
    state: politicToModify?.etat,
  });

  // State of the errors
  const [errors, setErrors] = useState(false);

  const [languages, setLanguages] = useState([]);

  const [tabNameValue, setTabNameValue] = useState(0);
  const [choosedNameLanguageAbbrev, setChoosedNameLanguageAbbrev] = useState('');

  const [tabDescriptionValue, setTabDescriptionValue] = useState(0);
  const [choosedDescriptionLanguageAbbrev, setChoosedDescriptionLanguageAbbrev] = useState('');

  const handleChangeNameValue = (e) => {
    const tempPolitic = { ...politic};
    tempPolitic.names[choosedNameLanguageAbbrev] = e.target.value;
    setPolitic(tempPolitic);

    if (e.target.value.trim() === '') {
      setErrors({
        ...errors,
        names: 'Il manque un ou plusieurs noms',
      });
    } else if (errors.names) {
      setErrors({
        ...errors,
        names: '',
      });
    }
  };

  const handleChangeTabNameValue = (event: React.SyntheticEvent, newValue: number) => {
    setTabNameValue(newValue);
    setChoosedNameLanguageAbbrev(Object.keys(politic.names)[newValue]);
  };

  const getMissingLanguages = useCallback(async (names, descriptions) => {
    const result = await fetchListLanguages();
    setLanguages(result.data.listLanguages);
    const tempLanguagesContent = {};
    result.data.listLanguages.forEach(language => {
      tempLanguagesContent[language.abbrev] = '';
    });

    const tempNames = {...tempLanguagesContent};
    const tempDescriptions = {...tempLanguagesContent};

    if (!names || !descriptions) {
      return { names: tempNames, descriptions: tempDescriptions };
    }

    const languagesAbbrevForName = Object?.keys(names);
    languagesAbbrevForName.forEach(languageAbbrev => {
      tempNames[languageAbbrev] = names[languageAbbrev];
    });
    
    const languagesAbbrevForDesc = Object?.keys(descriptions);
    languagesAbbrevForDesc.forEach(languageAbbrev => {
      tempDescriptions[languageAbbrev] = descriptions[languageAbbrev];
    });

    setChoosedDescriptionLanguageAbbrev(result.data.listLanguages[0].abbrev);
    setChoosedNameLanguageAbbrev(result.data.listLanguages[0].abbrev);

    return { names: tempNames, descriptions: tempDescriptions };
  }, [politic]);

  const handleChangeLanguage = (event: React.SyntheticEvent, newValue: number) => {
    setTabDescriptionValue(newValue);
    setChoosedDescriptionLanguageAbbrev(Object.keys(politic.descriptions)[newValue]);
  };

  const handleChangeDescriptionValue = (e) => {
    const tempPolitic = { ...politic};
    tempPolitic.descriptions[choosedDescriptionLanguageAbbrev] = e.target.value;
    setPolitic(tempPolitic);

    if (e.target.value.trim() === '') {
      setErrors({
        ...errors,
        descriptions: 'Il manque une ou plusieurs descriptions',
      });
    } else if (errors.descriptions) {
      setErrors({
        ...errors,
        descriptions: '',
      });
    }
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  // Function to validate input fields
  const validate = (fieldValues) => {
    const temp = { ...errors };
    // For example : temp.nom is handling the string that contains the errors for the field nom
    // There is no error if temp.field is ''
    const languagesAbbrev = Object.keys(fieldValues.names);
    for (let i = 0; i < languagesAbbrev.length; i +=1) {
      if (!fieldValues.names[languagesAbbrev[i]].trim()) {
        temp.names = 'Il manque un ou plusieurs noms';
        break;
      }
    }

    for (let i = 0; i < languagesAbbrev.length; i +=1) {
      if (!fieldValues.descriptions[languagesAbbrev[i]].trim()) {
        temp.descriptions = 'Il manque une ou plusieurs descriptions';
        break;
      }
    }
    if ('type' in fieldValues) {
      temp.type = fieldValues.type ? '' : 'Ce champ est requis.';
    }
    setErrors({
      ...temp,
    });
  };
  // Function returning true if there is no error , otherwise it'll return false
  const formIsValid = (newPolitic) => {
    const languagesAbbrev = Object.keys(newPolitic.names);
    let areNamesOK = true;
    for (let i = 0; i < languagesAbbrev.length; i += 1) {
      if (!newPolitic.names[languagesAbbrev[i]].trim()) {
        areNamesOK = false;
        break;
      }
    }

    let areDescriptionsOK = true;
    for (let i = 0; i < languagesAbbrev.length; i += 1) {
      if (!newPolitic.descriptions[languagesAbbrev[i]].trim()) {
        areDescriptionsOK = false;
        break;
      }
    }
    
    const testEveryField = () => {
      let test = false;
      if (areNamesOK && areDescriptionsOK && newPolitic.type && newPolitic.refundable !== null && newPolitic.refundable !== undefined && newPolitic.datePrice) {
        test = true
      } else {
        test = false;
      }
      return test;
    }
    const isValid = testEveryField() && Object.values(errors).every((x) => x === '');
    return isValid;
  };

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
  const [conditions, setConditions] = useState(
    politicToModify?.datePrice?.length > 0 ? [...politicToModify?.datePrice] : [{
      date: 0,
      pourcentage: 0
    }]
  );

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
    getMissingLanguages(politic.names, politic.descriptions)
    .then(result => {
      setPolitic({
        ...politic,
        names: result.names,
        descriptions: result.descriptions,
        datePrice: [...conditions],
      });
    });
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
    newPoliticDatePrice.forEach((datePrice) => {
      datePrice.pourcentage = Number.parseFloat(datePrice.pourcentage);
    });

    const newRefundableValue = politic.refundable === "true" || politic.refundable === true
    // Formated Payload
    const formatedPayload = {
      names: politic.names,
      descriptions: politic.descriptions,
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
    validate({ [name]: value })
  };

  // UseEffect to console politic state each time it changes

  // Fonction pour enregistrer un politique
  const handleModifyPolitic = () => {
    validate(politic)
    if (formIsValid(politic)) {
      const idPoliticToModify = politicToModify?._id
      context.showLoader(true)
      formatPayloadToSend().then((newPolitic) => {
        modifyPolitic(newPolitic, idPoliticToModify).then(results => {
          const { status } = results.data
          if (status === 200) {
            context.changeResultSuccessMessage(`Politique modifiée avec succès`)
            context.showResultSuccess(true)
            setOpen(false)
            reload();
          } else {
            context.showLoader(false)
            context.changeResultErrorMessage(`Une erreur est survenue lors de la modification de la politique d'annulation.`)
            context.showResultError(true)
          }
        }).finally(() => {

        })
      }).catch(err => {
        context.showLoader(false)
        context.changeResultErrorMessage(err.message)
        context.showResultError(true)
      })
    } else {
      context.showLoader(false)
      context.changeResultErrorMessage('Veuillez remplir tous les champs !')
      context.showResultError(true)
    }

  }
  // Composant à afficher remboursable est coché
  const PoliticConditionsComponent = (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: 800, textDecoration: 'underline' }}>
        Précisez les conditions
      </Typography>
      <RadioGroup name="type" onChange={handleChange} value={politic?.type} row>
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
        <CustomizedButton text="+" onClick={addToConditions} component={RouterLink} to="#"/>
        <></>
      </Stack>
    </>
  );
  
  return (
    <>
      <CustomizedIconButton variant="contained" onClick={handleClickOpen}>
        <Iconify icon="eva:edit-fill" width={20} height={20} color="rgba(140, 159, 177, 1)" />
      </CustomizedIconButton >
      <Dialog open={open} onClose={handleClose} maxWidth={'xl'}>
        <CustomizedDialogTitle text="Modifier politique d'annulation" />
        <DialogContent style={{ backgroundColor: '#E8F0F8', paddingTop: 15 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, textDecoration: 'underline' }}>
            Préférence d'annulation
          </Typography>
          <Typography>Il y a-t-il une période pendant laquelle le client peut annuler gratuitement?</Typography>
          <RadioGroup name="refundable" onChange={handleChange} value={politic?.refundable} row>
            <FormControlLabel value control={<CustomizedRadio />} label="Oui" />
            <FormControlLabel value={false} control={<CustomizedRadio />} label="Non" />
          </RadioGroup>
          {politic?.refundable === true && <>{PoliticConditionsComponent}</>}
          {politic?.refundable === "true" && <>{PoliticConditionsComponent}</>}

          <Typography variant="subtitle1" sx={{ fontWeight: 800, textDecoration: 'underline', mb: 2 }}>
            Informations sur la politique d'annulation
          </Typography>
          <Stack>
            <CustomizedTitle text="Nom" size={16} style={{ marginBottom: '-20px' }} />
            <Stack sx={{ p: 2 }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Tabs 
                value={tabNameValue} 
                onChange={handleChangeTabNameValue} 
                aria-label="basic tabs example"
              >
                {languages.map((language, index) => 
                  <Tab key={language.abbrev} label={language.name} {...a11yProps(index)} />
                )}
              </Tabs>
            </Stack>
            <CustomizedInput
              name="frenchName"
              value={politic.names?.[choosedNameLanguageAbbrev]}
              onChange={handleChangeNameValue}
              {...(errors.frenchName && {
                error: true,
                helpertext: errors.frenchName,
              })}
              placeholder="Nom"
              {...(errors.names && {
                  error: true,
                  helpertext: errors.names,
                })}
              required
            />
          </Stack>
          <Stack>
            <CustomizedTitle 
              text="Description" 
              size={16} style={{ marginBottom: '-20px', marginTop: '20px' }} 
            />
            <Stack sx={{ p: 2 }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Tabs 
                value={tabDescriptionValue} 
                onChange={handleChangeLanguage} 
                aria-label="basic tabs example"
              >
                {languages.map((language, index) => 
                  <Tab key={language.abbrev} label={language.name} {...a11yProps(index)} />
                )}
              </Tabs>
            </Stack>
            <CustomizedInput
              name="frenchDescription"
              value={politic.descriptions?.[choosedDescriptionLanguageAbbrev]}
                onChange={handleChangeDescriptionValue}
              // label={'Description'}
              multiline
              required
              {...(errors.descriptions && {
                  error: true,
                  helpertext: errors.descriptions,
              })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#E8F0F8',  height: '150px'}}>
          <Button onClick={handleClose} sx={{ fontSize: 12 }}>
            Annuler
          </Button>
          <CustomizedButton onClick={handleModifyPolitic} text="Enregistrer" component={RouterLink} to="#"/>
        </DialogActions>
      </Dialog>
    </>
  );
};
ModifyPoliticDialog.propTypes = {
  reload: PropTypes.any,
  politic: PropTypes.any,
};
export default ModifyPoliticDialog;
