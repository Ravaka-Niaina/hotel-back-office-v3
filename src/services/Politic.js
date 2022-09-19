import axios from 'axios';
import config from '../config/api';

export const getPolitics = (payload, idToken) =>
  axios.post(`${config.host}/politique/list`, payload, {
    headers: {
      Authorization: idToken,
    },
  });
export const createPolitic = (payload, idToken) =>
  axios.post(`${config.host}/politique/insertionPolitique`, payload, {
    headers: {
      Authorization: idToken,
    },
  });

export const deletePolitic = (payload) =>
  axios.post(`${config.host}/politique/suppression`, payload, {
    headers: {
      // Authorization: idToken,
    }
  })

export const modifyPolitic = (payload, idPolitic, idToken) =>
  axios.post(`${config.host}/politique/updateP/${idPolitic}`, payload, {
    headers: {
        Authorization: idToken,
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
