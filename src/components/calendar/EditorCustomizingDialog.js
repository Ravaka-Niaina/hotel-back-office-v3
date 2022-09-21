import React , { useEffect, useState } from 'react';
import produce from 'immer';
import moment from 'moment';
import { Dialog, DialogActions, DialogContent, Button, Stack, FormControlLabel, RadioGroup , Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { DateRangePicker } from 'rsuite';

import EditIcon from '@mui/icons-material/Edit';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedCheckbox from '../CustomizedComponents/CustomizedCheckbox';
import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';

import './index.css';

const EditorCustomizingDialog = ({chambre}) => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const [dateRange, setDateRange] = useState([moment(today), moment(nextWeek)]);
    const [openPicker,setOpenPicker] = useState(false);
    const [ open , setOpen ] = useState(false);
    const [ratePlans , setRatePlans] = useState([]);
    const [versions , setVersions] = useState([]);
    const [roomToSell,setRoomToSell] = useState('');
    const [days, setDays] = React.useState([
        { value: 1, checked: true, label: "Mon" },
        { value: 2, checked: true, label: "Tue" },
        { value: 3, checked: true, label: "Wed" },
        { value: 4, checked: true, label: "Thu" },
        { value: 5, checked: true, label: "Fri" },
        { value: 6, checked: true, label: "Sat" },
        { value: 7, checked: true, label: "Sun" },
    ]);
    const handleChangeDays = (index) => {
        setDays((prev)=>{
            return produce(prev,condition=>{
                condition[index].checked = !prev[index].checked;
            });
        })
    };
    const handleChangeRatePlans = (index) => {
        setRatePlans((prev) => {
            return produce(prev, condition => {
                condition[index].checked = !prev[index].checked;
            });
        })
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(()=>{
        setRatePlans(
            chambre.planTarifaire.map((oneRP)=>{
                return {
                    _id:oneRP._id,
                    nom:oneRP.nom,
                    checked:false,
                };
            })
        );
        const v = [];
        for (let a = 1; a <= chambre.nbAdulte;a+=1){
            for(let e = 0;e <= chambre.nbEnfant;e+=1){
                v.push(
                    {
                        nbPers:a+e,
                        prix:"",
                        nbAdulte:a,
                        nbEnfant:e,
                    }
                );
            }
        }
        setVersions(v);
    },[]);
    return (
        <>
            <CustomizedIconButton onClick={handleClickOpen}>
                <EditIcon sx={{ width: 20, height: 20 }} />
            </CustomizedIconButton>
            <Dialog open={open} onClose={handleClose} maxWidth={'sm'}>
                <CustomizedDialogTitle text={`Editor (${chambre.nom})`}/>
                <DialogContent style={{ backgroundColor: '#E8F0F8', paddingTop: 15 }}>
                    <Stack spacing={5} style={{ paddingLeft: '2em', paddingRight: '2em' }}>
                        <DateRangePicker
                            open={openPicker}
                            placement='autoVerticalStart'
                            style={{ border: '2px #2476d2 solid', borderRadius: '8px'}}
                            value={[dateRange[0].toDate(), dateRange[1].toDate()]}
                            onChange={(val) => {
                                const newValue = JSON.parse(JSON.stringify(val));
                                for (let i = 0; i < newValue.length; i += 1) {
                                    newValue[i] = moment(new Date(newValue[i]));
                                }
                                setDateRange(newValue);
                                // if(newValue !== undefined && newValue[0] !== null && newValue[1] !== null){
                                //     getPrix(newValue);
                                // }
                            }}
                        />
                        <div >
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
                            <h4>Type chambre</h4>
                            <Stack spacing={2}>
                                <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
                                    <FormControlLabel
                                        control={<CustomizedRadio  />}
                                        label="Open"
                                    />
                                    <FormControlLabel
                                        control={<CustomizedRadio />}
                                        label="Close"
                                    />
                                </RadioGroup>
                                <CustomizedInput
                                    name="roomToSell"
                                    type="number"
                                    variant="outlined"
                                    label="Rooms to sell"
                                    placeholder="ex: 10"
                                />
                                <CustomizedButton text="Sauvegarder" component={RouterLink} to="#" />
                            </Stack>
                        </div>

                        <hr />

                        <div
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <h4>Plan tarifaire</h4>
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
                                            label={r.nom}
                                        />
                                    ))}
                                </div>
                                <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
                                    <FormControlLabel
                                        control={<CustomizedRadio />}
                                        label="Open"
                                    />
                                    <FormControlLabel
                                        control={<CustomizedRadio />}
                                        label="Close"
                                    />
                                </RadioGroup>
                                <Grid container wrap='wrap' spacing={1} direction='row'>
                                    {
                                        versions.map((v,i)=>{
                                            return (
                                                <Grid item xs={6} key={i}> 
                                                    <CustomizedInput
                                                        name="roomToSell"
                                                        type="number"
                                                        variant="outlined"
                                                        label={`Adulte(x${v.nbAdulte}) - Enfant(x${v.nbEnfant})`}
                                                        placeholder="ex: 10"
                                                    />
                                                </Grid>    
                                            )
                                        })
                                    }
                                </Grid>
                                
                                <CustomizedButton text="Sauvegarder" component={RouterLink} to="#" />
                            </Stack>
                        </div>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#E8F0F8', height: '150px' }}>
                    <Button onClick={handleClose} sx={{ fontSize: 12 }}>
                        Annuler
                    </Button>
                    <CustomizedButton  text="Valider" component={RouterLink} to="#" />
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditorCustomizingDialog;