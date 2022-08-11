import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// material
import { Menu, MenuItem, IconButton, ListItemIcon } from '@mui/material';
// component
import Iconify from '../Iconify';
import ModifyAccessRightDialog from './ModifyAccesRightDialog';
import DeleteAccessRightDialog from './DeleteAccessRightDialog';

// ----------------------------------------------------------------------

export default function AccessRightMoreMenu({ reload, accessRight }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <DeleteAccessRightDialog reload={reload} accessRightId={accessRight._id} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ModifyAccessRightDialog reload={reload} accessRightProp={accessRight} />
        </MenuItem>
      </Menu>
    </>
  );
}

AccessRightMoreMenu.propTypes = {
  reload: PropTypes.any,
  accessRight: PropTypes.any,
};
