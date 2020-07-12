import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { fetchCountryInfo } from '../../api';

import styles from './DataTable.module.css';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: '#fff',
    color: '#212529',
    fontSize: 14,
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    textAlign: 'center',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:first-child': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const DataTable = () => {
  const [countryDataRows, setCountryDataRows] = useState([]);

  useEffect(() => {
    const fetchedCountryInfo = async () => {
      const countryData = await fetchCountryInfo();
      setCountryDataRows(countryData);
    };

    fetchedCountryInfo();
  }, []);

  return (
    <Paper variant='outlined'>
      <TableContainer>
        <Table className={styles.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell className={styles.tableCells}>#</StyledTableCell>
              <StyledTableCell className={styles.tableCells}>
                Country
              </StyledTableCell>
              <StyledTableCell className={styles.tableCells}>
                Cases
              </StyledTableCell>
              <StyledTableCell className={styles.tableCells}>
                Deaths
              </StyledTableCell>
              <StyledTableCell className={styles.tableCells}>
                Critical
              </StyledTableCell>
              <StyledTableCell className={styles.tableCells}>
                Recovered
              </StyledTableCell>
              <StyledTableCell className={styles.tableCells}>
                Today&apos;s Cases
              </StyledTableCell>
              <StyledTableCell className={styles.tableCells}>
                Today&apos;s Deaths
              </StyledTableCell>
              <StyledTableCell className={styles.tableCells}>
                Cases Per 1M
              </StyledTableCell>
              <StyledTableCell className={styles.tableCells}>
                Deaths Per 1M
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {countryDataRows.map((row, index) => (
              <StyledTableRow key={row.country}>
                <StyledTableCell
                  className={styles.tableCells}
                  component='th'
                  scope='row'
                >
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell className={styles.tableCells}>
                  {row.country}
                </StyledTableCell>
                <StyledTableCell className={styles.tableCells}>
                  {row.cases}
                </StyledTableCell>
                <StyledTableCell className={styles.tableCells}>
                  {row.deaths}
                </StyledTableCell>
                <StyledTableCell className={styles.tableCells}>
                  {row.critical}
                </StyledTableCell>
                <StyledTableCell className={styles.tableCells}>
                  {row.recovered}
                </StyledTableCell>
                <StyledTableCell className={styles.tableCells}>
                  {row.todayCases}
                </StyledTableCell>
                <StyledTableCell className={styles.tableCells}>
                  {row.todayDeaths}
                </StyledTableCell>
                <StyledTableCell className={styles.tableCells}>
                  {row.casesPerOneMillion}
                </StyledTableCell>
                <StyledTableCell className={styles.tableCells}>
                  {row.deathsPerOneMillion}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;
