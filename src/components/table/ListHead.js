import PropTypes from 'prop-types';
// material
import { Box, TableRow, TableCell, TableHead, TableSortLabel, styled } from '@mui/material';
import CustomizedCheckbox from '../CustomizedComponents/CustomizedCheckbox';
// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

UserListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function UserListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const TableCellStyled = styled(TableCell)({
    // color:'white'
  });

  return (
    <TableHead>
      <TableRow>
        <TableCellStyled padding="checkbox">
          <CustomizedCheckbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCellStyled>
        {headLabel.map((headCell) => (
          <TableCellStyled
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            {
            ...(headCell.alignCenter && { align: 'center' })
            }
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null}
            </TableSortLabel>
          </TableCellStyled>
        ))}
      </TableRow>
    </TableHead>
  );
}
