import React from 'react';
import { Popper, Slide , Stack,  FormControlLabel, RadioGroup  } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import CustomizedIconButton from '../../CustomizedComponents/CustomizedIconButton';
import CustomizedPaperOutside from '../../CustomizedComponents/CustomizedPaperOutside';
import CustomizedRadio from '../../CustomizedComponents/CustomizedRadio';
import CustomizedInput from '../../CustomizedComponents/CustomizedInput';

const CellEditorPopper = ({ open, anchorEl , setOpen , selected , ...others}) => {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Popper open={open} anchorEl={anchorEl} placement='top' transition {...others}>
                {({ TransitionProps }) => (
                    <Slide {...TransitionProps} timeout={350}>
                        <div>
                            <CustomizedPaperOutside sx={{ background: '#E3EDF7' , p: 2, width: '250px', height: '350px' }}>
                                <Stack direction="column" spacing={2} justifyContent='flex-start'>
                                    <Stack>
                                        <h4>Chambre standard</h4>
                                        <h6>
                                            {
                                                selected[0] && new Date(selected[0]).toDateString()
                                            }
                                            {
                                                selected.length > 1 && `  -  ${new Date(selected[selected.length - 1]).toDateString() }`
                                            }
                                        </h6>
                                    </Stack>
                                    <FormControlLabel control={<CustomizedRadio />} label="Modifier ouverture de la chambre" />
                                    <RadioGroup
                                        defaultValue="oui"
                                        aria-labelledby="demo-customized-radios"
                                        name="customized-radios"
                                        row
                                    >
                                        <FormControlLabel value="oui" control={<CustomizedRadio />} label="Oui" />
                                        <FormControlLabel value="non" control={<CustomizedRadio />} label="Non" />
                                    </RadioGroup>
                                    <CustomizedInput placeholder="Test" variant="outlined" label="Test" />
                                    <Stack direction="row" spacing={2} justifyContent='space-evenly' alignItems='center'>
                                        <CustomizedIconButton>
                                            <SaveIcon sx={{ color: '#2FEFCC' }} /> {  /* #2476d2 */ }
                                        </CustomizedIconButton>
                                        <CustomizedIconButton onClick={handleClose}>
                                            <CancelIcon sx={{ color: '#FF647C' }} />
                                        </CustomizedIconButton>
                                    </Stack>
                                </Stack>
                            </CustomizedPaperOutside>
                        </div>
                    </Slide>
                )}
            </Popper>   
        </>
    );
};

export default CellEditorPopper;