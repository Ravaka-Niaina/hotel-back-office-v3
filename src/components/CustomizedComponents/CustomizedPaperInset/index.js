import { Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { shadowInset, linearBorderInset,lightBackgroundToTop, } from '../NeumorphismTheme';

const StyledPaperInset = styled(Paper)({
    ...shadowInset,
    ...linearBorderInset,
    ...lightBackgroundToTop,
    borderRadius:'8px',
});

const CustomizedPaperInset = (props) => <StyledPaperInset {...props}>{props.children}</StyledPaperInset>;
CustomizedPaperInset.propTypes = {
    children: PropTypes.any,
};
export default CustomizedPaperInset;
