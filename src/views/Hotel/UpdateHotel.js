import React, { useState, useContext, useEffect } from 'react';
import { Table, Stack, TableRow, TableBody, Container, TableContainer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ModifyHotelDialog from '../../components/hotel/ModifyHotelDialog';
import CustomizedCheckbox from '../../components/CustomizedComponents/CustomizedCheckbox';
import CustomizedTitle from '../../components/CustomizedComponents/CustomizedTitle';
import TableCellStyled from '../../components/CustomizedComponents/CustomizedTableCell';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { ThemeContext } from '../../components/context/Wrapper';
import { UserListHead, UserListToolbar } from '../../components/table';
import { getHotelList } from '../../services/Hotel';
import CustomizedPaperOutside from '../../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedIconButton from '../../components/CustomizedComponents/CustomizedIconButton';
import { lightBackgroundToTop } from '../../components/CustomizedComponents/NeumorphismTheme';
import Iconify from '../../components/Iconify';


const TABLE_HEAD = [
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'adresse', label: 'Adresse', alignRight: false },
  { id: 'lien', label: 'Lien', alignRight: false },
  { id: 'action', label: 'Actions', alignRight: true, alignCenter: true },
];

const UpdateHotel = () => {
  const context = useContext(ThemeContext);
  const [hotelList, setHotelList] = useState(new Array(0));
  const [location , setLocation] = useState('list');
  const [currentRow , setCurrentRow] = useState(null);
  const order = 'asc';
  const selected = [];
  const orderBy = 'name';
  const filterName = '';

  const navigatePage = useNavigate();

  // const [ratePlanList, setRatePlanList] = useState(new Array(0));

  const getAllHotel = () => {
    const payload = {
      tableName: 'hotel',
      valuesToSearch: [],
      fieldsToPrint: [
        '_id',
        'name',
        'phoneNum',
        'emailAddress',
        'link',
        'address',
        'checkIn',
        'checkOut',
        'vignette',
        'minKidAge',
        'maxKidAge',
        'minBabyAge',
        'maxBabyAge',
        'location',
        'isTVAIncluded',
        'TVA',
        'photo',
        'logo',
        'banner',
        'primary_button_color',
        'secondary_button_color',
        'typography_h1',
        'typography_h2',
        'typography_h3',
      ],
      nbContent: 200,
      numPage: 1,
    };
    context.showLoader(true);
    getHotelList(payload)
      .then((fetch) => {
        fetch.data.status = 200;
        console.log(fetch);
        if (fetch.data.status === 200) {
          setHotelList(fetch.data.list);
        } else {
          context.changeResultErrorMessage('Cannot fetch data!');
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

  const reload = () => {
    getAllHotel();
  };
  const navigate = (itinerary , currentHotelRow = null) => {
    setCurrentRow(currentHotelRow);
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
  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const manageHotelContent = (hotelId) => {
    localStorage.setItem('hotel_id', hotelId);
    navigatePage('/');
  };

  return (
    <Page title="AIOLIA | Hotels">
      <Container>
        {
          location === 'modifyForm' && currentRow !== null && (
            <ModifyHotelDialog reload={reload} row={currentRow} navigate={navigate}/>
          )
        }
        {
          location === 'list' && (
            <>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <CustomizedTitle size={20} text="Modifier Hôtel" />
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
                <UserListToolbar numSelected={selected.length} filterName={filterName} />
                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={hotelList.length}
                        numSelected={selected.length}
                      />
                      <TableBody>
                        {hotelList.map((row) => {
                          const { _id, name, address, link } = row;

                          const isItemSelected = selected.indexOf(name) !== -1;

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
                              <TableCellStyled align="left">{name}</TableCellStyled>
                              <TableCellStyled align="left">{address}</TableCellStyled>
                              <TableCellStyled align="left">
                                <a href={`https://${link}`} target="_blank" rel="noreferrer noopener">
                                  {link}
                                </a>
                              </TableCellStyled>
                              <TableCellStyled align="right">
                                <Stack direction="row" spacing={2} justifyContent='center'>
                                  <CustomizedIconButton variant="contained" onClick={() => navigate('modifyForm', row)}>
                                    <Iconify icon="eva:edit-fill" width={20} height={20} color="rgba(140, 159, 177, 1)" />
                                  </CustomizedIconButton>
                                </Stack>

                              </TableCellStyled>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>
              </CustomizedPaperOutside>
            </>
          )
        }
        
      </Container>
    </Page>
  );
};

export default UpdateHotel;
