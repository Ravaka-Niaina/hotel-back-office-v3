import React , { useState } from 'react';
import { format } from 'date-fns';
import { Popper, Slide , Stack,  FormControlLabel, RadioGroup , LinearProgress  } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import CustomizedIconButton from '../../../CustomizedComponents/CustomizedIconButton';
import CustomizedPaperOutside from '../../../CustomizedComponents/CustomizedPaperOutside';
import CustomizedRadio from '../../../CustomizedComponents/CustomizedRadio';
import CustomizedInput from '../../../CustomizedComponents/CustomizedInput';

import { configPrixNPers } from '../../../../services/TCTarif';
import { days } from '../../../../services/Util';

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
    const [prix, setPrix] = useState('');
    const handleClickSave = () => {
        setLoading(true);
        const firstElement = getItemData(selected[0]);
        const lastElement = getItemData(selected[selected.length-1]);
        console.log(firstElement.date);
        console.log(format(new Date(firstElement.date),'yyyy-MM-dd'))
        const payload = {
            idTypeChambre: chambre._id,
            idTarif: chambre.planTarifaire[firstElement.rate_plan_index]._id,
            dateDebut: format(new Date(firstElement.date), 'yyyy-MM-dd'),
            dateFin: format(new Date(lastElement.date), 'yyyy-MM-dd'),
            days,
            forTypeChambre: false,
            forTarif: true,
            nbPers: chambre.planTarifaire[firstElement.rate_plan_index].prixTarif[0].versions[firstElement.version_index].nbPers,
            prix: Number.parseFloat(prix),
            minSejour: 1,
        };
    
        console.log(payload);
        setTimeout(() => {
                    setLoading(false);
                }, 2000);
        configPrixNPers(payload)
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
                            <CustomizedPaperOutside sx={{ background: '#E3EDF7' , p: 2, width: '250px', minHeight: '250px' }}>
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