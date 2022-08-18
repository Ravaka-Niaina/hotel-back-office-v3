import PropTypes from 'prop-types';
// material
import { Stack} from '@mui/material';
// component

import DeleteUserDialog from './DeleteUserDialog';
import ModifyUserDialog from './ModifyUserDialog';

// ----------------------------------------------------------------------

const UserMoreMenu = ({userId,reload})  => (
    <>
      <Stack direction='row' spacing={2}>
        <ModifyUserDialog userId={userId} reload={reload} />
        <DeleteUserDialog />
      </Stack>
    </>
  )

UserMoreMenu.propTypes = {
  userId:PropTypes.any,
  reload:PropTypes.any,
};
export default UserMoreMenu;
