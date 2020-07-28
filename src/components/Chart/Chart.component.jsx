import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { fetchDailySummary } from '../../api';
import { numFormatter } from '../Card/Card.utils';

const useStyles = makeStyles({
  wrapper: {
    padding: '.75em',
    paddingTop: '1.125em',
  },
  chartWrapper: {
    padding: '2em',
    margin: 0,
    paddingTop: '.5em',
    minHeight: '500px',
  },
  chartContainer: {
    position: 'relative',
    margin: 'auto',
  },
});

const Chart = () => {
  const classes = useStyles();

  const [cases, setCases] = useState({});
  const [deaths, setDeaths] = useState({});
  const [dailyCases, setDailyCases] = useState([]);
  const [dailyDeaths, setDailyDeaths] = useState([]);

  useEffect(() => {
    const fetchedDailySummary = async () => {
      const { cases, deaths } = await fetchDailySummary();
      setCases(cases);
      setDeaths(deaths);

      const casesArr = Object.entries(cases).map(([key, value]) => value);
      const deathsArr = Object.entries(deaths).map(([key, value]) => value);
      const dCases = casesArr.reduce((accm, amount, index) => {
        return index === 0
          ? [...accm, 0]
          : [...accm, amount - casesArr[index - 1]];
      }, []);
      const dDeaths = deathsArr.reduce((accm, amount, index) => {
        return index === 0
          ? [...accm, 0]
          : [...accm, amount - deathsArr[index - 1]];
      }, []);

      setDailyCases(dCases);
      setDailyDeaths(dDeaths);
    };

    fetchedDailySummary();
  }, []);

  const options = {
    title: {
      text: 'My chart',
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  };

  return (
    <div className={classes.wrapper}>
      <Paper>
        <div className={classes.chartWrapper} component={Paper}>
          <div className={classes.chartContainer}>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Chart;
