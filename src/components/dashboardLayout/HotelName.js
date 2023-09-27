import { ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './HotelName.module.css';
import { ListItemStyle, ListItemIconStyle } from '../Sidebar/SidebarSection';
import Iconify from '../Iconify';

export default function HotelName () {
  const navigate = useNavigate();
  
  return(
    <ListItemStyle 
      className={styles.hotelName}
      onClick={() => navigate("/chooseHotelToManage")}
      sx={{textTransform: 'none'}}
    >
      <ListItemIconStyle>
        <Iconify 
          icon={'bxs:building-house'} 
          width={30}
          height={30}
        />
      </ListItemIconStyle>
      <ListItemText style={{marginLeft: '-8px'}} disableTypography primary={localStorage.getItem('hotelName')} />
    </ListItemStyle>
  );
}