import React from 'react';
import { Stack } from '@mui/material';
// component

import ModifyHotelDialog from './ModifyHotelDialog';
import DeleteHotelDialog from './DeleteHotelDialog';

const HotelMoreMenu = (props) => {
    const { row, reload } = props;
    return (
        <>
            <Stack direction="row" spacing={2}>
                <ModifyHotelDialog  row={row} reload={reload} />
                <DeleteHotelDialog  hotelId={row._id} reload={reload}/>
            </Stack>
        </>
    );
};

export default HotelMoreMenu;