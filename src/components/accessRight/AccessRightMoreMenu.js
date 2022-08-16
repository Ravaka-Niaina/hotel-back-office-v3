import PropTypes from 'prop-types';
// material
import { Stack } from '@mui/material';
// component

import ModifyAccessRightDialog from './ModifyAccesRightDialog';
import DeleteAccessRightDialog from './DeleteAccessRightDialog';

// ----------------------------------------------------------------------

export default function AccessRightMoreMenu({ reload, accessRight }) {


  return (
    <>
      <Stack direction='row' spacing={2}>
        <ModifyAccessRightDialog reload={reload} accessRightProp={accessRight} />
        <DeleteAccessRightDialog reload={reload} accessRightId={accessRight._id} />
      </Stack>    
    </>
  );
}

AccessRightMoreMenu.propTypes = {
  reload: PropTypes.any,
  accessRight: PropTypes.any,
};
