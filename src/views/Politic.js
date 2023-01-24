import React, { useState, useEffect, useContext } from 'react';
import { Table, Stack, TableRow, TableBody, Container, Typography, TableContainer,TablePagination,TableCell,Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import AddPoliticDialog from '../components/politic/AddPoliticDialog';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import TableCellStyled from '../components/CustomizedComponents/CustomizedTableCell';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { UserListHead, UserListToolbar } from '../components/table';
import { getPolitics } from '../services/Politic';
import { ThemeContext } from '../components/context/Wrapper';
import PoliticMoreMenu from '../components/politic/PoliticMoreMenu';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedLinearProgress from '../components/CustomizedComponents/CustomizedLinearProgress';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';

const TABLE_HEAD = [
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'remboursabilité', label: 'Remboursabilité', alignRight: false },
  { id: 'action', label: 'Actions', alignRight: true, alignCenter: true },
];

let delaySearchRef = null;
const Politic = () => {
  const context = useContext(ThemeContext);
  const order = 'asc';
  const selected = [];
  const orderBy = 'name';

  const [politicList, setPoliticList] = useState(new Array(0));

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
      tableName: 'politiqueAnnulation',
      valueToSearch: filterName,
      fieldsToPrint: [],
      nbContent: row,
      numPage: p,
    };
    const idToken = localStorage.getItem('id_token');
    getPolitics({ ...payload }, idToken)
      .then((result) => {
        try {
          const status = result?.status;
          if (status === 200) {
            const list = result.data?.list;
            setPoliticList(list);
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
        } catch (err) {
          context.changeResultErrorMessage(err.message);
          context.showResultError(true);
        }
      })
      .catch((err) => {
        context.changeResultErrorMessage(err.message);
        context.showResultError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getAllPolitics = () => {
    context.showLoader(true);
    const payload = {
      valueToSearch: filterName,
      fieldsToPrint: [],
      nbContent: 5,
      numPage: 1,
    };
    const idToken = localStorage.getItem('id_token');
    getPolitics({ ...payload }, idToken)
    .then((result) => {
      console.log(result);
      try {
          const status = result?.data.status;
          if (status === 200) {
            const list = result.data?.list;
            setPoliticList(list);
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
        } catch (err) {
            context.changeResultErrorMessage(err.message);
            context.showResultError(true);
        }
      })
      .catch((err) => {
        context.changeResultErrorMessage(err.message);
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
    getAllPolitics();
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    
    if (delaySearchRef) clearTimeout(delaySearchRef);
    delaySearchRef = setTimeout(() => getAllPolitics(), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterName]);

  return (
    <Page title="AIOLIA | Politiques d'annulation">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <CustomizedTitle size={20} text="Politique" />
          <AddPoliticDialog reload={reload} />
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

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                {politicList && (
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={politicList.length}
                    numSelected={selected.length}
                  />
                )}
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
                  {politicList &&
                    politicList.map((row, index) => {
                      // const { _id, nom, isActif } = row;
                      // const isItemSelected = selected.indexOf(nom) !== -1;
                      const i = index;
                      return (
                        <TableRow hover key={i} tabIndex={-1} role="checkbox">
                          <TableCellStyled align="left">{row.nom}</TableCellStyled>
                          <TableCellStyled component="th" scope="row" padding="none">
                            {row.description}
                          </TableCellStyled>
                          <TableCellStyled component="th" scope="row" padding="none">
                            {row.remboursable ? (
                              <Typography color={'green'}>
                                Remboursable <CheckCircleOutlineIcon />
                              </Typography>
                            ) : (
                              <Typography color={'red'}>
                                Non remboursable <HighlightOffIcon />
                              </Typography>
                            )}
                          </TableCellStyled>
                          <TableCellStyled align="right">
                            <PoliticMoreMenu reload={reload} politic={row} ratePlanId={'_id'} isActif={'isActif'} />
                          </TableCellStyled>
                        </TableRow>
                      );
                    })}
                    {
                          !loading && politicList.length < 1 && (
                            <TableRow>
                            <TableCell style={{ textAlign: 'center' }} colSpan={TABLE_HEAD.length + 1}>
                                <CustomizedTitle text={`Pas de résultats`} color='#212B36' level={3} />
                                <Typography variant="body2" align="center">
                                  Pas de politiques d'annulations trouvés &nbsp;
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
          </Scrollbar>
        </CustomizedPaperOutside>
      </Container>
    </Page>
  );
};

export default Politic;
