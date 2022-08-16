import {useState,useEffect,useContext} from 'react';
import { CircularProgress ,  Stack  } from '@mui/material';
import { ThemeContext } from '../context/Wrapper';
import CustomizedSwitch from '../CustomizedComponents/CustomizedSwitch';
import {switchRatePlanStatus} from '../../services/RatePlan';



const RatePlanStatus = (props) => {

    const { reload,ratePlanId,isActif } = props;
    const context = useContext(ThemeContext);
    const handleSwitch = () => {
        const payload={
            _id:ratePlanId,
            isActif:!isActif,
        };
        context.setPartialLoading({...context.partialLoading,'loading':true,'identifier':ratePlanId});
        switchRatePlanStatus(payload)
            .then((result) =>{  
                console.log(result);
                if(result.data.status === 200)
                {
                    reload(true);
                }
                else{
                    context.changeResultErrorMessage(`Une erreur est survenue lors du modification du status.`);
                    context.showResultError(true);
                    context.setPartialLoading({ ...context.partialLoading, 'loading': false, 'identifier': ''});
                }
            })
            .catch((e) =>{
                let message = `Une erreur est survenue lors du modification du status.`;
                if (e.code === 'ERR_NETWORK')
                {
                    message = 'vous êtes actuellement hors ligne.';
                }
                context.changeResultErrorMessage(message);
                context.showResultError(true);
                context.setPartialLoading({ ...context.partialLoading, 'loading': false, 'identifier': '' });
            })
    };
    return (
        <>
            <div style={{padding:'auto'}}> 
                <Stack direction="row" spacing={1} alignItems="center">
                    <CustomizedSwitch checked={isActif} onClick={handleSwitch}  disabled={context.partialLoading.loading && context.partialLoading.identifier === ratePlanId}/>
                    { 
                      context.partialLoading.loading && context.partialLoading.identifier === ratePlanId && (
                        <CircularProgress size={18}/>
                      )   
                    }
                </Stack>
            </div>
        </>
    );
};
export default RatePlanStatus;