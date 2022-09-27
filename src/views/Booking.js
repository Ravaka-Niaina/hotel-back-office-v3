import React from 'react';
import { Stack, Container} from '@mui/material';
import Page from '../components/Page';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';


const Booking = () => {
    return (
        <Page title="AIOLIA | Reservations">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <CustomizedTitle size={20} text="Reservations" />
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
                    Book
                </CustomizedPaperOutside>
            </Container>
        </Page>
    );
};

export default Booking;