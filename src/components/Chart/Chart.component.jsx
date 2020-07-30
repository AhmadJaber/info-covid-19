import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import LineChart from '../LineChart/LineChart.component.jsx';
import ColumnChart from '../ColumnChart/ColumnChart.component.jsx';
import { fetchDailySummary } from '../../api';
import { SMA } from '../../utils/MovingAverage';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '.75em',
    paddingTop: '1.125em',
  },
  chartWrapper: {
    padding: '4em',
    margin: 0,
    paddingTop: '.5em',
    [theme.breakpoints.down('sm')]: {
      padding: '2em',
      paddingTop: '.5em',
    },
  },
  chartContainer: {
    position: 'relative',
    margin: 'auto',
  },
}));

const Chart = () => {
  const classes = useStyles();

  const [cases, setCases] = useState({});
  const [deaths, setDeaths] = useState({});
  const [dailyCases, setDailyCases] = useState([]);
  const [dailyDeaths, setDailyDeaths] = useState([]);
  const [sevenDayMovingAverage, setSevenDayMovingAverage] = useState({});

  useEffect(() => {
    const fetchedDailySummary = async () => {
      const { cases, deaths } = await fetchDailySummary();
      setCases(cases);
      setDeaths(deaths);

      const casesArr = Object.entries(cases).map(([, value]) => value);
      const deathsArr = Object.entries(deaths).map(([, value]) => value);
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

      const dCasesSMA = SMA(dCases, 7);
      const dDeathsSMA = SMA(dDeaths, 7);

      setDailyCases(dCases);
      setDailyDeaths(dDeaths);
      setSevenDayMovingAverage({ dCasesSMA, dDeathsSMA });
    };

    fetchedDailySummary();
  }, []);

  return (
    <div className={classes.wrapper}>
      <Paper>
        <div className={classes.chartWrapper}>
          <LineChart casesOrDeaths={cases} />
          <ColumnChart
            casesOrDeaths={cases}
            daily={dailyCases}
            sevenDayMovingAverage={sevenDayMovingAverage.dCasesSMA}
          />
        </div>
      </Paper>

      <Paper>
        <div className={classes.chartWrapper}>
          <LineChart casesOrDeaths={deaths} />
          <ColumnChart
            casesOrDeaths={deaths}
            daily={dailyDeaths}
            sevenDayMovingAverage={sevenDayMovingAverage.dDeathsSMA}
          />
        </div>
      </Paper>
    </div>
  );
};

export default Chart;
