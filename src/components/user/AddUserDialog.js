
// import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';

import Iconify from '../Iconify';


const AddUserDialog = () => (
    <>
      <Button
        variant="contained"
        component={RouterLink}
        to="/register"
        startIcon={<Iconify icon="eva:plus-fill" />}
        sx={{
          background: `linear-gradient(270deg, #33647E 0%, #59A2BE 100%);`,
          boxShadow:
            ' -4px -4px 15px  #FFFFFF, 4px 4px 20px rgba(111, 140, 176, 0.41),2px 2px 4px rgba(114, 142, 171, 0.1)',
          fontSize: 12,
          px: 5,
          py: 1,
        }}
      >
        Ajouter
      </Button>
      
    </>
  );

AddUserDialog.propTypes = {
};
export default AddUserDialog;
