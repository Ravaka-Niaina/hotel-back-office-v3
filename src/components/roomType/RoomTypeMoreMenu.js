import PropTypes from "prop-types"

// material
import { Stack} from '@mui/material';
// component

import ModifyRoomTypeDialog from './ModifyRoomTypeDialog';
import DeleteRoomTypeDialog from './DeleteRoomTypeDialog';

// ----------------------------------------------------------------------

export default function RoomTypeMoreMenu({ row, reload, }) {
  return (
    <>
      <Stack direction='row' spacing={2} justifyContent='center'>
          <ModifyRoomTypeDialog row={row} />
          <DeleteRoomTypeDialog row={row} reload={reload} />
      </Stack>
    </>
  );
}
RoomTypeMoreMenu.propTypes = {
  row: PropTypes.any
}
