import axios from 'axios';
import config from '../config/api';

export const login = (payload) =>
  axios.post(`${config.host}/user/login`, payload, {
    /* headers: {
            Authorization: token,
        }, */
  });

export const verifyCode = (payload) =>
  axios.post(`${config.host}/user/login/verifyCode`, payload, {
    /* headers: {
            Authorization: token,
        }, */
  });
export const verifyToken = (token) => {
  return axios.get(`${config.host}/verify_token`, {
    headers: {
      Authorization: token,
    },
  });
};
export const resendCode = (payload) =>
  axios.post(`${config.host}/user/login/resendVerificationCode`, payload, {
    /* headers: {
            Authorization: token,
        }, */
  });

export const register = (payload) =>
  axios.post(`${config.host}/user/register`, payload, {
    /* headers: {
            Authorization: token,
        }, */
  });
export const getUserList = (payload) =>
  axios.post(`${config.host}/user/list`, payload, {
    /* headers: {
            Authorization: token,
        }, */
  });
export const getUserDetails = (id) =>
  axios.get(`${config.host}/user/details/${id}`, {
    headers: {
      ispartner: true,
    },
  });
export const updateUser = (payload) =>
  axios.post(`${config.host}/user/update`, payload, {
    /* headers: {
            Authorization: token,
        }, */
  });

export const addAccessRight = (payload) => {
  /**
   * @payload (raw json body) {
   *  idUser: xxx,
   *  idDroitAccess : xxx
   * }
   */
  return axios.post(`${config.host}/user/addAccessRight`, payload, {
    /* headers: {
            Authorization: token,
        }, */
  })
}
