import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  FormControlLabel,
  RadioGroup,
  FormGroup,
  FormLabel,
  Button,
  Stack,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fetchListLanguages } from '../../services/Common';
import { ThemeContext } from '../context/Wrapper';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedCheckbox from '../CustomizedComponents/CustomizedCheckbox';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import { lightBackgroundToTop } from '../CustomizedComponents/NeumorphismTheme';
import { formatDate } from '../../services/Util';
import { getRoomTypeAndCancelingPoliticList, createRatePlan } from '../../services/RatePlan';

const AddRatePlanDialog = ({ reload , navigate}) => {
  const context = useContext(ThemeContext);
  const [errors, setErrors] = useState(false);
  const [ratePlan, setRatePlan] = useState({
    names: '',
    descriptions: '',
    booking_all_time: 'true',
    start_date_of_booking: formatDate(new Date().toLocaleDateString('en-US')),
    end_date_of_booking: formatDate(new Date().toLocaleDateString('en-US')),
    start_date_of_stay: formatDate(new Date().toLocaleDateString('en-US')),
    end_date_of_stay: formatDate(new Date().toLocaleDateString('en-US')),
    no_end_date_of_stay: true,
    no_lead_min: true,
    lead_min: 99999,
    lead_max: 1,
    is_lead_hour: 'true',
    assigned_room: [],
    assigned_canceling_politic: [],
  });

  const [listRoom, setListRoom] = useState(new Array(0));
  const [listPolitic, setListPolitic] = useState(new Array(0));

  const [languages, setLanguages] = useState([]);

  const [tabNameValue, setTabNameValue] = useState(0);
  const [choosedNameLanguageAbbrev, setChoosedNameLanguageAbbrev] = useState('');

  const [tabDescriptionValue, setTabDescriptionValue] = useState(0);
  const [choosedDescriptionLanguageAbbrev, setChoosedDescriptionLanguageAbbrev] = useState('');
  const getListLanguages = () => {
    fetchListLanguages()
    .then(result => {
      setLanguages(result.data.listLanguages);
      const tempLanguagesContent = {};
      result.data.listLanguages.forEach(language => {
        tempLanguagesContent[language.abbrev] = '';
      });
      setRatePlan({
        ...ratePlan,
        names: {...tempLanguagesContent},
        descriptions: {...tempLanguagesContent},
      });
      setChoosedDescriptionLanguageAbbrev(result.data.listLanguages[0].abbrev);
      setChoosedNameLanguageAbbrev(result.data.listLanguages[0].abbrev);
    });
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    getItems();
    getListLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getItems = () => {
    context.showLoader(true);
    getRoomTypeAndCancelingPoliticList()
      .then((result) => {
        if (result.data.listType) {
          setListRoom(result.data.listType);
          setListPolitic(result.data.listPolitique);
        }
      })
      .catch(() => {
        context.changeResultErrorMessage(`La liste des type de chambre  n'a pas pu être chargé`);
        context.showResultError(true);
      })
      .finally(() => {
        context.showLoader(false);
      });
  };
  const handleChangeAssignedList = (id, field) => {
    const ratePlanTemp = ratePlan;
    const newSelected = [];
    if (ratePlanTemp[field].find((elem) => elem === id) === undefined) {
      newSelected.push(id);
    }
    ratePlanTemp[field].forEach((e) => {
      if (e !== id) {
        newSelected.push(e);
      }
    });
    ratePlanTemp[field] = newSelected;
    setRatePlan({ ...ratePlanTemp });
  };
  const handleChange = (e) => {
    const temp = ratePlan;
    const { name, value } = e.target;
    temp[name] = value;
    setRatePlan({ ...temp });
    validate({ [name]: value });
    formIsValid({
      ...ratePlan,
      [name]: value,
    });
  };

  const validate = (fieldValues) => {
    const temp = { ...errors };
    
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

    if ('lead_min' in fieldValues && !ratePlan.no_lead_min)
      temp.lead_min = fieldValues.lead_min ? '' : 'Ce champ est requis.';
    if ('lead_max' in fieldValues && !ratePlan.no_lead_min)
      temp.lead_max = fieldValues.lead_max ? '' : 'Ce champ est requis.';

    setErrors({
      ...temp,
    });
  };

  const formIsValid = (newRatePlan) => {
    const languagesAbbrev = Object.keys(newRatePlan.names);
    let areNamesValid = true;
    for (let i = 0; i < languagesAbbrev.length; i += 1) {
      if (!newRatePlan.names[languagesAbbrev[i]].trim()) {
        areNamesValid = false;
        break;
      }
    }

    let areDescriptionsValid = true;
    for (let i = 0; i < languagesAbbrev.length; i += 1) {
      if (!newRatePlan.descriptions[languagesAbbrev[i]].trim()) {
        areDescriptionsValid = false;
        break;
      }
    }

    const isValid =
      areNamesValid &&
      areDescriptionsValid &&
      (newRatePlan.lead_min || newRatePlan.no_lead_min) &&
      (newRatePlan.lead_max || newRatePlan.no_lead_min) &&
      Object.values(errors).every((x) => x === '');
    return isValid;
  };

  const formatPayloadToSend = () => {
    const payloadToSend = {
      names: ratePlan.names,
      descriptions: ratePlan.descriptions,
      dateReservation: {
        debut: ratePlan.booking_all_time === 'true' ? '' : ratePlan.start_date_of_booking,
        fin: ratePlan.booking_all_time === 'true' ? '' : ratePlan.end_date_of_booking,
      },
      dateSejour: {
        debut: ratePlan.start_date_of_stay,
        fin: ratePlan.no_end_date_of_stay ? '' : ratePlan.end_date_of_stay,
      },
      isLeadHour: ratePlan.is_lead_hour === 'true',
      lead: {
        min: ratePlan.no_lead_min ? null : ratePlan.lead_min,
        max: ratePlan.no_lead_min ? 1 : ratePlan.lead_max,
      },
      chambresAtrb: ratePlan.assigned_room,
      politiqueAnnulAtrb: ratePlan.assigned_canceling_politic,
      leadMinInfini: ratePlan.no_lead_min,
      reservAToutMoment: ratePlan.booking_all_time === 'true',
      aucunFinDateSejour: ratePlan.no_end_date_of_stay,
    };
    return payloadToSend;
  };

  const handleChangeNameValue = (e) => {
    const tempRatePlan = { ...ratePlan};
    tempRatePlan.names[choosedNameLanguageAbbrev] = e.target.value;
    setRatePlan(tempRatePlan);

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

  const handleChangeDescriptionValue = (e) => {
    const tempRatePlan = { ...ratePlan};
    tempRatePlan.descriptions[choosedDescriptionLanguageAbbrev] = e.target.value;
    setRatePlan(tempRatePlan);

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

  const addNewRatePlan = () => {
    try{
      validate(ratePlan);
      if (formIsValid(ratePlan)) {
        const idToken = localStorage.getItem('id_token')
        context.showLoader(true);
        console.log(formatPayloadToSend());
        createRatePlan(formatPayloadToSend())
          .then((result) => {
            console.log(result.data);
            if (result.data.status === 200) {
              handleClose();
              reload();
              context.changeResultSuccessMessage('Enregistrement effectué');
              context.showResultSuccess(true);
            } else if (result.data.message) {
              const { message } = result.data
              context.changeResultErrorMessage(message);
              context.showResultError(true);
            } else if (result.data.errors) {
              const item = Object.keys(result.data.errors).filter((e, i) => i === 0)[0];
              const indication = result.data.errors[item];
              const message = `${item}: ${indication}`;
              context.changeResultErrorMessage(message);
              context.showResultError(true);
            }
          })
          .catch(() => {
            context.changeResultErrorMessage('Enregistrement non effectué');
            context.showResultError(true);
          })
          .finally(() => {
            context.showLoader(false);
          });
      }
    }catch(e){
      context.changeResultErrorMessage(`Veuillez contacter l'administrateur: ${e.message}`);
      context.showResultError(true);
    }
  };
  const handleClose = () => {
    navigate('list');
  };

  const handleChangeTabNameValue = (event: React.SyntheticEvent, newValue: number) => {
    setTabNameValue(newValue);
    setChoosedNameLanguageAbbrev(Object.keys(ratePlan.names)[newValue]);
  };

  const handleChangeLanguage = (event: React.SyntheticEvent, newValue: number) => {
    setTabDescriptionValue(newValue);
    setChoosedDescriptionLanguageAbbrev(Object.keys(ratePlan.descriptions)[newValue]);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <CustomizedTitle text="Ajouter plan tarifaire" size={20} />
        <CustomizedButton onClick={handleClose} text='retour' component={RouterLink} to="#" />
      </Stack>
      <CustomizedPaperOutside sx={{ ...lightBackgroundToTop, background: '#E3EDF7', p: 5, minHeight: '100vh',width:0.8,margin:'auto' }}>
        <Stack justifyContent='flex-start' spacing={2} >
          <CustomizedTitle text="Nom" size={16} />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabNameValue} 
                onChange={handleChangeTabNameValue} 
                aria-label="basic tabs example"
              >
                {languages.map((language, index) => 
                  <Tab key={language.abbrev} label={language.name} {...a11yProps(index)} />
                )}
              </Tabs>
            </Box>
            <Stack spacing={{ xs: 1, sm: 2, md: 4 }} >
              <CustomizedInput
                value={ratePlan.names?.[choosedNameLanguageAbbrev]}
                onChange={handleChangeNameValue}
                placeholder="Nom"
                sx={{ width: 1 }}
                error={false}
                margin="dense"
                id="nom"
                name="french_name"
                // label="Nom"
                type="text"
                fullWidth
                required
                {...(errors.names && {
                  error: true,
                  helpertext: errors.names,
                })}
              />
            </Stack>
            <CustomizedTitle text="Description" size={16} />
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
            <Stack spacing={{ xs: 1, sm: 2, md: 4 }} style={{marginTop: '-3px'}} >
              <CustomizedInput
                value={ratePlan.descriptions?.[choosedDescriptionLanguageAbbrev]}
                onChange={handleChangeDescriptionValue}
                sx={{ width: 1 }}
                placeholder="Votre description"
                multiline
                rows={2}
                rowsmax={2}
                error={false}
                margin="dense"
                id="nom"
                name="french_description"
                // label="Description"
                type="text"
                fullWidth
                required
                {...(errors.descriptions && {
                  error: true,
                  helpertext: errors.descriptions,
                })}
              />
            </Stack>
            <CustomizedTitle text="Date de réservation" size={16} />
            <Stack  direction="column" spacing={3}>
              <FormGroup>
                <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
                  Quand les clients peuvent-ils réserver chez vous pour bénéficier de ce tarif?
                </FormLabel>
                <RadioGroup
                  defaultValue="true"
                  onChange={handleChange}
                  name="booking_all_time"
                  aria-labelledby="demo-controlled-radio-buttons-group"
                >
                  <FormControlLabel value="true" control={<CustomizedRadio />} label="A tout moment" />
                  <FormControlLabel value="false" control={<CustomizedRadio />} label="Sélectionner une période" />
                </RadioGroup>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack
                    justifyContent="space-between"
                    alignItems="center"
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    sx={{ p: 2, width: 1 }}
                  >
                    <MobileDatePicker
                      disabled={ratePlan.booking_all_time === 'true'}
                      label="Debut reservation"
                      inputFormat="dd/MM/yyyy"
                      value={new Date(ratePlan.start_date_of_booking !== '' && ratePlan.start_date_of_booking)}
                      onChange={(e) =>
                        setRatePlan({ ...ratePlan, start_date_of_booking: formatDate(e.toLocaleDateString('en-US')) })
                      }
                      renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                    />
                    <MobileDatePicker
                      disabled={ratePlan.booking_all_time === 'true'}
                      label="Fin reservation"
                      inputFormat="dd/MM/yyyy"
                      value={new Date(ratePlan.end_date_of_booking !== '' && ratePlan.end_date_of_booking)}
                      onChange={(e) =>
                        setRatePlan({ ...ratePlan, end_date_of_booking: formatDate(e.toLocaleDateString('en-US')) })
                      }
                      renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </FormGroup>
            </Stack>
            <CustomizedTitle text="Date de séjour" size={16} />
            <Stack  direction="column" spacing={3}>
              <FormGroup>
                <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
                  Quand les clients peuvent-ils séjourner chez vous pour bénéficier de ce tarif ? Sélectionner une période
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack
                    justifyContent="space-between"
                    alignItems="center"
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    sx={{ p: 2, width: 1 }}
                  >
                    <MobileDatePicker
                      label="Date debut sejour"
                      inputFormat="dd/MM/yyyy"
                      value={new Date(ratePlan.start_date_of_stay !== '' && ratePlan.start_date_of_stay)}
                      onChange={(e) =>
                        setRatePlan({ ...ratePlan, start_date_of_stay: formatDate(e.toLocaleDateString('en-US')) })
                      }
                      renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                    />
                    <MobileDatePicker
                      disabled={ratePlan.no_end_date_of_stay}
                      label="Date fin sejours"
                      inputFormat="dd/MM/yyyy"
                      value={new Date(ratePlan.end_date_of_stay !== '' && ratePlan.end_date_of_stay)}
                      onChange={(e) =>
                        setRatePlan({ ...ratePlan, end_date_of_stay: formatDate(e.toLocaleDateString('en-US')) })
                      }
                      renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
                <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
                  <FormControlLabel
                    control={
                      <CustomizedRadio
                        onClick={() => setRatePlan({ ...ratePlan, no_end_date_of_stay: !ratePlan.no_end_date_of_stay })}
                        checked={ratePlan.no_end_date_of_stay}
                      />
                    }
                    label="Pas de fin"
                  />
                </RadioGroup>
              </FormGroup>
            </Stack>
            <CustomizedTitle text="Lead" size={16} />
            <Stack sx={{ p: 2 }} direction="column" spacing={3}>
              <FormGroup>
                <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
                  <FormControlLabel
                    control={
                      <CustomizedRadio
                        onClick={() => {
                          if (ratePlan.no_lead_min) {
                            setRatePlan({
                              ...ratePlan,
                              no_lead_min: !ratePlan.no_lead_min,
                              lead_min: 0,
                              lead_max: 0,
                            });
                          } else {
                            setRatePlan({
                              ...ratePlan,
                              no_lead_min: !ratePlan.no_lead_min,
                              lead_min: 99999,
                              lead_max: 0,
                            });
                          }
                        }}
                        checked={ratePlan.no_lead_min}
                      />
                    }
                    label="Pas de fin"
                  />
                </RadioGroup>
                <Stack
                  justifyContent="space-between"
                  alignItems="center"
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  <CustomizedInput
                    value={ratePlan.lead_min === '' || ratePlan.lead_min === null ? '' : parseInt(ratePlan.lead_min, 10)}
                    onChange={handleChange}
                    disabled={ratePlan.no_lead_min}
                    sx={{ width: 1 }}
                    placeholder="Lead minimum"
                    error={false}
                    margin="dense"
                    id="english_description"
                    name="lead_min"
                    label="Lead minimum"
                    type="number"
                    fullWidth
                    required
                    {...(errors.lead_min &&
                      !ratePlan.no_lead_min && {
                        error: true,
                        helpertext: errors.lead_min,
                      })}
                  />
                  <CustomizedInput
                    value={ratePlan.lead_max === '' || ratePlan.lead_max === null ? '' : parseInt(ratePlan.lead_max, 10)}
                    onChange={handleChange}
                    disabled={ratePlan.no_lead_min}
                    sx={{ width: 1 }}
                    placeholder="lead maximum avant l’arrivée"
                    error={false}
                    margin="dense"
                    id="english_description"
                    name="lead_max"
                    label="lead maximum avant l’arrivée"
                    type="number"
                    fullWidth
                    required
                    {...(errors.lead_max &&
                      !ratePlan.no_lead_min && {
                        error: true,
                        helpertext: errors.lead_max,
                      })}
                  />
                </Stack>
                <RadioGroup
                  row
                  defaultValue="true"
                  onChange={handleChange}
                  name="is_lead_hour"
                  aria-labelledby="demo-controlled-radio-buttons-group"
                >
                  <FormControlLabel value="true" control={<CustomizedRadio />} label="hour" />
                  <FormControlLabel value="false" control={<CustomizedRadio />} label="day" />
                </RadioGroup>
              </FormGroup>
            </Stack>
            <CustomizedTitle text="Chambres attribuées" size={16} />
            <Stack sx={{ p: 2 }} direction="column" spacing={3}>
              <FormGroup>
                <div style={{ paddingLeft: '2em', paddingRight: '2em' }}>
                  {listRoom.map((k) => (
                    <FormControlLabel
                      key={k._id}
                      control={
                        <CustomizedCheckbox
                          checked={ratePlan.assigned_room.find((elem) => elem === k._id) !== undefined}
                          onClick={() => handleChangeAssignedList(k._id, 'assigned_room')}
                        />
                      }
                      label={k?.names?.[Object.keys(k.names)[0]]}
                    />
                  ))}
                </div>
              </FormGroup>
            </Stack>
            <CustomizedTitle text="Politiques d'annulation" size={16} />
            <Stack sx={{ p: 2 }} direction="column" spacing={3}>
              <FormGroup>
                <div style={{ paddingLeft: '2em', paddingRight: '2em' }}>
                  {listPolitic.map((k) => (
                    <FormControlLabel
                      key={k._id}
                      control={
                        <CustomizedCheckbox
                          checked={ratePlan.assigned_canceling_politic.find((elem) => elem === k._id) !== undefined}
                          onClick={() => handleChangeAssignedList(k._id, 'assigned_canceling_politic')}
                        />
                      }
                      label={k.names.fr}
                    />
                  ))}
                </div>
              </FormGroup>
            </Stack>
            <Button onClick={handleClose} sx={{ fontSize: 12,textTransform:'none !important' }}>
              Annuler
            </Button>
            <CustomizedButton text="Enregistrer" onClick={addNewRatePlan} component={RouterLink} to="#"/>
          </Stack>  
        </CustomizedPaperOutside>
    </>
  );
};

AddRatePlanDialog.propTypes = {
  reload: PropTypes.any,
};
export default AddRatePlanDialog;
