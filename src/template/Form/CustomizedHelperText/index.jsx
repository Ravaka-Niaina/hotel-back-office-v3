import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import '../../css/fonts.css';

const CustomHelperText = styled('span')({

    width: "200px",
    height: "13px",
    fontFamily: 'RalewayRegular',
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "11px",
    lineHeight: "13px",
    /* identical to box height, or 118% */
    display: "flex",
    alignItems: "center",

    /* Colors/Primary/Red */
    color: "#FF647C",
});
const CustomizedHelperText = (props) => <CustomHelperText>{props.text}</CustomHelperText>;

CustomizedHelperText.propTypes = {
    text: PropTypes.any,
};
export default CustomizedHelperText;
