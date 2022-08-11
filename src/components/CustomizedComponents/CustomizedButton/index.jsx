import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const ButtonStyled = styled(Button)({});

const CustomizedButton = (props) => (
  <ButtonStyled
    sx={{
      background: `linear-gradient(270deg, #33647E 0%, #59A2BE 100%);`,
      boxShadow:
        ' -4px -4px 15px  #FFFFFF, 4px 4px 20px rgba(111, 140, 176, 0.41),2px 2px 4px rgba(114, 142, 171, 0.1)',
    }}
    fullWidth={props.isFullWidth}
    size="large"
    variant="contained"
    onClick={props.handleClick}
  >
    <Typography
      sx={{
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {props.text}
    </Typography>
  </ButtonStyled>
);

CustomizedButton.propTypes = {
  isFullWidth: PropTypes.bool,
  handleClick: PropTypes.func,
  text: PropTypes.any,
};

export default CustomizedButton;
