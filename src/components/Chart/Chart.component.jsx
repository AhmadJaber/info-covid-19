import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { fetchDailySummary } from '../../api';
import { numFormatter } from '../../utils/Card';

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
    chart: {
      type: 'line',
    },
    title: {
      text: undefined,
    },
    xAxis: {
      categories: Object.entries(cases).map(([key]) => {
        const event = new Date(key);
        const options = { month: 'short', day: 'numeric' };
        return event.toLocaleDateString('en-US', options);
      }),
    },
    series: [
      {
        name: 'Cases',
        color: '#33CCFF',
        lineWidth: 5,
        data: Object.entries(cases).map(([, val]) => val),
      },
    ],
    yAxis: {
      title: {
        text: 'Total Coronavirus Cases',
      },
    },
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
