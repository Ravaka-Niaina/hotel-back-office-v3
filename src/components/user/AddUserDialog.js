
// import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';

import Iconify from '../Iconify';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';


const AddUserDialog = () => (
    <>
      <CustomizedButton text={`Ajouter`} />
    </>
  );

AddUserDialog.propTypes = {
};
export default AddUserDialog;
