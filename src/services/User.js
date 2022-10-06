import axios from 'axios';
import config from '../config/api';
/**
 * @file
 * @description The user service file
 */
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
export const verifyToken = (token) => axios.get(`${config.host}/verify_token`, {
    headers: {
      Authorization: token,
    },
  });
export const resendCode = (payload) =>
  axios.post(`${config.host}/user/login/resendVerificationCode`, payload, {
    /* headers: {
            Authorization: token,
        }, */
  });
/**
 * @function register
 */
export const register = (payload) =>
  axios.post(`${config.host}/user/register`, payload, {
    /* headers: {
            Authorization: token,
        }, */
  });
export const getUserList = (payload, idToken) =>
  axios.post(`${config.host}/user/list`, payload, {
    headers: {
      Authorization: idToken,
    },
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
   axios.post(`${config.host}/user/addAccessRight`, payload, {
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
export const getUserDetailsById = async (id) => {
  console.log(id);
  const userDetails = await getUserDetails(id);
  return userDetails;
};
