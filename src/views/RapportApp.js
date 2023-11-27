// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';

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
  const [dataSalesReportLastYear, setDataSalesReportLastYear] = useState({});
  const [breakdownReport, setBreakdownReport] = useState({});
  const [breakdownReportLastYear, setBreakdownReportLastYear] = useState({});
  const [isToCompare, setIsToCompare] = useState(false);
  
  const setStateDataSalesReport = (data,breakdown) => {
    setDataSalesReport(data);
    setBreakdownReport(breakdown);
  };

  const setStateDataSalesReportLastYear = (data,breakdown) => {
    setDataSalesReportLastYear(data);
    setBreakdownReportLastYear(breakdown);
  };

  const chartData = [
    {
      name: 'Nuitée',
      type: 'column',
      fill: 'solid',
      data: dataSalesReport.night,
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
  ];

  if (isToCompare) {
    chartData.unshift({
      name: "Nuitée (comparaison)",
      type: 'column',
      fill: 'solid',
      data: dataSalesReportLastYear.night,
    });
    chartData.splice(2, 0, {
      name: "Prix moyen  (comparaison)",
      type: 'line',
      fill: 'solid',
      data: dataSalesReportLastYear.average_price,
    });
  }
  
  console.log(dataSalesReport);

  return (
    <Page title="AIOLIA | Rapports">
      <Container maxWidth="xl">
        {/* <CustomizedTitle text='Hi, Welcome back rapport' size={20} /> */}
        <Grid container spacing={3} sx={{mt:2}}>
          <Grid item xs={12} md={12} lg={12} container spacing={2}>
            <Grid item xs={12}>
              <RapportForm 
                setStateDataSalesReport={setStateDataSalesReport}
                setStateDataSalesReportLastYear={setStateDataSalesReportLastYear}
                setDataSalesReport={setDataSalesReport} 
                isToCompare={isToCompare}
                setIsToCompare={setIsToCompare}
              />
            </Grid>
            <Grid item xs={12}>
              {Object.keys(dataSalesReport).length > 0 && (
                <ReservationSalesReport
                  // title="Website Visits"
                  // subheader="(+43%) than last year"
                  chartLabels={dataSalesReport.date}
                  chartData={chartData}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {
                Object.keys(dataSalesReport).length > 0 && Object.keys(breakdownReport).length > 0 && (
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
                                    const k = key;
                                    return k !== "date" ? (
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
                                Object.keys(breakdownReport).map((room,i)=>{
                                  const total = Object.keys(breakdownReport[room])
                                                  .reduce((acc, key) => {
                                                    acc.nuitee += breakdownReport[room][key].nuitee;
                                                    acc.prix += breakdownReport[room][key].prix;
                                                    return acc;
                                                  },{nuitee:0,prix:0});
                                  return (
                                    <React.Fragment key={i}>
                                      <CustomizedTableRow key={i} >
                                        <TableCell component="th" scope="row" sx={{ color: 'black', fontSize: '16px' }}>
                                          <strong>
                                            {room}
                                          </strong>
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='right' sx={{ color: 'black', fontSize: '16px' }}>
                                          <strong>
                                            {
                                              total.nuitee
                                            }
                                          </strong>
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='right' sx={{ color: 'black', fontSize: '16px' }}>
                                          <strong>
                                            {
                                              total.prix?.toFixed(2)
                                            }
                                          </strong>
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='right' sx={{ color: 'black', fontSize: '16px' }}>
                                          <strong>
                                            {
                                              ((total.prix) / (total.nuitee))?.toFixed(2)
                                            }
                                          </strong>
                                        </TableCell>
                                      </CustomizedTableRow>
                                      {
                                        Object.keys(breakdownReport[room]).map((tarif,j)=>(
                                          <CustomizedTableRow key={`${i}-${j}`}>
                                            <TableCell component="th" scope="row" sx={{paddingLeft: 5}}>
                                              {tarif}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align='right'>
                                              {
                                                breakdownReport[room][tarif].nuitee
                                              }
                                            </TableCell>
                                            <TableCell component="th" scope="row" align='right'>
                                              {
                                                breakdownReport[room][tarif].prix?.toFixed(2)
                                              }
                                            </TableCell>
                                            <TableCell component="th" scope="row" align='right'>
                                              {
                                                ((breakdownReport[room][tarif].prix) / (breakdownReport[room][tarif].nuitee))?.toFixed(2)
                                              }
                                            </TableCell>
                                          </CustomizedTableRow>
                                        ))
                                      }
                                    </React.Fragment>
                                  )
                                })
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
