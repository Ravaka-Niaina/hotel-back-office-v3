import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible"  {...props} />
  ))(({ theme }) => ({
    width: '64px',
    height: '30px',
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(34px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#E3EDF7',
          opacity: 1,
          borderRight: '1px solid rgba(214, 227, 243, 0.5)',
          borderBottom: '1px solid rgba(255,255,255,0.5)',
          borderLeft: '1px solid rgba(214, 227, 243, 0.5)',
          borderTop: '1px solid rgba(214, 227, 243, 0.5)',
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
        
      },
      '&.Mui-checked .MuiSwitch-thumb': {
        boxShadow:'1px 1px 2px 1px rgba(107, 141, 176, 0.4), -1px -1px 3px rgba(107, 141, 176, 0.4)',
        border:'1px solid white',
        background:'#2FEFCC',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 25 22"><path fill="${encodeURIComponent(
         'white',
        )}" d="M19,13H7V09H19V13Z"/></svg>')`,

        transform: 'rotate(90deg)',
        backgroundRepeat:'no-repeat',
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        background:theme.palette.grey[400],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow:'-1px 1px 2px   rgba(255, 255, 255, 0.8), 2px -1px 5px rgba(107, 141, 176, 0.6)',
      borderRight: '1px solid rgba(214, 227, 243, 0.6)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.6)',
      borderLeft: '1px solid rgba(255, 255, 255, 0.6)',
      borderTop: '1px solid rgba(214, 227, 243, 0.6)',
      background:'#E3EDF7',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 28 20"><path fill="${encodeURIComponent(
         '#FF647C',
        )}" d="M19,13H7V09H19V13Z"/></svg>')`,
      transform: 'rotate(90deg)',
      width: 26,
      height: 26,
    },
    '& .MuiSwitch-track': {
      borderRight: '1px solid rgba(255,255,255,0.8)',
      borderBottom: '1px solid rgba(255,255,255,0.6)',
      borderLeft: '1px solid rgba(255,255,255,0.3)',
      borderTop: '1px solid rgba(255,255,255,0.3)',
      borderRadius: 100,
      boxShadow: 'inset -4px -4px 5px rgba(255, 255, 255, 0.6), inset 2px 2px 10px  #C5D7EE',
      backgroundColor: '#E3EDF7',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  export default function CustomizedSwitch(props) {
    return (
    <IOSSwitch sx={{ m: 1 }} {...props} />
    );
  }