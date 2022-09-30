import React,{ useState , useContext} from 'react';
import { format } from 'date-fns';
import produce from 'immer';
import moment from 'moment';
import { Stack, LinearProgress, FormControlLabel, RadioGroup } from '@mui/material';
import { DateRangePicker } from 'rsuite';
import PersonIcon from '@mui/icons-material/Person';

import CustomizedInput from '../../../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../../../CustomizedComponents/CustomizedButton';
import CustomizedTitle from '../../../CustomizedComponents/CustomizedTitle';

import { configPrixNPers } from '../../../../services/TCTarif';

import { ThemeContext } from '../../../context/Wrapper';

const VersionRowEditor = ({ handleClose, chambre, item, reloadRoom, ...others }) => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const context = useContext(ThemeContext);
    const [dateRange, setDateRange] = useState([moment(today), moment(nextWeek)]);
    const [prix, setPrix] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(false);
    const days = [
        { value: 1, checked: true, label: "Mon" },
        { value: 2, checked: true, label: "Tue" },
        { value: 3, checked: true, label: "Wed" },
        { value: 4, checked: true, label: "Thu" },
        { value: 5, checked: true, label: "Fri" },
        { value: 6, checked: true, label: "Sat" },
        { value: 7, checked: true, label: "Sun" },
    ];
    console.log(chambre);
    console.log(item);
    const handleClickSave = () => {
        validate({
            prix,
        })
        if (formIsValid() && prix !== '') {
            save();
        }
    };
    const save = () => {
        setLoading(true);
        const payload = {
            idTypeChambre: chambre._id,
            idTarif: chambre.planTarifaire[item.tarif_index]._id,
            dateDebut: dateRange[0].format('YYYY-MM-DD'),
            dateFin: dateRange[1].format('YYYY-MM-DD'),
            days,
            forTypeChambre: false,
            forTarif: true,
            adultsNum: item.adultsNum,
            childrenNum: item.childrenNum,
            prix: Number.parseFloat(prix),
            minSejour: 1,
        };
        // console.log(payload);
        configPrixNPers(payload)
            .then((result) => {
                console.log(result);
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
                    context.changeResultErrorMessage(`Changements non enregistrés. Une erreur est servenue`);
                    context.showResultError(true);
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
    }
    const validate = (fields) => {
        const temp = { ...errors };
        if ('prix' in fields) {
            temp.prix = '';
            const number = parseInt(fields.prix, 10)
            if (Number.isNaN(number)) {
                temp.prix = 'Ce champ est requis';
            }
            else if (number <= 0) {
                temp.prix = 'Veuillez choisir un nombre positif';
            }
        }
        setErrors(temp);
    };
    const formIsValid = () => {
        const isValid = Object.values(errors).every((x) => x === '');
        return isValid;
    };
    
    return (
        <div>
            <Stack spacing={2} justifyContent='space-evenly' alignItems='stretch' sx={{ p: 1, minHeight: '350px' }}>
                <div style={{ maxWidth: '250px', textAlign: 'center' }}>
                    <CustomizedTitle text='Modifier le tarif de cette version' />
                </div>
                <div style={{ maxWidth: '250px' }}>
                    <Stack direction='row' spacing={2} justifyContent='flex-start' alignItems='flex-start'>
                        <CustomizedTitle
                            text={`Nombre d'adulte: ${item.adultsNum}`}
                            level={0}
                            size={14}
                        />
                        <Stack direction='row' spacing={0} justifyContent='flex-start' alignItems='flex-start'>
                            {
                                [... new Array(item.adultsNum)].map((e, i) => {
                                    return (
                                        <PersonIcon key={i} />
                                    )
                                })
                            }
                        </Stack>
                        
                        
                    </Stack>
                    <Stack direction='row' spacing={1} justifyContent='flex-start' alignItems='flex-start'>
                        <CustomizedTitle
                            text={`Nombre d'enfant: ${item.childrenNum}`}
                            level={0}
                            size={14}
                        />
                        <Stack direction='row' spacing={0} justifyContent='flex-start' alignItems='flex-start'>
                            {
                                [... new Array(item.childrenNum)].map((e, i) => {
                                    return (
                                        <PersonIcon key={i} sx={{ fontSize: 15 }} />
                                    )
                                })
                            }
                        </Stack>
                    </Stack>
                    
                </div>
                <DateRangePicker
                    open={false}
                    placement='autoVerticalStart'
                    style={{ border: '2px #2476d2 solid', borderRadius: '8px' }}
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
                <CustomizedInput 
                    label='prix'
                    placeholder='prix ex: 45'
                    type="number"
                    inputProps={{
                        type: 'number',
                        min: 0,
                    }}
                    onChange={(e) => {
                        setPrix(e.target.value);
                        validate({ 'prix': e.target.value });
                    }}
                    {...(errors.prix && {
                        error: true,
                        helpertext: errors.prix,
                    })}
                />
                <CustomizedButton
                    disabled={loading}
                    onClick={handleClickSave}
                    text='save'
                    sx={{ background: 'linear-gradient(270deg, #50CAFF 0%, #0478FF 100%)' }}
                />
                {
                    loading && (
                        <LinearProgress color='info' />
                    )
                }
            </Stack>
        </div>
    );
};

export default VersionRowEditor;