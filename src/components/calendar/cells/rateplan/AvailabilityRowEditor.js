import React , { useState , useContext} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Stack, LinearProgress, FormControlLabel,RadioGroup } from '@mui/material';
import { DateRangePicker } from 'rsuite';

import CustomizedRadio from '../../../CustomizedComponents/CustomizedRadio';
import CustomizedButton from '../../../CustomizedComponents/CustomizedButton';
import CustomizedTitle from '../../../CustomizedComponents/CustomizedTitle';

import { ThemeContext } from '../../../context/Wrapper';
import { saveRatePlanAvailability } from '../../../../services/TCTarif';

const AvailabilityRowEditor = ({ handleClose, chambre, item, reloadRoom, ...others }) => {
    console.log(chambre);
    console.log(item);
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const context = useContext(ThemeContext);
    const [dateRange, setDateRange] = useState([moment(today), moment(nextWeek)]);
    const [openStatus,setOpenStatus] = useState(true);
    const [loading,setLoading] = useState(false);
    
    const handleClickSave = () => {
        setLoading(true);
        const payload = {
            dateDebut: dateRange[0].format('YYYY-MM-DD'),
            dateFin: dateRange[1].format('YYYY-MM-DD'),
            idTypeChambre: chambre._id,
            idTarif: chambre.planTarifaire[item.tarif_index]._id,
            isTarifOpen: openStatus,
        };
        console.log(payload);
        saveRatePlanAvailability(payload)
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
                    context.changeResultErrorMessage(`Changement du status impossible.`);
                    context.showResultError(true);
                }
            })
            .catch((error) => {
                context.changeResultErrorMessage(error.message);
                context.showResultError(true);
            })
            .finally(() => {
                setLoading(false);
                handleClose();
            })
    };
    
    return (
        <>
            <div {...others}>
                <Stack spacing={2} justifyContent='space-evenly' alignItems='stretch' sx={{ p: 1, minHeight: '350px' }}>
                    <div style={{maxWidth:'250px',textAlign:'center'}}>
                        <CustomizedTitle text='Modifier la disponibilite du plan tarifaire' />
                    </div>
                    <div style={{maxWidth:'250px'}}>
                        <CustomizedTitle text={chambre.planTarifaire[item.tarif_index].nom} level={0} size={14} />
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
                        <RadioGroup
                            aria-labelledby="demo-customized-radios"
                            name="customized-radios"
                            row
                            value= {openStatus ? "open" : "close" }
                        >
                            <FormControlLabel
                                            onClick={() => setOpenStatus(true) }
                                            value="open"
                                            control={<CustomizedRadio />}
                                            label="Open"
                            />
                            <FormControlLabel
                                    onClick={() => setOpenStatus(false)}
                                    value="close"
                                    control={<CustomizedRadio />}
                                    label="Close"
                            />
                        </RadioGroup>
                        <CustomizedButton
                            disabled={loading}
                            onClick={handleClickSave}
                            text='save'
                            sx={{ background:'linear-gradient(270deg, #50CAFF 0%, #0478FF 100%)'}}
                        />
                        {
                            loading && (
                                <LinearProgress color='info' />
                            )
                        }
                </Stack>
            </div>
        </>
    );
};
AvailabilityRowEditor.propTypes = {
    handleClose: PropTypes.any,
    chambre: PropTypes.any,
    item: PropTypes.any,
    reloadRoom: PropTypes.any,
};
export default AvailabilityRowEditor;