import React, { useEffect, } from 'react';
import { Table, Stack, TableRow, TableBody, Container, Typography, TableContainer, Button } from '@mui/material';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink } from 'react-router-dom';
import CustomizedButton from '../components/CustomizedComponents/CustomizedButton';
import CustomizedCheckbox from '../components/CustomizedComponents/CustomizedCheckbox';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import TableCellStyled from '../components/CustomizedComponents/CustomizedTableCell';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { UserListHead, UserListToolbar } from '../components/table';
import PoliticMoreMenu from '../components/politic/PoliticMoreMenu';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';

import './Booking.css';

const currencies = [
    {
      value: 'checkIn',
      label: 'Check-in',
    },
    {
      value: 'checkOut',
      label: 'Check-out',
    },
];

const TABLE_HEAD = [
    { id: 'guest_name', label: 'Guest name', alignRight: false },
    { id: 'check-in', label: 'Check-in', alignRight: false },
    { id: 'check-out', label: 'Check-out', alignRight: false },
    { id: 'rooms', label: 'Rooms', alignRight: false },
    { id: 'booked-on', label: 'Booked on', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'price', label: 'Price', alignRight: false },
    { id: 'commission', label: 'Commission', alignRight: false },
    { id: 'booking-number', label: 'Booking number', alignRight: false }
];

const reservationList = [{
    _id: '1skjdn3hsdl',
    guest_name: 'Stephanie Jaquet',
    check_in: '15 Sept 2022',
    check_out: '22 Sept 2022',
    rooms: 'Superior double room',
    booked_on: '27 Aug 2022',
    status: 'OK',
    price: 120,
    commission: 12,
    booking_number: '23082748291'
},
{
    _id: '1skjdn3hsdl',
    guest_name: 'Stephanie Jaquet',
    check_in: '15 Sept 2022',
    check_out: '22 Sept 2022',
    rooms: 'Superior double room',
    booked_on: '27 Aug 2022',
    status: 'OK',
    price: 120,
    commission: 12,
    booking_number: '23082748291'
},
{
    _id: '1skjdn3hsdl',
    guest_name: 'Stephanie Jaquet',
    check_in: '15 Sept 2022',
    check_out: '22 Sept 2022',
    rooms: 'Superior double room',
    booked_on: '27 Aug 2022',
    status: 'OK',
    price: 120,
    commission: 12,
    booking_number: '23082748291'
},
{
    _id: '1skjdn3hsdl',
    guest_name: 'Stephanie Jaquet',
    check_in: '15 Sept 2022',
    check_out: '22 Sept 2022',
    rooms: 'Superior double room',
    booked_on: '27 Aug 2022',
    status: 'OK',
    price: 120,
    commission: 12,
    booking_number: '23082748291'
},
{
    _id: '1skjdn3hsdl',
    guest_name: 'Stephanie Jaquet',
    check_in: '15 Sept 2022',
    check_out: '22 Sept 2022',
    rooms: 'Superior double room',
    booked_on: '27 Aug 2022',
    status: 'OK',
    price: 120,
    commission: 12,
    booking_number: '23082748291'
} ];

const moreFilters = [
    { value: 'name', label: 'Name' },
    { value: 'occupierNum', label: 'Number of occupiers' }
];
const order = 'asc';
const selected = [];
const orderBy = 'name';
const filterName = '';

const Booking = () => {
    const [currency, setCurrency] = React.useState('checkIn');

    const handleChange = (event) => {
      setCurrency(event.target.value);
    };
    
    useEffect(() => {}, []);

    return (
        <Page title="AIOLIA | Politiques d'annulation">
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <CustomizedTitle size={20} text="Politique" />
            </Stack>
    
            <CustomizedPaperOutside
              sx={{
                ...lightBackgroundToTop,
                minHeight: '100vh',
                border: '1px white solid',
                color: 'white',
                padding: 5,
              }}
            >
              <div>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Date of"
                    value={filterName}
                    onChange={handleChange}
                    className="selectInput"
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    autoFocus
                    error
                    id="outlined-error-helper-text"
                    label="From"
                    type="date"
                    value="2022-09-28"
                    helperText="Incorrect entry."
                />
                <TextField
                    autoFocus
                    error
                    id="outlined-error-helper-text"
                    label="Until"
                    type="date"
                    value="2022-09-30"
                    helperText="Incorrect entry."
                />
                <TextField
                    id="outlined-select-currency"
                    select
                    label="More filters"
                    onChange={handleChange}
                    className="selectInput"
                >
                    {moreFilters.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <CustomizedButton
                  onClick={() => {}}
                  text={`Show`}
                  component={RouterLink}
                  to="#"
                />
              </div>
              {/* <UserListToolbar numSelected={selected.length} filterName={filterName} /> */}
    
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    {reservationList && (
                      <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={5}
                        numSelected={4}
                      />
                    )}
                    <TableBody>
                      {reservationList &&
                        reservationList.map((row, index) => {
                          // const { _id, nom, isActif } = row;
                          // const isItemSelected = selected.indexOf(nom) !== -1;
                          const i = index;
                          return (
                            <TableRow hover key={i} tabIndex={-1} role="checkbox">
                              <TableCellStyled padding="checkbox">
                                <CustomizedCheckbox />
                              </TableCellStyled>
                              <TableCellStyled component="th" scope="row" padding="none">
                                <Typography variant="subtitle2" noWrap>
                                  {row.guest_name}
                                </Typography>
                              </TableCellStyled>
                              <TableCellStyled component="th" scope="row" padding="none">
                                {row.check_in}
                              </TableCellStyled>
                              <TableCellStyled component="th" scope="row" padding="none">
                                {row.check_out}
                              </TableCellStyled>
                              <TableCellStyled component="th" scope="row" padding="none">
                                {row.rooms}
                              </TableCellStyled>
                              <TableCellStyled component="th" scope="row" padding="none">
                                {row.booked_on}
                              </TableCellStyled>
                              <TableCellStyled component="th" scope="row" padding="none">
                                {row.status}
                              </TableCellStyled>
                              <TableCellStyled component="th" scope="row" padding="none">
                                {row.price}
                              </TableCellStyled>
                              <TableCellStyled component="th" scope="row" padding="none">
                                {row.commission}
                              </TableCellStyled>
                              <TableCellStyled component="th" scope="row" padding="none">
                                {row.booking_number}
                              </TableCellStyled>
                              <TableCellStyled align="right">
                                {/* <PoliticMoreMenu reload={() => {}} politic={row} ratePlanId={'_id'} isActif={'isActif'} /> */}
                              </TableCellStyled>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </CustomizedPaperOutside>
          </Container>
        </Page>
      );
};

export default Booking;