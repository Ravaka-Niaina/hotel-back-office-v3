import React from 'react';
import { Stack, Checkbox } from '@mui/material';
import AccessibleIcon from '@mui/icons-material/Accessible';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import styles from './Equipments.module.css';

const matchedIcons = [];
const Equipments = ({ equipments, setEquipments }) => {
  const getMatchedIcon = (tag) => {
    const matchings = {
      accessible: <AccessibleIcon />,
      connected_tv: <ConnectedTvIcon />,
      wifi: <WifiIcon />,
      local_parking: <LocalParkingIcon />,
    };

    return matchings[tag];
  };

  const switchCheckboxEquipment = (indexEquipment => {
    const equipmentsTemp = [ ...equipments ];
    equipmentsTemp[indexEquipment].checked = 
    !equipmentsTemp[indexEquipment].checked;
    setEquipments(equipmentsTemp);
  }) 

  return(
    <>
      <h4>Equipements</h4>
      <Stack>
        <table className={styles.equipments}>
          {
            equipments.map((equipment, i) => (
              <tr key={equipment._id}>
                <td><Checkbox checked={equipment.checked} onChange={() => switchCheckboxEquipment(i)} /></td>
                <td>{ getMatchedIcon(equipment.tag) }</td>
                <td>{equipment.label}</td>
              </tr>
            ))
          }
        </table>
      </Stack>
    </>
  );
};

export default Equipments;