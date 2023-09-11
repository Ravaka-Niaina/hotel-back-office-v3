import axios from 'axios';
import config from '../config/api';

export const fetchListLanguages = () => 
  axios.get(`${config.host}/language`, {
    timeout: 10000,
  });