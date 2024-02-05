import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const fontFamilyLevel = [
  'RalewayExtraBold',
  'RalewayBold',
  'RalewayRegular',
  'RalewayMedium',
]
const CustomTitle = styled(Typography)((props) => ({
  fontFamily: fontFamilyLevel[props.level],
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '20px',
  letterSpacing: '-0.4px',
  color: props.color,
  fontSize:`${props.size}px`,
}));

const CustomizedTitle = (props) => (
    <CustomTitle {...props} variant="h5" gutterBottom>
      {props.text}
    </CustomTitle>
  );
CustomizedTitle.defaultProps = {
  color: '#8B9EB0',
  size: '18',
  text: '',
  level:1,
}
CustomizedTitle.propTypes = {
  text: PropTypes.any,
  color: PropTypes.any,
  size: PropTypes.any,
  level:PropTypes.any,
};
export default CustomizedTitle;
