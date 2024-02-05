import axios from 'axios';
import config from '../config/api';

export const getHistoricModifRoomType = (payload) =>
  axios.post(`${config.host}/typeChambre/historicModif`, payload, {
    timeout: 10000,
    headers: {
      Authorization: localStorage.getItem("id_token"),
      partner_id: localStorage.getItem("partner_id"),
      hotelid: localStorage.getItem('hotelid')
    },
  });