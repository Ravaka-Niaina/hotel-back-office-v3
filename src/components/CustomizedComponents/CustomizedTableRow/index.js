import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

const CustomizedTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
}));

export default CustomizedTableRow;