import { DialogTitle, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import CustomizedTitle from '../CustomizedTitle';

const CustomizedDialogTitle = (props) => (
  <DialogTitle
    sx={{
      background: `linear-gradient(270deg, #33647E 0%, #59A2BE 100%);`,
      pt:4,
      pb:4,
      textAlign:'center',
    }}
  >
    <Typography variant="h4" component="div" gutterBottom>
      <CustomizedTitle text={props.text} />
    </Typography>
  </DialogTitle>
);
CustomizedDialogTitle.propTypes = {
  text: PropTypes.any,
};
export default CustomizedDialogTitle;
