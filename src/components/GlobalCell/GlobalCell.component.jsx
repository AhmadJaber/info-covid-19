import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableCell, TableRow } from '@material-ui/core';

import HomeContext from '../../context/HomeContext';
import { isCasesDeathsGreaterThanZero } from '../DataTable/DataTable.utils';
import styles from '../DataTable/DataTable.module.css';

const StyledTableCell = withStyles(() => ({
  body: {
    fontSize: 14,
    fontWeight: 500,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:first-child': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const style = {
  countryCell: {
    display: 'flex',
    alignItems: 'center',
  },
  flag: {
    width: '1.5rem',
    borderRadius: '2px',
    marginRight: '0.5em',
  },
  todayCasesStyle: {
    backgroundColor: '#ffeeaa',
    fontWeight: 600,
  },
  todayDeathsStyle: {
    backgroundColor: '#e53935',
    color: '#fff',
    fontWeight: 600,
  },
  emojiDiv: {
    height: '1.35rem',
  },
};

const GlobalCell = ({ classes }) => {
  const { globalContextData: row } = useContext(HomeContext);

  return (
    <React.Fragment>
      {row.cases ? (
        <StyledTableRow key={row.country}>
          <StyledTableCell
            align='center'
            className={styles.tableCells}
          ></StyledTableCell>
          <StyledTableCell align='left' className={styles.tableCells}>
            <div className={classes.countryCell}>
              <div className={classes.emojiDiv}>
                <span
                  style={{
                    fontSize: '18px',
                    marginRight: '.5em',
                    display: 'inline',
                  }}
                  role='img'
                  aria-label='emoji'
                >
                  🌎
                </span>
              </div>
              <div>Global</div>
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
          <StyledTableCell
            align='center'
            className={`${styles.tableCells} ${
              row.todayCases > 0 ? classes.todayCasesStyle : ''
            }`}
          >
            {isCasesDeathsGreaterThanZero(row.todayCases) ? '+' : ''}
            {row.todayCases.toLocaleString('en-US')}
          </StyledTableCell>
          <StyledTableCell
            align='center'
            className={`${styles.tableCells} ${
              row.todayDeaths > 0 ? classes.todayDeathsStyle : ''
            }`}
          >
            {isCasesDeathsGreaterThanZero(row.todayDeaths) ? '+' : ''}
            {row.todayDeaths.toLocaleString('en-US')}
          </StyledTableCell>
          <StyledTableCell align='center' className={styles.tableCells}>
            {row.casesPerOneMillion.toLocaleString('en-US')}
          </StyledTableCell>
          <StyledTableCell align='center' className={styles.tableCells}>
            {row.deathsPerOneMillion.toLocaleString('en-US')}
          </StyledTableCell>
        </StyledTableRow>
      ) : null}
    </React.Fragment>
  );
};

export default withStyles(style)(GlobalCell);
