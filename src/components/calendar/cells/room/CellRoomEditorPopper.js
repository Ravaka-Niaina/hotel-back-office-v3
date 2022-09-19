import React , { useState } from 'react';
import {format} from 'date-fns';
import { Popper, Slide , Stack,  FormControlLabel, RadioGroup ,LinearProgress  } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import CustomizedIconButton from '../../../CustomizedComponents/CustomizedIconButton';
import CustomizedPaperOutside from '../../../CustomizedComponents/CustomizedPaperOutside';
import CustomizedRadio from '../../../CustomizedComponents/CustomizedRadio';
import CustomizedInput from '../../../CustomizedComponents/CustomizedInput';

import {configPrix} from '../../../../services/TCTarif';
import {days} from '../../../../services/Util';

const CellRoomEditorPopper = ({ open, anchorEl , setOpen , selected , setSelected ,chambre , ...others}) => {
    const handleClose = () => {
        setSelected([]);
        setOpen(false);
    };
    const [ loading , setLoading ] = useState(false);
    const [ modifyOpenStatus, setModifyOpenStatus ] = useState(true);
    const [ roomToSell , setRoomToSell ] = useState('');
    const [ openStatus , setOpenStatus ] = useState(true);
    const handleClickSave = () =>{
        setLoading(true);
        
        const payload = {
            idTypeChambre: chambre._id,
            dateDebut: selected[0],
            dateFin: selected[selected.length - 1],
            toSell: Number.parseInt(roomToSell,10),
            isTypeChambreOpen: openStatus,
            forTypeChambre: true,
            forTarif: false,
            modifierOuvertureChambre: modifyOpenStatus,
            days,
        };
        console.log(payload);
        configPrix(payload)
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
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
                                        <h4>{chambre.nom}</h4>
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
                                        ...(!modifyOpenStatus && { value:"other" })
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
                                            onClick={() => setOpenStatus(false)} 
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
                                        onChange={(e)=>setRoomToSell(e.target.value)}
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

export default CellRoomEditorPopper;