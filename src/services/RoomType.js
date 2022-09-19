import axios from 'axios';
import config from '../config/api';

export const getRoomTypeList = (payload, idToken) => 
  axios.post(`${config.host}/typeChambre/TC`, payload, {
    headers: {
      Authorization: idToken,
    },
  });
export const createRoomType = (payload, partnerId) =>
  axios.post(`${config.host}/roomType/search`, payload, {
    headers: {
      partner_id: partnerId,
    },
  });
export const updateRoomType = (payload, partnerId) =>
  axios.post(`${config.host}/roomType/update`, payload, {
    headers: {
      partner_id: partnerId,
    },
  });
export const deleteRoomType = (payload) =>
  axios.post(`${config.host}/delete`, payload, {
    headers: {
      isPartner: true,
    },
  });
export const changeOpenStatus = (payload) =>
  axios.post(`${config.host}/typeChambre/saveAvailability`, payload, {
    // headers: {
    //   isPartner: true,
    // },
  })
