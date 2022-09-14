import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { getUserDetails } from '../../services/User';
/**
 * @file Protected
 * @description A component that will wrap components that should be protected
 */
const Protected = ({ child, allowedRoles }) => {
  /** @state The state of the child component to display */
  const [childComponent, setChildComponent] = useState(null);

  /** @hook useNavigate hook */
  const navigate = useNavigate();

  /** @state Auth state */
  const [isAuth, setIsAuth] = useState(false);

  /**
   * @function checkAuthWithRole
   * @description A function that will determine if the user has the required roles or not
   * @param {array} roles Array of roles or permissions of the user (ex:['admin','superAdmin'])
   * @param {array} allowed Array of allowed roles or permissions required to see the page
   * @returns {boolean} True if the requirements are fullfilled , otherwise false
   */
  const checkAuthWithRole = (roles, allowed) => {
    const isAllowed = allowed.some((allowedRole) => roles.some((userRole) => allowedRole === userRole));
    return isAllowed;
  };

  /**
   * @function getPayloadFromToken
   * @description A function that will get the token of the connected user
   * @returns {string} A token
   */
  const getToken = () => localStorage.getItem('id_token') || '';

  /**
   * @function getPayloadFromToken
   * @description A function to get the payload from the token
   * @param {string} token The token of the user to get the payload from
   * @returns {object} The payload from the jwt token
   */
  const getPayloadFromToken = (token) => {
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
  const getUserDetailsById = async (id) => {
    const userDetails = await getUserDetails(id);
    return userDetails;
  };

  /**
   * @function redirectToLoginPage
   * @description A function to redirect to the login page
   * @returns {void}
   */
  const redirectToLoginPage = () => {
    navigate('/login');
  };

  /**
   * An useEffect that triggers everytime we load protected pages
   */
  useEffect(() => {
    const token = getToken();
    const payloadFromToken = getPayloadFromToken(token);
    if (!payloadFromToken) redirectToLoginPage();
    const partnerId = payloadFromToken?.partner_id;
    getUserDetailsById(partnerId).then((results) => {
      // the attributedAccessRights from the payload
      const attributedAccessRights = results.data?.atribAR;
      // only getting the id field from the arrays of the payload and storing it inside an array
      const accessRightsIds = attributedAccessRights.map((accessRight) => accessRight?._id);
      // checking if the user has the right access (returns true or false)
      const checkAuth = checkAuthWithRole(accessRightsIds, allowedRoles);
      if (!checkAuth) redirectToLoginPage();
      setIsAuth(checkAuth);
    });
    setChildComponent(child);
  }, [allowedRoles, child]);

  return (
    <>
      {isAuth ? (
        childComponent
      ) : (
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Please login first
        </div>
      )}
    </>
  );
};
Protected.propTypes = {
  child: PropTypes.any,
  allowedRoles: PropTypes.array,
};
export default Protected;
