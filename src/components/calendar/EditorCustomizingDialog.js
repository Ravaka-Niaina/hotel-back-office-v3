import React , { useEffect, useState , useContext } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import moment from 'moment';
import { Dialog,DialogContent, Alert, Stack, FormControlLabel, RadioGroup , Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";

import EditIcon from '@mui/icons-material/Edit';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedCheckbox from '../CustomizedComponents/CustomizedCheckbox';
import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import InvisibleBackdrop from '../CustomizedComponents/InvisibleBackdrop';
import styles from './EditorCustomizingDialog.module.css';

import { ThemeContext } from '../context/Wrapper';

import {configPrix} from '../../services/TCTarif';
import { getFrenchDate } from '../../utils/date';

import './index.css';
import './dateRangePicker.module.css';

const EditorCustomizingDialog = ({chambre , reloadRoom, dateRange, setDateRange, fetchData,}) => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const context = useContext(ThemeContext);
    const [openPicker,setOpenPicker] = useState(false);
    const [open , setOpen ] = useState(false);
    const [isRoomOpen , setIsRoomOpen ] = useState(true);
    const [isRatePlanOpen, setIsRatePlanOpen] = useState(true);
    const [ratePlans , setRatePlans] = useState([]);
    const [versions , setVersions] = useState([]);
    const [roomToSell,setRoomToSell] = useState('');
    const [errors,setErrors] = useState(false);
    const [noVersionFilledError,setNoVersionFilledError] = useState(false);
    const [days, setDays] = React.useState([
        { value: 1, checked: true, label: "Lundi" },
        { value: 2, checked: true, label: "Mardi" },
        { value: 3, checked: true, label: "Mercredi" },
        { value: 4, checked: true, label: "Jeudi" },
        { value: 5, checked: true, label: "Vendredi" },
        { value: 6, checked: true, label: "Samedi" },
        { value: 7, checked: true, label: "Dimanche" },
    ]);
    const isAllVersionNotFilled = () => {
        const allNotFilled = versions.every((v) => v.prix === "")
        setNoVersionFilledError(allNotFilled);
        return allNotFilled;
    }
    const validate = (fields , required = true) => {
        const temp = {...errors};
        if('roomToSell' in fields){
            temp.roomToSell = '';
            const number = parseInt(fields.roomToSell, 10)
            if(Number.isNaN(number) && required){
                temp.roomToSell = 'Ce champ est requis';
            }
            else if(number <= 0){
                temp.roomToSell = 'Veuillez choisir un nombre positif';
            }
        }
        setErrors((prev)=>({...prev,...temp}));
    };

    const formIsValid = () => {
        const isValid = Object.values(errors).every((x) => x === '');
        return isValid;
    };
    const saveRoomType = () => {
        validate({ roomToSell });
        const save = () => {
            if( formIsValid() && roomToSell !== '')
            {
                context.showLoader(true);
                const payload = {
                    idTypeChambre: chambre._id,
                    days,
                    dateDebut: dateRange[0].format('YYYY-MM-DD'),
                    dateFin: dateRange[1].format('YYYY-MM-DD'),
                    toSell: parseInt(roomToSell,10),
                    isTypeChambreOpen:isRoomOpen,
                    forTypeChambre: true,
                    forTarif: false
                };
                // console.log(payload);
                configPrix(payload)
                    .then((result) => {
                        console.log(result.data);
                        if(result.data.status === 200)
                        {
                            reloadRoom(chambre._id);
                            context.changeResultSuccessMessage('vos changements ont été enregistrés.');
                            context.showResultSuccess(true);
                        }
                        else if(result.data.errors)
                        {
                            const item = Object.keys(result.data.errors).filter((e, i) => i === 0)[0];
                            const indication = result.data.errors[item];
                            const message = `${item}: ${indication}`;
                            context.changeResultErrorMessage(message);
                            context.showResultError(true);
                        }
                        else{
                            context.changeResultErrorMessage(`Une erreur inconnue s'est produite. Veuillez contacter l'administrateur`);
                            context.showResultError(true);
                        }
                    })
                    .catch((e) => {
                        context.changeResultErrorMessage(e.message);
                        context.showResultError(true);
                    })
                    .finally(() => {
                        // console.log('finally');
                        context.showLoader(false);
                    })
            }
        }
        save();

    };

    const saveRatePlan = (all=false) =>{

        const isValid = !(isAllVersionNotFilled());
        if (all) validate({ roomToSell });
        if (isValid && (!all || roomToSell !== ''))
        {
            context.showLoader(true);
            const payload = {
                idTypeChambre: chambre._id,
                tabIdTarif: ratePlans.reduce((stack, next) => {
                    if (next.checked) stack.push(next._id);
                    return stack;
                }, []),
                versions: versions.reduce((stack, next) => {
                    if (next.prix !== "") stack.push(next);
                    return stack;
                }, []),
                dateDebut: dateRange[0].format('YYYY-MM-DD'),
                dateFin: dateRange[1].format('YYYY-MM-DD'),
                isTarifOpen: isRatePlanOpen,
                forTypeChambre: all, 
                forTarif:true,
                toSell: parseInt(roomToSell, 10),
                isTypeChambreOpen: isRoomOpen,
                minSejour: 1,
                days,
            };
            console.log(payload);
            configPrix(payload)
                .then((result) => {
                    console.log(result.data);
                    if (result.data.status === 200) {
                        reloadRoom(chambre._id);
                        context.changeResultSuccessMessage('vos changements ont été enregistrés.');
                        context.showResultSuccess(true);
                    }
                    else if (result.data.errors) {
                        const item = Object.keys(result.data.errors).filter((e, i) => i === 0)[0];
                        const indication = result.data.errors[item];
                        const message = `${item}: ${indication}`;
                        context.changeResultErrorMessage(message);
                        context.showResultError(true);
                    }
                    else {
                        context.changeResultErrorMessage(`Une erreur inconnue s'est produite. Veuillez contacter l'administrateur`);
                        context.showResultError(true);
                    }
                })
                .catch((e) => {
                    context.changeResultErrorMessage(e.message);
                    context.showResultError(true);
                })
                .finally(() => {
                    // console.log('finally');
                    context.showLoader(false);
                })
        }
        
    };
    const handleChangeDays = (index) => {
        setDays((prev)=>(
            produce(prev,condition=>{
                condition[index].checked = !prev[index].checked;
            })
        ))
    };
    const handleChangeRatePlans = (index) => {
        setRatePlans((prev) => (
            produce(prev, condition => {
                condition[index].checked = !prev[index].checked;
            })
        ))
    };
    const handleChangeVersions = (e,index) => {
        setNoVersionFilledError(false);
        setVersions((prev)=>(
            produce(prev,changes=>{
                changes[index].prix = e.target.value !== '' ? Number.parseInt(e.target.value,10):'';   
            })
        ));
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(()=>{
        setOpenPicker(false);
        setRatePlans(
            chambre.planTarifaire.map((oneRP)=>(
                {
                    _id:oneRP._id,
                    nom:oneRP.names.fr,
                    checked:false,
                }
            ))
        );
        const v = [];
        for (let a = 1; a <= chambre.nbAdulte;a+=1){
            for(let e = 0;e <= chambre.nbEnfant;e+=1){
                v.push(
                    {
                        nbPers:a+e,
                        prix:"",
                        adultsNum:a,
                        childrenNum:e,
                    }
                );
                
            }
        }
        setVersions(v);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const dateRangeBeginningElts = getFrenchDate(moment(dateRange[0]).format('DD MMMM YYYY'));
    const dateRangeBeginning = `${dateRangeBeginningElts[0]} ${dateRangeBeginningElts[1]} ${dateRangeBeginningElts[2]}`;

    const dateRangeEndingElts = getFrenchDate(moment(dateRange[1]).format('DD MMMM YYYY'));
    const dateRangeEnding = `${dateRangeEndingElts[0]} ${dateRangeEndingElts[1]} ${dateRangeEndingElts[2]}`;

    return (
        <>
            <CustomizedIconButton onClick={handleClickOpen}>
                <EditIcon sx={{ width: 20, height: 20 }} />
            </CustomizedIconButton>
            <Dialog 
                open={open} 
                onClose={handleClose} 
                maxWidth={'sm'} 
                BackdropComponent={InvisibleBackdrop}
                PaperComponent={CustomizedPaperOutside}
            >
                <CustomizedDialogTitle   text={`Editeur (${chambre.names.fr})`} />
                <DialogContent
                    style={{
                        background: 'linear-gradient(308.48deg, rgba(255, 255, 255, 0.53) 2.36%, rgba(255, 255, 255, 0) 61.95%), #E3EDF7',
                        paddingTop: 15 ,
                    }}
                    className={styles.containerForm}
                >
                    <Stack spacing={5} style={{ paddingLeft: '2em', paddingRight: '2em' }}>
                        <div id="pickerHere" />
                        <div 
                            className={styles.customDateRangePicker}
                            role="button"
                            tabIndex={0}
                            onClick={() => setOpenPicker(!openPicker)}
                            onKeyDown={() => setOpenPicker(true)}
                        >
                            <span>{dateRangeBeginning} - {dateRangeEnding}</span>
                        </div>
                        <DateRangePicker
                            format="dd MMMM yyyy"
                            container={() => document.getElementById("pickerHere")}
                            onClick={() => setOpenPicker(!openPicker)}
                            // editable={false}
                            onOk={()=>setOpenPicker(false)}
                            open={openPicker}
                            placement='autoVerticalStart'
                            style={{ border: '2px #2476d2 solid', borderRadius: '8px', zIndex: 999, display: 'none'}}
                            value={[dateRange[0].toDate(), dateRange[1].toDate()]}
                            onChange={(val) => {
                                const newValue = JSON.parse(JSON.stringify(val));
                                for (let i = 0; i < newValue.length; i += 1) {
                                    newValue[i] = moment(new Date(newValue[i]));
                                }
                                setDateRange(newValue);
                                fetchData(newValue);
                                // if(newValue !== undefined && newValue[0] !== null && newValue[1] !== null){
                                //     getPrix(newValue);
                                // }
                            }}
                        />
                        <div>
                            {days.map((k,index) => (
                                <FormControlLabel
                                    key={k.value}
                                    control={
                                        <CustomizedCheckbox
                                            checked={k.checked}
                                        />
                                    }
                                    onClick={() => handleChangeDays(index)}
                                    label={k.label}
                                />
                            ))}
                        </div>

                        <hr />

                        <div 
                            style={{
                                textAlign:'center',
                            }}
                        >
                            <CustomizedTitle text='Type chambre'  level={2}/>
                            <Stack spacing={2}>
                                <RadioGroup 
                                    row aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={isRoomOpen ? "open" : "close"}
                                >
                                    <FormControlLabel
                                        control={<CustomizedRadio  />}
                                        label="Ouvrir"
                                        value="open"
                                        onClick={()=>setIsRoomOpen(true)}
                                    />
                                    <FormControlLabel
                                        control={<CustomizedRadio />}
                                        label="Fermer"
                                        value="close"
                                        onClick={()=>setIsRoomOpen(false)}
                                    />
                                </RadioGroup>
                                <CustomizedInput
                                    name="roomToSell"
                                    type="number"
                                    variant="outlined"
                                    label="Rooms to sell"
                                    placeholder="ex: 10"
                                    onChange={(e)=>{
                                        setRoomToSell(e.target.value);
                                        validate({ 'roomToSell': e.target.value },false)
                                    }}
                                    {...(errors.roomToSell && {
                                        error: true,
                                        helpertext: errors.roomToSell,
                                    })}
                                />
                                <CustomizedButton onClick={saveRoomType} text="Sauvegarder chambre" component={RouterLink} to="#" />
                            </Stack>
                        </div>

                        <hr />

                        <div
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <CustomizedTitle text='Plan tarifaire' level={2}/>
                            <Stack spacing={2}>
                                <div style={{textAlign: 'left'}}>
                                    {ratePlans.map((r, index) => (
                                        <FormControlLabel
                                            key={r._id}
                                            control={
                                                <CustomizedCheckbox
                                                    checked={r.checked}
                                                />
                                            }
                                            onClick={() => handleChangeRatePlans(index)}
                                            label={r.nom || r.names.fr}
                                        />
                                    ))}
                                </div>
                                <RadioGroup 
                                    row 
                                    aria-labelledby="demo-controlled-radio-buttons-group" 
                                    name="controlled-radio-buttons-group"
                                    value={isRatePlanOpen ? "open" : "close"}
                                >
                                    <FormControlLabel
                                        control={<CustomizedRadio />}
                                        label="Ouvrir"
                                        value="open"
                                        onClick={()=>setIsRatePlanOpen(true)}
                                    />
                                    <FormControlLabel
                                        control={<CustomizedRadio />}
                                        label="Fermer"
                                        value="close"
                                        onClick={()=>setIsRatePlanOpen(false)}
                                    />
                                </RadioGroup>
                                
                                <Grid container wrap='wrap' spacing={1} direction='row'>
                                    {
                                        versions.map((v,i)=> (
                                                <Grid item xs={6} key={i}> 
                                                    <CustomizedInput
                                                        name="roomToSell"
                                                        type="number"
                                                        variant="outlined"
                                                        label={`Adulte : ${v.adultsNum}  ______ Enfant : ${v.childrenNum} `}
                                                        placeholder="ex: 10"
                                                        onChange={(e)=>handleChangeVersions(e,i)}
                                                    />
                                                </Grid>    
                                        ))
                                    }
                                </Grid>
                                {
                                    noVersionFilledError && (
                                        <Alert severity="error" sx={{ background: "#FF647C", color: "white" }}>
                                            Veuillez remplir au moins un champ ci-dessus.
                                        </Alert>
                                    )
                                }
                                
                                <CustomizedButton text="Sauvegarder tarif" onClick={()=>saveRatePlan()} component={RouterLink} to="#" />
                                
                            </Stack>

                        </div>
                        <CustomizedButton text="Sauvegarder tous" onClick={()=>saveRatePlan(true)} component={RouterLink} to="#" />
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
};

EditorCustomizingDialog.propTypes = {
    chambre: PropTypes.any,
    reloadRoom: PropTypes.any,
};
export default EditorCustomizingDialog;