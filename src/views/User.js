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
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: '_id', label: 'Id', alignRight: false },
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'prenom', label: 'Prenom', alignRight: false },
  { id: 'telephone', label: 'Telephone', alignRight: false },
  { id: 'active', label: 'Actif', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function User() {
  const context = useContext(ThemeContext);
  const [userList, setUserList] = useState(new Array(0));

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [accessRights, setAccessRights] = useState(null);
  
  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getAllUser = async () => {
    context.showLoader(true);
    const payloadListUser = {
      tableName: 'partenaire',
      valuesToSearch: [],
      fieldsToPrint: [],
      nbContent: 200,
      numPage: 1,
    };
    // const accessRights = await getAccessRightList({})
    // console.log(accessRights)
    getUserList(payloadListUser)
      .then((result) => {
        if (result.status === 200) {
          setUserList(result.data.list);
        } else {
          context.changeResultErrorMessage('Une erreur est survenue lors du chargement des données');
          context.showResultError(true);
        }
      })
      .catch(() => {
        context.changeResultErrorMessage('Une erreur est survenue lors du chargement des données');
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
      if(!result.data?.list) return
      setAccessRights(result?.data?.list)
    })
  }
  const reload = () => {
    getAllUser();
    getAccessRights();
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.nom);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = userList;

  const isUserNotFound = filteredUsers.length === 0;
  useEffect(()=>{
    // console.log(userList)
  },[userList])
  return (
    <Page title="AIOLIA | Utilisateurs">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <CustomizedTitle sx={{ color: '#787878'}} text='Utilisateur'/>
          <AddUserDialog />
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
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
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
                          <CustomizedCheckbox checked={isItemSelected} onChange={(event) => handleClick(event, nom)} />
                        </TableCellStyled>
                        <TableCellStyled component="th" scope="row" padding="none">
                          <Typography variant="subtitle2" noWrap>
                            {_id}
                          </Typography>
                        </TableCellStyled>
                        <TableCellStyled align="left">{nom}</TableCellStyled>
                        <TableCellStyled align="left">{prenom}</TableCellStyled>
                        <TableCellStyled align="left">{telephone}</TableCellStyled>
                        <TableCellStyled align="left">{isActive ? 'Oui' : 'Non'}</TableCellStyled>

                        <TableCellStyled align="right">
                          {row && <UserMoreMenu accessRights={accessRights} userDetails={row} userId={_id} reload={reload}/>}
                        </TableCellStyled>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCellStyled colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <></>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CustomizedPaperOutside>
      </Container>
    </Page>
  );
}
