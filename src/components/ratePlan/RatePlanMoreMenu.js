import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// material
import { Button,Stack,Menu, MenuItem, IconButton, ListItemIcon } from '@mui/material';
// component

import ModifyRatePlanDialog from './ModifyRatePlanDialog';
import DeleteRatePlanDialog from './DeleteRatePlanDialog';
import RatePlanStatus from './RatePlanStatus';
import CustomizedSwitch from '../CustomizedComponents/CustomizedSwitch';


const RatePlanMoreMenu = ({ reload, ratePlanId,isActif }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Stack direction="row" spacing={2}>
          <DeleteRatePlanDialog reload={reload} ratePlanId={ratePlanId} />
          <ModifyRatePlanDialog reload={reload} ratePlanId={ratePlanId} />
          <RatePlanStatus reload={reload} ratePlanId={ratePlanId} isActif={isActif}/>
      </Stack>

    </>
  );
};
RatePlanMoreMenu.propTypes = {
  reload: PropTypes.any,
  ratePlanId: PropTypes.any,
  isActif: PropTypes.any,
};
export default RatePlanMoreMenu;
