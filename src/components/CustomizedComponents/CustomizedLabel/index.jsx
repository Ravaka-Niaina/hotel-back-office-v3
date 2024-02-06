import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const CustomLabel = styled('span')({
  width: '300px',
  maxHeight: '20px',
  left: '0px',
  top: '7px',
  fontWeight: '700',
  fontSize: '13px',
  lineHeight: '15px',
  /* identical to box height, or 154% */
  display: 'flex',
  alignItems: 'center',
  color: '#8B9EB0',
});
const CustomizedLabel = (props) => <CustomLabel {...(props.labelcolor && { sx : {color:`${props.labelcolor} !important`}})} >{props.label}</CustomLabel>;

CustomizedLabel.propTypes = {
  label: PropTypes.any,
  labelcolor : PropTypes.any,
};
export default CustomizedLabel;
