import { useState, useContext, useEffect } from 'react';

// material
import {
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  styled,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';

import { UserListHead, UserListToolbar } from '../components/table';
import RoomTypeMoreMenu from '../components/roomType/RoomTypeMoreMenu';
import AddRoomTypeDialog from '../components/roomType/AddRoomTypeDialog';

import { ThemeContext } from '../components/context/Wrapper';
import { getRoomTypeList } from '../services/RoomType';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedCheckbox from '../components/CustomizedComponents/CustomizedCheckbox';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'nombreAdultes', label: 'Nombre Adultes', alignRight: false },
  { id: 'nombreEnfants', label: 'Nombre Enfants', alignRight: false },
  { id: 'chambresTotal', label: 'Chambres Total', alignRight: false },
  { id: 'superficie', label: 'Superficie', alignRight: false },
  { id: 'action', label: 'Actions', alignRight: true, alignCenter: true },
];

const TableCellStyled = styled(TableCell)({
  color: '#7E7E7E',
});

let delaySearchRef = null;
const TypeChambre = () => {
  const context = useContext(ThemeContext);
  const [roomTypeList, setRoomTypeList] = useState(new Array(0));

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const reload = async () => {
    getAllRoomType();
  };

  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    reload();
    // context.showLoader(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (delaySearchRef) clearTimeout(delaySearchRef);
    delaySearchRef = setTimeout(() => getAllRoomType(), 2000);
  }, [filterName]);

  function getAllRoomType() {
    context.showLoader(true);

    const payload = {
      tableName: 'typeChambre',
      valueToSearch: filterName,
      fieldsToPrint: [],
      nbContent: 100,
      numPage: 1,
    };

    const idToken = localStorage.getItem('id_token');
    try {
      getRoomTypeList(payload, idToken)
        .then((datas) => {
          if (datas.status === 200) {
            const roomTypeData = datas.data;
            setRoomTypeList(roomTypeData.list);
          } else {
            // console.log(datas)
          }
        }) 
        .catch(() => {})
        .finally(() => {
          context.showLoader(false);
        });
    } catch (e) {
      context.changeResultErrorMessage(e.message);
      context.showResultError(true);
      context.showLoader(false);
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = roomTypeList.map((n) => n.nom);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - roomTypeList.length) : 0;

  const filteredUsers = roomTypeList;

  const isUserNotFound = filteredUsers.length === 0;
  return (
    <Page title="AIOLIA | Types de chambres">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <CustomizedTitle size={20} text="Type de chambre" />
          <AddRoomTypeDialog reload={reload} />
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
                  rowCount={roomTypeList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {roomTypeList.map((row) => {
                    const { _id, nom, nbAdulte, nbEnfant, chambreTotal, superficie } = row;
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
                            {nom}
                          </Typography>
                        </TableCellStyled>
                        <TableCellStyled align="left">{nbAdulte}</TableCellStyled>
                        <TableCellStyled align="left">{nbEnfant}</TableCellStyled>
                        <TableCellStyled align="left">{chambreTotal}</TableCellStyled>
                        <TableCellStyled align="left">{superficie} m²</TableCellStyled>
                        <TableCellStyled align="right">
                          <RoomTypeMoreMenu row={row} reload={reload} />
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
                      <TableCellStyled align="center" colSpan={6} sx={{ py: 3 }}>
                        <></>
                      </TableCellStyled>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={roomTypeList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CustomizedPaperOutside>
      </Container>
    </Page>
  );
};

export default TypeChambre;
