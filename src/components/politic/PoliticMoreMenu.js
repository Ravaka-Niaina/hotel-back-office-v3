import PropTypes from 'prop-types';
// material
import { Stack } from '@mui/material';
// component

import ModifyPoliticDialog from './ModifyPoliticDialog';
import DeletePoliticDialog from './DeletePoliticDialog';

// ----------------------------------------------------------------------

export default function PoliticMoreMenu({ reload, politic }) {
  return (
    <>
      <Stack direction='row' spacing={2} justifyContent='center'>
        <ModifyPoliticDialog reload={reload} politic={politic} />
        <DeletePoliticDialog reload={reload} politic={politic} />
      </Stack>
    </>
  );
}

PoliticMoreMenu.propTypes = {
  reload: PropTypes.any,
  politic: PropTypes.any,
};
