import axios from 'axios';
import config from '../config/api';

export const getHistoricModifCancelingPolitic = (payload) =>
  axios.post(`${config.host}/politique/historicModif`, payload, {
    timeout: 10000,
    headers: {
      Authorization: localStorage.getItem("id_token"),
      partner_id: localStorage.getItem("partner_id"),
      hotel_id: localStorage.getItem('hotel_id')
    },
  });