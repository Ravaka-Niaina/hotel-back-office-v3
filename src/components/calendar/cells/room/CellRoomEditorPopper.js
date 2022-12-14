import React , { useState , useContext} from 'react';
import PropTypes from 'prop-types';
import {format} from 'date-fns';
import produce from 'immer';
import { Popper, Slide , Stack,  FormControlLabel, RadioGroup ,LinearProgress  } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import CustomizedIconButton from '../../../CustomizedComponents/CustomizedIconButton';
import CustomizedPaperOutside from '../../../CustomizedComponents/CustomizedPaperOutside';
import CustomizedRadio from '../../../CustomizedComponents/CustomizedRadio';
import CustomizedInput from '../../../CustomizedComponents/CustomizedInput';
import CustomizedTitle from '../../../CustomizedComponents/CustomizedTitle';

import { ThemeContext } from '../../../context/Wrapper';

import {configPrix} from '../../../../services/TCTarif';
import {days} from '../../../../services/Util';

const CellRoomEditorPopper = ({ open, anchorEl , setOpen , selected , setSelected ,chambre,setChambre , ...others}) => {
    const context = useContext(ThemeContext);
    const [ loading , setLoading ] = useState(false);
    const [ modifyOpenStatus, setModifyOpenStatus ] = useState(true);
    const [ roomToSell , setRoomToSell ] = useState('');
    const [ openStatus , setOpenStatus ] = useState(true);
    const [ errors , setErrors ] = useState(false);
    const validate = (fields) => {
        const temp = {...errors};
        if('roomToSell' in fields){
            temp.roomToSell = '';
            const number = parseInt(fields.roomToSell, 10)
            if(Number.isNaN(number)){
                temp.roomToSell = 'Ce champ est requis';
            }
            else if(number <= 0){
                temp.roomToSell = 'Veuillez choisir un nombre positif';
            }
        }
        setErrors(temp);
    };
    const formIsValid = () => {
        const isValid = Object.values(errors).every((x) => x === '');
        return isValid;
    };
    const save = () => {
        setLoading(true);
        const payload = {
            idTypeChambre: chambre._id,
            dateDebut: selected[0],
            dateFin: selected[selected.length - 1],
            toSell: Number.parseInt(roomToSell, 10),
            isTypeChambreOpen: !modifyOpenStatus ? true : openStatus,
            forTypeChambre: true,
            forTarif: false,
            modifierOuvertureChambre: modifyOpenStatus,
            days,
        };
        console.log(payload);
        configPrix(payload)
            .then((result) => {
                console.log(result.data);
                if (result.data.status === 200) {
                    setChambre((prev) => 
                        produce(prev, condition => {
                            const firstItemIndex = prev.statusDays.findIndex((elem) => elem.date === selected[0]);
                            const lastItemIndex = prev.statusDays.findIndex((elem) => elem.date === selected[selected.length - 1]);
                            for (let i = firstItemIndex; i <= lastItemIndex; i += 1) {
                                condition.statusDays[i].toSell = payload.toSell;
                                condition.statusDays[i].closed = !payload.isTypeChambreOpen;

                            }
                        })
                    )
                
                    context.changeResultSuccessMessage('vos changements ont ??t?? enregistr??s.');
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
                else {
                    context.changeResultErrorMessage(`Changements non enregistr??s. Une erreur est servenue`);
                    context.showResultError(true);
                }
            })
            .catch((error) => {
                context.changeResultErrorMessage(error.message);
                context.showResultError(true);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
    };
    const handleClickSave = () =>{
        validate({
            roomToSell,
        })
        if(formIsValid() && roomToSell !== ''){
            save();
        }
    };
    const handleClose = () => {
        setSelected([]);
        setOpen(false);
    };
    return (
        <>
            <Popper open={open && selected.length>0} anchorEl={anchorEl} placement='top' transition {...others}>
                {({ TransitionProps }) => (
                    <Slide {...TransitionProps} timeout={350}>
                        <div>
                            <CustomizedPaperOutside sx={{ background: '#E3EDF7' , p: 2, width: '250px', minHeight: '350px' }}>
                                <Stack direction="column" spacing={2} justifyContent='flex-start'>
                                    <Stack>
                                        <CustomizedTitle text={chambre.nom} level={0} />
                                        <h6>
                                            {
                                                selected[0] && format(new Date(selected[0]), 'd MMMM yyyy')
                                            }
                                            {
                                                selected.length > 1 && `  -  ${format(new Date(selected[selected.length - 1]), 'd MMMM yyyy')}`
                                            }
                                        </h6>
                                    </Stack>
                                    <FormControlLabel 
                                        onClick={()=>setModifyOpenStatus((prev)=>!prev)}
                                        control={<CustomizedRadio checked={modifyOpenStatus}/>} 
                                        label='Modifier ouverture de la chambre' 
                                    />
                                    <RadioGroup
                                        aria-labelledby="demo-customized-radios"
                                        name="customized-radios"
                                        row
                                        {
                                        ...(!modifyOpenStatus && { value:"open" })
                                        }
                                        {
                                        ...(modifyOpenStatus && { value:openStatus?"open": "close"  })
                                        }
                                    >
                                        <FormControlLabel 
                                            disabled={!modifyOpenStatus} 
                                            {
                                            ...(modifyOpenStatus && { onClick: () => setOpenStatus(true) })
                                            }
                                            value="open" 
                                            control={<CustomizedRadio />} 
                                            label="Open" 
                                        />
                                        <FormControlLabel 
                                            disabled={!modifyOpenStatus} 
                                            {
                                                ...(modifyOpenStatus && { onClick:() => setOpenStatus(false) })
                                            }
                                            value="close" 
                                            control={<CustomizedRadio />} 
                                            label="Close" 
                                        />
                                    </RadioGroup>
                                    <CustomizedInput 
                                        type="number" 
                                        inputProps={{
                                            type:'number',
                                            min:0,
                                        }} 
                                        placeholder="ex: 20" 
                                        variant="outlined" 
                                        label="Room to sell" 
                                        onChange={(e)=>{
                                            setRoomToSell(e.target.value);
                                            validate({ 'roomToSell': e.target.value })
                                        }}
                                        {...(errors.roomToSell && {
                                            error: true,
                                            helpertext: errors.roomToSell,
                                        })}
                                    />
                                    <Stack direction="row" spacing={2} justifyContent='space-evenly' alignItems='center'>
                                            <CustomizedIconButton 
                                                disabled={loading}
                                                onClick={handleClickSave}
                                            >
                                                <SaveIcon sx={{ color: '#2FEFCC' }} /> {  /* #2476d2 */}
                                            </CustomizedIconButton>
                                            
                                        
                                        <CustomizedIconButton onClick={handleClose}>
                                            <CancelIcon sx={{ color: '#FF647C' }} />
                                        </CustomizedIconButton>
                                    </Stack>
                                    {
                                        loading && (
                                            <LinearProgress color='info'/>
                                        )
                                    }
                                </Stack>
                            </CustomizedPaperOutside>
                        </div>
                    </Slide>
                )}
            </Popper>   
        </>
    );
};
CellRoomEditorPopper.propTypes = {
    open: PropTypes.any,
    anchorEl: PropTypes.any,
    setOpen: PropTypes.any,
    selected: PropTypes.any,
    setSelected: PropTypes.any,
    chambre: PropTypes.any,
    setChambre: PropTypes.any,
    
};
export default CellRoomEditorPopper;