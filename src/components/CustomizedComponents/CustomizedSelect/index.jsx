import React from 'react';
import PropTypes from 'prop-types';

import { Select, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import './index.css';
import CustomizedLabel from '../CustomizedLabel';

const CustomSelect = styled(Select)({
  width: 325,

  background: '#E3EDF7',
  boxShadow: '5px 5px 4px rgba(114, 142, 171, 0.1), -6px -6px 20px #FFFFFF, 4px 4px 20px rgba(111, 140, 176, 0.41)',
  // boxShadow: " inset -4px -4px 9px  rgba(255, 255, 255, 0.6),inset 4px 4px 14px #C5D7EE",
  borderRadius: '5px',
  '& label.Mui-focused': {
    border: 'none',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
});
const CustomizedSelect = (props) => (
  <Stack spacing={1} direction="column">
    <CustomizedLabel label={props.label} />
    <CustomSelect inputprops={{ ...props, shrink: false }} children={props.children} />
  </Stack>
);

CustomizedSelect.propTypes = {
  children: PropTypes.any,
  label:PropTypes.any,
};
export default CustomizedSelect;
