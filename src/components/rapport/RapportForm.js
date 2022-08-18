import { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types'
import { Typography, MenuItem, FormControlLabel, RadioGroup, Stack } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getReservationSalesReport } from '../../services/SalesReport';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedRadio from '../CustomizedComponents/CustomizedRadio';
import CustomizedSelect from '../CustomizedComponents/CustomizedSelect';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
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
    console.log(salesReport);
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
          <Typography sx={{ color: '#787878', fontWeight: '500' }} variant="h4" gutterBottom>
            Rapport prévisionnel de performance
          </Typography>
          <p>
            Gardez un oeil sur vos réservations futures et comparez votre performance a celle des années précedentes.
            Vous pouvez aussi vous situer par rapport à vos concurrents directs, à votre groupe de concurrents et au
            marché en général.
          </p>
        </CustomizedPaperOutside>
        <CustomizedPaperOutside elevation={12}  sx={{background:'#E3EDF7',p:5}}>
          <Stack spacing={2} alignItems="flex-start">
            <h4>Vue:</h4>
            <RadioGroup defaultValue="jour" aria-labelledby="demo-controlled-radio-buttons-group">
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
                  value={new Date(salesReport.startDate)}
                  onChange={(e) => handleChange(e, 'startDate')}
                  // onChange={(e) => setDate(formatDate(e.toLocaleDateString('en-US')))}
                  renderInput={(params) => <CustomizedInput sx={{ width: 1 }} {...params} />}
                />
                <MobileDatePicker
                  label="Fin"
                  inputFormat="dd/MM/yyyy"
                  value={new Date(salesReport.endDate)}
                  onChange={(e) => handleChange(e, 'endDate')}
                  // onChange={(e) => setDate(formatDate(e.toLocaleDateString('en-US')))}
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
            <CustomizedButton handleClick={getSalesReport} text="Obtenir_rapport" sx={{ width: 0.5 }} />
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
