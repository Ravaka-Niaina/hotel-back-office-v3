import axios from 'axios';
import config from '../config/api';

export const getPolitics = (payload) =>
  axios.post(`${config.host}/politique/list`, payload, {
    timeout: 10000,
    headers: {
      Authorization: localStorage.getItem("id_token"),
      hotelid: localStorage.getItem('hotelid'),
    },
  });
export const createPolitic = (payload) =>
  axios.post(`${config.host}/politique/insertionPolitique`, payload, {
    timeout: 10000,
    headers: {
      Authorization: localStorage.getItem("id_token"),
      hotelid: localStorage.getItem('hotelid'),
    },
  });

export const deletePolitic = (payload) =>
  axios.post(`${config.host}/politique/suppression`, payload, {
    timeout: 10000,
    headers: {
      // Authorization: idToken,
    }
  })

export const modifyPolitic = (payload, idPolitic) =>
  axios.post(`${config.host}/politique/updateP/${idPolitic}`, payload, {
    timeout: 10000,
    headers: {
      Authorization: localStorage.getItem("id_token"),
      hotelid: localStorage.getItem('hotelid'),
    },
})
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
