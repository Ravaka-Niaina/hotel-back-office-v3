import React from 'react';
import { Stack, MenuItem,FormControlLabel,RadioGroup,Switch } from '@mui/material';
import CustomizedInput from '../components/CustomizedComponents/CustomizedInput';
import CustomizedSelect from '../components/CustomizedComponents/CustomizedSelect';
import CustomizedCheckbox from '../components/CustomizedComponents/CustomizedCheckbox';
import CustomizedRadio from '../components/CustomizedComponents/CustomizedRadio';
import CustomizedToggle from '../components/CustomizedComponents/CustomizedToggle';
import CustomizedSwitch from '../components/CustomizedComponents/CustomizedSwitch';

const style = {
  content: {
    backgroundColor: '#D6E3F3',
    
    height: 900,
    padding: 30,
  },
  text: {
    fontFamily: 'Raleway',
    fontStyle: 'Regular',
    fontSize: '21px',
    lineHeight: '20px',
    align: 'Left',
    verticalAlign: 'Top',
    letterSpacing: '-0.4px',
    color: '#8B9EB0',
  },
};

const TestFormulaire = () => {

  const [disabled,setDisabled]= React.useState(false);
  return (
    <Stack sx={style.content} spacing={3}>
      <span style={style.text}>Text fields</span>

      {/* <CustomizedInput/> */}

      <CustomizedInput placeholder="Test" variant="outlined" />
      <CustomizedSelect placeholder="Test" variant="outlined">
        <MenuItem disabled value="">
          <em>Placeholder</em>
        </MenuItem>
        <MenuItem selected value={10}>
          Ten
        </MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </CustomizedSelect>
      <CustomizedCheckbox defaultChecked />
      <RadioGroup
        defaultValue="female"
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
      >
        <FormControlLabel value="female" control={<CustomizedRadio />} label="Female" />
        <FormControlLabel value="male" control={<CustomizedRadio />} label="Male" />
      </RadioGroup>
      <FormControlLabel value="female" control={<CustomizedToggle defaultChecked /> } label="Activé" />
      <FormControlLabel value="female" control={<Switch checked={!disabled} onClick={() => setDisabled(!disabled)}/> } label="Disable" />
      <FormControlLabel value="female" control={<CustomizedSwitch defaultChecked disabled={disabled}/> } label="Female" />
    </Stack>
  );
}

export default TestFormulaire;
