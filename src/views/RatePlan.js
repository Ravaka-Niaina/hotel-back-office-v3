import React, { useState, useEffect, useContext } from 'react';
import { Table, Stack, TableRow, TableBody, Container, Typography, TableContainer } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddRatePlanDialog from '../components/ratePlan/AddRatePlanDialog';
import ModifyRatePlanDialog from '../components/ratePlan/ModifyRatePlanDialog';
import RatePlanMoreMenu from '../components/ratePlan/RatePlanMoreMenu';
import CustomizedCheckbox from '../components/CustomizedComponents/CustomizedCheckbox';
import TableCellStyled from '../components/CustomizedComponents/CustomizedTableCell';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { ThemeContext } from '../components/context/Wrapper';
import { getRatePlanList } from '../services/RatePlan';
import { UserListHead, UserListToolbar } from '../components/table';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedButton from '../components/CustomizedComponents/CustomizedButton';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';
import CustomizedIconButton from '../components/CustomizedComponents/CustomizedIconButton';
import Iconify from '../components/Iconify';

const TABLE_HEAD = [
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'action', label: 'Actions', alignRight: false },
];

const RatePlan = () => {
  const context = useContext(ThemeContext);
  const order = 'asc';
  const selected = [];
  const orderBy = 'name';
  const filterName = '';

  const [location , setLocation] = useState('list');
  const [currentId , setCurrentId] = useState(-1);
  const [ratePlanList, setRatePlanList] = useState(new Array(0));

  const getAllRatePlan = (noLoading) => {
    const payload = {
      tableName: 'tarif',
      valuesToSearch: [],
      fieldsToPrint: ['_id', 'nom'],
      nbContent: 100,
      numPage: 1,
    };
    if (!noLoading) {
      context.showLoader(true);
    }
    const idToken = localStorage.getItem('id_token');
    getRatePlanList(payload,idToken)
      .then((fetch) => {
        console.log(fetch);
        const status = 200;
        console.log(fetch.data);
        if (status === 200) {
          setRatePlanList(fetch.data.list);
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
        context.setPartialLoading({ ...context.partialLoading, loading: false, identifier: '' });
      });
  };

  const reload = (noLoading = false) => {
    getAllRatePlan(noLoading);
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
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Page title="AIOLIA | Plans tarifaires">
      <Container>
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
                  <UserListToolbar numSelected={selected.length} filterName={filterName} />
                  {ratePlanList && <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                      <Table>
                        <UserListHead
                          order={order}
                          orderBy={orderBy}
                          headLabel={TABLE_HEAD}
                          rowCount={ratePlanList.length}
                          numSelected={selected.length}
                        />
                        <TableBody>
                          {ratePlanList.map((row) => {
                            const { _id, nom, isActif } = row;
                            console.log(isActif);
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
                                  <CustomizedCheckbox />
                                </TableCellStyled>
                                <TableCellStyled align="left">{nom}</TableCellStyled>

                                <TableCellStyled align="right">
                                  <Stack direction="row" spacing={2}>
                                    <CustomizedIconButton 
                                      variant="contained" 
                                      onClick={()=>{
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
                        </TableBody>
                      </Table>
                    </TableContainer>
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
