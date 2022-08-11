import { useEffect, useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material
import {
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
import Iconify from '../Iconify';
import { createPromotion, getListTarifAndRoom } from '../../services/Promotion';
import { ThemeContext } from '../context/Wrapper';

function formatDate(date) {
  const allTime = date.split('/');
  const format = [];
  format.push(allTime[2]);
  format.push(allTime[0]);
  format.push(allTime[1]);
  return format.map((e) => e).join('-');
}
const AddPromotionDialog = () => {
  const context = useContext(ThemeContext);
  const [listTarif, setListTarif] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const [promotion, setPromotion] = useState({
    french_name: '',
    english_name: '',
    rate_plan: [],
    room_type: [],
    start_date_of_stay: formatDate(new Date().toLocaleDateString('en-US')),
    end_date_of_stay: formatDate(new Date().toLocaleDateString('en-US')),
    week_days: {
      lundi: 1,
      mardi: 1,
      mercredi: 1,
      jeudi: 1,
      vendredi: 1,
      samedi: 1,
      dimanche: 1,
    },
    min_stay: 1,
    first_day: 1,
    last_day: 0,
    is_lead_hour: true,
    lead: {
      min: '',
      max: '',
    },
    is_discount_euro: false,
    discount: 1,
    beginning_of_reservation: '',
    end_of_reservation: '',
    is_with_lead: false,
    book_any_time: true,
    specific_days_of_stay: false,
  });
  const tarifSelected = [];
  const roomSelected = [];
  const promotionTemp = promotion;
  useEffect(() => {
    const fetchData = async () => {
      getListTarifAndRoom()
        .then((fetch) => {
          if (fetch.data.status === 200) {
            setListTarif(fetch.data.listTarif);
            setListRoom(fetch.data.listTypeChambre);
            fetch.data.listTarif.forEach((e) => {
              tarifSelected.push(e._id);
            });
            fetch.data.listTypeChambre.forEach((e) => {
              roomSelected.push(e._id);
            });
            setPromotion({ ...promotionTemp, room_type: [...roomSelected], rate_plan: [...tarifSelected] });
          } else {
            setOpen(false);
            context.changeResultErrorMessage('Une erreur est interne survenue lors du chargement des  listes.');
            context.showResultError(true);
          }
        })
        .catch(() => {
          setOpen(false);
          context.changeResultErrorMessage('Une erreur est interne survenue lors du chargement des  listes.');
          context.showResultError(true);
        });
    };
    fetchData();
  }, []);
  const [open, setOpen] = useState(false);
  // const [errors, setErrors] = useState({});

  const [specificDay, setSpecificDay] = useState(false);

  const [allRatePlan, setAllRatePlan] = useState(true);

  const [allRoomType, setAllRoomType] = useState(true);

  const [disabledAddButton, setDisabledAddButton] = useState(true);

  const handleChangeWeekDays = (k) => {
    const weekDaysTemp = promotion.week_days;
    weekDaysTemp[k] = promotion.week_days[k] === 0 ? 1 : 0;
    const promotionTemp = promotion;
    promotionTemp.week_days = { ...weekDaysTemp };
    setPromotion({ ...promotionTemp });
    if (Object.keys(promotion.week_days).filter((key) => promotion.week_days[key] === 0).length === 0) {
      setSpecificDay(false);
    } else {
      setSpecificDay(true);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
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
    const weekDaysTemp = promotion.week_days;
    Object.keys(weekDaysTemp).map((k) => {
      weekDaysTemp[k] = specificDay ? 1 : 0;
      return 0;
    });
    const promotionTemp = promotion;
    promotionTemp.week_days = { ...weekDaysTemp };
    setPromotion({ ...promotionTemp });
    setSpecificDay(!specificDay);
  };

  const handleChangeSpecificDaysOfStay = () => {
    const promotionTemp = promotion;
    promotionTemp.specific_days_of_stay = !promotion.specific_days_of_stay;
    if (promotionTemp.specific_days_of_stay) {
      promotionTemp.first_day = '';
      promotionTemp.last_day = '';
    } else {
      promotionTemp.first_day = 1;
      promotionTemp.last_day = 0;
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

    setPromotion((promotion) => ({ ...promotion, rate_plan: selected }));
  };

  const handleChangeAllRoomType = () => {
    const selected = [];
    if (!allRoomType) {
      listRoom.forEach((e) => {
        selected.push(e._id);
      });
    }
    setAllRoomType(!allRoomType);
    setPromotion((promotion) => ({ ...promotion, room_type: selected }));
  };

  const handleChangeInputs3 = (e, field) => {
    const promotionTemp = promotion;
    promotionTemp[field] = parseInt(e.target.value, 10);
    promotionTemp[field === 'first_day' ? 'last_day' : 'first_day'] = '';
    setPromotion({ ...promotionTemp });
  };
  const handleChangeInputs2 = (e, field, field2) => {
    const promotionTemp = promotion;
    const leadTemp = { ...promotion.lead };
    leadTemp[field2] = e.target.value !== '' ? parseInt(e.target.value,10):'';
    promotionTemp.lead = { ...leadTemp };
    setPromotion({ ...promotionTemp });
    console.log(promotion);
  };

  const handleChangeInputs = (e, field) => {
    const promotionTemp = promotion;
    if (e.target === undefined) {
      promotionTemp[field] = formatDate(e.toLocaleDateString('en-US'));
    } else if (e.target.value === 'false') {
      promotionTemp[field] = false;
      if (field === 'book_any_time') {
        promotionTemp.beginning_of_reservation = '2000-1-1';
        promotionTemp.end_of_reservation = '2000-1-1';
      }
    } else if (Number.isNaN(e.target.value)) {
      //
    } else if (e.target.value === 'true') {
      promotionTemp[field] = true;
      if (field === 'book_any_time') {
        promotionTemp.beginning_of_reservation = '';
        promotionTemp.end_of_reservation = '';
      }
    } else if (e.target.type === 'number' && e.target.value !== '') {
      promotionTemp[field] = parseInt(e.target.value, 10);
    } else {
      promotionTemp[field] = e.target.value;
    }
    setPromotion({ ...promotionTemp });
    console.log(promotion);
  };

  const handleChangeSelected = (id, field) => {
    const setAll = {
      rate_plan: setAllRatePlan,
      room_type: setAllRoomType,
    };
    const list = {
      rate_plan: listTarif,
      room_type: listRoom,
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


  const cleanPromotion = () => {
    setPromotion({
      french_name: '',
      english_name: '',
      rate_plan: [],
      room_type: [],
      start_date_of_stay: formatDate(new Date().toLocaleDateString('en-US')),
      end_date_of_stay: formatDate(new Date().toLocaleDateString('en-US')),
      week_days: {
        lundi: 1,
        mardi: 1,
        mercredi: 1,
        jeudi: 1,
        vendredi: 1,
        samedi: 1,
        dimanche: 1,
      },
      min_stay: 1,
      first_day: 1,
      last_day: 0,
      is_lead_hour: true,
      lead: {
        min: '',
        max: '',
      },
      is_discount_euro: false,
      discount: 1,
      beginning_of_reservation: '',
      end_of_reservation: '',
      is_with_lead: false,
      book_any_time: true,
      specific_days_of_stay: false,
    });
  };

  const formatPayloadToSend = () => {
    const payload = {
      nom: promotion.french_name,
      planTarifaire: promotion.rate_plan,
      typeChambre: promotion.room_type,
      dateDebutS: promotion.start_date_of_stay,
      dateFinS: promotion.end_date_of_stay,
      weekDays: {
        lundi: promotion.week_days.lundi,
        mardi: promotion.week_days.mardi,
        mercredi: promotion.week_days.mercredi,
        jeudi: promotion.week_days.jeudi,
        vendredi: promotion.week_days.vendredi,
        samedi: promotion.week_days.samedi,
        dimanche: promotion.week_days.dimanche,
      },
      sejourMin: promotion.min_stay.toString(),
      premierJour: promotion.first_day,
      dernierJour: promotion.last_day,
      isLeadHour: promotion.is_lead_hour,
      lead: {
        min: promotion.is_with_lead?promotion.lead.min:"",
        max: promotion.is_with_lead?promotion.lead.max:"",
      },
      name: promotion.english_name,
      isRemiseEuro: promotion.is_discount_euro,
      remise: promotion.discount,
      leadMinInfini: promotion.lead.min === '',
      dateFinSejourInfini: false,
      debutReserv: promotion.beginning_of_reservation,
      finReserv: promotion.end_of_reservation,
      reservAToutMoment: true,
      isWithLead: promotion.is_with_lead,
      reservAllTime: promotion.book_any_time,
      withNbDaysGetProm: promotion.specific_days_of_stay,
    };
    return payload;
  };

  const addPromotion = async () => {
    const idToken = JSON.parse(localStorage.getItem('id_token'));
    setOpen(true);
    setDisabledAddButton(true);

    context.showLoader(true);
    createPromotion(formatPayloadToSend(), idToken)
      .then((result) => {
        if (result.data.status === 200) {
          context.showLoader(false);
          setOpen(false);
          context.changeResultSuccessMessage('Enregistrement inséré avec succès');
          context.showResultSuccess(true);
          cleanPromotion();
        } else {
          context.showLoader(false);
          context.changeResultErrorMessage("Une erreur s'est produite lors de l'insertion des données");
          context.showResultError(true);
        }
      })
      .catch(() => {
        context.showLoader(false);
        context.changeResultErrorMessage("Une erreur interne s'est produite");
        context.showResultError(true);
      });
  };

  // const validate = (fieldValues) => {
  //   const temp = { ...errors };

  //   if ('name' in fieldValues) temp.name = fieldValues.name ? '' : 'Ce champ est requis.';

  //   setErrors({
  //     ...temp,
  //   });
  // };

  // const formIsValid = (newPromotion) => {
  //   const isValid = newPromotion.name && Object.values(errors).every((x) => x === '');
  //   setDisabledAddButton(isValid);
  // };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        component={RouterLink}
        to="#"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Ajouter
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'}>
        <DialogTitle>
          <Typography variant="h3" component="div" gutterBottom>
            Ajouter une nouvelle promotion
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
                control={<Radio checked={allRatePlan} onChange={handleChangeAllRatePlan} />}
                label="Tous les plans tarifaires"
              />
              <FormControlLabel
                control={<Radio checked={!allRatePlan} onChange={handleChangeAllRatePlan} />}
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
                  onChange={() => handleChangeSelected(e._id, 'rate_plan')}
                  key={e._id}
                  control={<Checkbox checked={promotion.rate_plan.find((elem) => elem === e._id) !== undefined} />}
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
                control={<Radio checked={allRoomType} onChange={handleChangeAllRoomType} />}
                label="Tous les hébergements des plans tarifaires sélectionnés"
              />
              <FormControlLabel
                control={<Radio checked={!allRoomType} onChange={handleChangeAllRoomType} />}
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
                  onChange={() => handleChangeSelected(e._id, 'room_type')}
                  key={e._id}
                  control={<Checkbox checked={promotion.room_type.find((elem) => elem === e._id) !== undefined} />}
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
                value={promotion.discount}
                onChange={(e) => handleChangeInputs(e, 'discount')}
                label="remise"
              />
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel
                  value="true"
                  control={
                    <Radio
                      checked={promotion.is_discount_euro}
                      onChange={(e) => handleChangeInputs(e, 'is_discount_euro')}
                    />
                  }
                  label="Euro"
                />
                <FormControlLabel
                  value="false"
                  control={
                    <Radio
                      checked={!promotion.is_discount_euro}
                      onChange={(e) => handleChangeInputs(e, 'is_discount_euro')}
                    />
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
                  value={new Date(promotion.start_date_of_stay)}
                  onChange={(e) => handleChangeInputs(e, 'start_date_of_stay')}
                  renderInput={(params) => <TextField {...params} />}
                />
                <MobileDatePicker
                  label="Date fin sejours"
                  inputFormat="dd/MM/yyyy"
                  value={new Date(promotion.end_date_of_stay)}
                  onChange={(e) => handleChangeInputs(e, 'end_date_of_stay')}
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
                  <Radio checked={promotion.book_any_time} onChange={(e) => handleChangeInputs(e, 'book_any_time')} />
                }
                label="A tout moment"
              />
              <FormControlLabel
                value="false"
                control={
                  <Radio checked={!promotion.book_any_time} onChange={(e) => handleChangeInputs(e, 'book_any_time')} />
                }
                label="Sélectionner une période"
              />
            </RadioGroup>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack sx={{ p: 2 }} direction="row" spacing={3}>
                <MobileDatePicker
                  disabled={promotion.book_any_time}
                  label="Date debut reservation"
                  inputFormat="dd/MM/yyyy"
                  value={
                    promotion.beginning_of_reservation === ''
                      ? new Date()
                      : new Date(promotion.beginning_of_reservation)
                  }
                  onChange={(e) => handleChangeInputs(e, 'beginning_of_reservation')}
                  renderInput={(params) => <TextField {...params} />}
                />
                <MobileDatePicker
                  disabled={promotion.book_any_time}
                  label="Date fin reservation"
                  inputFormat="dd/MM/yyyy"
                  value={promotion.end_of_reservation === '' ? new Date() : new Date(promotion.end_of_reservation)}
                  onChange={(e) => handleChangeInputs(e, 'end_of_reservation')}
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
                value={promotion.min_stay}
                onChange={(e) => handleChangeInputs(e, 'min_stay')}
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
              value={promotion.is_with_lead ? 'false' : 'true'}
              control={
                <Checkbox onChange={(e) => handleChangeInputs(e, 'is_with_lead')} checked={promotion.is_with_lead} />
              }
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
                      checked={promotion.is_lead_hour}
                      onChange={(e) => handleChangeInputs(e, 'is_lead_hour')}
                      disabled={!promotion.is_with_lead}
                    />
                  }
                  label="Hour"
                />
                <FormControlLabel
                  value="false"
                  control={
                    <Radio
                      checked={!promotion.is_lead_hour}
                      onChange={(e) => handleChangeInputs(e, 'is_lead_hour')}
                      disabled={!promotion.is_with_lead}
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
                  disabled={!promotion.is_with_lead}
                  id={promotion.is_with_lead ? 'outlined-basic' : 'filled-disabled'}
                  label="min"
                  variant={promotion.is_with_lead ? 'outlined' : 'filled'}
                />
                <p>jours minimum</p>
              </Stack>
              <Stack direction="row" spacing={3}>
                <TextField
                  value={promotion.lead.max}
                  onChange={(e) => handleChangeInputs2(e, 'lead', 'max')}
                  type="number"
                  disabled={!promotion.is_with_lead}
                  id={promotion.is_with_lead ? 'outlined-basic' : 'filled-disabled'}
                  label="max"
                  variant={promotion.is_with_lead ? 'outlined' : 'filled'}
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
              control={<Checkbox checked={promotion.specific_days_of_stay} onChange={handleChangeSpecificDaysOfStay} />}
              label="Cette promotion est-elle attribuée à des jours spécifiques du séjour?"
            />
            <Stack sx={{ p: 2 }} direction="row" spacing={3}>
              <TextField
                value={promotion.first_day}
                onChange={(e) => handleChangeInputs3(e, 'first_day')}
                id={promotion.specific_days_of_stay ? 'outlined-basic' : 'filled-disabled'}
                type="number"
                label="Premier  jour"
                disabled={!promotion.specific_days_of_stay}
                variant={promotion.specific_days_of_stay ? 'outlined' : 'filled'}
              />
              <TextField
                value={promotion.last_day}
                onChange={(e) => handleChangeInputs3(e, 'last_day')}
                id={promotion.specific_days_of_stay ? 'outlined-basic' : 'filled-disabled'}
                type="number"
                label="Dernier  jour"
                disabled={!promotion.specific_days_of_stay}
                variant={promotion.specific_days_of_stay ? 'outlined' : 'filled'}
              />
            </Stack>

            <FormControlLabel
              control={<Checkbox checked={specificDay} onChange={handleChangeSpecificDay} />}
              label="Cette promotion est elle attribuée à des jours spécifiques du séjour?"
            />

            <div style={{ paddingLeft: '2em', paddingRight: '2em' }}>
              {Object.keys(promotion.week_days).map((k) => (
                <FormControlLabel
                  key={k}
                  control={<Checkbox onChange={() => handleChangeWeekDays(k)} checked={promotion.week_days[k] !== 0} />}
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
                value={promotion.french_name}
                onChange={(e) => handleChangeInputs(e, 'french_name')}
                id="outlined-basic"
                label="Nom"
                variant="outlined"
              />
              <TextField
                value={promotion.english_name}
                onChange={(e) => handleChangeInputs(e, 'english_name')}
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
          <Button disabled={!disabledAddButton} onClick={addPromotion}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPromotionDialog;
