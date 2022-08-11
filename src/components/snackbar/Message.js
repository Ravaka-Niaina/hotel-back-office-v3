import React from 'react';
import PropTypes from 'prop-types'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const Message = ({ vertical, horizontal, message, autoHideDuration, open, handleClose, severity }) => (
  <div>
    {' '}
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  </div>
);
// vertical, horizontal, message, autoHideDuration, open, handleClose, severity
Message.propTypes = {
  vertical: PropTypes.any,
  horizontal: PropTypes.any,
  message: PropTypes.any,
  autoHideDuration: PropTypes.any,
  open: PropTypes.any,
  handleClose: PropTypes.any,
  severity: PropTypes.any,
}

export default Message;
