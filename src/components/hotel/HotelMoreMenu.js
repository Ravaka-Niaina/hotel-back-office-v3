import React from 'react';
import { Stack } from '@mui/material';
// component
import PropTypes from 'prop-types';
import ModifyHotelDialog from './ModifyHotelDialog';
import DeleteHotelDialog from './DeleteHotelDialog';

const HotelMoreMenu = (props) => {
  const { row, reload } = props;
  return (
    <>
      <Stack direction="row" spacing={2}>
        <DeleteHotelDialog hotelId={row._id} reload={reload} />
      </Stack>
    </>
  );
};
HotelMoreMenu.propTypes = {
  row: PropTypes.any,
  reload: PropTypes.func,
};
export default HotelMoreMenu;
