import React, { memo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

import columns from './TableColumns';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: '#fff',
    color: '#212529',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 600,
  },
}))(TableCell);
console.log('thead renderd');
const DataTableHead = () => {
  return (
    <Paper component={TableHead}>
      <TableRow>
        {columns.map((column) => (
          <StyledTableCell className='tableCells' key={column.id}>
            {column.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </Paper>
  );
};

export default memo(DataTableHead);
