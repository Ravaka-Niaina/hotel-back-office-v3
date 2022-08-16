import React, { useState} from 'react';
import {
    Table,
    Stack,
    TableRow,
    TableBody,
    Container,
    Typography,
    TableContainer,
} from '@mui/material';

import AddHotelDialog from '../components/hotel/AddHotelDialog';
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

const Hotel = () => {
    // const context = useContext(ThemeContext);
    const [hotelList,setHotelList] = useState(new Array(0));
    const order = 'asc';
    const selected = [];
    const orderBy = 'name';
    const filterName = '';

    // const [ratePlanList, setRatePlanList] = useState(new Array(0));

    // const getAllRatePlan = () => {
    //     const payload = {
    //         tableName: 'tarif',
    //         valuesToSearch: [],
    //         fieldsToPrint: ["_id", "nom"],
    //         nbContent: 100,
    //         numPage: 1,
    //     };
    //     context.showLoader(true);
    //     getRatePlanList(payload)
    //         .then((fetch) => {
    //             if (fetch.data.status === 200) {
    //                 setRatePlanList(fetch.data.list);
    //                 console.log(fetch.data.list[0]);
    //             } else {
    //                 context.changeResultErrorMessage('Cannot fetch data!');
    //                 context.showResultError(true);
    //             }
    //         })
    //         .catch((e) => {
    //             context.changeResultErrorMessage(e.message);
    //             context.showResultError(true);
    //         })
    //         .finally(() => {
    //             context.showLoader(false);
    //         });
    // };

    // const reload = () => {
    //     getAllRatePlan();
    // };

    // useEffect(() => {
    //     reload();

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    return (
        <Page title="Hotel">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography sx={{ color: '#787878', fontWeight: '500' }} variant="h4" gutterBottom>
                        Hotel
                    </Typography>
                    <AddHotelDialog />
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
                                    rowCount={hotelList.length}
                                    numSelected={selected.length}
                                />
                                <TableBody>
                                    {hotelList.map((row) => {
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

export default Hotel;