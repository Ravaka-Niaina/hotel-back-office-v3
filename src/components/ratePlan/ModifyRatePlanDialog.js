import PropTypes from 'prop-types';
import React, { useState} from 'react';
import { ListItemText, Dialog, DialogActions, FormControlLabel, RadioGroup, FormGroup, FormLabel, DialogContent, Button, Stack } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomizedInput from '../../template/Form/CustomizedInput';
import CustomizedDialogTitle from '../../template/Form/CustomizedDialogTitle';
import CustomizedButton from '../../template/Form/CustomizedButton';
import CustomizedRadio from '../../template/Form/CustomizedRadio';
import CustomizedCheckbox from '../../template/Form/CustomizedCheckbox';
import { formatDate } from '../../services/Util';

const ModifyRatePlanDialog = ({reload,ratePlanId}) => {


   
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState(false);
    const [test, setTest] = useState(formatDate(new Date().toLocaleDateString('en-US')));
    const listRoom = [];
    const listPolitic = [];
    [...new Array(5)].forEach((e, i) => {
        listRoom.push({ id: i, nom: `Chambre ${i + 1}` });
        listPolitic.push({ id: i, nom: `Politic ${i + 1}`, });
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <ListItemText
                onClick={handleClickOpen}
                primary="|  Modifier"
                primaryTypographyProps={{ variant: 'body2' }}
                maxwidth={'sm'}
            />
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
                            {...(errors.id && {
                                error: true,
                                helpertext: errors.id,
                            })}
                        />
                        <CustomizedInput
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
                            {...(errors.name && {
                                error: true,
                                helpertext: errors.name,
                            })}
                        />
                    </Stack>
                    <h4>Description</h4>
                    <Stack sx={{ p: 2 }} direction="column" spacing={3}>
                        <CustomizedInput
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
                            {...(errors.id && {
                                error: true,
                                helpertext: errors.id,
                            })}
                        />
                        <CustomizedInput
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
                            {...(errors.id && {
                                error: true,
                                helpertext: errors.id,
                            })}
                        />
                    </Stack>
                    <h4>Date de réservation</h4>
                    <Stack sx={{ p: 2 }} direction="column" spacing={3}>
                        <FormGroup>
                            <FormLabel sx={{ maxWidth: 600 }} id="demo-controlled-radio-buttons-group">
                                Quand les clients peuvent-ils réserver chez vous pour bénéficier de ce tarif?
                            </FormLabel>
                            <RadioGroup defaultValue="allRatePlan" aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
                                <FormControlLabel
                                    value="allRatePlan"
                                    control={<CustomizedRadio />}
                                    label="Tous les plans tarifaires"
                                />
                                <FormControlLabel
                                    value="selectedRatePlan"
                                    control={<CustomizedRadio />}
                                    label="Plans tarifaires séléctionnés"
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
                                        label="Date debut sejour"
                                        inputFormat="dd/MM/yyyy"
                                        value={new Date(test)}
                                        onChange={(e) => setTest(formatDate(e.toLocaleDateString('en-US')))}
                                        renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                                    />
                                    <MobileDatePicker
                                        label="Date fin sejours"
                                        inputFormat="dd/MM/yyyy"
                                        value={new Date(test)}
                                        onChange={(e) => setTest(formatDate(e.toLocaleDateString('en-US')))}
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
                                        value={new Date(test)}
                                        onChange={(e) => setTest(formatDate(e.toLocaleDateString('en-US')))}
                                        renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                                    />
                                    <MobileDatePicker
                                        label="Date fin sejours"
                                        inputFormat="dd/MM/yyyy"
                                        value={new Date(test)}
                                        onChange={(e) => setTest(formatDate(e.toLocaleDateString('en-US')))}
                                        renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <RadioGroup defaultValue="allRatePlan" aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
                                <FormControlLabel
                                    value="allRatePlan"
                                    control={<CustomizedRadio />}
                                    label="Pas de fin"
                                />
                            </RadioGroup>

                        </FormGroup>
                    </Stack>
                    <h4>Lead hour</h4>
                    <Stack sx={{ p: 2 }} direction="column" spacing={3}>
                        <FormGroup>
                            <RadioGroup defaultValue="allRatePlan" aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
                                <FormControlLabel
                                    value="allRatePlan"
                                    control={<CustomizedRadio />}
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
                                    sx={{ width: 1 }}
                                    placeholder="Lead minimum"
                                    error={false}
                                    margin="dense"
                                    id="english_description"
                                    name="english_description"
                                    label="Lead minimum"
                                    type="number"
                                    fullWidth
                                    required
                                    {...(errors.id && {
                                        error: true,
                                        helpertext: errors.id,
                                    })}
                                />
                                <CustomizedInput
                                    sx={{ width: 1 }}
                                    placeholder="lead maximum avant l’arrivée"
                                    error={false}
                                    margin="dense"
                                    id="english_description"
                                    name="english_description"
                                    label="lead maximum avant l’arrivée"
                                    type="number"
                                    fullWidth
                                    required
                                    {...(errors.id && {
                                        error: true,
                                        helpertext: errors.id,
                                    })}
                                />
                            </Stack>
                            <RadioGroup row defaultValue="hour" aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
                                <FormControlLabel
                                    value="hour"
                                    control={<CustomizedRadio />}
                                    label="hour"
                                />
                                <FormControlLabel
                                    value="day"
                                    control={<CustomizedRadio />}
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
                                        key={k.id}
                                        control={<CustomizedCheckbox />}
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
                                        key={k.id}
                                        control={<CustomizedCheckbox />}
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
                    <CustomizedButton text="Valider" />
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