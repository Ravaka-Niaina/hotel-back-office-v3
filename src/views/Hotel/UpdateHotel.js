import React, { useState, useContext, } from 'react';
import { Container } from '@mui/material';
import ModifyHotelDialog from '../../components/hotel/ModifyHotelDialog';
import Page from '../../components/Page';
import { ThemeContext } from '../../components/context/Wrapper';

const UpdateHotel = () => (
    <Page title="AIOLIA | Hotels">
      <Container>
        <ModifyHotelDialog />
      </Container>
    </Page>
  );

export default UpdateHotel;
