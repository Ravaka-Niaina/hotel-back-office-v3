import axios from 'axios';
import config from '../config/api';

export const getAvgDailyRate = () => {
  return axios.get(`${config.apiHost}/reservation/avg/daily-rate`);
};

export const getMarketSegmentation = () => {
  return axios.get(`${config.apiHost}/reservation/market-segmentation`);
};

export const calculateAvgLenStay = () => {
  return axios.get(`${config.apiHost}/reservation/avg/stay`);
};

export const calculateAvgRoomRate = () => {
  return axios.get(`${config.apiHost}/reservation/avg/room`);
};

export const getCancellationRate = () => {
  return axios.get(`${config.apiHost}/reservation/cancellation`);
};

export const getTotalRevenue = () => {
  return axios.get(`${config.apiHost}/reservation/revenue/total`);
};

export const calculateRevenueMonth = () => {
  return axios.get(`${config.apiHost}/reservation/revenue/month`);
};

export const testService = () => {
  return axios.get(`${config.apiHost}/reservation/data/`);
};
