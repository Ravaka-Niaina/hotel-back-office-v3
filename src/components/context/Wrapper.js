import React, { useState, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import SimpleBackdrop from '../backdrop/Backdrop';
import Message from '../snackbar/Message';
import { getPayloadFromToken, getUserDetailsById } from '../../services/User';

export const ThemeContext = createContext({
  showLoader: null,
  showError: null,
  showResultError: null,
  changeResultErrorMessage: null,
  showResultSuccess: null,
  changeResultSuccessMessage: null,
  getIdToken: null,
  getUserDetails: null,
});

const Wrapper = ({ children }) => {
  const [partialLoading, setPartialLoading] = useState({ loading: false, identifier: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [disable, setDisable] = useState(false);

  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const [openAlertError, setOpenAlertError] = React.useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = React.useState(false);

  /**
   * @function getIdToken
   * @description A function to get the token of the current user
   * @returns A jwt token
   */
  const getIdToken = () => {
    const token = localStorage.getItem('id_token') || '';
    return token;
  }
    

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const showLoader = (show) => {
    setDisable(show);
  };

  const showResultError = (show) => {
    setOpenAlertError(show);
  };
  const changeResultErrorMessage = (message = `Erreur inattendue, contactez votre administrateur pour plus d'informations`) => {
    setErrorMessage(message);
  };
  const showResultSuccess = (show) => {
    setOpenAlertSuccess(show);
  };
  const changeResultSuccessMessage = (message) => {
    setSuccessMessage(message);
  };
  const handleCloseAlertError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertError(false);
  };
  const handleCloseAlertSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertSuccess(false);
  };


  

  const getUserDetails = async () => {
    const savedUserDetails = localStorage.getItem("user_details");
    if(savedUserDetails !== null)
    {
      return new Promise((resolve, reject) => {
          resolve(JSON.parse(savedUserDetails));
      });
    }
    const payloadFromToken = getPayloadFromToken(jwtDecode, getIdToken());
    const partnerId = payloadFromToken?.partner_id;
    const details = getUserDetailsById(partnerId, getIdToken());
    const userDetails = await details;
    return userDetails
  };

  return (
    <ThemeContext.Provider
      value={{
        partialLoading,
        setPartialLoading,
        showLoader,
        showResultError,
        changeResultErrorMessage,
        showResultSuccess,
        changeResultSuccessMessage,
        getIdToken,
        getUserDetails,
      }}
    >
      <SimpleBackdrop open={disable} />
      <Message
        vertical="top"
        horizontal="center"
        message={'An error occurred on the server when processing the URL. Please contact the system administrator'}
        autoHideDuration={2000}
        severity="error"
        handleClose={handleCloseSnackBar}
        open={openSnackBar}
      />

      <Message
        vertical="top"
        horizontal="center"
        message={errorMessage}
        autoHideDuration={5000}
        severity="error"
        handleClose={handleCloseAlertError}
        open={openAlertError}
      />
      <Message
        vertical="top"
        horizontal="center"
        message={successMessage}
        autoHideDuration={7000}
        severity="success"
        handleClose={handleCloseAlertSuccess}
        open={openAlertSuccess}
      />

      {children}
    </ThemeContext.Provider>
  );
};

Wrapper.propTypes = {
  children: PropTypes.any,
};

export default Wrapper;
