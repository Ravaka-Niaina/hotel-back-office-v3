import axios from 'axios';
import config from '../config/api';

export const getReservationSalesReport = (payload) => 
  axios.post(
    `${config.host}/reservation/rapport`, 
    payload,
    {
      headers: {
          Authorization: localStorage.getItem('id_token'),
          hotel_id: localStorage.getItem('hotel_id'),
      },
    }
  );
