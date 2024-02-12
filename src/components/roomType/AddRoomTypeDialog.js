import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import RoomTypeForm from "./RoomTypeForm";
import CustomizedButton from '../CustomizedComponents/CustomizedButton';

const AddRoomTypeDialog = ({ reload, }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <CustomizedButton 
        onClick={handleClickOpen}
        text={`Ajouter`} component={RouterLink}
        to="#" 
      />
      <RoomTypeForm 
        reload={reload}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default AddRoomTypeDialog;
