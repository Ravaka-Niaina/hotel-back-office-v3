import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import './index.css';

const ButtonStyled = styled(Button)({
  height:'50px',
  textTransform:'Capitalize',
  background: `linear-gradient(270deg, #33647E 0%, #59A2BE 100%);`,
  boxShadow:
        ' -4px -4px 15px  #FFFFFF, 4px 4px 20px rgba(111, 140, 176, 0.41),2px 2px 4px rgba(114, 142, 171, 0.1)',
});

const CustomizedButton = (props) => (
  <ButtonStyled
    size="small"
    variant="contained"
    {
      ...props
    }

  >
    <p className='depth' title={props.text}
      style={{
        fontFamily:'RalewayExtraBold',
        fontWeight:800,
        fontSize:'18px',
        fontStyle:'normal',
        lineHeight: '20px',
        textAlign: 'center',
        letterSpacing: '-0.4px',
      }}
    >
      {props.text}
    </p>
  </ButtonStyled>
);

CustomizedButton.propTypes = {
  isFullWidth: PropTypes.bool,
  handleClick: PropTypes.func,
  text: PropTypes.any,
};

export default CustomizedButton;
