import React, { useState, useEffect, useContext } from 'react';
import { Table, Stack, TableRow, TableBody, Container, TableCell, Box, Typography, TableContainer, TablePagination } from '@mui/material';
import AccessRightMoreMenu from '../components/accessRight/AccessRightMoreMenu';
import AddAccessRightDialog from '../components/accessRight/AddAccessRightDialog';
import CustomizedCheckbox from '../components/CustomizedComponents/CustomizedCheckbox';
import TableCellStyled from '../components/CustomizedComponents/CustomizedTableCell';
import Page from '../components/Page';
import { ThemeContext } from '../components/context/Wrapper';
import { UserListHead, UserListToolbar } from '../components/table';
import { getAccessRightList } from '../services/AccessRight';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedLinearProgress from '../components/CustomizedComponents/CustomizedLinearProgress';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';

const TABLE_HEAD = [
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'action', label: 'Actions', alignRight: true,alignCenter:true },
];

let delaySearchRef = null;
const AccessRight = () => {
  const context = useContext(ThemeContext);
  const order = 'asc';
  const selected = [];
  const orderBy = 'name';

  const [accessRightList, setAccessRightList] = useState(new Array(0));

  const [resultCount, setResultCount] = useState(0);

  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(false);

  const [filterName, setFilterName] = useState('');

  const handleChangePage = (e, p, row = rowsPerPage) => {
    fetchFilter(p + 1, row);
  }
  const handleChangeRowsPerPage = (e) => {
    const row = parseInt(e.target.value, 10);
    handleChangePage(null, 0, row);
  };
  const fetchFilter = (p = 1, row = rowsPerPage) => {
    setLoading(true);
    setPage(p);
    setRowsPerPage(row);
    const payload = {
      tableName: 'droitAcces',
      valueToSearch: filterName,
      fieldsToPrint: ['_id', 'nom'],
      nbContent: row,
      numPage: p,
    };
    getAccessRightList(payload)
      .then((result) => {
        if (result.data.status === 200) {
          setAccessRightList(result.data.list);
          setResultCount(result.data.nbResult);
        }
        else if (result.data.errors) {
          const item = Object.keys(result.data.errors).filter((e, i) => i === 0)[0];
          const indication = result.data.errors[item];
          const message = `${item}: ${indication}`;
          context.changeResultErrorMessage(message);
          context.showResultError(true);
        }
        else if (result.data.message) {
          context.changeResultErrorMessage(result.data.message);
          context.showResultError(true);
        }
        else {
          context.changeResultErrorMessage('Une erreur est survenue lors du chargement des données');
          context.showResultError(true);
          context.showResultError(true);
        }
      })
      .catch((e) => {
        context.changeResultErrorMessage(e.message);
        context.showResultError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getAllAccessRight = (p = 1, row = rowsPerPage) => {
    const payload = {
      tableName: 'droitAcces',
      valueToSearch: filterName,
      fieldsToPrint: ['_id', 'nom'],
      nbContent: row,
      numPage: p,
    };
    context.showLoader(true);
    getAccessRightList(payload)
      .then((result) => {
        console.log(result);
        if (result.data.status === 200) {
          setAccessRightList(result.data.list);
          setResultCount(result.data.nbResult);
        }
        else if (result.data.errors) {
          const item = Object.keys(result.data.errors).filter((e, i) => i === 0)[0];
          const indication = result.data.errors[item];
          const message = `${item}: ${indication}`;
          context.changeResultErrorMessage(message);
          context.showResultError(true);
        }
        else if (result.data.message) {
          context.changeResultErrorMessage(result.data.message);
          context.showResultError(true);
        }
        else {
          context.changeResultErrorMessage('Une erreur est survenue lors du chargement des données');
          context.showResultError(true);
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

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const reload = () => {
    getAllAccessRight();
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    
    if (delaySearchRef) clearTimeout(delaySearchRef);
    delaySearchRef = setTimeout(() => getAllAccessRight(), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterName]);

  return (
    <Page title="AIOLIA | Droits d'acces">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <CustomizedTitle size={20} text="Droit d'acces" />
          <AddAccessRightDialog reload={reload} />
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
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
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
                {
                          loading && (
                            <TableRow>
                              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={TABLE_HEAD.length + 1}>
                                <Box sx={{ margin: 1, textAlign: 'center' }} >
                                  <CustomizedLinearProgress />
                                </Box>
                              </TableCell>
                            </TableRow>
                          )
                        }
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
                          <CustomizedCheckbox />
                        </TableCellStyled>
                        <TableCellStyled align="left">{nom}</TableCellStyled>

                        <TableCellStyled align="right">
                          <AccessRightMoreMenu reload={reload} accessRight={row} />
                        </TableCellStyled>
                      </TableRow>
                    );
                  })}
                  {
                          !loading && accessRightList.length < 1 && (
                            <TableRow>
                            <TableCell style={{ textAlign: 'center' }} colSpan={TABLE_HEAD.length + 1}>
                                <CustomizedTitle text={`Pas de résultats`} color='#212B36' level={3} />
                                <Typography variant="body2" align="center">
                                  Pas de droit d'acces trouvés &nbsp;
                                  {/* <strong>
                                    &quot;

                                    &quot;
                                  </strong>. */}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          )
                        }
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={resultCount}
                  rowsPerPage={rowsPerPage}
                  page={page - 1}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage='Lignes par page'
                  labelDisplayedRows={({ from, to, count, page }) => 
                    `Page ${page + 1} :   ${from} - ${to} sur ${count}`
                  }
              />
        </CustomizedPaperOutside>
      </Container>
    </Page>
  );
};

export default AccessRight;
