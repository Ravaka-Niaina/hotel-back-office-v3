import { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import AddPromotionDialog from '../components/promotion/AddPromotionDialog';
import ModifyPromotionDialog from '../components/promotion/ModifyPromotionDialog';
import Page from '../components/Page';
import TableCellStyled from '../components/CustomizedComponents/CustomizedTableCell';
import PromotionMoreMenu from '../components/promotion/PromotionMoreMenu';
import { ThemeContext } from '../components/context/Wrapper';
import { UserListHead , UserListToolbar } from '../components/table';
import { getPromotionList } from '../services/Promotion';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedButton from '../components/CustomizedComponents/CustomizedButton';
import CustomizedIconButton from '../components/CustomizedComponents/CustomizedIconButton';
import CustomizedLinearProgress from '../components/CustomizedComponents/CustomizedLinearProgress';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';
import Iconify from '../components/Iconify';

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'sejourMin', label: 'Sejour Min', alignRight: false },
  { id: 'planTarifaire', label: 'Plan Tarifaire', alignRight: false },
  { id: 'typeChambre', label: 'Type Chambre', alignRight: false },
  { id: 'debutSejour', label: 'Debut Sejour', alignRight: false },
  { id: 'finSejour', label: 'Fin Sejour', alignRight: false },
  { id: 'action', label: 'Actions', alignRight: true, alignCenter: true },
];

let delaySearchRef = null;
const Promotion = () => {
  const context = useContext(ThemeContext);

  const [location, setLocation] = useState('list');

  const [promotionList, setPromotionList] = useState(new Array(0));

  const [currentPromotion, setCurrentPromotion] = useState(null);

  const [resultCount, setResultCount] = useState(0);

  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(false);

  const [filterName, setFilterName] = useState('');

  const selected = [];

  const navigate = (itinerary, currentPromotionRow = null) => {
    setCurrentPromotion(currentPromotionRow);
    if (itinerary === 'addForm') {
      setLocation('addForm');
    }
    else if (itinerary === 'modifyForm') {
      setLocation('modifyForm');
    }
    else if (itinerary === 'list') {
      setLocation('list');
    }
  };
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
      tableName: 'promotion',
      valuesToSearch: [],
      fieldsToPrint: ['nom', 'sejourMin', 'planTarifaire', 'typeChambre', 'dateDebutS', 'dateFinS'],
      nbContent: row,
      numPage: p,
    };
    // const user = JSON.parse(localStorage.getItem('partner_id'));
    try {
      const idToken = localStorage.getItem("id_token");
      getPromotionList(payload, idToken)
        .then((result) => {
          console.log(result);
          const dataStatus = result.data.status;
          const dataList = result.data.list;

          if (dataStatus === 200) {
            setPromotionList(dataList);
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
    } catch (e) {
      context.changeResultErrorMessage(e.message);
      context.showResultError(true);
    }
  };
  const getAllPromotion = (p = 1, row = rowsPerPage) => {
    context.showLoader(true);
    setPage(p);
    setRowsPerPage(row);
    const payload = {
      tableName: 'promotion',
      valueToSearch: filterName,
      fieldsToPrint: ['nom', 'sejourMin', 'planTarifaire', 'typeChambre', 'dateDebutS', 'dateFinS'],
      nbContent: row,
      numPage: p,
    };
    // const user = JSON.parse(localStorage.getItem('partner_id'));
    try {
      const idToken = localStorage.getItem("id_token");
      getPromotionList(payload, idToken)
        .then((result) => {
          console.log(result);
          const dataStatus = result.data.status;
          const dataList = result.data.list;

          if (dataStatus === 200) {
            setPromotionList(dataList);
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
    } catch (e) {
      context.changeResultErrorMessage(e.message);
      context.showResultError(true);
    }
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const reload = async () => {
    getAllPromotion();
  };
  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    
    if (delaySearchRef) clearTimeout(delaySearchRef);
    delaySearchRef = setTimeout(() => getAllPromotion(), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterName]);

  // const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Page title="AIOLIA | Promotions">
      <Container>
        {
          location === 'addForm' && (
            <AddPromotionDialog reload={reload} navigate={navigate} />
          )
        }
        {
          location === 'modifyForm' && currentPromotion !== null && (
            <ModifyPromotionDialog row={currentPromotion} reload={reload} navigate={navigate} />
          )
        }
        {
          location === 'list' && (
            <>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <CustomizedTitle text="Promotion" size={20} />
                <CustomizedButton text="Ajouter" onClick={() => navigate('addForm')} variant="contained" component={RouterLink} to="#" />
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
                        order={'asc'}
                        orderBy={'none'}
                        headLabel={TABLE_HEAD}
                        rowCount={promotionList.length}
                        numSelected={0}
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
                        {!loading && promotionList &&
                          promotionList.map((row) => {
                            const { _id, nom, sejourMin, planTarifaire, typeChambre, dateDebutS, dateFinS } = row;

                            return (
                              <TableRow
                                hover
                                key={_id}
                                tabIndex={-1}
                                role="checkbox"
                              >
                                <TableCellStyled component="th" scope="row" padding="none">
                                  <Typography variant="subtitle2" noWrap>
                                    {nom}
                                  </Typography>
                                </TableCellStyled>
                                <TableCellStyled align="left">{sejourMin}</TableCellStyled>
                                <TableCellStyled align="left">
                                  <ul>
                                    {
                                      planTarifaire.map((e, i) => (
                                        <li key={i}>{e}</li>
                                      ))
                                    }
                                  </ul>
                                </TableCellStyled>
                                <TableCellStyled align="left">
                                  <ul>
                                    {
                                      typeChambre.map((e, i) => (
                                        <li key={i}>{e}</li>
                                      ))
                                    }
                                  </ul>
                                </TableCellStyled>
                                <TableCellStyled align="left">{dateDebutS}</TableCellStyled>
                                <TableCellStyled align="left">{dateFinS}</TableCellStyled>

                                <TableCellStyled align="right">
                                  <Stack direction='row' spacing={2} justifyContent='center'>
                                    <CustomizedIconButton variant="contained" onClick={() => navigate('modifyForm', row)}>
                                      <Iconify icon="eva:edit-fill" width={20} height={20} color="rgba(140, 159, 177, 1)" />
                                    </CustomizedIconButton >
                                    <PromotionMoreMenu row={row} reload={reload} />
                                  </Stack>

                                </TableCellStyled>
                              </TableRow>
                            );
                          })}
                        {
                          !loading && promotionList.length < 1 && (
                            <TableRow>
                            <TableCell style={{ textAlign: 'center' }} colSpan={TABLE_HEAD.length + 1}>
                                <CustomizedTitle text={`Pas de résultats`} color='#212B36' level={3} />
                                <Typography variant="body2" align="center">
                                  Pas de promotion trouvés pour &nbsp;
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
              </CustomizedPaperOutside>
            </>
          )
        }
      </Container>
    </Page>
  );
};

export default Promotion;
