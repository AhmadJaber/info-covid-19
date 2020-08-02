import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { fetchDailySummary } from '../../api';

import { chartHooksData } from '../../utils/ChartDataStructure';
import LineChart from '../LineChart/LineChart.component.jsx';
import ColumnChart from '../ColumnChart/ColumnChart.component.jsx';
import CountryField from '../CountryField/CountryField.component.jsx';
import Skeleton from '../Skeleton/Skeleton.component.jsx';
import CasesLogo from '../../assets/crown.svg';
import DeathsLogo from '../../assets/funeral.svg';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '.75em',
    paddingTop: '1.125em',
    paddingBottom: '1.125em',
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
  title: {
    fontSize: '2rem',
    fontWeight: 600,
  },
  flex: {
    marginTop: '1.625em',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerMain: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    marginRight: '.6em',
  },
  subTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '2em',
    marginTop: '.5em',
    textDecoration: 'underline',
    textDecorationColor: '#3f51b5',
  },
  my: {
    marginTop: '2rem',
    marginBottom: '2rem',
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
      const { data } = await fetchDailySummary();
      const { cases, deaths } = data;
      setCases(cases);
      setDeaths(deaths);

      const { dCases, dDeaths, dCasesSMA, dDeathsSMA } = chartHooksData(
        cases,
        deaths
      );
      setDailyCases(dCases);
      setDailyDeaths(dDeaths);
      setSevenDayMovingAverage({ dCasesSMA, dDeathsSMA });
    };

    fetchedDailySummary();
  }, []);

  const handleCountryChange = async (country) => {
    setCases({});

    const { data } = await fetchDailySummary(country);
    const dataLogic = country ? data.timeline : data;
    const { cases, deaths } = dataLogic;

    setCases(cases);
    setDeaths(deaths);

    const { dCases, dDeaths, dCasesSMA, dDeathsSMA } = chartHooksData(
      cases,
      deaths
    );
    setDailyCases(dCases);
    setDailyDeaths(dDeaths);
    setSevenDayMovingAverage({ dCasesSMA, dDeathsSMA });
  };
  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <Paper>
          <div className={classes.chartWrapper}>
            <div className={classes.flex}>
              <div className={classes.header}>
                <div className={classes.headerMain}>
                  <div>
                    <CasesLogo className={classes.logo} />
                  </div>
                  <Typography component='h1' className={classes.title}>
                    Cases
                  </Typography>
                </div>
                <Typography component='h4' className={classes.subTitle}>
                  Total Cases{' '}
                  <Typography component='span' color='textSecondary'>
                    (Linear Scale)
                  </Typography>
                </Typography>
              </div>

              <CountryField
                id='countryCharts'
                handleCountryChange={handleCountryChange}
              />
            </div>

            {Object.keys(cases).length !== 0 ? (
              <React.Fragment>
                <LineChart casesOrDeaths={cases} name='Cases' />

                <Typography
                  component='h4'
                  className={`${classes.subTitle} ${classes.my}`}
                >
                  Daily New Cases{' '}
                  <Typography component='span' color='textSecondary'>
                    (Per Day)
                  </Typography>
                </Typography>
                <ColumnChart
                  name='Daily Cases'
                  casesOrDeaths={cases}
                  daily={dailyCases}
                  sevenDayMovingAverage={sevenDayMovingAverage.dCasesSMA}
                />
              </React.Fragment>
            ) : (
              <Skeleton />
            )}
          </div>
        </Paper>
      </div>

      <div className={classes.wrapper}>
        <Paper>
          <div className={classes.chartWrapper}>
            <div className={classes.flex}>
              <div className={classes.header}>
                <div className={classes.headerMain}>
                  <div>
                    <DeathsLogo className={classes.logo} />
                  </div>
                  <Typography component='h1' className={classes.title}>
                    Deaths
                  </Typography>
                </div>
                <Typography
                  component='h4'
                  className={classes.subTitle}
                  style={{ textDecorationColor: '#e53935' }}
                >
                  Total Deaths{' '}
                  <Typography component='span' color='textSecondary'>
                    (Linear Scale)
                  </Typography>
                </Typography>
              </div>
            </div>

            {Object.keys(cases).length !== 0 ? (
              <React.Fragment>
                <LineChart casesOrDeaths={deaths} name='Deaths' />

                <Typography
                  component='h4'
                  className={`${classes.subTitle} ${classes.my}`}
                  style={{ textDecorationColor: '#e53935' }}
                >
                  Daily New Deaths{' '}
                  <Typography component='span' color='textSecondary'>
                    (Per Day)
                  </Typography>
                </Typography>
                <ColumnChart
                  name='Daily Deaths'
                  casesOrDeaths={deaths}
                  daily={dailyDeaths}
                  sevenDayMovingAverage={sevenDayMovingAverage.dDeathsSMA}
                />
              </React.Fragment>
            ) : (
              <Skeleton />
            )}
          </div>
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default Chart;
