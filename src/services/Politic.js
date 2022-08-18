import axios from 'axios';
import config from '../config/api';

export const getPolitics = (payload) =>
  axios.post(`${config.host}/politique/list`, payload, {
    // headers: {
    //     partner_id: partnerId,
    // },
  });
export const createPolitic = (payload) =>
  axios.post(`${config.host}/politique/insertionPolitique`, payload, {
    // headers: {
    //     Authorization: idToken,
    // },
  });

// export const updatePolitic = (payload) =>
//   axios.post(`${config.host}/droitAcces/update`, payload, {
//     // headers: {
//     //     Authorization: idToken,
//     // },
//   });
// export const deletePolitic = (payload) =>
//   axios.post(`${config.host}/droitAcces/delete`, payload, {
//     // headers: {
//     //     Authorization: idToken,
//     // },
//   });
