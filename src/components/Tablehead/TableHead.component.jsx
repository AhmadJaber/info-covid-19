import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

import columns from './TableColumns';
import styles from '../DataTable/DataTable.module.css';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: '#fff',
    color: '#212529',
    fontSize: 14,
    textAlign: 'center',
  },
}))(TableCell);

const DataTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <StyledTableCell className={styles.tableCells} key={column.id}>
            {column.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default DataTableHead;
