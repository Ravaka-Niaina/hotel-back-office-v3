import React from 'react';
import { DialogTitle, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import CustomizedTitle from '../CustomizedTitle';

const CustomizedDialogTitle = (props) => (
  <DialogTitle
    sx={{
      // background: `linear-gradient(270deg, #33647E 0%, #59A2BE 100%);`,
      background:'#E3EDF7',
      pt:4,
      pb:4,
      textAlign:'center',
    }}
  >
    <Typography variant="h4" component="div" gutterBottom>
      <CustomizedTitle text={props.text} size={props.size}/>
    </Typography>
  </DialogTitle>
);
CustomizedDialogTitle.defaultProps = {
  text: '',
  size: 24,
}
CustomizedDialogTitle.propTypes = {
  text: PropTypes.any,
  size:PropTypes.any,
};
export default CustomizedDialogTitle;
