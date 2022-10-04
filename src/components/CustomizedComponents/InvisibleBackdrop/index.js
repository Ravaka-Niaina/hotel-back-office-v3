import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Backdrop }from '@mui/material';

const CustomBackdrop = styled(Backdrop, 
    { 
        name: 'MuiModal', 
        slot: 'Backdrop', 
        overridesResolver: (props, styles) => { 
            return styles.backdrop; 
        }, 
    })({ zIndex: -1, })
const InvisibleBackdrop = (props) => <CustomBackdrop invisible {...props} />;
export default InvisibleBackdrop;
