import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const CustomTitle = styled('span')({
  width: '94px',
  height: '20px',
  fontFamily: 'RalewayRegular',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '20px',
  /* identical to box height, or 95% */
  letterSpacing: '-0.4px',
  color: 'white',
});
const CustomizedTitle = (props) => <CustomTitle>{props.text}</CustomTitle>;

CustomizedTitle.propTypes = {
  text: PropTypes.any,
};
export default CustomizedTitle;
