import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomizedLabel from '../CustomizedLabel';
import CustomizedHelperText from '../CustomizedHelperText';

const CustomizedTextField = styled(TextField)({
  minWidth: 50,

  boxShadow: 'inset 4px 4px 10px rgba(197, 215, 238, 1),inset -2px -2px 9px rgba(255, 255, 255, 0.9) ',
  // boxShadow: " inset -4px -4px 9px  rgba(255, 255, 255, 0.6),inset 4px 4px 14px #C5D7EE",
  // background: "#E3EDF7",
  // borderImageSource: "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),linear-gradient(122.51deg, rgba(214, 227, 243, 0.5) 16.62%, rgba(255, 255, 255, 0.5) 56.74%)",
  borderRadius: '5px',
  borderTop: '1px solid rgba(255,255,255,0.9)',
  borderBottom: '1px solid rgba(255,255,255,0.4)',
  borderLeft: '1px solid rgba(255,255,255,0.4)',
  borderRight: '1px solid rgba(255,255,255,0.9)',
  // backgroundSize: '3px 100%',
  // backgroundPosition: '0 0, 100% 0',
  // backgroundRepeat: 'no­-repeat',
  '& label.Mui-focused': {
    border: 'none',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },

  '& .MuiOutlinedInput-root': {
    '&.Mui-error fieldset': {
      borderRadius:'4px !important',
      borderRight: 'inherit',
      border:'2px solid #FF858F',
    },
    '& fieldset': {
      borderColor: 'transparent',
    },
  },
});
const CustomizedInput = (props) => { 
  const oprops={...props};
  delete oprops.label;
  if(oprops.endAdornment)
  {
      oprops.InputProps={...(oprops.InputProps && {...oprops.InputProps}),'endAdornment':oprops.endAdornment};
      delete oprops.endAdornment;
  }
  const font={
    fontFamily: 'RalewayMedium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '18px',
  };
  oprops.InputProps={...(oprops.InputProps && {...oprops.InputProps}),'style':font};
  return(
    <Stack spacing={1} direction="column">
      {props.label && <CustomizedLabel label={props.label} {...(props.labelcolor && {labelcolor:props.labelcolor})}/> }
      <CustomizedTextField {...oprops}  />
      {props.helpertext && <CustomizedHelperText text={props.helpertext} />}
    </Stack>
  );
};
CustomizedInput.propTypes = {
  labelcolor: PropTypes.any,
  label: PropTypes.any,
  helpertext: PropTypes.any,
  sx: PropTypes.any,
  InputProps:PropTypes.any,
  inputProps:PropTypes.any,
};
export default CustomizedInput;
