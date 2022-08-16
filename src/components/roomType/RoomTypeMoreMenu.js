import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from "prop-types"

// material
import { Stack} from '@mui/material';
// component

import ModifyRoomTypeDialog from './ModifyRoomTypeDialog';
import DeleteRoomTypeDialog from './DeleteRoomTypeDialog';

// ----------------------------------------------------------------------

export default function RoomTypeMoreMenu({ row }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Stack direction='row' spacing={2}>
          <ModifyRoomTypeDialog row={row} />
          <DeleteRoomTypeDialog row={row} />
      </Stack>
    </>
  );
}
RoomTypeMoreMenu.propTypes = {
  row: PropTypes.any
}
