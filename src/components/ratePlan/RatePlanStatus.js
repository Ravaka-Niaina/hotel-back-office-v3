import {useState,useEffect,useContext} from 'react';
import { CircularProgress ,  Stack  } from '@mui/material';
import { ThemeContext } from '../context/Wrapper';
import CustomizedSwitch from '../CustomizedComponents/CustomizedSwitch';
import {switchRatePlanStatus} from '../../services/RatePlan';



const RatePlanStatus = (props) => {

    const { reload,ratePlanId,isActif } = props;
    const [ loading,setLoading ] = useState(false);
    const context = useContext(ThemeContext);
    const handleSwitch = () => {
        const payload={
            _id:ratePlanId,
            isActif:true,
        };
        setLoading(true);
        switchRatePlanStatus(payload)
            .then((result) =>{
                console.log(result);
                if(result.data.status === 200)
                {
                    reload();
                }
                else{
                    context.changeResultErrorMessage(`Une erreur est servenue lors du modification du status.`);
                    context.showResultError(true);
                }
            })
            .catch((e) =>{
                context.changeResultErrorMessage(`Une erreur est servenue lors du modification du status.`);
                    context.showResultError(true);
            })
            .finally(() => {
                setLoading(false);
            })
    };
    return (
        <>
            <div style={{padding:'auto'}}> 
                <Stack direction="row" spacing={1} alignItems="center">
                    <CustomizedSwitch checked={isActif} onClick={handleSwitch}  disabled={loading}/>
                    { 
                      loading && (
                        <CircularProgress size={18}/>
                      )   
                    }
                </Stack>
            </div>
        </>
    );
};
export default RatePlanStatus;