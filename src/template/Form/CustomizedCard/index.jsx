import { Card } from '@mui/material';
import PropTypes from 'prop-types';

const CustomizedCard = ({ children }) => (
  <Card
    sx={{
      border: '1px white solid',
      backgroundColor: '#E3EDF7',
      color: 'white',
      padding: 5,
      boxShadow: 'inset 4px 4px 14px rgba(197, 215, 238, 1) ,inset -4px -4px 9px rgba(255, 255, 255, 0.6)',
    }}
  >
    {children}
  </Card>
);
CustomizedCard.propTypes = {
  children: PropTypes.any,
};
export default CustomizedCard;
