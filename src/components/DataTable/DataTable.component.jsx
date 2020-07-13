import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core';
import { fetchCountryInfo } from '../../api';

import DataTableHead from '../Tablehead/TableHead.component.jsx';
import styles from './DataTable.module.css';

const StyledTableCell = withStyles(() => ({
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
          <DataTableHead />

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
