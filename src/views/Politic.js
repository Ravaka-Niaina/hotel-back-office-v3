import React, { useState, useEffect, useContext } from 'react';
import { Table, Stack, TableRow, TableBody, Container, Typography, TableContainer } from '@mui/material';

import AddPoliticDialog from '../components/politic/AddPoliticDialog';
import CustomizedCheckbox from '../components/CustomizedComponents/CustomizedCheckbox';
import CustomizedCard from '../components/CustomizedComponents/CustomizedCard';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import TableCellStyled from '../components/CustomizedComponents/CustomizedTableCell';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { UserListHead, UserListToolbar } from '../components/table';
import { getPolitics } from '../services/Politic';
import { ThemeContext } from '../components/context/Wrapper';
import PoliticMoreMenu from '../components/politic/PoliticMoreMenu';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'remboursabilité', label: 'Remboursabilité', alignRight: false },
  { id: '', label: '', alignRight: false },
];

const Politic = () => {
  const context = useContext(ThemeContext);
  const [politicList, setPoliticList] = useState(new Array(0));
  const order = 'asc';
  const selected = [];
  const orderBy = 'name';
  const filterName = '';
  const getAllPolitics = () => {
    context.showLoader(true)
    const payload = {
      tableName: 'politiqueAnnulation',
      valuesToSearch: [],
      fieldsToPrint: [],
      nbContent: 200,
      numPage: 1,
    };
    getPolitics({ ...payload }).then((datas) => {
      try {
        const status = datas?.status;
        if (status === 200) {
          const list = datas.data?.list;
          setPoliticList(list);
        } else {
          context.changeResultErrorMessage('Un problème est survenu, veuillez rafraichir la page!');
          context.showResultError(true);
        }
      } catch (err) {
        context.changeResultErrorMessage(err.message);
        context.showResultError(true);
      }
    }).catch(() => {

    }).finally(() => {
      context.showLoader(false)
    })
  };
  const reload = () => {
    getAllPolitics();
  };
  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Page title="Politique">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <CustomizedTitle sx={{ color: '#787878' }} text="Politique" />
          <AddPoliticDialog reload={reload} />
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
                  {politicList.map((row, index) => {
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
                            {row._id}
                          </Typography>
                        </TableCellStyled>
                        <TableCellStyled align="left">{row.nom}</TableCellStyled>
                        <TableCellStyled component="th" scope="row" padding="none">
                          {row.description}
                        </TableCellStyled>
                        <TableCellStyled component="th" scope="row" padding="none">
                          {row.remboursable ? (
                            <Typography color={"green"}>Remboursable</Typography>
                          ) : (
                            <Typography color={"red"}>Non remboursable</Typography>
                          )}
                        </TableCellStyled>
                        <TableCellStyled align="right">
                          <PoliticMoreMenu reload={reload} politic={row} ratePlanId={'_id'} isActif={'isActif'} />
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
