import React, { useState } from 'react';
import {
    Table,
    Stack,
    TableRow,
    TableBody,
    Container,
    Typography,
    TableContainer,
} from '@mui/material';

import AddPoliticDialog from '../components/politic/AddPoliticDialog';
import CustomizedCheckbox from '../components/CustomizedComponents/CustomizedCheckbox';
import CustomizedCard from '../components/CustomizedComponents/CustomizedCard';
import TableCellStyled from '../components/CustomizedComponents/CustomizedTableCell';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { UserListHead, UserListToolbar } from '../components/table';

const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'nom', label: 'Nom', alignRight: false },
];

const Politic = () => {
    const [politicList, setPoliticList] = useState(new Array(0));
    const order = 'asc';
    const selected = [];
    const orderBy = 'name';
    const filterName = '';

    return (
        <Page title="Politique">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography sx={{ color: '#787878', fontWeight: '500' }} variant="h4" gutterBottom>
                        Politique
                    </Typography>
                    <AddPoliticDialog />
                </Stack>

                <CustomizedCard sx={{ background: '#E3EDF7', p: 5 }}>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={politicList.length}
                                    numSelected={selected.length}
                                />
                                <TableBody>
                                    {politicList.map((row) => {
                                        const { _id, nom, isActif } = row;
                                        console.log(isActif)
                                        const isItemSelected = selected.indexOf(nom) !== -1;

                                        return (
                                            <TableRow
                                                hover
                                                key={_id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                                aria-checked={isItemSelected}
                                            >
                                                <TableCellStyled padding="checkbox">
                                                    <CustomizedCheckbox />
                                                </TableCellStyled>
                                                <TableCellStyled component="th" scope="row" padding="none">
                                                    <Typography variant="subtitle2" noWrap>
                                                        {_id}
                                                    </Typography>
                                                </TableCellStyled>
                                                <TableCellStyled align="left">{nom}</TableCellStyled>

                                                <TableCellStyled align="right">
                                                    {/* <RatePlanMoreMenu reload={reload} ratePlanId={_id} isActif={isActif} /> */}
                                                </TableCellStyled>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </CustomizedCard>
            </Container>
        </Page>
    );

};

export default Politic;