import axios from 'axios';
import config from '../config/api';

export const getRoomTypeList = (payload, idToken) => 
  axios.post(`${config.host}/typeChambre/TC`, payload, {
    headers: {
      Authorization: idToken,
      hotel_id: localStorage.getItem('hotel_id'),
    },
  });
export const getRoomType = (roomTypeId) =>
  axios.get(`${config.host}/typeChambre/detailsChambre/${ roomTypeId }`, {
    headers: {
      hotel_id: localStorage.getItem('hotel_id'),
    }
  });

export const createRoomType = (payload) =>
  axios.post(`${config.host}/typeChambre/insert`, payload, {
    headers: {
      Authorization: localStorage.getItem("id_token"),
      partner_id: localStorage.getItem("partner_id"),
      hotel_id: localStorage.getItem('hotel_id')
    },
  });

export const updateRoomType = (payload, partnerId) =>
  axios.post(`${config.host}/typeChambre/update`, payload, {
    headers: {
      Authorization: localStorage.getItem("id_token"),
      partner_id: partnerId,
      hotel_id: localStorage.getItem('hotel_id')
    },
  });

export const deleteRoomType = (payload) =>
  axios.post(`${config.host}/delete`, payload, {
    headers: {
      isPartner: true,
      hotel_id: localStorage.getItem('hotel_id')
    },
  });

export const changeOpenStatus = (payload) =>
  axios.post(`${config.host}/typeChambre/saveAvailability`, payload, {
    // headers: {
    //   isPartner: true,
    // },
  });
  
export const fetchListEquipments = () =>
  axios.get(`${config.host}/equipement/`);

export const fetchListRatePlans = (payload) =>
  axios.post(`${config.host}/planTarifaire`, payload,  {
    headers: {
      Authorization: localStorage.getItem("id_token"),
    },
  })
