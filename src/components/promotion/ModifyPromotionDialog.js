import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

// material
import {
  ListItemText,
  Typography,
  Stack,
  Divider,
  FormGroup,
  Checkbox,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// components
import { Box } from '@mui/system';
import { getListTarifAndRoom, getPromotionDetail, updatePromotion } from '../../services/Promotion';
import { formatDate } from '../../services/Util';
import { ThemeContext } from '../context/Wrapper';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import Iconify from '../Iconify';

const ModifyPromotionDialog = ({ row, reload }) => {
  const context = useContext(ThemeContext);
  const [open, setOpen] = React.useState(false);
  const [disabledModifyButton, setDisabledModifyButton] = React.useState(true);
  // const [errors, setErrors] = React.useState({});
  const [listTarif, setListTarif] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const [promotion, setPromotion] = useState({
    _id: row._id,
    nom: '',
    planTarifaire: [],
    typeChambre: [],
    dateDebutS: formatDate(new Date().toLocaleDateString('en-US')),
    dateFinS: formatDate(new Date().toLocaleDateString('en-US')),
    weekDays: {
      lundi: 1,
      mardi: 1,
      mercredi: 1,
      jeudi: 1,
      vendredi: 1,
      samedi: 1,
      dimanche: 1,
    },
    sejourMin: 1,
    premierJour: '',
    dernierJour: '',
    isLeadHour: true,
    lead: {
      min: '',
      max: '',
    },
    name: '',
    isRemiseEuro: false,
    remise: 1,
    leadMinInfini: false,
    dateFinSejourInfini: false,
    debutReserv: 1,
    finReserv: 0,
    reservAToutMoment: true,
    isWithLead: false,
    reservAllTime: true,
    withNbDaysGetProm: false,
    etat: 1,
    dateCreation: '',
  });
  // const tarifSelected = [];
  // const roomSelected = [];

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem('partner_id'));
      getPromotionDetail(row._id, user)
        .then((promotionDetail) => {
          if (promotionDetail.data.status === 200) {
            const oldPromotion = promotionDetail.data.promotion;
            delete oldPromotion.etat;
            delete oldPromotion.dateCreation;
            delete oldPromotion.userIdInsert;
            delete oldPromotion.hotelUser;
            setPromotion({ ...oldPromotion, _id: row._id });
          } else {
            context.changeResultErrorMessage('Une erreur interne est survenue lors du chargemenent des données.');
            context.showResultError(true);
          }
        })
        .catch(() => {
          context.changeResultErrorMessage('Une erreur interne est survenue lors du chargemenent des données.');
          context.showResultError(true);
        });
      getListTarifAndRoom()
        .then((fetch) => {
          if (fetch.data.status === 200) {
            setListTarif(fetch.data.listTarif);
            setListRoom(fetch.data.listTypeChambre);
            context.showLoader(false);
          } else {
            context.changeResultErrorMessage('Une erreur interne est survenue lors du chargemenent des données.');
            context.showResultError(true);
          }
        })
        .catch(() => {
          context.changeResultErrorMessage('Une erreur interne est survenue lors du chargemenent des données.');
          context.showResultError(true);
        });
    };
    fetchData().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [specificDay, setSpecificDay] = useState(false);

  const [allRatePlan, setAllRatePlan] = useState(true);
  const [allRoomType, setAllRoomType] = useState(true);

  const handleChangeWeekDays = (k) => {
    const weekDaysTemp = promotion.weekDays;

    weekDaysTemp[k] = promotion.weekDays[k] === 0 ? 1 : 0;
    const promotionTemp = promotion;
    promotionTemp.weekDays = { ...weekDaysTemp };
    setPromotion({ ...promotionTemp });
    if (Object.keys(promotion.weekDays).filter((key) => promotion.weekDays[key] === 0).length === 0) {
      setSpecificDay(false);
    } else {
      setSpecificDay(true);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
    context.showLoader(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setPromotion((promotion) => ({ ...promotion, [name]: value }));
  //   validate({ [name]: value });
  //   formIsValid({
  //     ...promotion,
  //     [name]: value,
  //   });
  // };

  const handleChangeSpecificDay = () => {
    const weekDaysTemp = promotion.weekDays;
    Object.keys(weekDaysTemp).map((k) => {
      weekDaysTemp[k] = specificDay ? 1 : 0;
      return 0;
    });
    const promotionTemp = promotion;
    promotionTemp.weekDays = { ...weekDaysTemp };
    setPromotion({ ...promotionTemp });
    setSpecificDay(!specificDay);
  };

  const handleChangeWithNbDaysGetProm = () => {
    const promotionTemp = promotion;
    promotionTemp.withNbDaysGetProm = !promotion.withNbDaysGetProm;
    if (promotionTemp.withNbDaysGetProm) {
      promotionTemp.premierJour = '';
      promotionTemp.dernierJour = '';
    } else {
      promotionTemp.premierJour = 1;
      promotionTemp.dernierJour = 0;
    }
    setPromotion({ ...promotionTemp });
  };

  const handleChangeAllRatePlan = () => {
    const selected = [];
    if (!allRatePlan) {
      listTarif.forEach((e) => {
        selected.push(e._id);
      });
    }
    setAllRatePlan(!allRatePlan);

    setPromotion((promotion) => ({ ...promotion, planTarifaire: selected }));
  };

  const handleChangeAllRoomType = () => {
    const selected = [];
    if (!allRoomType) {
      listRoom.forEach((e) => {
        selected.push(e._id);
      });
    }
    setAllRoomType(!allRoomType);
    setPromotion((promotion) => ({ ...promotion, typeChambre: selected }));
  };

  const handleChangeInputs3 = (e, field) => {
    const promotionTemp = promotion;
    promotionTemp[field] = parseInt(e.target.value, 10);
    promotionTemp[field === 'premierJour' ? 'dernierJour' : 'premierJour'] = '';
    setPromotion({ ...promotionTemp });
  };
  const handleChangeInputs2 = (e, field, field2) => {
    const promotionTemp = promotion;
    const leadTemp = { ...promotion.lead };
    leadTemp[field2] = parseInt(e.target.value, 10);
    promotionTemp.lead = { ...leadTemp };
    setPromotion({ ...promotionTemp });
  };
  const handleChangeInputs = (e, field) => {
    const promotionTemp = promotion;

    if (e.target === undefined) {
      // REHEFA ILAY MOBILE DATE PICKER NO ALAIANA NY VALEUR ANY

      promotionTemp[field] = formatDate(e.toLocaleDateString('en-US'));
    }
    // else {
    else if (e.target.value === 'false') {
      promotionTemp[field] = false;
      if (field === 'reservAllTime') {
        promotionTemp.debutReserv = '2000-1-1';
        promotionTemp.finReserv = '2000-1-1';
      }
    } else if (Number.isNaN(e.target.value)) {
      //
    } else if (e.target.value === 'true') {
      promotionTemp[field] = true;
      if (field === 'reservAllTime') {
        promotionTemp.debutReserv = '';
        promotionTemp.finReserv = '';
      }
    } else if (e.target.type === 'number' && e.target.value !== '') {
      promotionTemp[field] = parseInt(e.target.value, 10);
    } else {
      promotionTemp[field] = e.target.value;
    }
    // }
    setPromotion({ ...promotionTemp });
  };

  const handleChangeSelected = (id, field) => {
    const setAll = {
      planTarifaire: setAllRatePlan,
      typeChambre: setAllRoomType,
    };
    const list = {
      planTarifaire: listTarif,
      typeChambre: listRoom,
    };
    const promotionTemp = promotion;
    const newSelected = [];
    if (promotion[field].find((elem) => elem === id) === undefined) {
      newSelected.push(id);
    }
    promotion[field].forEach((e) => {
      if (e !== id) {
        newSelected.push(e);
      }
    });
    promotionTemp[field] = newSelected;
    setPromotion((promotion) => ({ ...promotion, [field]: newSelected }));
    setAll[field](promotion[field].length === list[field].length);
  };

  const modifyPromotion = async () => {
    setDisabledModifyButton(false);
    context.showLoader(true);
    updatePromotion(promotion)
      .then((result) => {
        if (result.data.status === 200) {
          context.changeResultSuccessMessage('Enregistrement mis à jour avec succès.');
          context.showResultSuccess(true);
          setOpen(false);
          reload();
        } else {
          context.changeResultErrorMessage('Une erreur est survenue lors du modification.');
          context.showResultError(true);
        }
      })
      .catch(() => {
        context.changeResultErrorMessage('Une erreur est survenue lors du modification.');
        context.showResultError(true);
      })
      .finally(() => {
        context.showLoader(false);
      });
  };

  // const validate = (fieldValues) => {
  //   const temp = { ...errors };

  //   if ('name' in fieldValues) temp.name = fieldValues.name ? '' : 'Ce champ est requis.';

  //   setErrors({
  //     ...temp,
  //   });
  // };

  // const isPromotionEqual = (object1, object2) => {
  //   const isEqual = object1.name === object2.name;
  //   return isEqual;
  // };

  // const formIsValid = (newPromotion) => {
  //   // const isEqual = isPromotionEqual(oldPromotion, newPromotion);
  //   // if (!isEqual) {
  //   //   const isValid = promotion.name && Object.values(errors).every((x) => x === '');
  //   //   setDisabledModifyButton(isValid);
  //   // } else {
  //   //   setDisabledModifyButton(false);
  //   // }
  // };

  return (
    <>
      <CustomizedIconButton variant="contained" onClick={handleClickOpen}>
        <Iconify icon="eva:edit-fill" width={20} height={20} color="rgba(140, 159, 177, 1)" />
      </CustomizedIconButton >
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'}>
        <DialogTitle>
          <Typography variant="h3" component="div" gutterBottom>
            Modifier promotion
          </Typography>
        </DialogTitle>
        <DialogContent>
          <h2>Détails de la promotion</h2>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              À quels plans tarifaires cette promotion s'appliquera-t-elle ?
            </FormLabel>
            <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
              <FormControlLabel
                control={<Radio checked={allRatePlan} onClick={handleChangeAllRatePlan} />}
                label="Tous les plans tarifaires"
              />
              <FormControlLabel
                control={<Radio checked={!allRatePlan} onClick={handleChangeAllRatePlan} />}
                label="Plans tarifaires séléctionnés"
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ pr: 5, pl: 5, pt: 2, pb: 2 }}>
            <FormGroup>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Veuillez sélectionnez au moins 1 plan tarifaire
              </FormLabel>
              {listTarif.map((e) => (
                <FormControlLabel
                  onClick={() => handleChangeSelected(e._id, 'planTarifaire')}
                  key={e._id}
                  control={<Checkbox checked={promotion.planTarifaire.find((elem) => elem === e._id) !== undefined} />}
                  label={e.nom}
                />
              ))}
            </FormGroup>
          </Box>

          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              À quels hébergements cette promotion s'appliquera-t-elle ?
            </FormLabel>
            <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
              <FormControlLabel
                control={<Radio checked={allRoomType} onClick={handleChangeAllRoomType} />}
                label="Tous les hébergements des plans tarifaires sélectionnés"
              />
              <FormControlLabel
                control={<Radio checked={!allRoomType} onClick={handleChangeAllRoomType} />}
                label="Hébergements sélectionnés"
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ pr: 5, pl: 5, pt: 2, pb: 2 }}>
            <FormGroup>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Veuillez sélectionner au moins 1 type d'hébergement.
              </FormLabel>
              {listRoom.map((e) => (
                <FormControlLabel
                  onClick={() => handleChangeSelected(e._id, 'typeChambre')}
                  key={e._id}
                  control={<Checkbox checked={promotion.typeChambre.find((elem) => elem === e._id) !== undefined} />}
                  label={e.nom}
                />
              ))}
            </FormGroup>
          </Box>

          <Divider />
          <h4>Valeur de la promotion</h4>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Veuillez sélectionnez au moins 1 plan tarifaire
            </FormLabel>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Sélectionnez le type et valeur de la réduction que vous voulez appliquer
            </FormLabel>
            <Stack sx={{ p: 2 }} direction="row" spacing={3}>
              <TextField
                type="number"
                variant="outlined"
                value={promotion.remise}
                onChange={(e) => handleChangeInputs(e, 'remise')}
                label="remise"
              />
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel
                  value="true"
                  control={
                    <Radio checked={promotion.isRemiseEuro} onClick={(e) => handleChangeInputs(e, 'isRemiseEuro')} />
                  }
                  label="Euro"
                />
                <FormControlLabel
                  value="false"
                  control={
                    <Radio checked={!promotion.isRemiseEuro} onClick={(e) => handleChangeInputs(e, 'isRemiseEuro')} />
                  }
                  label="Pourcentage"
                />
              </RadioGroup>
            </Stack>
          </FormControl>

          <h4>Dates de séjour</h4>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Quand les clients peuvent-ils séjourner chez vous en bénéficiant de cette promotion ?
            </FormLabel>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack sx={{ p: 2 }} direction="row" spacing={3}>
                <MobileDatePicker
                  label="Date debut sejour"
                  inputFormat="dd/MM/yyyy"
                  value={new Date(promotion.dateDebutS)}
                  onChange={(e) => handleChangeInputs(e, 'dateDebutS')}
                  renderInput={(params) => <TextField {...params} />}
                />
                <MobileDatePicker
                  label="Date fin sejours"
                  inputFormat="dd/MM/yyyy"
                  value={new Date(promotion.dateFinS)}
                  onChange={(e) => handleChangeInputs(e, 'dateFinS')}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </FormControl>

          <h4>Période de réservation - facultatif</h4>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Quand les clients peuvent-ils réserver cette promotion?
            </FormLabel>
            <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
              <FormControlLabel
                value="true"
                control={
                  <Radio checked={promotion.reservAllTime} onClick={(e) => handleChangeInputs(e, 'reservAllTime')} />
                }
                label="A tout moment"
              />
              <FormControlLabel
                value="false"
                control={
                  <Radio checked={!promotion.reservAllTime} onClick={(e) => handleChangeInputs(e, 'reservAllTime')} />
                }
                label="Sélectionner une période"
              />
            </RadioGroup>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack sx={{ p: 2 }} direction="row" spacing={3}>
                <MobileDatePicker
                  disabled={promotion.reservAllTime}
                  label="Date debut reservation"
                  inputFormat="dd/MM/yyyy"
                  value={promotion.debutReserv === '' ? new Date() : new Date(promotion.debutReserv)}
                  onChange={(e) => handleChangeInputs(e, 'debutReserv')}
                  renderInput={(params) => <TextField {...params} />}
                />
                <MobileDatePicker
                  disabled={promotion.reservAllTime}
                  label="Date fin reservation"
                  inputFormat="dd/MM/yyyy"
                  value={promotion.finReserv === '' ? new Date() : new Date(promotion.finReserv)}
                  onChange={(e) => handleChangeInputs(e, 'finReserv')}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </FormControl>

          <h4>Séjour minimum</h4>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Combien de temps les clients doivent-ils séjourner dans votre établissement pour bénéficier de cette
              promotion ?
            </FormLabel>

            <Stack sx={{ p: 2 }} direction="row" spacing={3}>
              <TextField
                value={promotion.sejourMin}
                onChange={(e) => handleChangeInputs(e, 'sejourMin')}
                type="number"
                id="outlined-basic"
                label="min"
                variant="outlined"
              />
              <p>nuits ou plus</p>
            </Stack>
          </FormControl>

          <h4>Période réservable (Min lead et Max lead)</h4>
          <FormControl>
            <FormControlLabel
              value={promotion.isWithLead ? 'false' : 'true'}
              control={<Checkbox onClick={(e) => handleChangeInputs(e, 'isWithLead')} checked={promotion.isWithLead} />}
              label="Cette promotion est elle disponible uniquement pendant une plage de nombre de jour?"
            />
            <FormLabel id="demo-controlled-radio-buttons-group">
              Si oui, la question suivante se pose Combien de temps à l'avance les clients doivent-ils réserver pour
              bénéficier de cette promotion ?
            </FormLabel>

            <Stack sx={{ p: 2 }} spacing={3}>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                row
              >
                <FormControlLabel
                  value="true"
                  control={
                    <Radio
                      checked={promotion.isLeadHour}
                      onClick={(e) => handleChangeInputs(e, 'isLeadHour')}
                      disabled={!promotion.isWithLead}
                    />
                  }
                  label="Hour"
                />
                <FormControlLabel
                  value="false"
                  control={
                    <Radio
                      checked={!promotion.isLeadHour}
                      onClick={(e) => handleChangeInputs(e, 'isLeadHour')}
                      disabled={!promotion.isWithLead}
                    />
                  }
                  label="Day"
                />
              </RadioGroup>
              <Stack direction="row" spacing={3}>
                <TextField
                  value={promotion.lead.min}
                  onChange={(e) => handleChangeInputs2(e, 'lead', 'min')}
                  type="number"
                  disabled={!promotion.isWithLead}
                  id={promotion.isWithLead ? 'outlined-basic' : 'filled-disabled'}
                  label="min"
                  variant={promotion.isWithLead ? 'outlined' : 'filled'}
                />
                <p>jours minimum</p>
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  value={promotion.lead.max}
                  onChange={(e) => handleChangeInputs2(e, 'lead', 'max')}
                  type="number"
                  disabled={!promotion.isWithLead}
                  id={promotion.isWithLead ? 'outlined-basic' : 'filled-disabled'}
                  label="max"
                  variant={promotion.isWithLead ? 'outlined' : 'filled'}
                />
                <p>jours maximum avant l’arrivée</p>
              </Stack>
            </Stack>
          </FormControl>

          <h4>Nombre de jour d'attribution de la promotion</h4>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Par défaut, la promotion est attribuée à tous les jours
            </FormLabel>
            <FormControlLabel
              control={<Checkbox checked={promotion.withNbDaysGetProm} onClick={handleChangeWithNbDaysGetProm} />}
              label="Cette promotion est-elle attribuée à des jours spécifiques du séjour?"
            />

            <Stack sx={{ p: 2 }} direction="row" spacing={3}>
              <TextField
                value={promotion.premierJour}
                onChange={(e) => handleChangeInputs3(e, 'premierJour')}
                id={promotion.withNbDaysGetProm ? 'outlined-basic' : 'filled-disabled'}
                type="number"
                label="Premier  jour"
                disabled={!promotion.withNbDaysGetProm}
                variant={promotion.withNbDaysGetProm ? 'outlined' : 'filled'}
              />
              <TextField
                value={promotion.dernierJour}
                onChange={(e) => handleChangeInputs3(e, 'dernierJour')}
                id={promotion.withNbDaysGetProm ? 'outlined-basic' : 'filled-disabled'}
                type="number"
                label="Dernier  jour"
                disabled={!promotion.withNbDaysGetProm}
                variant={promotion.withNbDaysGetProm ? 'outlined' : 'filled'}
              />
            </Stack>

            <FormControlLabel
              control={<Checkbox checked={specificDay} onClick={handleChangeSpecificDay} />}
              label="Cette promotion est elle attribuée à des jours spécifiques du séjour?"
            />

            <div style={{ paddingLeft: '2em', paddingRight: '2em' }}>
              {Object.keys(promotion.weekDays).map((k) => (
                <FormControlLabel
                  key={k}
                  control={<Checkbox onClick={() => handleChangeWeekDays(k)} checked={promotion.weekDays[k] !== 0} />}
                  label={k}
                />
              ))}
            </div>
          </FormControl>

          <h4>Nom de la promotion</h4>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Comment voulez-vous nommer cette promotion ?</FormLabel>

            <Stack sx={{ p: 2 }} spacing={3}>
              <TextField
                value={promotion.nom}
                onChange={(e) => handleChangeInputs(e, 'nom')}
                id="outlined-basic"
                label="Nom"
                variant="outlined"
              />
              <TextField
                value={promotion.name}
                onChange={(e) => handleChangeInputs(e, 'name')}
                id="outlined-basic"
                label="Name"
                variant="outlined"
              />
            </Stack>
          </FormControl>
          {/*
          <TextField
            onChange={handleChange}
            error={errors?.name}
            margin="dense"
            id="name"
            name="name"
            label="Nom"
            type="text"
            fullWidth
            variant="standard"
            required
            {...(errors.name && {
              error: true,
              helperText: errors.name,
            })}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button disabled={!disabledModifyButton} onClick={modifyPromotion}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
ModifyPromotionDialog.propTypes = {
  row: PropTypes.any,
  reload: PropTypes.func,
};

export default ModifyPromotionDialog;
