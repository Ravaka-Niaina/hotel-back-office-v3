import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomizedLabel from '../CustomizedLabel';
import CustomizedHelperText from '../CustomizedHelperText';

const CustomizedTextField = styled(TextField)({
  minWidth: 50,

  boxShadow: 'inset 4px 4px 14px rgba(197, 215, 238, 1) ,inset -4px -4px 9px rgba(255, 255, 255, 0.6)',
  // boxShadow: " inset -4px -4px 9px  rgba(255, 255, 255, 0.6),inset 4px 4px 14px #C5D7EE",
  // background: "#E3EDF7",
  // borderImageSource: "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),linear-gradient(122.51deg, rgba(214, 227, 243, 0.5) 16.62%, rgba(255, 255, 255, 0.5) 56.74%)",
  borderRadius: '5px',
  borderTop: '1px solid #FFFFFF',
  borderBottom: '1px solid #E3EDF7',
  borderRight: '1px solid #FFFFFF',
  backgroundSize: '3px 100%',
  backgroundPosition: '0 0, 100% 0',
  backgroundRepeat: 'no­-repeat',
  '& label.Mui-focused': {
    border: 'none',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },

  '& .MuiOutlinedInput-root': {
    '&.Mui-error fieldset': {
      border: '2px solid',
      borderColor: '#FF647C',
    },
    '& fieldset': {
      borderColor: 'transparent',
    },
  },
  '&::placeholder': {
    textOverflow: 'ellipsis !important',
    color: 'blue !important',
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
  return(
    <Stack spacing={1} direction="column">
      <CustomizedLabel label={props.label} />
      <CustomizedTextField {...oprops}  />
      {props.helpertext && <CustomizedHelperText text={props.helpertext} />}
    </Stack>
  );
};
CustomizedInput.propTypes = {
  label: PropTypes.any,
  helpertext: PropTypes.any,
  sx: PropTypes.any,
  InputProps:PropTypes.any,
  inputProps:PropTypes.any,
};
export default CustomizedInput;
