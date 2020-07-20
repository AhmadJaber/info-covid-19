import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableBody, TableCell, TableRow } from '@material-ui/core';

import styles from '../DataTable/DataTable.module.css';

const StyledTableCell = withStyles(() => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:first-child': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// TODO: Refractor code line 25
const DataTableBody = ({ countryDataRows, page, rowsPerPage }) => {
  return (
    <TableBody>
      {countryDataRows.length !== 0
        ? countryDataRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <StyledTableRow key={row.country}>
                <StyledTableCell align='center' className={styles.tableCells}>
                  {row.countrySerial}
                </StyledTableCell>
                <StyledTableCell align='left' className={styles.tableCells}>
                  <div className={styles.countryCell}>
                    <img
                      src={row.countryFlag}
                      alt='flag'
                      className={styles.flag}
                    />
                    {row.country}
                  </div>
                </StyledTableCell>
                <StyledTableCell align='center' className={styles.tableCells}>
                  {row.cases.toLocaleString('en-US')}
                </StyledTableCell>
                <StyledTableCell align='center' className={styles.tableCells}>
                  {row.deaths.toLocaleString('en-US')}
                </StyledTableCell>
                <StyledTableCell align='center' className={styles.tableCells}>
                  {row.critical.toLocaleString('en-US')}
                </StyledTableCell>
                <StyledTableCell align='center' className={styles.tableCells}>
                  {row.recovered.toLocaleString('en-US')}
                </StyledTableCell>
                <StyledTableCell align='center' className={styles.tableCells}>
                  {row.todayCases.toLocaleString('en-US')}
                </StyledTableCell>
                <StyledTableCell align='center' className={styles.tableCells}>
                  {row.todayDeaths.toLocaleString('en-US')}
                </StyledTableCell>
                <StyledTableCell align='center' className={styles.tableCells}>
                  {row.casesPerOneMillion.toLocaleString('en-US')}
                </StyledTableCell>
                <StyledTableCell align='center' className={styles.tableCells}>
                  {row.deathsPerOneMillion.toLocaleString('en-US')}
                </StyledTableCell>
              </StyledTableRow>
            ))
        : null}
    </TableBody>
  );
};

export default DataTableBody;
