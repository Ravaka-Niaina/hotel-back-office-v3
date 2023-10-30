import axios from 'axios';
import config from '../config/api';

export const calculateRevenueMonth = () => {
  return axios.get(`${config.apiHost}/reservation/revenue/month`);
};

export const testService = () => {
  return axios.get(`${config.apiHost}/reservation/data/`);
};
