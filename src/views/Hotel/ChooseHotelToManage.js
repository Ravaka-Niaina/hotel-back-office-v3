import React, { useState, useContext, useEffect } from 'react';
import { Table, Stack, TableRow, TableBody, Container, TableContainer } from '@mui/material';
import {Link as RouterLink , useNavigate } from 'react-router-dom';
import AddHotelDialog from '../../components/hotel/AddHotelDialog';
import CustomizedTitle from '../../components/CustomizedComponents/CustomizedTitle';
import TableCellStyled from '../../components/CustomizedComponents/CustomizedTableCell';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { ThemeContext } from '../../components/context/Wrapper';
import { UserListHead, UserListToolbar } from '../../components/table';
import { getHotelList } from '../../services/Hotel';
import CustomizedPaperOutside from '../../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedButton from '../../components/CustomizedComponents/CustomizedButton';
import CustomizedIconButton from '../../components/CustomizedComponents/CustomizedIconButton';
import { lightBackgroundToTop } from '../../components/CustomizedComponents/NeumorphismTheme';
import Iconify from '../../components/Iconify';
import config from '../../config/api';
import DeleteHotelDialog from "../../components/hotel/DeleteHotelDialog";


const TABLE_HEAD = [
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'adresse', label: 'Adresse', alignRight: false },
  { id: 'lien', label: 'Lien', alignRight: false },
  { id: 'action', label: 'Actions', alignRight: true, alignCenter: true },
];

const CreateOrDeleteHotel = () => {
  const context = useContext(ThemeContext);
  const [hotelList, setHotelList] = useState(new Array(0));
  const [location , setLocation] = useState('list');
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
        'urlName',
      ],
      nbContent: 200,
      numPage: 1,
    };
    context.showLoader(true);
    getHotelList(payload)
      .then((fetch) => {
        console.log(fetch);
        fetch.data.status = 200;
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
  const navigate = (itinerary) => {
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

  const manageHotelContent = (hotelId, hotelName) => {
    localStorage.setItem('hotelid', hotelId);
    localStorage.setItem('hotelName', hotelName);
    navigatePage('/');
  };

  return (
    <Page title="AIOLIA | Choisir hôtel à gérer"  style={{
      backgroundColor: '#e6eff8', 
      paddingTop: '25px',
      paddingBottom: '25px'
    }}>
      <Container sx={{maxWidth: '100%!important'}}>
        {
          location === 'addForm' && (
            <AddHotelDialog reload={reload} navigate={navigate}/>
          )
        }
        {
          location === 'list' && (
            <>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <CustomizedTitle size={20} text="Choisir hôtel à gérer" />
                <CustomizedButton onClick={() => navigate('addForm')} text="Ajouter" variant="contained" component={RouterLink} to="#" />
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
                        {hotelList.map((row,i) => {
                          const { name, address, link, urlName } = row;
                          
                          const isItemSelected = selected.indexOf(name) !== -1;

                          return (
                            <TableRow
                              hover
                              key={i}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCellStyled align="left">{name}</TableCellStyled>
                              <TableCellStyled align="left">{address}</TableCellStyled>
                              <TableCellStyled align="left">
                                <a href={`${config.frontOffice}/${urlName}`} target="_blank" rel="noreferrer noopener">
                                  {`${config.frontOffice}/${urlName}`}
                                </a>
                              </TableCellStyled>
                              <TableCellStyled align="right">
                                <Stack direction="row" spacing={2} justifyContent='center'>
                                  <CustomizedIconButton variant="contained" onClick={() => manageHotelContent(row._id, row.name)}>
                                    <Iconify icon="bxs:user-check" width={20} height={20} color="rgba(140, 159, 177, 1)" />
                                  </CustomizedIconButton>
                                  <DeleteHotelDialog hotelId={row._id} reload={reload} />
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

export default CreateOrDeleteHotel;
