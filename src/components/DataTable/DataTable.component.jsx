import React, { useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  Paper,
  TablePagination,
} from '@material-ui/core';
import { fetchCountryInfo } from '../../api';

import DataTableHead from '../Tablehead/TableHead.component.jsx';
import DataTableBody from '../TableBody/TableBody.component.jsx';
import FilterField from '../FilterField/FilterField.component.jsx';
import styles from './DataTable.module.css';

const DataTable = () => {
  const [countryDataRows, setCountryDataRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchedCountryInfo = async () => {
      const countryData = await fetchCountryInfo();
      setCountryDataRows(countryData);
    };

    fetchedCountryInfo();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFieldChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredCountryDataRows = countryDataRows.filter((row) => {
    return row.country.toLowerCase().includes(filter);
  });

  return (
    <div className='dataTableContainer'>
      <FilterField handleChange={handleFieldChange} />

      <Paper variant='outlined'>
        <TableContainer>
          <Table className={styles.table} aria-label='customized table'>
            <DataTableHead />
            <DataTableBody
              countryDataRows={filteredCountryDataRows}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component='div'
          count={filteredCountryDataRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default DataTable;
