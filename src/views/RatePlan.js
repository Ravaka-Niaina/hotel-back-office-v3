import React, { useState, useEffect, useContext } from 'react';
import { Box, Table, Stack, TableRow, TableBody, Container, Typography, TableCell, TableContainer, TablePagination } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddRatePlanDialog from '../components/ratePlan/AddRatePlanDialog';
import ModifyRatePlanDialog from '../components/ratePlan/ModifyRatePlanDialog';
import RatePlanMoreMenu from '../components/ratePlan/RatePlanMoreMenu';
import TableCellStyled from '../components/CustomizedComponents/CustomizedTableCell';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { ThemeContext } from '../components/context/Wrapper';
import { getRatePlanList } from '../services/RatePlan';
import { UserListHead, UserListToolbar } from '../components/table';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedButton from '../components/CustomizedComponents/CustomizedButton';
import CustomizedLinearProgress from '../components/CustomizedComponents/CustomizedLinearProgress';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';
import CustomizedIconButton from '../components/CustomizedComponents/CustomizedIconButton';
import Iconify from '../components/Iconify';

const TABLE_HEAD = [
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'Chambres attribuées', label: 'Chambres attribuées', alignRight: false },
  { id: "Politiques d'annulation", label: "Politiques d'annulation", alignRight: false },
  { id: 'action', label: 'Actions', alignRight: false,alignCenter:true },
];

