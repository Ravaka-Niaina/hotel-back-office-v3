import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

// material
import {Stack} from '@mui/material';
// component
import DeletePromotionDialog from './DeletePromotionDialog';

// ----------------------------------------------------------------------

export default function PromotionMoreMenu({ row, reload }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Stack direction='row' spacing={2}>
        <DeletePromotionDialog promotionId={row._id} reload={reload} />
      </Stack>
    </>
  );
}
PromotionMoreMenu.propTypes = {
  row: PropTypes.any,
  reload: PropTypes.func,
}
