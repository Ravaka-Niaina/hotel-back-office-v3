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
    headers: {
      Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyX2lkIjoiNjI4NWRmNjNiM2JmMWEwOTI3MzVhOGIxIiwicGFydG5lcl9uYW1lIjoiQWRyd2FyZSIsInBhcnRuZXJfZmlyc3RfbmFtZSI6IkRldiIsInBhcnRuZXJfcGhvbmUiOiIwMzQ3NDI4ODA2IiwiaWF0IjoxNjYwMDI2OTMxLCJleHAiOjE2NjAwMzQxMzF9.0UGEGsr3h-W1FO5zdt6XUI16_AB_dNUGadFlJj-rZg4",
    },
  });

export const deletePolitic = (payload) =>
  axios.post(`${config.host}/politique/suppression`, payload, {
    headers: {
      // Authorization: idToken,
    }
  })

export const modifyPolitic = (payload, idPolitic) =>
  axios.post(`${config.host}/politique/updateP/${idPolitic}`, payload, {
    headers: {
      // Authorization: idToken,
    }
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
