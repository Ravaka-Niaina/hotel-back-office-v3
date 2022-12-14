import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
// material
import {
  Stack,
  Divider,
  FormGroup,
  FormControl,
  FormLabel,
  RadioGroup,
  Button,
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
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import CustomizedCheckbox from '../CustomizedComponents/CustomizedCheckbox';
import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import { lightBackgroundToTop } from '../CustomizedComponents/NeumorphismTheme';

const ModifyPromotionDialog = ({ row, reload , navigate}) => {
  const context = useContext(ThemeContext);
  const [errors, setErrors] = useState({});
  const [disabledModifyButton, setDisabledModifyButton] = React.useState(true);
  // const [errors, setErrors] = React.useState({});
  const [listTarif, setListTarif] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const [promotion, setPromotion] = useState({
    _id:'',
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
  // const tarifSelected = [];
  // const roomSelected = [];

  

  const [specificDay, setSpecificDay] = useState(false);

  const [allRatePlan, setAllRatePlan] = useState(true);
  const [allRoomType, setAllRoomType] = useState(true);

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
  
  const fetchData = async () => {
    context.showLoader(true);
    const user = JSON.parse(localStorage.getItem('partner_id'));
    getPromotionDetail(row._id, user)
      .then((promotionDetail) => {
        // console.log(promotionDetail.data);
        if (promotionDetail.data.status === 200) {
          setListTarif(promotionDetail.data.listTarif);
          setListRoom(promotionDetail.data.listTypeChambre);
          const oldPromotion = promotionDetail.data.promotion;
          delete oldPromotion.userIdInsert;
          delete oldPromotion.hotelUser;
          setPromotion({
            etat:oldPromotion.etat,
            dateCreation:oldPromotion.dateCreation,
            french_name: oldPromotion.nom,
            english_name: oldPromotion.name,
            rate_plan: oldPromotion.planTarifaire,
            room_type: oldPromotion.typeChambre,
            start_date_of_stay: oldPromotion.dateDebutS,
            end_date_of_stay: oldPromotion.dateFinS,
            week_days: oldPromotion.weekDays,
            min_stay: oldPromotion.sejourMin,
            first_day: oldPromotion.premierJour,
            last_day: oldPromotion.dernierJour,
            is_lead_hour: oldPromotion.isLeadHour,
            lead: oldPromotion.lead,
            is_discount_euro: oldPromotion.isRemiseEuro,
            discount: oldPromotion.remise,
            beginning_of_reservation: oldPromotion.debutReserv,
            end_of_reservation: oldPromotion.finReserv,
            is_with_lead: oldPromotion.isWithLead,
            book_any_time: oldPromotion.reservAllTime,
            specific_days_of_stay: oldPromotion.withNbDaysGetProm,
            _id: row._id
          });
          setSpecificDay(Object.values(oldPromotion.weekDays).some((elem)=>elem === 0));
        } else {
          context.changeResultErrorMessage('Une erreur interne est survenue lors du chargemenent des donn??es.');
          context.showResultError(true);
        }
      })
      .catch(() => {
        context.changeResultErrorMessage('Une erreur interne est survenue lors du chargemenent des donn??es.');
        context.showResultError(true);
      }).finally(() => {
        context.showLoader(false);
      });

  };
  const handleClose = () => {
    navigate('list');
  };

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
    promotionTemp[field] = e.target.value === '' ? '' : parseInt(e.target.value, 10);
    promotionTemp[field === 'first_day' ? 'last_day' : 'first_day'] = 0;
    setPromotion({ ...promotionTemp });
    validate({ [field]: e.target.value, [field === 'first_day' ? 'last_day' : 'first_day']: '0' });
  };
  const handleChangeInputs2 = (e, field, field2) => {
    const promotionTemp = promotion;
    const leadTemp = { ...promotion.lead };
    leadTemp[field2] = e.target.value !== '' ? parseInt(e.target.value, 10) : '';
    promotionTemp.lead = { ...leadTemp };
    setPromotion({ ...promotionTemp });
    validate({ lead: { [field2]: e.target.value } });
  };

  const validate = (fieldValues) => {
    const temp = { ...errors };
    if ('french_name' in fieldValues) temp.french_name = fieldValues.french_name ? '' : 'Ce champ est requis.';
    if ('english_name' in fieldValues) temp.english_name = fieldValues.english_name ? '' : 'Ce champ est requis.';
    if ('discount' in fieldValues) temp.discount = fieldValues.discount !== '' ? '' : 'Ce champ est requis.';
    if ('min_stay' in fieldValues) temp.min_stay = fieldValues.min_stay !== '' ? '' : 'Ce champ est requis.';
    if (fieldValues.lead) {
      if ('min' in fieldValues.lead && promotion.is_with_lead) temp.lead_min = fieldValues.lead.min !== '' ? '' : 'Ce champ est requis.';
      if ('max' in fieldValues.lead && promotion.is_with_lead) temp.lead_max = fieldValues.lead.max !== '' ? '' : 'Ce champ est requis.';
    }
    if ('last_day' in fieldValues && promotion.specific_days_of_stay) {
      temp.last_day = fieldValues.last_day !== '' ? '' : 'Ce champ est requis.';
    }
    if ('first_day' in fieldValues && promotion.specific_days_of_stay) {
      temp.first_day = fieldValues.first_day !== '' ? '' : 'Ce champ est requis.'
    }
    setErrors({
      ...temp,
    });

  };

  const formIsValid = (newPromotion) => {
    const isValid = newPromotion.french_name && newPromotion.english_name && newPromotion.discount &&
      newPromotion.min_stay !== '' && (newPromotion.lead.min !== '' || !newPromotion.is_with_lead)
      && (newPromotion.lead.max !== '' || !newPromotion.is_with_lead)
      && (newPromotion.last_day !== '' || !newPromotion.specific_days_of_stay)
      && (newPromotion.first_day !== '' || !newPromotion.specific_days_of_stay)
      && Object.values(errors).every((x) => x === '');
      
    return isValid;
  };

  const handleChangeInputs = (e, field) => {
    const promotionTemp = promotion;
    if (e.target === undefined) {
      promotionTemp[field] = formatDate(e.toLocaleDateString('en-US'));
    } else if (e.target.value === 'false') {
      promotionTemp[field] = false;
      if (field === 'book_any_time') {
        promotionTemp.beginning_of_reservation = formatDate(new Date().toLocaleDateString('en-US'));
        promotionTemp.end_of_reservation = formatDate(new Date().toLocaleDateString('en-US'));
      }
    } else if (e.target.value === 'true') {
      promotionTemp[field] = true;
      if (field === 'book_any_time') {
        promotionTemp.beginning_of_reservation = '';
        promotionTemp.end_of_reservation = '';
      }
    } else if (e.target.type === 'number' && e.target.value !== '') {
      validate({ [e.target.name]: e.target.value });
      promotionTemp[field] = parseInt(e.target.value, 10);
    } else {
      validate({ [e.target.name]: e.target.value });
      promotionTemp[field] = e.target.value;
    }
    setPromotion({ ...promotionTemp });
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
    if (promotion[field]?.find((elem) => elem === id) === undefined) {
      newSelected.push(id);
    }
    console.log(promotion);
    console.log(promotion[field])
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
    setErrors(false);
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
      _id: promotion._id,
      nom: promotion.french_name,
      planTarifaire: promotion.rate_plan,
      typeChambre: promotion.room_type,
      dateDebutS: promotion.start_date_of_stay,
      dateFinS: promotion.end_date_of_stay,
      weekDays: {
        lundi: promotion?.week_days?.lundi,
        mardi: promotion?.week_days?.mardi,
        mercredi: promotion?.week_days?.mercredi,
        jeudi: promotion?.week_days?.jeudi,
        vendredi: promotion?.week_days?.vendredi,
        samedi: promotion?.week_days?.samedi,
        dimanche: promotion?.week_days?.dimanche,
      },
      sejourMin: promotion?.min_stay?.toString(),
      premierJour: promotion?.first_day,
      dernierJour: promotion?.last_day,
      isLeadHour: promotion?.is_lead_hour,
      lead: {
        min: promotion?.is_with_lead ? promotion?.lead?.min : '',
        max: promotion?.is_with_lead ? promotion?.lead?.max : '',
      },
      name: promotion?.english_name,
      isRemiseEuro: promotion?.is_discount_euro,
      remise: promotion?.discount,
      leadMinInfini: promotion?.lead?.min === '',
      dateFinSejourInfini: false,
      debutReserv: promotion?.beginning_of_reservation,
      finReserv: promotion?.end_of_reservation,
      reservAToutMoment: true,
      isWithLead: promotion?.is_with_lead,
      reservAllTime: promotion?.book_any_time,
      withNbDaysGetProm: promotion?.specific_days_of_stay,
      etat:promotion?.etat,
      dateCreation:promotion?.dateCreation,
    };
    return payload;
  };
  const modifyPromotion = async () => {
    validate(promotion);
    if(formIsValid(promotion) || true) {
      context.showLoader(true);
      updatePromotion(formatPayloadToSend())
        .then((result) => {
          console.log(result);
          if (result.data.status === 200) {
            handleClose();
            context.changeResultSuccessMessage('Enregistrement mis ?? jour avec succ??s.');
            context.showResultSuccess(true);
            reload();
          }else if (result.data.errors) {
            const item = Object.keys(result.data.errors).filter((e, i) => i === 0)[0];
            const indication = result.data.errors[item];
            const message = `${item}: ${indication}`;
            context.changeResultErrorMessage(message);
            context.showResultError(true);
          }else {
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
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <CustomizedTitle text="Modififer promotion" size={20} />
        <CustomizedButton text="retour" onClick={handleClose} variant="contained" component={RouterLink} to="#" />
      </Stack>

      <CustomizedPaperOutside
        sx={{
          ...lightBackgroundToTop,
          minHeight: '100vh',
          border: '1px white solid',
          width: 0.8,
          margin: 'auto',
          padding: 5,
        }}
      >
        <Stack
          justifyContent="flex-start"
          alignItems="strech"
          direction={{ xs: 'column' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <CustomizedTitle text='D??tails de la promotion' size={22} level={0} />
          <FormControl>
            <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
              ?? quels plans tarifaires cette promotion s'appliquera-t-elle ?
            </FormLabel>
            <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
              <FormControlLabel
                control={<CustomizedRadio checked={allRatePlan} onChange={handleChangeAllRatePlan} />}
                label="Tous les plans tarifaires"
              />
              <FormControlLabel
                control={<CustomizedRadio checked={!allRatePlan} onChange={handleChangeAllRatePlan} />}
                label="Plans tarifaires s??l??ctionn??s"
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ pr: 5, pl: 5, pt: 2, pb: 2 }}>
            <FormGroup>
              <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
                Veuillez s??lectionnez au moins 1 plan tarifaire
              </FormLabel>
              <div style={{ columnCount: 3, }}>
                {listTarif.map((e) => (
                  <FormControlLabel
                    onChange={() => handleChangeSelected(e._id, 'rate_plan')}
                    key={e._id}
                    control={
                      <CustomizedCheckbox checked={promotion?.rate_plan?.find((elem) => elem === e._id) !== undefined} />
                    }
                    label={e.nom}
                  />
                ))}
              </div>
            </FormGroup>
          </Box>

          <FormControl>
            <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
              ?? quels h??bergements cette promotion s'appliquera-t-elle ?
            </FormLabel>
            <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
              <FormControlLabel
                control={<CustomizedRadio checked={allRoomType} onChange={handleChangeAllRoomType} />}
                label="Tous les h??bergements des plans tarifaires s??lectionn??s"
              />
              <FormControlLabel
                control={<CustomizedRadio checked={!allRoomType} onChange={handleChangeAllRoomType} />}
                label="H??bergements s??lectionn??s"
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ pr: 5, pl: 5, pt: 2, pb: 2 }}>
            <FormGroup>
              <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
                Veuillez s??lectionner au moins 1 type d'h??bergement.
              </FormLabel>
              <div style={{ columnCount: 3, }}>
                {listRoom.map((e) => (
                  <FormControlLabel
                    onChange={() => handleChangeSelected(e._id, 'room_type')}
                    key={e._id}
                    control={
                      <CustomizedCheckbox checked={promotion?.room_type?.find((elem) => elem === e._id) !== undefined} />
                    }
                    label={e.nom}
                  />
                ))}
              </div>
            </FormGroup>
          </Box>
          <Divider />
          <CustomizedTitle text='Valeur de la promotion' size={22} level={0} />
          <FormControl>
            <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
              Veuillez s??lectionnez au moins 1 plan tarifaire
            </FormLabel>
            <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
              S??lectionnez le type et valeur de la r??duction que vous voulez appliquer
            </FormLabel>
            <Stack sx={{ p: 2 }} direction="row" spacing={3}>
              <CustomizedInput
                name='discount'
                value={promotion.discount}
                type="number"
                variant="outlined"
                onChange={(e) => handleChangeInputs(e, 'discount')}
                label="remise"
                {...(errors.discount && {
                  error: true,
                  helpertext: errors.discount,
                })}
              />
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel
                  value="true"
                  control={
                    <CustomizedRadio
                      checked={promotion.is_discount_euro}
                      onChange={(e) => handleChangeInputs(e, 'is_discount_euro')}
                    />
                  }
                  label="Euro"
                />
                <FormControlLabel
                  value="false"
                  control={
                    <CustomizedRadio
                      checked={!promotion.is_discount_euro}
                      onChange={(e) => handleChangeInputs(e, 'is_discount_euro')}
                    />
                  }
                  label="Pourcentage"
                />
              </RadioGroup>
            </Stack>
          </FormControl>
          <CustomizedTitle text='Dates de s??jour' size={22} level={0} />
          <FormControl>
            <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
              Quand les clients peuvent-ils s??journer chez vous en b??n??ficiant de cette promotion ?
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack sx={{ p: 2 }} direction="row" spacing={3}>
                <MobileDatePicker
                  label="Date debut sejour"
                  inputFormat="dd/MM/yyyy"
                  value={new Date(promotion.start_date_of_stay)}
                  onChange={(e) => handleChangeInputs(e, 'start_date_of_stay')}
                  renderInput={(params) => <CustomizedInput {...params} />}
                />
                <MobileDatePicker
                  label="Date fin sejours"
                  inputFormat="dd/MM/yyyy"
                  value={new Date(promotion.end_date_of_stay)}
                  onChange={(e) => handleChangeInputs(e, 'end_date_of_stay')}
                  renderInput={(params) => <CustomizedInput {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </FormControl>
          <CustomizedTitle text='P??riode de r??servation - facultatif' size={22} level={0} />
          <FormControl>
            <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
              Quand les clients peuvent-ils r??server cette promotion?
            </FormLabel>
            <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
              <FormControlLabel
                value="true"
                control={
                  <CustomizedRadio
                    checked={promotion.book_any_time}
                    onChange={(e) => handleChangeInputs(e, 'book_any_time')}
                  />
                }
                label="A tout moment"
              />
              <FormControlLabel
                value="false"
                control={
                  <CustomizedRadio
                    checked={!promotion.book_any_time}
                    onChange={(e) => handleChangeInputs(e, 'book_any_time')}
                  />
                }
                label="S??lectionner une p??riode"
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
                  renderInput={(params) => <CustomizedInput {...params} />}
                />
                <MobileDatePicker
                  disabled={promotion.book_any_time}
                  label="Date fin reservation"
                  inputFormat="dd/MM/yyyy"
                  value={promotion.end_of_reservation === '' ? new Date() : new Date(promotion.end_of_reservation)}
                  onChange={(e) => handleChangeInputs(e, 'end_of_reservation')}
                  renderInput={(params) => <CustomizedInput {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </FormControl>
          <CustomizedTitle text='S??jour minimum' size={22} level={0} />
          <FormControl>
            <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
              Combien de temps les clients doivent-ils s??journer dans votre ??tablissement pour b??n??ficier de cette
              promotion ?
            </FormLabel>
            <Stack sx={{ p: 2 }} direction="row" spacing={3} alignItems='center'>
              <CustomizedInput
                name='min_stay'
                value={promotion.min_stay}
                onChange={(e) => handleChangeInputs(e, 'min_stay')}
                type="number"
                id="outlined-basic"
                label="min"
                variant="outlined"
                {...(errors.min_stay && {
                  error: true,
                  helpertext: errors.min_stay,
                })}
              />
              <p>nuits ou plus</p>
            </Stack>
          </FormControl>
          <CustomizedTitle text='P??riode r??servable (Min lead et Max lead)D??tails de la promotion' size={22} level={0} />
          <FormControl>
            <FormControlLabel
              value={promotion.is_with_lead ? 'false' : 'true'}
              control={
                <CustomizedCheckbox
                  onChange={(e) => handleChangeInputs(e, 'is_with_lead')}
                  checked={promotion.is_with_lead}
                />
              }
              label="Cette promotion est elle disponible uniquement pendant une plage de nombre de jour?"
            />
            <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
              Si oui, la question suivante se pose Combien de temps ?? l'avance les clients doivent-ils r??server pour
              b??n??ficier de cette promotion ?
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
                    <CustomizedRadio
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
                    <CustomizedRadio
                      checked={!promotion.is_lead_hour}
                      onChange={(e) => handleChangeInputs(e, 'is_lead_hour')}
                      disabled={!promotion.is_with_lead}
                    />
                  }
                  label="Day"
                />
              </RadioGroup>
              <Stack direction="row" spacing={3} alignItems='center'>
                <CustomizedInput
                  name='lead_min'
                  value={promotion.lead.min}

                  onChange={(e) => handleChangeInputs2(e, 'lead', 'min')}
                  type="number"
                  disabled={!promotion.is_with_lead}
                  id={promotion.is_with_lead ? 'outlined-basic' : 'filled-disabled'}
                  label="min"
                  variant={promotion.is_with_lead ? 'outlined' : 'filled'}
                  {...(errors.lead_min && promotion.is_with_lead && {
                    error: true,
                    helpertext: errors.lead_min,
                  })}
                />
                <p>jours minimum</p>
              </Stack>
              <Stack direction="row" spacing={3} alignItems='center'>
                <CustomizedInput
                  name='lead_max'
                  value={promotion.lead.max}
                  onChange={(e) => handleChangeInputs2(e, 'lead', 'max')}
                  type="number"
                  disabled={!promotion.is_with_lead}
                  id={promotion.is_with_lead ? 'outlined-basic' : 'filled-disabled'}
                  label="max"
                  variant={promotion.is_with_lead ? 'outlined' : 'filled'}
                  {...(errors.lead_max && promotion.is_with_lead && {
                    error: true,
                    helpertext: errors.lead_max,
                  })}
                />
                <p>jours maximum avant l???arriv??e</p>
              </Stack>
            </Stack>
          </FormControl>
          <CustomizedTitle text="Nombre de jour d'attribution de la promotionD??tails de la promotion" size={22} level={0} />
          <FormControl>
            <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
              Par d??faut, la promotion est attribu??e ?? tous les jours
            </FormLabel>
            <FormControlLabel
              control={
                <CustomizedCheckbox
                  checked={promotion.specific_days_of_stay}
                  onChange={handleChangeSpecificDaysOfStay}
                />
              }
              label="Cette promotion est-elle attribu??e ?? des jours sp??cifiques du s??jour?"
            />
            <Stack sx={{ p: 2 }} direction="row" spacing={3}>
              <CustomizedInput
                name='first_day'
                value={promotion.specific_days_of_stay ? promotion.first_day : 360}
                onChange={(e) => handleChangeInputs3(e, 'first_day')}
                id={promotion.specific_days_of_stay ? 'outlined-basic' : 'filled-disabled'}
                type="number"
                label="Premier  jour"
                disabled={!promotion.specific_days_of_stay}
                variant={promotion.specific_days_of_stay ? 'outlined' : 'filled'}
                {...(errors.first_day && promotion.specific_days_of_stay && {
                  error: true,
                  helpertext: errors.first_day,
                })}
              />
              <CustomizedInput
                name='last_day'
                value={promotion.last_day}
                onChange={(e) => handleChangeInputs3(e, 'last_day')}
                id={promotion.specific_days_of_stay ? 'outlined-basic' : 'filled-disabled'}
                type="number"
                label="Dernier  jour"
                disabled={!promotion.specific_days_of_stay}
                variant={promotion.specific_days_of_stay ? 'outlined' : 'filled'}
                {...(errors.last_day && promotion.specific_days_of_stay && {
                  error: true,
                  helpertext: errors.last_day,
                })}
              />
            </Stack>

            <FormControlLabel
              control={<CustomizedCheckbox checked={specificDay} onChange={handleChangeSpecificDay} />}
              label="Cette promotion est elle attribu??e ?? des jours sp??cifiques du s??jour?"
            />

            <div style={{ paddingLeft: '2em', paddingRight: '2em' }}>
              {promotion.week_days && Object.keys(promotion.week_days).map((k) => (
                <FormControlLabel
                  key={k}
                  control={
                    <CustomizedCheckbox
                      onChange={() => handleChangeWeekDays(k)}
                      checked={promotion.week_days[k] !== 0}
                    />
                  }
                  label={k}
                />
              ))}
            </div>
          </FormControl>
          <CustomizedTitle text='Nom de la promotion' size={22} level={0} />
          <FormControl>
            <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
              Comment voulez-vous nommer cette promotion ?
            </FormLabel>

            <Stack sx={{ p: 2 }} direction='row' spacing={3}>
              <CustomizedInput
                name='french_name'
                value={promotion.french_name}
                onChange={(e) => handleChangeInputs(e, 'french_name')}
                id="outlined-basic"
                label="Nom"
                variant="outlined"
                {...(errors.french_name && {
                  error: true,
                  helpertext: errors.french_name,
                })}
              />
              <CustomizedInput
                name='english_name'
                value={promotion.english_name}
                onChange={(e) => handleChangeInputs(e, 'english_name')}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                {...(errors.english_name && {
                  error: true,
                  helpertext: errors.english_name,
                })}
              />
            </Stack>
          </FormControl>
          
          <Button onClick={handleClose}>Annuler</Button>
          <CustomizedButton onClick={modifyPromotion} text='Enregistrer' />
        </Stack>
      </CustomizedPaperOutside>
    </>
  );
};
ModifyPromotionDialog.propTypes = {
  row: PropTypes.any,
  reload: PropTypes.func,
  navigate: PropTypes.func,
};

export default ModifyPromotionDialog;
