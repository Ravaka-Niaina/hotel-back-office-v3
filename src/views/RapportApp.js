// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

import { Grid, Container, Stack,TableCell,Table,TableContainer,TableBody,TableHead,TableRow } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { ReservationSalesReport } from '../components/stats';
import RapportForm from '../components/rapport/RapportForm';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedTableRow from '../components/CustomizedComponents/CustomizedTableRow';
import TableCellStyled from '../components/CustomizedComponents/CustomizedTableCell';

// ----------------------------------------------------------------------

// const dataSalesReport = {
//   date: ['01/01/2003', '02/01/2003', '03/01/2003'],
//   night: [23, 11, 22],
//   night_last_year: [3, 45, 13],
//   average_price: [45, 36, 55],
//   average_price_last_year: [12, 96, 36],
//   revenue_per_room: [32, 28, 49],
// };
const translatedLabel = {
  "date": "Date",
  "night": "Nuitées",
  "night_last_year": "Nuitées (l'année dernière)",
  "average_price": "Tarif journalier moyen",
  "average_price_last_year": "Tarif journalier moyen (l'année dernière)",
  "revenue_per_room": "Revenu",
};
export default function RapportApp() {
  // const theme = useTheme();
  const [dataSalesReport, setDataSalesReport] = useState({});

  const setStateDataSalesReport = (data) => {
    setDataSalesReport(data);
  };

  return (
    <Page title="AIOLIA | Rapports">
      <Container maxWidth="xl">
        <CustomizedTitle text='Hi, Welcome back rapport' size={20} />
        <Grid container spacing={3} sx={{mt:2}}>
          <Grid item xs={12} md={12} lg={12} container spacing={2}>
            <Grid item xs={12}>
              <RapportForm setStateDataSalesReport={setStateDataSalesReport} />
            </Grid>
            <Grid item xs={12}>
              {Object.keys(dataSalesReport).length > 0 && (
                <ReservationSalesReport
                  title="Website Visits"
                  subheader="(+43%) than last year"
                  chartLabels={dataSalesReport.date}
                  chartData={[
                    {
                      name: "Nuitée (l'année derniere)",
                      type: 'column',
                      fill: 'solid',
                      data: dataSalesReport.night_last_year,
                    },
                    {
                      name: 'Nuitée',
                      type: 'column',
                      fill: 'solid',
                      data: dataSalesReport.night,
                    },
                    {
                      name: "Prix moyen  (l'année derniere)",
                      type: 'line',
                      fill: 'solid',
                      data: dataSalesReport.average_price_last_year,
                    },
                    {
                      name: 'Prix moyen',
                      type: 'line',
                      fill: 'solid',
                      data: dataSalesReport.average_price,
                    },
                    {
                      name: 'Revenu par chambre',
                      type: 'area',
                      fill: 'gradient',
                      data: dataSalesReport.revenue_per_room,
                    },
                    // {
                    //   name: 'Team C',
                    //   type: 'line',
                    //   fill: 'solid',
                    //   data: [30, 25, 36],
                    // },

                    // {
                    //   name: 'Team C',
                    //   type: 'line',
                    //   fill: 'solid',
                    //   data: [30, 25, 36],
                    // },
                  ]}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {
                Object.keys(dataSalesReport).length > 0 && (
                  <CustomizedPaperOutside elevation={12} sx={{ background: '#E3EDF7', p: 5 , minHeight:300 }}>
                    <Stack spacing={6}>  
                      <Stack spacing={1}>  
                        <CustomizedTitle text='Vos performances commerciales' />
                        <TableContainer >
                          <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                              <TableRow>
                                <TableCellStyled component="th" scope="row">
                                  Date
                                </TableCellStyled>
                                {
                                  dataSalesReport.date.map((d,i)=>(
                                    <TableCellStyled component="th" scope="row" key={i}>
                                      {d}
                                    </TableCellStyled>
                                  ))
                                }
                              </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                  Object.keys(dataSalesReport).map((key,i)=>{
                                    return key !== "date" ? (
                                      <CustomizedTableRow key={i}>
                                        <TableCell component="th" scope="row">
                                          {translatedLabel[key]}
                                        </TableCell>
                                        {
                                          dataSalesReport[key].map((value,j)=>(
                                            <TableCell component="th" scope="row" key={j}>
                                              {value}
                                            </TableCell>
                                          ))
                                        }
                                      </CustomizedTableRow>
                                    ) : null;
                                  })
                                }
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Stack>
                      <Stack spacing={1}>
                        <CustomizedTitle text={`Répartition par chambre et tarif`} />
                        <TableContainer >
                          <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                              <TableRow>
                                <TableCellStyled component="th" scope="row">
                                  Chambre/Tarif
                                </TableCellStyled>
                                <TableCellStyled component="th" scope="row">
                                  Nuitées
                                </TableCellStyled>
                                <TableCellStyled component="th" scope="row">
                                  Revenu
                                </TableCellStyled>
                                <TableCellStyled component="th" scope="row">
                                  Tarif journalier moyen
                                </TableCellStyled>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {
                                [...new Array(6)].map((e,i)=>(
                                  <CustomizedTableRow key={i}>
                                    <TableCell component="th" scope="row">
                                      One
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                      Two
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                      Three
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                      Four
                                    </TableCell>
                                  </CustomizedTableRow>
                                ))
                              }
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Stack>
                    </Stack>
                  </CustomizedPaperOutside>
                )
              }
            </Grid>
            
           
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
