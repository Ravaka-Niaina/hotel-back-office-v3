import { useState, useEffect, useContext } from 'react';
import {Link as RouterLink} from 'react-router-dom';
// material
import {
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
import Scrollbar from '../components/Scrollbar';
import CustomizedCheckbox from '../components/CustomizedComponents/CustomizedCheckbox';
import TableCellStyled from '../components/CustomizedComponents/CustomizedTableCell';
import PromotionMoreMenu from '../components/promotion/PromotionMoreMenu';
import { ThemeContext } from '../components/context/Wrapper';
import { UserListHead, UserListToolbar } from '../components/table';
import { getPromotionList } from '../services/Promotion';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedButton from '../components/CustomizedComponents/CustomizedButton';
import CustomizedIconButton from '../components/CustomizedComponents/CustomizedIconButton';
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
  { id: 'action', label: 'Actions', alignRight: false },
];

const Promotion = () => {
  const context = useContext(ThemeContext);

  const [location, setLocation] = useState('list');

  const [promotionList, setPromotionList] = useState(new Array(0));

  const [currentPromotion, setCurrentPromotion] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = (itinerary,currentPromotionRow = null) => {
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
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const getAllPromotion = () => {
    context.showLoader(true);
    const payload = {
      tableName: 'promotion',
      valuesToSearch: [],
      fieldsToPrint: ['nom', 'sejourMin', 'planTarifaire', 'typeChambre', 'dateDebutS', 'dateFinS'],
      nbContent: 5,
      numPage: 1,
    };
    const user = JSON.parse(localStorage.getItem('partner_id'));
    try {
      const idToken = localStorage.getItem("id_token");
      getPromotionList(payload, idToken)
        .then((datas) => {
          const dataStatus = 200;
          const dataList = datas.data.list;

          if (dataStatus === 200) {
            setPromotionList(dataList);
          } else {
            context.changeResultErrorMessage(`Une erreur est survenue lors du chargement de la liste de promotions.`);
            context.showResultError(true);
          }
        })
        .catch(() => {
          context.changeResultErrorMessage(`Une erreur est survenue lors du chargement de la liste de promotions.`);
          context.showResultError(true);
        })
        .finally(() => {
          context.showLoader(false);
        });
    } catch (e) {
      context.changeResultErrorMessage(`Une erreur est survenue lors du chargement de la liste de promotions.`);
      context.showResultError(true);
    }
  };
  const reload = async () => {
    getAllPromotion();
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = promotionList.map((n) => n.nom);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - promotionList.length) : 0;
  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          <ModifyPromotionDialog row={currentPromotion} reload={reload} navigate={navigate}/>
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

                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        // rowCount={promotionList.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                      />
                      <TableBody>
                        {promotionList &&
                          promotionList.map((row) => {
                            const { _id, nom, sejourMin, planTarifaire, typeChambre, dateDebutS, dateFinS } = row;
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
                                  <CustomizedCheckbox
                                    checked={isItemSelected}
                                    onChange={(event) => handleClick(event, nom)}
                                  />
                                </TableCellStyled>
                                <TableCellStyled component="th" scope="row" padding="none">
                                  <Typography variant="subtitle2" noWrap>
                                    {nom}
                                  </Typography>
                                </TableCellStyled>
                                <TableCellStyled align="left">{sejourMin}</TableCellStyled>
                                <TableCellStyled align="left">{planTarifaire}</TableCellStyled>
                                <TableCellStyled align="left">{typeChambre}</TableCellStyled>
                                <TableCellStyled align="left">{dateDebutS}</TableCellStyled>
                                <TableCellStyled align="left">{dateFinS}</TableCellStyled>

                                <TableCellStyled align="right">
                                  <Stack direction='row' spacing={2}>
                                    <CustomizedIconButton variant="contained" onClick={() => navigate('modifyForm', row)}>
                                      <Iconify icon="eva:edit-fill" width={20} height={20} color="rgba(140, 159, 177, 1)" />
                                    </CustomizedIconButton >
                                    <PromotionMoreMenu row={row} reload={reload} />
                                  </Stack>

                                </TableCellStyled>
                              </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>

                      {/* {(0)
                  <TableBody>
                    <TableRow>
                      <TableCellStyled align="center" colSpan={6} sx={{ py: 3 }}>
                        <> </>
                      </TableCellStyled>
                    </TableRow>
                  </TableBody>
                )} */}
                    </Table>
                  </TableContainer>
                </Scrollbar>

                {promotionList && rowsPerPage && page && (
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={promotionList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                )}
              </CustomizedPaperOutside>
          </>
        )
      }
      </Container>
    </Page>
  );
};

export default Promotion;
