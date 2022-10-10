import React , { useState } from 'react';
import { format } from 'date-fns';
import { Collapse, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Stack, Box, Container, MenuItem, Grid, Link } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';


function getNumberOfNights(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = Math.abs(d2.getTime() - d1.getTime());
    const daydiff = (diff / 86400000);
    return daydiff;
}
const ReservationRow = ({row,navigate}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} selected={open}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {`${row.reservateur.nom} ${row.reservateur.prenom}`}
                </TableCell>
                <TableCell component="th" scope="row">
                    {format(new Date(row.dateValidation), 'dd MMMM yyyy ~ HH:mm:SS')}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout={100} unmountOnExit>
                        <Box sx={{ margin: 1, textAlign: 'center' }} >
                            <CustomizedTitle text='Itineraires' />
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <CustomizedTitle text='Numero itineraire' size={15} level={0} />
                                        </TableCell>
                                        <TableCell>
                                            <CustomizedTitle text={`Date d'arrivee`} size={15} level={0} />
                                        </TableCell>
                                        <TableCell>
                                            <CustomizedTitle text={`Date de depart`} size={15} level={0} />
                                        </TableCell>
                                        <TableCell>
                                            <CustomizedTitle text={`Nombre de nuitée`} size={15} level={0} />
                                        </TableCell>
                                        <TableCell>
                                            <CustomizedTitle text={`Type chambres`} size={15} level={0} />
                                        </TableCell>
                                        <TableCell>
                                            <CustomizedTitle text={`Prix total ($)`} size={15} level={0} />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.itineraires.map((itineraire, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {itineraire.NumeroITineraire}
                                            </TableCell>
                                            <TableCell>{format(new Date(itineraire.dateSejour.debut), 'dd MMMM yyyy')}</TableCell>
                                            <TableCell>{format(new Date(itineraire.dateSejour.fin), 'dd MMMM yyyy')}</TableCell>
                                            <TableCell>{getNumberOfNights(itineraire.dateSejour.debut, itineraire.dateSejour.fin)}</TableCell>
                                            <TableCell >
                                                <ul>
                                                    {
                                                        itineraire.tarifReserves.map((tarif,j) => {
                                                            return (
                                                                <li key={j}>
                                                                    <Link href="#" underline="hover" onClick={()=>navigate('details',row,i,j)}>
                                                                        {tarif.nomTypeChambre}
                                                                    </Link>
                                                                    <ul style={{ marginLeft: '10%' }}>
                                                                        <li>
                                                                            Tarif: {tarif.nomTarif}
                                                                        </li>
                                                                        <li>
                                                                            Etat:   <span style={{
                                                                                color: tarif.etat === 0 ? "red" : "green",
                                                                            }}
                                                                            >
                                                                                {tarif.etat === 0 ? "Annulé" : "Ok"}
                                                                            </span>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            );
                                                        })}
                                                </ul>
                                            </TableCell>
                                            <TableCell>
                                                {itineraire.toPay}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ReservationRow;