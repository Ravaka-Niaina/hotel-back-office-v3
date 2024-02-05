import {useEffect, useContext, useState} from 'react';
import {
  FormControlLabel,
  FormGroup,
  Stack,
} from '@mui/material';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';
import CustomizedCheckbox from '../CustomizedComponents/CustomizedCheckbox';
import { ThemeContext } from "../context/Wrapper";
import { getRoomTypeList } from '../../services/RoomType';
import { getRatePlanList } from '../../services/RatePlan';

const RoomTypeAndRatePlanForm = ({
  idSelectedRoomTypes, 
  setIdSelectedRoomTypes,
  idSelectedRatePlans,
  setIdSelectedRatePlans,
}) => {
  const context = useContext(ThemeContext);
  const [listRooms, setListRooms] = useState([]);
  const [listRatePlans, setListRatePlans] = useState([]);

  const getRoomTypes = async () => {
    const payload = {
      tableName: 'typeChambre',
      valueToSearch: '',
      fieldsToPrint: [],
      nbContent: 900,
      numPage: 1,
    };
    const idToken = localStorage.getItem('id_token');
    try {
      const datas = await getRoomTypeList(payload, idToken);
      if (datas.data.status === 200) {
        const roomTypeData = datas.data.list.map(({_id, names}) => ({
          _id,
          name: names.fr})
        );
        setListRooms(roomTypeData);
        const selectedIdRoomTypesTemp = datas.data.list.map(({_id}) => _id);
        setIdSelectedRoomTypes(selectedIdRoomTypesTemp);
      } else {
        console.error(datas.data);
        context.showResultError(true);
      }
    } catch (e) {
      context.changeResultErrorMessage(e.message);
      context.showResultError(true);
    }
  }

  const getRatePlans = async () => {
    const payload = {
      tableName: 'tarif',
      valueToSearch: '',
      fieldsToPrint: ['_id', 'names'],
      nbContent: 900,
      numPage: 1,
    };
    const idToken = localStorage.getItem('id_token');
    try {
      const result = await getRatePlanList(payload, idToken);
      if (result.data.status === 200) {
        const ratePlanData = result.data.list.map(({_id, names}) => ({ _id, name: names.fr }));
        setListRatePlans(ratePlanData);
        const idSelectedRatePlansTemp = result.data.list.map(({_id,}) => _id);
        setIdSelectedRatePlans(idSelectedRatePlansTemp);
      }
    } catch (e) {
      context.changeResultErrorMessage(e.message);
      context.showResultError(true);
    }
  }

  const checkOrUnchekRoomType = (roomTypeId) => {
    for (let i = 0; i < idSelectedRoomTypes.length; i += 1) {
      if (idSelectedRoomTypes[i] === roomTypeId) {
        const idRoomTypesTemp = [...idSelectedRoomTypes];
        idRoomTypesTemp.splice(i, 1);
        setIdSelectedRoomTypes(idRoomTypesTemp);
        return;
      }
    }

    setIdSelectedRoomTypes([...idSelectedRoomTypes, roomTypeId]);
  }

  const checkOrUnchekRatePlan = (ratePlanId) => {
    for (let i = 0; i < idSelectedRatePlans.length; i += 1) {
      if (idSelectedRatePlans[i] === ratePlanId) {
        const idRatePlansTemp = [...idSelectedRatePlans];
        idRatePlansTemp.splice(i, 1);
        setIdSelectedRatePlans(idRatePlansTemp);
        return;
      }  
    }
    
    setIdSelectedRatePlans([...idSelectedRatePlans, ratePlanId]);
  }

  useEffect(() => {
    getRoomTypes();
    getRatePlans();
  }, []);

  return <>
    <CustomizedTitle text="Chambres" size={16} />
    <Stack sx={{ p: 0 }} direction="column" spacing={3}>
      <FormGroup>
        <div style={{ paddingLeft: '0', paddingRight: '2em' }}>
          {listRooms.map((k) => (
            <FormControlLabel
              key={k._id}
              control={
                <CustomizedCheckbox
                  checked={idSelectedRoomTypes.find((elem) => elem === k._id) !== undefined}
                  onClick={() => checkOrUnchekRoomType(k._id)}
                />
              }
              label={k.name}
            />
          ))}
        </div>
      </FormGroup>
    </Stack> 

    <CustomizedTitle text="Plans tarifaires" size={16} />
    <Stack sx={{ p: 0 }} direction="column" spacing={3}>
      <FormGroup>
        <div style={{ paddingLeft: '0', paddingRight: '2em' }}>
          {listRatePlans.map((k) => (
            <FormControlLabel
              key={k._id}
              control={
                <CustomizedCheckbox
                  checked={idSelectedRatePlans.find((elem) => elem === k._id) !== undefined}
                  onClick={() => checkOrUnchekRatePlan(k._id)}
                />
              }
              label={k.name}
            />
          ))}
        </div>
      </FormGroup>
    </Stack> 
    </>
  } 

export default RoomTypeAndRatePlanForm;