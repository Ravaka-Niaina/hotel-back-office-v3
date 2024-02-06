import React from 'react';
import { Stack } from '@mui/material';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';
import './index.scss';

const Preloader = () => (
        <Stack  spacing={3} justifyContent='center' alignItems='center' sx={{background:'#E3EDF7',height:'100vh'}}> 
            { /* eslint-disable */}
            <div className='circle'>
                <img className='logo' src={`${process.env.PUBLIC_URL}/images/logo/logowcolor-80x80.png`} alt='logo' />
                <div className="loader"></div>
            </div>
            
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <div className='pathcontainer'>
                    <div className="path">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    {/* <div className='text-load'>Hey</div> */}
                </div>      
            </Stack>
            
        </Stack>
    );
export default Preloader;