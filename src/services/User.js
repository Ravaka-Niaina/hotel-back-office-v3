import axios from 'axios';
import config from '../config/api';
/**
 * @file
 * @description The user service file
 */
export const login = (payload) =>
  axios.post(`${config.host}/user/login`, payload, {
    timeout: 10000,
    /* headers: {
            Authorization: token,
        }, */
  });

export const verifyCode = (payload) =>
  axios.post(`${config.host}/user/login/verifyCode`, payload, {
    timeout: 10000,
    /* headers: {
            Authorization: token,
        }, */
  });

export const sendEmailUpdateAccountPassword = (payload) =>
  axios.post(`${config.host}/user/sendEmailUpdateCompte`, payload, {
    timeout: 10000,
    /* headers: {
            Authorization: token,
        }, */
  });

export const updatePassword = (payload) =>
  axios.post(`${config.host}/user/updatePassword`, payload, {
    timeout: 10000,
    /* headers: {
            Authorization: token,
        }, */
  });

export const verifyCodeResetPassword = (payload) =>
  axios.post(`${config.host}/user/verifyPartnerPasswordResetCode`, payload, {
    timeout: 10000,
    /* headers: {
            Authorization: token,
        }, */
  });

export const verifyToken = (token) => axios.get(`${config.host}/verify_token`, {
    timeout: 10000,
    headers: {
      Authorization: token,
    },
  });
export const resendCode = (payload) =>
  axios.post(`${config.host}/user/login/resendVerificationCode`, payload, {
    timeout: 10000,
    /* headers: {
            Authorization: token,
        }, */
  });
/**
 * @function register
 */
export const register = (payload) =>
  axios.post(`${config.host}/user/register`, payload, {
    timeout: 10000,
    headers: {
      ispartner: true,
      Authorization: localStorage.getItem('id_token'),
      hotel_id: localStorage.getItem('hotel_id'),
    },
  });
export const getUserList = (payload) =>
  axios.post(`${config.host}/user/list`, payload, {
    timeout: 10000,
    headers: {
      Authorization: localStorage.getItem("id_token"),
      hotel_id: localStorage.getItem('hotel_id'),
    },
  });
export const getUserDetails = (id,idToken) =>
  axios.get(`${config.host}/user/details/${id}`, {
    timeout: 10000,
    headers: {
      ispartner: true,
      Authorization: idToken,
    },
  });
export const updateUser = (payload) =>
  axios.post(`${config.host}/user/update`, payload, {
    timeout: 10000,
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
   axios.post(`${config.host}/user/addAccessRight`, payload, {
     timeout: 10000,
    /* headers: {
            Authorization: token,
        }, */
  });
};

/**
 * @function checkAuthWithRole
 * @description A function that will determine if the user has the required roles or not
 * @param {array} roles Array of roles or permissions of the user (ex:['admin','superAdmin'])
 * @param {array} allowed Array of allowed roles or permissions required to see the page
 * @returns {boolean} True if the requirements are fullfilled , otherwise false
 */
export const checkAuthWithRole = (roles, allowed) => {
  const isAllowed = allowed.some((allowedRole) => roles.some((userRole) => allowedRole === userRole));
  if (allowed[0] === '*') return true;
  return isAllowed;
};

/**
 * @function getToken
 * @description A function that will get the token of the connected user
 * @returns {string} A token
 */
export const getToken = () => localStorage.getItem('id_token') || '';

/**
 * @function getPayloadFromToken
 * @description A function to get the payload from the token
 * @param {string} token The token of the user to get the payload from
 * @returns {object} The payload from the jwt token
 */
export const getPayloadFromToken = (jwtDecode, token) => {
  try {
    const payload = jwtDecode(token);
    return payload;
  } catch (err) {
    return null;
  }
};

/**
 * @function getUserDetailsById
 * @description A function to get the details of an user by his id using an external api
 * @param {string} id The id of an user (generally we get it from the payload)
 * @returns {object} The payload of the user
 */
export const getUserDetailsById = async (id,idToken) => {
  const userDetails = await getUserDetails(id,idToken);
  return userDetails;
};
