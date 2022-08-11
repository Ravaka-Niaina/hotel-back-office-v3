import { TableCell, styled } from '@mui/material';
import PropTypes from 'prop-types';

const TCStyled = styled(TableCell)({
  color: '#7E7E7E',
});
const TableCellStyled = ({ children }) => <TCStyled>{children}</TCStyled>;
TableCellStyled.propTypes = {
  children: PropTypes.any,
};
export default TableCellStyled;
