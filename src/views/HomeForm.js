import { useState } from 'react';
import { Typography,MenuItem, Paper, FormControlLabel, RadioGroup, Stack } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomizedInput from '../components/CustomizedComponents/CustomizedInput';
import CustomizedRadio from '../components/CustomizedComponents/CustomizedRadio';
import CustomizedSelect from '../components/CustomizedComponents/CustomizedSelect';
import CustomizedButton from '../components/CustomizedComponents/CustomizedButton';
import { formatDate } from '../services/Util';

const HomeForm = () => {
  const [date, setDate] = useState(formatDate(new Date().toLocaleDateString('en-US')));
  return (
    <>
      <Stack spacing={2}>
        <Paper elevation={12} sx={{ width: 1, p: 5, background: '#E3EDF7' }}>
          <Typography sx={{ color: '#787878', fontWeight: '500' }} variant="h4" gutterBottom>
                Rapport prévisionnel de performance
          </Typography>
          <p>
            Gardez un oeil sur vos réservations futures et comparez votre performance a celle des années précedentes.
            Vous pouvez aussi vous situer par rapport à vos concurrents directs, à votre groupe de concurrents et au
            marché en général.
          </p>
        </Paper>
        <Paper elevation={12} sx={{ width: 1, p: 5, background: '#E3EDF7' }}>
          <Stack spacing={1} alignItems="flex-start">
            <h4>Vue:</h4>
            <RadioGroup
              defaultValue="jour"
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              <FormControlLabel value="jour" control={<CustomizedRadio />} label="Jour" />
              <FormControlLabel value="semaine" control={<CustomizedRadio />} label="Semaine" />
              <FormControlLabel value="mois" control={<CustomizedRadio />} label="Mois" />
            </RadioGroup>
            <h4>Réservations effectuées:</h4>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack
                justifyContent="flex-star"
                alignItems="center"
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <MobileDatePicker
                  label="Debut"
                  inputFormat="dd/MM/yyyy"
                  value={new Date(date)}
                  onChange={(e) => setDate(formatDate(e.toLocaleDateString('en-US')))}
                  renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                />
                <MobileDatePicker
                  label="Fin"
                  inputFormat="dd/MM/yyyy"
                  value={new Date(date)}
                  onChange={(e) => setDate(formatDate(e.toLocaleDateString('en-US')))}
                  renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                />
              </Stack>
            </LocalizationProvider>

            <h4>Comparaison avec:</h4>
            <div>
              <CustomizedSelect label="Annee">
                <MenuItem disabled value="">
                  <em>Placeholder</em>
                </MenuItem>
                <MenuItem selected value={10}>
                  2000
                </MenuItem>
                <MenuItem value={20}>2010</MenuItem>
                <MenuItem value={30}>2020</MenuItem>
              </CustomizedSelect>
            </div>
            <CustomizedButton text="Obtenir rapport" sx={{ width: 0.5 }} />
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default HomeForm;
