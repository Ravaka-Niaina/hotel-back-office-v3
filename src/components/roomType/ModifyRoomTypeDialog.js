import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomizedIconButton from '../CustomizedComponents/CustomizedIconButton';

import Iconify from '../Iconify';
import RoomTypeForm from './RoomTypeForm';

// Nesoriko leh prop row (Cedric)
const ModifyRoomTypeDialog = ({ row, reload, }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <CustomizedIconButton 
        variant="contained" 
        onClick={handleClickOpen}
      >
        <Iconify 
          icon="eva:edit-fill" 
          width={20} 
          height={20} 
          color="rgba(140, 159, 177, 1)" 
        />
      </CustomizedIconButton>
      <RoomTypeForm 
        open={open}
        setOpen={setOpen}
        roomTypeId={row._id}
        isUpdate
        reload={reload}
      />
    </>
  );
};

export default ModifyRoomTypeDialog;
