import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('partner_id');
    localStorage.removeItem('id_token');
    localStorage.removeItem('hotel_id');
    localStorage.removeItem('user_attr');
    localStorage.removeItem('user_details');
    navigate('/login', {replace:true});
  };
  
  return (
    <Button
      variant="contained"
      onClick={logout}
      sx={{ backgroundColor: 'red',opacity:'0.8', '&:hover': { backgroundColor: 'red', opacity: 1 } }}
    >
      <Typography variant="subtitle2" sx={{ fontSize: 13 }}>
        Deconnexion
      </Typography>
    </Button>
  );
};
export default Logout;
