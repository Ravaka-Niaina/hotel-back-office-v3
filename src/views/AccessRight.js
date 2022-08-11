import React, { useState, useEffect, useContext } from 'react';
import {
  Table,
  Stack,
  TableRow,
  TableBody,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
import AccessRightMoreMenu from '../components/accessRight/AccessRightMoreMenu';
import AddAccessRightDialog from '../components/accessRight/AddAccessRightDialog';
import CustomizedCheckbox from '../template/Form/CustomizedCheckbox';
import CustomizedCard from '../template/Form/CustomizedCard';
import TableCellStyled from '../template/TableCellStyled';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { ThemeContext } from '../components/context/Wrapper';
import { UserListHead, UserListToolbar } from '../components/table';
import { getAccessRightList } from '../services/AccessRight';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'nom', label: 'Nom', alignRight: false },
];


const AccessRight = () => {
  const context = useContext(ThemeContext);
  const order = 'asc';
  const selected = [];
  const orderBy = 'name';

  const filterName = '';

  const [accessRightList, setAccessRightList] = useState(new Array(0));

  const getAllAccessRight = () => {
    const payload = {
      tableName: 'droitAcces',
      valuesToSearch: [],
      fieldsToPrint: ['_id', 'nom'],
      nbContent: 100,
      numPage: 1,
    };
    context.showLoader(true);
    getAccessRightList(payload)
      .then((fetch) => {
        if (fetch.data.status === 200) {
          setAccessRightList(fetch.data.list);
        } else {
          context.changeResultErrorMessage('Cannot fetch data!');
          context.showResultError(true);
        }
      })
      .catch((e) => {
        context.changeResultErrorMessage(e.message);
        context.showResultError(true);
      })
      .finally(() => {
        context.showLoader(false);
      });
  };

  const reload = () => {
    getAllAccessRight();
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography sx={{ color: '#787878', fontWeight: '500' }} variant="h4" gutterBottom>
            Droits d'accès
          </Typography>
          <AddAccessRightDialog reload={reload} />
        </Stack>

        <CustomizedCard>
          <UserListToolbar numSelected={selected.length} filterName={filterName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={accessRightList.length}
                  numSelected={selected.length}
                />
                <TableBody>
                  {accessRightList.map((row) => {
                    const { _id, nom } = row;
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
                          <CustomizedCheckbox  />
                        </TableCellStyled>
                        <TableCellStyled component="th" scope="row" padding="none">
                          <Typography variant="subtitle2" noWrap>
                            {_id}
                          </Typography>
                        </TableCellStyled>
                        <TableCellStyled align="left">{nom}</TableCellStyled>

                        <TableCellStyled align="right">
                          <AccessRightMoreMenu reload={reload} accessRight={row} />
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

export default AccessRight;
