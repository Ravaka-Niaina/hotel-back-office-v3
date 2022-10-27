import { useContext, useMemo, useState } from 'react';
import {Link as RouterLink} from "react-router-dom";
import PropTypes from 'prop-types'
import { Grid, MenuItem, FormControlLabel, RadioGroup, Stack } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getReservationSalesReport } from '../../services/SalesReport';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedSelect from '../CustomizedComponents/CustomizedSelect';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';
import { formatDate } from '../../services/Util';
import { ThemeContext } from '../context/Wrapper';

const RapportForm = ({ setStateDataSalesReport }) => {
  // const [date, setDate] = useState(formatDate(new Date().toLocaleDateString('en-US')));
  // const dateNow = new Date();
  const context = useContext(ThemeContext);

  // const dateTomorrow = dateNow.setDate(dateNow.getDate() + 1);

  const [salesReport, setSalesReport] = useState({
    view: 'jour',
    startDate: formatDate(new Date().toLocaleDateString('en-US')),
    endDate: formatDate(new Date().toLocaleDateString('en-US')),
  });
  const formIntervals = useMemo(
    () => [
      {
        value: 'jour',
        label: 'Jour',
      },
      {
        value: 'semaine',
        label: 'Semaine',
      },
      {
        value: 'mois',
        label: 'Mois',
      },
    ],
    []
  );

  const handleChange = (e, field) => {
    let newValue;
    if (field === 'startDate' || field === 'endDate') {
      newValue = formatDate(e.toLocaleDateString('en-US'));
    } else {
      newValue = e.target.value;
    }
    setSalesReport((s) => ({
      ...s,
      [field]: newValue,
    }));
  };

  const getSalesReport = () => {
    context.showLoader(true);
    const payload = {
      vue: salesReport.view,
      debutPlage: salesReport.startDate,
      finPlage: salesReport.endDate,
    };
    getReservationSalesReport(payload)
      .then((results) => {
        if (results.data.status === 200) {
          setStateDataSalesReport(results.data.stats);
          context.showLoader(false);
        } else {
          context.showLoader(false);
          context.changeResultErrorMessage(results.data.message);
          context.showResultError(true);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <CustomizedPaperOutside elevation={12} sx={{background:'#E3EDF7',p:5}}>
          <CustomizedTitle text='Rapport prévisionnel de performance'/>
          <p>
            Gardez un oeil sur vos réservations futures et comparez votre performance a celle des années précedentes.
            Vous pouvez aussi vous situer par rapport à vos concurrents directs, à votre groupe de concurrents et au
            marché en général.
          </p>
        </CustomizedPaperOutside>
        <CustomizedPaperOutside elevation={12}  sx={{background:'#E3EDF7',p:5}}>
          <Stack spacing={2} alignItems="flex-start">
            <Grid container direction='row' spacing={2} alignItems='center'>
              <Grid item xs={4}>
                <CustomizedTitle text='Vue:' level={0}  />
              </Grid>
              <Grid item xs={8}>
                <CustomizedTitle text='Réservations effectuées:' level={0}  />
              </Grid>
              <Grid item xs={4}>
                <RadioGroup row defaultValue="jour" aria-labelledby="demo-controlled-radio-buttons-group">
                  {formIntervals.map((formInterval) => (
                    <FormControlLabel
                      key={formInterval.value}
                      value={formInterval.value}
                      control={<CustomizedRadio />}
                      label={formInterval.label}
                      onChange={(e) => handleChange(e, 'view')}
                    />
                  ))}
                </RadioGroup>
              </Grid>
              <Grid item xs={8} container
                justifyContent="flex-star"
                alignItems="center"
                direction='row'
                spacing={2}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid item xs={4}>
                    <MobileDatePicker
                      label="Debut"
                      inputFormat="dd/MM/yyyy"
                      value={new Date(salesReport.startDate)}
                      onChange={(e) => handleChange(e, 'startDate')}
                      // onChange={(e) => setDate(formatDate(e.toLocaleDateString('en-US')))}
                      renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <MobileDatePicker
                      label="Fin"
                      inputFormat="dd/MM/yyyy"
                      value={new Date(salesReport.endDate)}
                      onChange={(e) => handleChange(e, 'endDate')}
                      // onChange={(e) => setDate(formatDate(e.toLocaleDateString('en-US')))}
                      renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                    />
                  </Grid>
                    
                  
                </LocalizationProvider>
              </Grid>
            </Grid>
            
            
            

            <CustomizedTitle text='Comparaison avec:' level={0} />
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
            <CustomizedButton onClick={getSalesReport} text="Obtenir_rapport" sx={{ width: 0.5 }} component={RouterLink} to="#" />
          </Stack>
        </CustomizedPaperOutside>
      </Stack>
    </>
  );
};
RapportForm.propTypes = {
  setStateDataSalesReport : PropTypes.any
}
export default RapportForm;
