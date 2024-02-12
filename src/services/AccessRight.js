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