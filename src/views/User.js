import { useState, useEffect, useContext } from 'react';
// material
import {
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  Box,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { UserListHead, UserListToolbar } from '../components/table';
import UserMoreMenu from '../components/user/UserMoreMenu';
import CustomizedCheckbox from '../components/CustomizedComponents/CustomizedCheckbox';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import TableCellStyled from '../components/CustomizedComponents/CustomizedTableCell';
import AddUserDialog from '../components/user/AddUserDialog';
import { ThemeContext } from '../components/context/Wrapper';
import { getUserList } from '../services/User';
import { getAccessRightList } from '../services/AccessRight';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedLinearProgress from '../components/CustomizedComponents/CustomizedLinearProgress';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'prenom', label: 'Prenom', alignRight: false },
  { id: 'telephone', label: 'Telephone', alignRight: false },
  { id: 'active', label: 'Actif', alignRight: false },
  { id: 'action', label: 'Actions', alignRight: true, alignCenter: true },
];

// ----------------------------------------------------------------------

let delaySearchRef = null;
export default function User() {
  const context = useContext(ThemeContext);
  const order = 'asc';
  const selected = [];
  const orderBy = 'name';

  const [userList, setUserList] = useState(new Array(0));

  const [accessRights, setAccessRights] = useState(null);

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
    const payloadListUser = {
      tableName: 'partenaire',
      valuesToSearch: [],
      fieldsToPrint: [],
      nbContent: row,
      numPage: p,
    };
    // const accessRights = await getAccessRightList({})
    // console.log(accessRights)
    const idToken = localStorage.getItem('id_token');
    getUserList(payloadListUser, idToken)
      .then((result) => {
        if (result.data.status === 200) {
          setUserList(result.data.list);
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
          context.changeResultErrorMessage('Une erreur est survenue lors du chargement des donn??es');
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
  const getAllUser = async (p = 1, row = rowsPerPage) => {
    context.showLoader(true);
    const payloadListUser = {
      tableName: 'partenaire',
      valueToSearch: filterName,
      fieldsToPrint: [],
      nbContent: row,
      numPage: p,
    };
    // const accessRights = await getAccessRightList({})
    // console.log(accessRights)
    getUserList(payloadListUser)
      .then((result) => {
        if (result.data.status === 200) {
          setUserList(result.data.list);
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
          context.changeResultErrorMessage('Une erreur est survenue lors du chargement des donn??es');
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

  const getAccessRights = () => {
    getAccessRightList().then(result=>{
      if(result.status !== 200) return
      if (!result.data) return
      if(result.data.status !== 200) return
      if(!result.data?.list) return
      setAccessRights(result?.data?.list)
    })
  }

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const reload = () => {
    getAllUser();
    getAccessRights();
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    
    if (delaySearchRef) clearTimeout(delaySearchRef);
    delaySearchRef = setTimeout(() => getAllUser(), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterName]);
  
  return (
    <Page title="AIOLIA | Utilisateurs">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <CustomizedTitle size={20} text='Utilisateur'/>
          <AddUserDialog accessRights={accessRights} reload={reload} />
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
                  rowCount={userList.length}
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
                  {userList && userList.map((row) => {
                    const { _id, nom, prenom, telephone, isActive } = row;
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
                          <CustomizedCheckbox checked={isItemSelected} />
                        </TableCellStyled>
                        <TableCellStyled align="left">{nom}</TableCellStyled>
                        <TableCellStyled align="left">{prenom}</TableCellStyled>
                        <TableCellStyled align="left">{telephone}</TableCellStyled>
                        <TableCellStyled align="left">{isActive ? 'Oui' : 'Non'}</TableCellStyled>

                        <TableCellStyled align="right">
                          {row && <UserMoreMenu 
                            accessRights={accessRights} 
                            userDetails={row} 
                            userId={_id} 
                            reload={reload}
                            getAllUser={getAllUser}  
                          />}
                        </TableCellStyled>
                      </TableRow>
                    );
                  })}
                  {
                          !loading && userList.length < 1 && (
                            <TableRow>
                            <TableCell style={{ textAlign: 'center' }} colSpan={TABLE_HEAD.length + 1}>
                                <CustomizedTitle text={`Pas de r??sultats`} color='#212B36' level={3} />
                                <Typography variant="body2" align="center">
                                  Pas d'utilisateur trouv??s &nbsp;
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
          </Scrollbar>

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
      </Container>
    </Page>
  );
}
