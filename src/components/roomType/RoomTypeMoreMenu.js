import PropTypes from "prop-types"

// material
import { Stack} from '@mui/material';
// component

import ModifyRoomTypeDialog from './ModifyRoomTypeDialog';
import DeleteRoomTypeDialog from './DeleteRoomTypeDialog';

// ----------------------------------------------------------------------

export default function RoomTypeMoreMenu({ row }) {
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
