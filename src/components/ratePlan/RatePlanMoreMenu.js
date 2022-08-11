import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// material
import { Menu, MenuItem, IconButton, ListItemIcon } from '@mui/material';
// component
import Iconify from '../Iconify';
import ModifyRatePlanDialog from './ModifyRatePlanDialog';
import DeleteRatePlanDialog from './DeleteRatePlanDialog';

const RatePlanMoreMenu = ({ reload, ratePlanId }) => {
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
          <DeleteRatePlanDialog reload={reload} ratePlanId={ratePlanId} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ModifyRatePlanDialog reload={reload} ratePlanId={ratePlanId} />
        </MenuItem>
      </Menu>
    </>
  );
};
RatePlanMoreMenu.propTypes = {
  reload: PropTypes.any,
  ratePlanId: PropTypes.any,
};
export default RatePlanMoreMenu;
