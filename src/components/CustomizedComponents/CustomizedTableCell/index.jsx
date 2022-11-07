import { styled } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import PropTypes from 'prop-types';

const TCStyled = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#191E25',
    color: '#DDE2EA',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const TableCellStyled = ({ children }) => <TCStyled>{children}</TCStyled>;
TableCellStyled.propTypes = {
  children: PropTypes.any,
};
export default TableCellStyled;
