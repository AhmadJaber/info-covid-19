import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { fetchDailySummary } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

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

  /*
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;
*/
  const caseslineChart =
    Object.keys(cases).length !== 0 ? (
      <Line
        data={{
          labels: Object.entries(cases).map(([key]) => key),
          datasets: [
            {
              label: 'Infected',
              data: Object.entries(cases).map(([, val]) => val),
              backgroundColor: 'rgba(54, 162, 235, 0.4)',
              pointBackgrondColor: 'rgba(54, 162, 235, 1)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: 'rgba(0, 0, 0, 0)',
                },
              },
            ],
          },
        }}
      />
    ) : null;

  return (
    <div className={classes.wrapper}>
      <Paper>
        <div className={classes.chartWrapper} component={Paper}>
          <div className={classes.chartContainer}>{caseslineChart}</div>
        </div>
      </Paper>
    </div>
  );
};

export default Chart;