let delaySearchRef = null;
const RatePlan = () => {
  const context = useContext(ThemeContext);
  const order = 'asc';
  const selected = [];
  const orderBy = 'name';
  const [filterName, setFilterName] = useState('');

  const [location , setLocation] = useState('list');

  const [currentId , setCurrentId] = useState(-1);

  const [ratePlanList, setRatePlanList] = useState(new Array(0));

  const [resultCount, setResultCount] = useState(0);

  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(false);

  const handleChangePage = (e, p, row = rowsPerPage) => {
    fetchFilter(p + 1, row);
  }
  const handleChangeRowsPerPage = (e) => {
    const row = parseInt(e.target.value, 10);
    handleChangePage(null, 0, row);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const fetchFilter = async (p = 1, row = rowsPerPage) => {
    setLoading(true);
    setPage(p);
    setRowsPerPage(row);
    const payload = {
      tableName: 'tarif',
      valueToSearch: filterName,
      fieldsToPrint: ['_id', 'names', 'politiqueAnnulAtrb', 'chambresAtrb'],
      nbContent: row,
      numPage: p,
    };
    const idToken = localStorage.getItem('id_token');
    try {
      const result = await getRatePlanList(payload, idToken);
      if (result.data.status === 200) {
        setRatePlanList(result.data.list);
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
      setLoading(false);
    } catch(e) {
      setLoading(false);
      context.changeResultErrorMessage(e.message);
      context.showResultError(true);
    } finally {
        context.setPartialLoading({ ...context.partialLoading, loading: false, identifier: '' });
      };
  };
  const getAllRatePlan = (noLoading,p = 1, row = rowsPerPage) => {
    const payload = {
      tableName: 'tarif',
      valuesToSearch: [],
      fieldsToPrint: ['_id', 'nom','politiqueAnnulAtrb','chambresAtrb'],
      nbContent: row,
      numPage: p,
    };
    if (!noLoading) {
      context.showLoader(true);
    }
    const idToken = localStorage.getItem('id_token');
    getRatePlanList(payload,idToken)
      .then((result) => {
        // console.log(result);
        // const status = 200;
        if (result.data.status === 200) {
          setRatePlanList(result.data.list);
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
        context.setPartialLoading({ ...context.partialLoading, loading: false, identifier: '' });
      });
  };

  const reload = (noLoading = false) => {
    fetchFilter(1, rowsPerPage);
  };

  const navigate = (itinerary , rateCurrentId = -1) => {
    setCurrentId(rateCurrentId);
    if(itinerary === 'addForm')
    {
      setLocation('addForm');
    }
    else if(itinerary === 'modifyForm')
    {
      setLocation('modifyForm');
    }
    else if(itinerary === 'list')
    {
      setLocation('list');
    }
  };
  
  useEffect(() => {
    setLoading(true);
    // reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (delaySearchRef) clearTimeout(delaySearchRef);
    delaySearchRef = setTimeout(() => fetchFilter(1, rowsPerPage), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterName]);

  return (
    <Page title="AIOLIA | Plans tarifaires">
      <Container sx={{maxWidth: '100%!important'}}>
          {
            location === 'addForm' && (
              <AddRatePlanDialog reload={reload} navigate={navigate}/>
            )
          }
          {
            location === 'modifyForm' && currentId !== -1 && (
              <ModifyRatePlanDialog reload={reload} ratePlanId={currentId}  navigate={navigate}/>
            )
          }
          {
            location === 'list' && (
              <>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <CustomizedTitle text="Plan tarifaire" size={20} />
                  <CustomizedButton onClick={() => navigate('addForm')} text='Ajouter' component={RouterLink} to="#" />
                </Stack>
                <CustomizedPaperOutside sx={{ ...lightBackgroundToTop, background: '#E3EDF7', p: 5, minHeight: '100vh' }}>
                  <UserListToolbar 
                    numSelected={selected.length} 
                    onFilterName={handleFilterByName}
                  />
                  {ratePlanList && <Scrollbar>
                    <TableContainer sx={{ minWidth: 800, }}>
                      <Table>
                        <UserListHead
                          order={order}
                          orderBy={orderBy}
                          headLabel={TABLE_HEAD}
                          rowCount={ratePlanList.length}
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
                          {!loading && ratePlanList.map((row) => {
                            const { _id, names, isActif,chambresAtrb,politiqueAnnulAtrb } = row;
                            const isItemSelected = selected.indexOf(names?.fr) !== -1;
                            console.log(row);
                            return (
                              <TableRow
                                hover
                                key={_id}
                                tabIndex={-1}
                                role="checkbox"
                                selected={isItemSelected}
                                aria-checked={isItemSelected}
                              >
                                <TableCellStyled align="left">{names?.fr}</TableCellStyled>
                                <TableCellStyled align="left">
                                  <ul>
                                    {
                                      chambresAtrb.map((e,i)=>(
                                        <li key={i}>
                                          {e}
                                        </li>
                                      ))
                                    }
                                  </ul>
                                </TableCellStyled>
                                <TableCellStyled align="left">
                                  <ul>
                                    {
                                      politiqueAnnulAtrb.map((e,i)=>(
                                        <li key={i}>
                                          {e}
                                        </li>
                                      ))
                                    }
                                  </ul>
                                </TableCellStyled>
                                <TableCellStyled align="right">
                                  <Stack direction="row" spacing={2} justifyContent='center'>
                                    <CustomizedIconButton 
                                      variant="contained" 
                                      onClick={()=>{
                                        console.log(_id);
                                        navigate('modifyForm',_id);
                                      }}
                                    >
                                      <Iconify icon="eva:edit-fill" width={20} height={20} color="rgba(140, 159, 177, 1)" />
                                    </CustomizedIconButton>

                                    <RatePlanMoreMenu reload={reload} ratePlanId={_id} isActif={isActif} />
                                  </Stack>
                                  
                                </TableCellStyled>
                              </TableRow>
                            );
                          })}
                        {
                          !loading && ratePlanList.length < 1 && (
                            <TableRow>
                              <TableCell style={{ textAlign: 'center' }} colSpan={TABLE_HEAD.length + 1}>
                                <CustomizedTitle text={`Pas de résultats`} color='#212B36' level={3} />
                                <Typography variant="body2" align="center">
                                  Pas de tarifs trouvés &nbsp;
                                  {/* <strong>
                                    &quot;
                                    Statut: &nbsp; {filter.status === 'none' ? ' tous ,' : `${filter.status} ,`}
                                    {
                                      filter.dateOf !== 'none' && `  ${filter.dateOf} entre le ${format(new Date(filter.dateFrom), 'dd MMMM yyyy')} et ${format(new Date(filter.dateUntil), 'dd MMMM yyyy')}.`
                                    }
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
                      labelDisplayedRows={({ from, to, count, page }) => `Page ${page + 1} :   ${from} - ${to} sur ${count}`}
                    />
                  </Scrollbar>}
                </CustomizedPaperOutside>
              </>
            )
          }     
      </Container>
    </Page>
  );
};

export default RatePlan;
