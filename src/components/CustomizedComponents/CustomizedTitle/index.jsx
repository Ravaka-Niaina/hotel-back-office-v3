import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

<Typography sx={{ color: '#787878', fontWeight: '500' }} variant="h4" gutterBottom>
            Promotions
</Typography>
const CustomTitle = styled(Typography)({
  fontFamily: 'RalewayBold',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '20px',
  letterSpacing: '-0.4px',
  color: 'white',
});
const CustomizedTitle = (props) => <CustomTitle {...props} variant="h4" gutterBottom>{props.text}</CustomTitle>;

CustomizedTitle.propTypes = {
  text: PropTypes.any,
};
export default CustomizedTitle;
