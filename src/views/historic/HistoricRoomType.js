import React, { useState, useEffect, useContext } from 'react';
import { Box, Table, Stack, TableRow, TableBody, Container, Typography, TableCell, TableContainer, TablePagination } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { getHistoricModifRoomType } from '../../services/HistoricModifRoomType';
import AddRatePlanDialog from '../../components/ratePlan/AddRatePlanDialog';
import ModifyRatePlanDialog from '../../components/ratePlan/ModifyRatePlanDialog';
import RatePlanMoreMenu from '../../components/ratePlan/RatePlanMoreMenu';
import CustomizedCheckbox from '../../components/CustomizedComponents/CustomizedCheckbox';
import TableCellStyled from '../../components/CustomizedComponents/CustomizedTableCell';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { ThemeContext } from '../../components/context/Wrapper';
import { UserListHead, UserListToolbar } from '../../components/table';
import CustomizedTitle from '../../components/CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedButton from '../../components/CustomizedComponents/CustomizedButton';
import CustomizedLinearProgress from '../../components/CustomizedComponents/CustomizedLinearProgress';
import { lightBackgroundToTop } from '../../components/CustomizedComponents/NeumorphismTheme';
import CustomizedIconButton from '../../components/CustomizedComponents/CustomizedIconButton';
import Iconify from '../../components/Iconify';

const TABLE_HEAD = [
  { id: 'roomTypeName', label: 'nom type chambre', alignleft: true },
  { id: 'modifier', label: 'modificateur', alignleft: true },
  { id: 'modificationDate', label: 'date modification', alignleft: true },
  { id: 'modifiedField', label: 'champ modifié', alignleft: true },
  { id: 'oldValue', label: 'ancienne valeur', alignleft: true },
  { id: 'newValue', label: 'nouvelle valeur', alignleft: true },
];

const HistoricRoomType = () => {
  /*
  nbContentPerPage : 5
  nbPage : 1
  nbResult : 4 *
  */
  const context = useContext(ThemeContext);
  const order = 'asc';
  const selected = [];
  const orderBy = 'name';
  const [filterName, setFilterName] = useState('');

  const [location , setLocation] = useState('list');

  const [currentId , setCurrentId] = useState(-1);

  const [historicRoomTypeList, setHistoricRoomTypeList] = useState(new Array(0));

  const [resultCount, setResultCount] = useState(0);

  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(false);

  const handleChangePage = (e, p, row = rowsPerPage) => {
    console.log(`page = ${  p}`);
    setPage(p + 1);
    fetchHistoricModifRoomType({nbContent: row, numPage: p + 1});
  }
  const handleChangeRowsPerPage = (e) => {
    const row = parseInt(e.target.value, 10);
    handleChangePage(null, 0, row);
    setRowsPerPage(row);
    fetchHistoricModifRoomType({nbContent: row, numPage: 1});
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
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

  const fetchHistoricModifRoomType = ({ nbContent = 5, numPage = 1 }) => {
    const payload = {
      nbContent,
      numPage,
    };
    setRowsPerPage(nbContent);
    setPage(numPage);

    getHistoricModifRoomType(payload)
      .then(result => {
        console.log(result);
        setHistoricRoomTypeList(result.data.list);
        setResultCount(result.data.nbResult);
        setRowsPerPage(result.data.nbContentPerPage);
        setPage(numPage);
      })
      .catch(err => console.error(err));
  };
  
  useEffect(() => {
    // setHistoricRoomTypeList(mockupHistoricRoomTypeList);
    fetchHistoricModifRoomType({});
  }, []);

  return (
    <Page title="AIOLIA | Plans tarifaires">
      <Container>
          {
            location === 'list' && (
              <>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <CustomizedTitle text="Plan tarifaire" size={20} />
                  <CustomizedButton onClick={() => navigate('addForm')} text='Ajouter' component={RouterLink} to="#" />
                </Stack>
                <CustomizedPaperOutside sx={{ ...lightBackgroundToTop, background: '#E3EDF7', p: 5, minHeight: '100vh' }}>
                  {/* <UserListToolbar 
                    numSelected={selected.length} 
                    onFilterName={handleFilterByName}
                  /> */}
                  {historicRoomTypeList && <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                      <Table>
                        <UserListHead
                          order={order}
                          orderBy={orderBy}
                          headLabel={TABLE_HEAD}
                          rowCount={historicRoomTypeList.length}
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
                          {historicRoomTypeList.map((row) => {
                            const { 
                              _id,
                              idRoomType, 
                              roomTypeName, 
                              modifier, 
                              modificationDate, 
                              modifiedField, 
                              oldValue, 
                              newValue 
                            } = row;

                            return (
                              <TableRow
                                hover
                                key={idRoomType}
                                tabIndex={-1}
                                role="checkbox"
                              >
                                <TableCellStyled padding="checkbox">
                                  <CustomizedCheckbox />
                                </TableCellStyled>
                                <TableCellStyled align="left">{roomTypeName}</TableCellStyled>
                                <TableCellStyled align="left">{modifier}</TableCellStyled>
                                <TableCellStyled align="left">{modificationDate}</TableCellStyled>
                                <TableCellStyled align="left">{modifiedField}</TableCellStyled>
                                <TableCellStyled align="left">{
                                  Array.isArray(oldValue)
                                  ? <ul>{oldValue.map(oldVal => <li key={oldVal}>{oldVal}</li>)}</ul>
                                  : <>{oldValue}</>
                                }</TableCellStyled>
                                <TableCellStyled align="left">{
                                  Array.isArray(newValue)
                                  ? <ul>{newValue.map(newVal => <li key={newVal}>{newVal}</li>)}</ul>
                                  : <>{newValue}</>  
                                }</TableCellStyled>
                              </TableRow>
                            );
                          })}
                        {
                          !loading && historicRoomTypeList.length < 1 && (
                            <TableRow>
                              <TableCell style={{ textAlign: 'center' }} colSpan={TABLE_HEAD.length + 1}>
                                <CustomizedTitle text={`Pas de résultats`} color='#212B36' level={3} />
                                <Typography variant="body2" align="center">
                                  Aucun historique trouvé &nbsp;
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

export default HistoricRoomType;
