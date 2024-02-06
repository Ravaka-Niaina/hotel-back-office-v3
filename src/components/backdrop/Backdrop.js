import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from "prop-types"

export default function SimpleBackdrop({ open }) {
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: 2147483647 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

SimpleBackdrop.propTypes = {
  open: PropTypes.any
}
