import React, { useState, useEffect, memo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableCell, TableRow } from '@material-ui/core';
import { fetchGlobalData } from '../../api';

import { isCasesDeathsGreaterThanZero } from '../../utils/DataTable';

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
    color: '#222',
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
  const [row, setRow] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchGlobalData();
      const {
        active,
        cases,
        deaths,
        recovered,
        updated: lastUpdated,
        todayCases,
        todayDeaths,
        casesPerOneMillion,
        deathsPerOneMillion,
        critical,
      } = data;

      setRow({
        active,
        cases,
        deaths,
        recovered,
        lastUpdated,
        todayCases,
        todayDeaths,
        casesPerOneMillion,
        deathsPerOneMillion,
        critical,
      });
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      {row.cases ? (
        <StyledTableRow key={row.country}>
          <StyledTableCell
            align='center'
            className='tableCells'
          ></StyledTableCell>
          <StyledTableCell align='left' className='tableCells'>
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
          <StyledTableCell align='center' className='tableCells'>
            {row.cases.toLocaleString('en-US')}
          </StyledTableCell>
          <StyledTableCell align='center' className='tableCells'>
            {row.deaths.toLocaleString('en-US')}
          </StyledTableCell>
          <StyledTableCell align='center' className='tableCells'>
            {row.critical.toLocaleString('en-US')}
          </StyledTableCell>
          <StyledTableCell align='center' className='tableCells'>
            {row.recovered.toLocaleString('en-US')}
          </StyledTableCell>
          <StyledTableCell
            align='center'
            className={`tableCells ${
              row.todayCases > 0 ? classes.todayCasesStyle : ''
            }`}
          >
            {isCasesDeathsGreaterThanZero(row.todayCases) ? '+' : ''}
            {row.todayCases.toLocaleString('en-US')}
          </StyledTableCell>
          <StyledTableCell
            align='center'
            className={`tableCells ${
              row.todayDeaths > 0 ? classes.todayDeathsStyle : ''
            }`}
          >
            {isCasesDeathsGreaterThanZero(row.todayDeaths) ? '+' : ''}
            {row.todayDeaths.toLocaleString('en-US')}
          </StyledTableCell>
          <StyledTableCell align='center' className='tableCells'>
            {row.casesPerOneMillion.toLocaleString('en-US')}
          </StyledTableCell>
          <StyledTableCell align='center' className='tableCells'>
            {row.deathsPerOneMillion.toLocaleString('en-US')}
          </StyledTableCell>
        </StyledTableRow>
      ) : null}
    </React.Fragment>
  );
};

const MemoizedGlobalCell = memo(GlobalCell);

export default withStyles(style)(MemoizedGlobalCell);
