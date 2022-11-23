import axios from 'axios';
import config from '../config/api';

export const getAccessRightList = (payload) => {
  const defaultPayload = {
    tableName: 'droitAcces',
    valueToSearch: '',
    fieldsToPrint: ['_id', 'nom'],
    nbContent: 100,
    numPage: 1,
  };
  return axios.post(
    `${config.host}/droitAcces/list`,
    { ...defaultPayload, ...payload },
    {
      timeout: 10000,
      // headers: {
      //     partner_id: partnerId,
      // },
    }
  );
};
export const createAccessRight = (payload) =>
  axios.post(`${config.host}/droitAcces/insert`, payload, {
    timeout: 10000,
    // headers: {
    //     Authorization: idToken,
    // },
  });

export const updateAccessRight = (payload) =>
  axios.post(`${config.host}/droitAcces/update`, payload, {
    timeout: 10000,
    // headers: {
    //     Authorization: idToken,
    // },
  });
export const deleteAccessRight = (payload) =>
  axios.post(`${config.host}/droitAcces/delete`, payload, {
    timeout: 10000,
    // headers: {
    //     Authorization: idToken,
    // },
  });
