import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('partner_id');
    navigate('/login');
  };
  return (
    <MenuItem onClick={logout} sx={{ m: 1 }}>
      Logout
    </MenuItem>
  );
};
export default Logout;
