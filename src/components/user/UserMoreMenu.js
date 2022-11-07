import PropTypes from 'prop-types';
// material
import { Stack} from '@mui/material';
// component

import DeleteUserDialog from './DeleteUserDialog';
import ModifyUserDialog from './ModifyUserDialog';

// ----------------------------------------------------------------------

const UserMoreMenu = ({userId, userDetails,reload, accessRights})  => (
    <>
      <Stack direction='row' spacing={2} justifyContent='center'>
        <ModifyUserDialog accessRights={accessRights} userDetails={userDetails} userId={userId} reload={reload} />
        <DeleteUserDialog />
      </Stack>
    </>
  )

UserMoreMenu.propTypes = {
  userDetails: PropTypes.any,
  userId:PropTypes.any,
  reload:PropTypes.any,
  accessRights: PropTypes.any
};
export default UserMoreMenu;
