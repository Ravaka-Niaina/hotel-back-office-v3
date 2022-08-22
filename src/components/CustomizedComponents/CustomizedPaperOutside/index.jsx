import { Paper } from "@mui/material";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {shadowOutside,cardRadius,linearBorderOutside} from '../NeumorphismTheme';

const StyledPaperOutside=styled(Paper)({
    ...shadowOutside,
    ...cardRadius,
    ...linearBorderOutside
});

const CustomizedPaperOutside = (props) => {
    return (
        <StyledPaperOutside {...props}> 
            {props.children}
        </StyledPaperOutside>
    );
 }

CustomizedPaperOutside.propTypes={
    children:PropTypes.any,
}
export default CustomizedPaperOutside;