import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { ThemeContext } from '../context/Wrapper';
import {
  getUserDetails,
  checkAuthWithRole,
  getPayloadFromToken,
  getToken,
  getUserDetailsById,
} from '../../services/User';
/**
 * @file Protected
 * @description A component that will wrap components that should be protected
 */
const Protected = ({ child, allowedRoles }) => {
  /**
   * @context
   * @description The context from the ThemeContext
   */
  const context = useContext(ThemeContext);

  /**
   * @state
   * @description The state of the child component to display
   * */
  const [childComponent, setChildComponent] = useState(null);

  /**
   * @hook
   * @description useNavigate hook
   */
  const navigate = useNavigate();

  /**
   * @state
   * @description Auth state */
  const [isAuth, setIsAuth] = useState(false);

  /**
   * @function redirectToLoginPage
   * @description A function to redirect to the login page
   * @returns {void}
   */
  const redirectToLoginPage = () => {
    setTimeout(() => {
      navigate('/login');
      context.showLoader(false);
    }, 100);
  };

  /**
   * @useEffect
   * @description An useEffect that triggers everytime we load protected pages
   */
  useEffect(() => {
    try{
      const token = getToken();
      const payloadFromToken = getPayloadFromToken(jwtDecode, token);
      if (!payloadFromToken) redirectToLoginPage();
      const userDetails = context.getUserDetails();
      userDetails.then((results) => {
        // the attributedAccessRights from the payload
        if(results.data.status === 200){
          const attributedAccessRights = results.data?.atribAR;
          // only getting the id field from the arrays of the payload and storing it inside an array
          const accessRightsIds = attributedAccessRights.map((accessRight) => accessRight?._id);
          // checking if the user has the right access (returns true or false)
          const checkAuth = checkAuthWithRole(accessRightsIds, allowedRoles);
          // Redirect to login page if the user doesn't have permissions
          if (!checkAuth) redirectToLoginPage();
          setIsAuth(checkAuth);
        }
        else if(results.data.errors){
          const item = Object.keys(results.data.errors).filter((e, i) => i === 0)[0];
          const indication = results.data.errors[item];
          const message = `${item}: ${indication}`;
          context.showLoader(false);
          context.changeResultErrorMessage(message);
          context.showResultError(true);
        }
        else if (results.data.message) {
          context.showLoader(false);
          context.changeResultErrorMessage(results.data.message);
          context.showResultError(true);
        }
        else{
          context.showLoader(false);
          context.changeResultErrorMessage(`Une erreur est survenue, Veuillez contacter l'administrateur.`);
          context.showResultError(true);
        }
      })
      .catch((e)=>{
        context.showLoader(false);
        context.changeResultErrorMessage(e.message);
        context.showResultError(true);
      })
      setChildComponent(child);
    }
    catch(e){
      context.showLoader(false);
      context.changeResultErrorMessage(e.message);
      context.showResultError(true);
    }
    
  }, [allowedRoles, child]);

  /**
   * @useEffect
   * @description An useEffect to show loader if the user isn't verified yet
   */
  useEffect(() => {
    if (!isAuth) return context.showLoader(true);
    return context.showLoader(false);
  }, [isAuth]);
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
