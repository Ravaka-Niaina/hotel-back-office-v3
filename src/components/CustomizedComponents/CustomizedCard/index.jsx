import { Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {shadowInset,cardRadius,linearBorderOutside} from '../NeumorphismTheme';

const StyledPaperInset = styled(Paper)({
  ...shadowInset,
  ...cardRadius,
});
const CustomizedCard = (props) => (
  <StyledPaperInset
    {...props}
  >
    {props.children}
  </StyledPaperInset>
);
CustomizedCard.propTypes = {
  
};
export default CustomizedCard;
