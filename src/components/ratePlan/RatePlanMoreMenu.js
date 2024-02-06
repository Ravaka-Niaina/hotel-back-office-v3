import PropTypes from 'prop-types';
// material
import { Stack } from '@mui/material';
// component

import DeleteRatePlanDialog from './DeleteRatePlanDialog';
import RatePlanStatus from './RatePlanStatus';

const RatePlanMoreMenu = ({ reload, ratePlanId, isActif }) => (
  <>
    <Stack direction="row" spacing={2}>
      <DeleteRatePlanDialog reload={reload} ratePlanId={ratePlanId} />
      <RatePlanStatus reload={reload} ratePlanId={ratePlanId} isActif={isActif} />
    </Stack>
  </>
);
RatePlanMoreMenu.propTypes = {
  reload: PropTypes.any,
  ratePlanId: PropTypes.any,
  isActif: PropTypes.any,
};
export default RatePlanMoreMenu;
