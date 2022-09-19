import React , { useState } from 'react';
import { format } from 'date-fns';
import { Popper, Slide , Stack,  FormControlLabel, RadioGroup , LinearProgress  } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import CustomizedIconButton from '../../../CustomizedComponents/CustomizedIconButton';
import CustomizedPaperOutside from '../../../CustomizedComponents/CustomizedPaperOutside';
import CustomizedRadio from '../../../CustomizedComponents/CustomizedRadio';
import CustomizedInput from '../../../CustomizedComponents/CustomizedInput';

const getItemData = (item) => {
    if (typeof item !== 'string') {
        return null;
    };
    const dataSplited = item.split('@');
    return {
        "date": dataSplited[0],
        "rate_plan_index": parseInt(dataSplited[1], 10),
        "version_index": parseInt(dataSplited[2], 10),
    };
};
const CellRatePlanEditorPopper = ({ open, anchorEl , setOpen , selected , setSelected,chambre , ...others}) => {
    const [loading, setLoading] = useState(false);
    const [modifyOpenStatus, setModifyOpenStatus] = useState(true);
    const [openStatus, setOpenStatus] = useState(true);
    const [prix, setPrix] = useState('');
    const handleClickSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
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
                                        <h4>{chambre.nom}</h4>
                                        <h6>
                                            {
                                                selected[0] && format(new Date(getItemData(selected[0]).date), 'd MMMM yyyy')
                                            }
                                            {
                                                selected.length > 1 && `  -  ${format(new Date(getItemData(selected[selected.length - 1]).date), 'd MMMM yyyy')}`
                                            }
                                        </h6>
                                    </Stack>
                                    <FormControlLabel 
                                        onClick={() => setModifyOpenStatus((prev) => !prev)}
                                        control={<CustomizedRadio checked={modifyOpenStatus}/>} 
                                        label="Modifier disponibilité tarif" 
                                    />
                                    <RadioGroup
                                        aria-labelledby="demo-customized-radios"
                                        name="customized-radios"
                                        row
                                        {
                                        ...(!modifyOpenStatus && { value: "other" })
                                        }
                                        {
                                        ...(modifyOpenStatus && { value: openStatus ? "open" : "close" })
                                        }
                                    >
                                        <FormControlLabel 
                                            disabled={!modifyOpenStatus} 
                                            value="open" 
                                            {
                                            ...(modifyOpenStatus && { onClick: () => setOpenStatus(true) })
                                            }
                                            control={<CustomizedRadio />} 
                                            label="Open"
                                        />
                                        <FormControlLabel 
                                            disabled={!modifyOpenStatus} 
                                            value="close" 
                                            {
                                            ...(modifyOpenStatus && { onClick: () => setOpenStatus(false) })
                                            }
                                            control={<CustomizedRadio />} 
                                            label="Close" 
                                        />
                                    </RadioGroup>
                                    <CustomizedInput 
                                        placeholder="ex: 200" 
                                        variant="outlined" 
                                        label={`${2} adultes + ${1} enfants (${'$'})`}
                                        type="number"
                                        inputProps={{
                                            type: 'number',
                                            min: 0,
                                        }}
                                        onChange={(e) => setPrix(e.target.value)}
                                    />
                                    <Stack direction="row" spacing={2} justifyContent='space-evenly' alignItems='center'>
                                        <CustomizedIconButton onClick={handleClickSave} disabled={loading}>
                                            <SaveIcon sx={{ color: '#2FEFCC' }} /> {  /* #2476d2 */ }
                                        </CustomizedIconButton>
                                        <CustomizedIconButton onClick={handleClose}>
                                            <CancelIcon sx={{ color: '#FF647C' }} />
                                        </CustomizedIconButton>
                                    </Stack>
                                    {
                                        loading && (
                                            <LinearProgress color='info' />
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

export default CellRatePlanEditorPopper;