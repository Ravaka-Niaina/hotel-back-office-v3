import React from 'react';
import { Stack } from '@mui/material';
import { Link as RouterLink} from 'react-router-dom';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import { lightBackgroundToTop } from '../CustomizedComponents/NeumorphismTheme';

const ReservationDetails = ({reservation,index,navigate}) => {
    const handleClose = () => {
        navigate('list');
    };
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <CustomizedTitle size={20} text="Details Reservation" />
                <CustomizedButton text="retour" onClick={handleClose} variant="contained" component={RouterLink} to="#" />
            </Stack>

            <CustomizedPaperOutside
                sx={{
                    ...lightBackgroundToTop,
                    minHeight: '100vh',
                    border: '1px white solid',
                    color: 'white',
                    padding: 5,
                }}
            >
                a       
            </CustomizedPaperOutside>
                     
        </>
    );
};
export default ReservationDetails;