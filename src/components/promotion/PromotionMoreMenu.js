import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// material
import { Menu, MenuItem, IconButton, ListItemIcon } from '@mui/material';
// component
import Iconify from '../Iconify';
import ModifyPromotionDialog from './ModifyPromotionDialog';
import DeletePromotionDialog from './DeletePromotionDialog';

// ----------------------------------------------------------------------

export default function PromotionMoreMenu({ row, reload }) {
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
          <DeletePromotionDialog promotionId={row._id} reload={reload} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ModifyPromotionDialog row={row} reload={reload} />
        </MenuItem>
      </Menu>
    </>
  );
}
PromotionMoreMenu.propTypes = {
  row: PropTypes.any,
  reload: PropTypes.func,
}
