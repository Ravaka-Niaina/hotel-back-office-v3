import axios from 'axios';
import config from '../config/api';

export const getPromotionList = (payload, idToken) =>
  axios.post(`${config.host}/promotion/search`, payload, {
    timeout: 10000,
    headers: {
      Authorization: idToken,
      hotel_id: localStorage.getItem('hotel_id'),
    },
  });
export const createPromotion = (payload, idToken) =>
  axios.post(`${config.host}/promotion/create`, payload, {
    timeout: 10000,
    headers: {
      Authorization: idToken,
      hotel_id: localStorage.getItem('hotel_id'),
    },
  });
export const deletePromotion = (payload) =>
  axios.post(`${config.host}/delete`, payload, {
    timeout: 10000,
    headers: {
      isPartner: true,
    },
  });
export const getListTarifAndRoom = () => axios.get(`${config.host}/TCTarif/list`,{
    timeout: 10000,
    headers: {
      Authorization: localStorage.getItem('id_token'),
      hotel_id: localStorage.getItem('hotel_id'),
    },
  }
);
export const getPromotionDetail = (promotionId, partnerId) =>
  axios.get(`${config.host}/promotion/detail/${promotionId}`, {
    timeout: 10000,
    headers: {
      Authorization: localStorage.getItem('id_token'),
      hotel_id: localStorage.getItem('hotel_id'),
    },
  });
export const updatePromotion = (payload, idToken) => 
  axios.post(`${config.host}/promotion/updateP/`, payload, {
    timeout: 10000,
    headers: {
      Authorization: idToken,
    },
  });
