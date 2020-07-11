import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const DataTable = () => {
  const classes = useStyles();
  const [countryDataRows, setCountryDataRows] = useState([]);

  useEffect(() => {
    const fetchedCountryInfo = async () => {
      const countryData = await fetchCountryInfo();
      setCountryDataRows(countryData);
    };

    fetchedCountryInfo();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Country</StyledTableCell>
            <StyledTableCell>Cases</StyledTableCell>
            <StyledTableCell>Deaths</StyledTableCell>
            <StyledTableCell>Critical</StyledTableCell>
            <StyledTableCell>Recovered</StyledTableCell>
            <StyledTableCell>Today's Cases</StyledTableCell>
            <StyledTableCell>Today's Deaths</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countryDataRows.map((row, index) => (
            <StyledTableRow key={row.country}>
              <StyledTableCell component='th' scope='row'>
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.country}</StyledTableCell>
              <StyledTableCell align='right'>{row.cases}</StyledTableCell>
              <StyledTableCell align='right'>{row.deaths}</StyledTableCell>
              <StyledTableCell align='right'>{row.critical}</StyledTableCell>
              <StyledTableCell align='right'>{row.recovered}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
