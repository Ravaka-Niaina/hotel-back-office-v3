import * as React from 'react';
import { styled } from '@mui/material/styles';
import {IconButton,Stack } from '@mui/material';



const StyledIconButton = styled(IconButton)(({ theme }) => ({
    p:0,
    width:'40px',
    height:'40px',
    background: '#E3EDF7',
    boxShadow: '2px 2px 4px rgba(114, 142, 171, 0.1), -6px -6px 20px #FFFFFF, 4px 4px 20px rgba(111, 140, 176, 0.41)',
    borderRadius: '12px',
    '&:hover':{
        background: '#E3EDF7',
        opacity: 0.7,
        boxShadow: 'inset -4px -4px 5px rgba(255, 255, 255, 0.88), inset 4px 4px 5px #C1D5EE',
        borderRadius: '5px',
    }
}));

const CustomizedIconButton = (props) => {
    return (
        <StyledIconButton {...props}>
            {props.children}
        </StyledIconButton>
    );
}
export default CustomizedIconButton;