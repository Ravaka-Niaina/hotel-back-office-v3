import PropTypes from 'prop-types';
import React, { useState,useContext} from 'react';
import { ListItemText, Dialog, DialogActions, FormControlLabel, RadioGroup, FormGroup, FormLabel, DialogContent, Button, Stack } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedCheckbox from '../CustomizedComponents/CustomizedCheckbox';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import Iconify from '../Iconify';
import {ThemeContext} from '../context/Wrapper'; 
import { formatDate } from '../../services/Util';
import { getRoomTypeAndCancelingPoliticList,getRatePlanDetails,updateRatePlan } from '../../services/RatePlan';


const ModifyRatePlanDialog = ({reload,ratePlanId}) => {


    const context = useContext(ThemeContext);
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState(false);
    const [ratePlan, setRatePlan] = useState({
        _id:ratePlanId,
        french_name: '',
        english_name: '',
        french_description: '',
        english_description: '',
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
        assigned_canceling_politic: []
    });

    const [listRoom, setListRoom] = useState(new Array(0));
    const [listPolitic, setListPolitic] = useState(new Array(0));
    const getItems = () => {
        context.showLoader(true);
        getRoomTypeAndCancelingPoliticList()
            .then((result) => {
                if (result.data.listType) {
                    setListRoom(result.data.listType);
                    setListPolitic(result.data.listPolitique);
                }
                else{
                    context.changeResultErrorMessage(`La liste des type de chambre et polique d'annulation  n'ont pas pu être chargé`);
                    context.showResultError(true);
                }
            })
            .catch(() => {
                context.changeResultErrorMessage(`Une erreur interne est survenue`);
                context.showResultError(true);
            });
        getRatePlanDetails(ratePlanId)
            .then((result) => {
                console.log(result);
                if(result.data.status === 200){
                    const checkedRoom=[];
                    const checkedCancelingPolitic=[];
                    result.data.planTarifaire.chambresAtrb.forEach((e) => {
                        if(e.checked){
                            checkedRoom.push(e._id);
                        }
                    });
                    result.data.planTarifaire.politiqueAnnulAtrb.forEach((e) => {
                        if(e.checked){
                            checkedCancelingPolitic.push(e._id);
                        }
                    });
                    setRatePlan({
                        _id: ratePlanId,
                        french_name: result.data.planTarifaire.nom,
                        english_name: result.data.planTarifaire.nom,
                        french_description: result.data.planTarifaire.description,
                        english_description: result.data.planTarifaire.description,
                        booking_all_time: result.data.planTarifaire.reservAToutMoment ? 'true' : 'false', 
                        start_date_of_booking: result.data.planTarifaire.dateReservation.debut,
                        end_date_of_booking: result.data.planTarifaire.dateReservation.fin,
                        start_date_of_stay: result.data.planTarifaire.dateSejour.debut,
                        end_date_of_stay: result.data.planTarifaire.dateSejour.fin,
                        no_end_date_of_stay: result.data.planTarifaire.aucunFinDateSejour,
                        no_lead_min: result.data.planTarifaire.leadMinInfini,
                        lead_min: result.data.planTarifaire.lead.min,
                        lead_max: result.data.planTarifaire.lead.max,
                        is_lead_hour: result.data.planTarifaire.isLeadHour ? 'true' : 'false',
                        assigned_room: checkedRoom,
                        assigned_canceling_politic: checkedCancelingPolitic
                    });                 
                }
                else{
                    context.changeResultErrorMessage(`les anciennes valeurs n'ont pas pu être chargé`);
                    context.showResultError(true);
                }
            })
            .catch(() => {
                context.changeResultErrorMessage(`Une erreur interne est survenue`);
                context.showResultError(true);
            }).finally(() => {
                context.showLoader(false);
            })
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
        console.log(`${name} et ${value}`);
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
        if ('french_name' in fieldValues) temp.french_name = fieldValues.french_name ? '' : 'Ce champ est requis.';
        if ('english_name' in fieldValues) temp.english_name = fieldValues.english_name ? '' : 'Ce champ est requis.';
        if ('french_description' in fieldValues) temp.french_description = fieldValues.french_description ? '' : 'Ce champ est requis.';
        if ('english_description' in fieldValues) temp.english_description = fieldValues.english_description ? '' : 'Ce champ est requis.';
        if ('lead_min' in fieldValues && !ratePlan.no_lead_min) temp.lead_min = fieldValues.lead_min ? '' : 'Ce champ est requis.';
        if ('lead_max' in fieldValues && !ratePlan.no_lead_min) temp.lead_max = fieldValues.lead_max ? '' : 'Ce champ est requis.';

        setErrors({
            ...temp,
        });
    };

    const formIsValid = (newRatePlan) => {
        const isValid = newRatePlan.french_name && newRatePlan.english_name && newRatePlan.french_description &&
            newRatePlan.english_description && (newRatePlan.lead_min || newRatePlan.no_lead_min) && (newRatePlan.lead_max || newRatePlan.no_lead_min) && Object.values(errors).every((x) => x === '');
        return isValid;
    };

    const formatPayloadToSend = () => {
        return {
            _id: ratePlanId,
            nom: ratePlan.french_name,
            description: ratePlan.french_description,
            dateReservation: {
                debut: ratePlan.booking_all_time === 'true' ? "" : ratePlan.start_date_of_booking,
                fin: ratePlan.booking_all_time === 'true' ? "" : ratePlan.end_date_of_booking
            },
            dateSejour: {
                debut: ratePlan.start_date_of_stay,
                fin: ratePlan.no_end_date_of_stay ? "" : ratePlan.end_date_of_stay
            },
            isLeadHour: ratePlan.is_lead_hour === 'true',
            lead: {
                min: ratePlan.no_lead_min ? null : ratePlan.lead_min,
                max: ratePlan.no_lead_min ? 1 : ratePlan.lead_max
            },
            chambresAtrb: ratePlan.assigned_room,
            politiqueAnnulAtrb: ratePlan.assigned_canceling_politic,
            leadMinInfini: ratePlan.no_lead_min,
            reservAToutMoment: ratePlan.booking_all_time === 'true',
            aucunFinDateSejour: ratePlan.no_end_date_of_stay
        }
    };
    
    const modifyRatePlan = () => {
        validate(ratePlan);
        if(formIsValid){
            context.showLoader(true);
            updateRatePlan(formatPayloadToSend())
                .then((result) => {
                    if(result.data.status === 200){
                        setOpen(false);
                        reload();
                        context.changeResultSuccessMessage('Enregistrement effectué');
                        context.showResultSuccess(true);
                    }
                    else if(result.data.status !== 200 && result.data.message)
                    {
                        context.changeResultErrorMessage(result.data.message);
                        context.showResultError(true);
                    }
                    else if(result.data.errors){
                        const item = Object.keys(result.data.errors).filter((e, i) => i === 0)[0];
                        const indication = result.data.errors[item];
                        context.changeResultErrorMessage(`${item}: ${indication}`);
                        context.showResultError(true);
                    }
                })
                .catch(() =>{
                    context.changeResultErrorMessage('Enregistrement non effectué');
                    context.showResultError(true);
                }).finally(() => {
                    context.showLoader(false);
                })
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
        getItems();
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <CustomizedIconButton variant="contained" onClick={handleClickOpen}>
                <Iconify icon="eva:edit-fill" width={20} height={20} color="rgba(140, 159, 177, 1)"/>
            </CustomizedIconButton >
            <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
                <CustomizedDialogTitle text="Modifier le plan tarifaire" />
                <DialogContent sx={{ backgroundColor: '#E8F0F8', pt: 20, pr: 2, pl: 2 }}>
                    <Stack
                        justifyContent="space-between"
                        alignItems="center"

                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        sx={{ p: 2, width: 1, }}
                    >
                        <CustomizedInput
                            value={ratePlan.french_name}
                            onChange={handleChange}
                            placeholder="Nom"
                            sx={{ width: 1 }}
                            error={false}
                            margin="dense"
                            id="nom"
                            name="french_name"
                            label="Nom"
                            type="text"
                            fullWidth
                            required
                            {...(errors.french_name && {
                                error: true,
                                helpertext: errors.french_name,
                            })}
                        />
                        <CustomizedInput
                            value={ratePlan.english_name}
                            onChange={handleChange}
                            placeholder="Name"
                            sx={{ width: 1 }}
                            error={false}
                            margin="dense"
                            id="name"
                            name="english_name"
                            label="Name"
                            type="text"
                            fullWidth
                            required
                            {...(errors.english_name && {
                                error: true,
                                helpertext: errors.english_name,
                            })}
                        />
                    </Stack>
                    <h4>Description</h4>
                    <Stack sx={{ p: 2 }} direction="column" spacing={3}>
                        <CustomizedInput
                            value={ratePlan.french_description}
                            onChange={handleChange}
                            sx={{ width: 1 }}
                            placeholder="Votre description"
                            multiline
                            rows={2}
                            rowsmax={2}
                            error={false}
                            margin="dense"
                            id="nom"
                            name="french_description"
                            label="Description"
                            type="text"
                            fullWidth
                            required
                            {...(errors.french_description && {
                                error: true,
                                helpertext: errors.french_description,
                            })}
                        />
                        <CustomizedInput
                            value={ratePlan.english_description}
                            onChange={handleChange}
                            sx={{ width: 1 }}
                            placeholder="Votre descripiton..."
                            multiline
                            rows={2}
                            rowsmax={2}
                            error={false}
                            margin="dense"
                            id="english_description"
                            name="english_description"
                            label="Description en anglais"
                            type="text"
                            fullWidth
                            required
                            {...(errors.english_description && {
                                error: true,
                                helpertext: errors.english_description,
                            })}
                        />
                    </Stack>
                    <h4>Date de réservation</h4>
                    <Stack sx={{ p: 2 }} direction="column" spacing={3}>
                        <FormGroup>
                            <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
                                Quand les clients peuvent-ils réserver chez vous pour bénéficier de ce tarif?
                            </FormLabel>
                            <RadioGroup    aria-labelledby="demo-controlled-radio-buttons-group" >
                                <FormControlLabel
                                    value="true"
                                    control={<CustomizedRadio checked={ratePlan.booking_all_time === 'true'} onClick={handleChange} name='booking_all_time' />}
                                    label="A tout moment"
                                />
                                <FormControlLabel
                                    value="false"
                                    control={<CustomizedRadio checked={ratePlan.booking_all_time === 'false'} onClick={handleChange} name='booking_all_time'/>}
                                    label="Sélectionner une période"
                                />
                            </RadioGroup>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack
                                    justifyContent="space-between"
                                    alignItems="center"

                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={{ xs: 1, sm: 2, md: 4 }}
                                    sx={{ p: 2, width: 1, }}
                                >
                                    <MobileDatePicker
                                        disabled={ratePlan.booking_all_time === 'true'}
                                        label="Debut reservation"
                                        inputFormat="dd/MM/yyyy"
                                        value={new Date(ratePlan.start_date_of_booking !== '' && ratePlan.start_date_of_booking)}
                                        onChange={(e) => setRatePlan({ ...ratePlan, 'start_date_of_booking': formatDate(e.toLocaleDateString('en-US')) })}
                                        renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                                    />
                                    <MobileDatePicker
                                        disabled={ratePlan.booking_all_time === 'true'}
                                        label="Fin reservation"
                                        inputFormat="dd/MM/yyyy"
                                        value={new Date(ratePlan.end_date_of_booking !== '' && ratePlan.end_date_of_booking)}
                                        onChange={(e) => setRatePlan({ ...ratePlan, 'end_date_of_booking': formatDate(e.toLocaleDateString('en-US')) })}
                                        renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </FormGroup>
                    </Stack>
                    <h4>Date de séjour</h4>
                    <Stack sx={{ p: 2 }} direction="column" spacing={3}>
                        <FormGroup>
                            <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
                                Quand les clients peuvent-ils séjourner chez vous pour bénéficier de ce tarif ?
                                Sélectionner une période
                            </FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack
                                    justifyContent="space-between"
                                    alignItems="center"

                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={{ xs: 1, sm: 2, md: 4 }}
                                    sx={{ p: 2, width: 1, }}
                                >
                                    <MobileDatePicker
                                        label="Date debut sejour"
                                        inputFormat="dd/MM/yyyy"
                                        value={new Date(ratePlan.start_date_of_stay !== '' && ratePlan.start_date_of_stay)}
                                        onChange={(e) => setRatePlan({ ...ratePlan, 'start_date_of_stay': formatDate(e.toLocaleDateString('en-US')) })}
                                        renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                                    />
                                    <MobileDatePicker
                                        disabled={ratePlan.no_end_date_of_stay}
                                        label="Date fin sejours"
                                        inputFormat="dd/MM/yyyy"
                                        value={new Date(ratePlan.end_date_of_stay !== '' && ratePlan.end_date_of_stay)}
                                        onChange={(e) => setRatePlan({ ...ratePlan, 'end_date_of_stay': formatDate(e.toLocaleDateString('en-US')) })}
                                        renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
                                <FormControlLabel
                                    control={<CustomizedRadio onClick={() => setRatePlan({ ...ratePlan, 'no_end_date_of_stay': !ratePlan.no_end_date_of_stay })} checked={ratePlan.no_end_date_of_stay} />}
                                    label="Pas de fin"
                                />
                            </RadioGroup>

                        </FormGroup>
                    </Stack>
                    <h4>Lead</h4>
                    <Stack sx={{ p: 2 }} direction="column" spacing={3}>
                        <FormGroup>
                            <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
                                <FormControlLabel
                                    control={<CustomizedRadio
                                        onClick={() => {
                                            if (ratePlan.no_lead_min) {
                                                setRatePlan({
                                                    ...ratePlan, 'no_lead_min': !ratePlan.no_lead_min, 'lead_min': 0, 'lead_max': 0,
                                                })
                                            }
                                            else {
                                                setRatePlan({
                                                    ...ratePlan, 'no_lead_min': !ratePlan.no_lead_min, 'lead_min': 99999, 'lead_max': 1,
                                                })
                                            }

                                        }}
                                        checked={ratePlan.no_lead_min} />}
                                    label="Pas de fin"
                                />
                            </RadioGroup>
                            <Stack
                                justifyContent="space-between"
                                alignItems="center"

                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 2, md: 4 }}
                                sx={{ p: 2, width: 1, }}
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
                                    {...(errors.lead_min && !ratePlan.no_lead_min && {
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
                                    {...(errors.lead_max && !ratePlan.no_lead_min && {
                                        error: true,
                                        helpertext: errors.lead_max,
                                    })}
                                />
                            </Stack>
                            <RadioGroup row  onChange={handleChange} name="is_lead_hour" aria-labelledby="demo-controlled-radio-buttons-group" >
                                <FormControlLabel
                                    value="true"
                                    control={<CustomizedRadio checked={ratePlan.is_lead_hour === 'true'} onClick={handleChange} name='is_lead_hour'/>}
                                    label="hour"
                                />
                                <FormControlLabel
                                    value="false"
                                    control={<CustomizedRadio checked={ratePlan.is_lead_hour !== 'true'} onClick={handleChange} name='is_lead_hour'/>}
                                    label="day"
                                />
                            </RadioGroup>

                        </FormGroup>
                    </Stack>
                    <h4>Chambres attribuées</h4>
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
                                        label={k.nom}
                                    />
                                ))}
                            </div>


                        </FormGroup>
                    </Stack>
                    <h4>Politiques d'annulation</h4>
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
                                        label={k.nom}
                                    />
                                ))}
                            </div>
                        </FormGroup>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#E8F0F8' }}>
                    <Button onClick={handleClose} sx={{ fontSize: 12 }}>
                        Annuler
                    </Button>
                    <CustomizedButton text="Enregistrer modification" onClick={modifyRatePlan} />
                </DialogActions>
            </Dialog>
        </>
    );
};

ModifyRatePlanDialog.propTypes={
    reload:PropTypes.any,
    ratePlanId:PropTypes.any,
}
export default ModifyRatePlanDialog;