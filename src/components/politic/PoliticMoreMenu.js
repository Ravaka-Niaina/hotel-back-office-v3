import PropTypes from 'prop-types';
// material
import { Stack } from '@mui/material';
// component

import ModifyPoliticDialog from './ModifyPoliticDialog';
import DeletePoliticDialog from './DeletePoliticDialog';

// ----------------------------------------------------------------------

export default function PoliticMoreMenu({ reload, accessRight }) {
  return (
    <>
      <Stack direction='row' spacing={2}>
        <ModifyPoliticDialog reload={reload}/>
        <DeletePoliticDialog reload={reload} />
      </Stack>
    </>
  );
}

PoliticMoreMenu.propTypes = {
  reload: PropTypes.any,
  accessRight: PropTypes.any,
};
