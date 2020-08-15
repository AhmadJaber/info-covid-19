import React, { useEffect, useState, lazy, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { fetchDailySummary } from '../../api';

import { chartHooksData } from '../../utils/ChartDataStructure';

import LineChart from '../LineChart/LineChart.component.jsx';
import ColumnChart from '../ColumnChart/ColumnChart.component.jsx';
import Skeleton from '../Skeleton/Skeleton.component.jsx';
import Scroller from '../Scroller/Scroller.component.jsx';
import { ReactComponent as CasesLogo } from '../../assets/coronav2.svg';
import { ReactComponent as DeathsLogo } from '../../assets/deathv2.svg';

const CountryField = lazy(() =>
  import('../CountryField/CountryField.component.jsx')
);

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '1rem .75rem',
  },
  chartWrapper: {
    padding: '4em',
    margin: 0,
    paddingTop: '.5em',
    [theme.breakpoints.down('sm')]: {
      padding: '2em',
      paddingTop: '.5em',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '1.25em',
      paddingTop: '.5em',
    },
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.45rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.35rem',
    },
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
  header: {
    flex: 1,
  },
  logo: {
    marginRight: '.3em',
    height: '2.25em',
    width: '2.25em',

    [theme.breakpoints.down('xs')]: {
      height: '2.1em',
      width: '2.1em',
    },
  },
  subTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '2em',
    marginTop: '.5em',
    textDecoration: 'underline',
    textDecorationColor: '#2196F3',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.15rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.05rem',
    },
  },
  my: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  logoWrapper: {
    display: 'inline-flex',
  },
  subtitleSpan: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

const Chart = () => {
  const classes = useStyles();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchedDailySummary = async () => {
      const { data } = await fetchDailySummary();
      const { cases, deaths } = data;
      const { dCases, dDeaths, dCasesSMA, dDeathsSMA } = chartHooksData(
        cases,
        deaths
      );
      setData({ cases, deaths, dCases, dDeaths, dCasesSMA, dDeathsSMA });
    };

    fetchedDailySummary();
  }, []);

  const handleCountryChange = async (country) => {
    setData({});

    const { data } = await fetchDailySummary(country);
    const dataLogic = country ? data.timeline : data;
    const { cases, deaths } = dataLogic;
    const { dCases, dDeaths, dCasesSMA, dDeathsSMA } = chartHooksData(
      cases,
      deaths
    );

    setData({ cases, deaths, dCases, dDeaths, dCasesSMA, dDeathsSMA });
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Paper>
          <div className={classes.chartWrapper}>
            <div className={classes.flex}>
              <div className={classes.header}>
                <div className={classes.headerMain}>
                  <div className={classes.logoWrapper}>
                    <CasesLogo className={classes.logo} />
                  </div>
                  <Typography component="h1" className={classes.title}>
                    Cases
                  </Typography>
                </div>
                <Typography component="h4" className={classes.subTitle}>
                  Total Cases{' '}
                  <Typography
                    className={classes.subtitleSpan}
                    component="span"
                    color="textSecondary"
                  >
                    (Linear Scale)
                  </Typography>
                </Typography>
              </div>

              <Suspense fallback={<Skeleton />}>
                <CountryField
                  id="countryCharts"
                  handleCountryChange={handleCountryChange}
                />
              </Suspense>
            </div>

            {Object.keys(data).length !== 0 ? (
              <>
                <LineChart casesOrDeaths={data.cases} name="Cases" />

                <Typography
                  component="h4"
                  className={`${classes.subTitle} ${classes.my}`}
                >
                  Daily New Cases{' '}
                  <Typography component="span" color="textSecondary">
                    (Per Day)
                  </Typography>
                </Typography>
                <ColumnChart
                  name="Daily Cases"
                  casesOrDeaths={data.cases}
                  daily={data.dCases}
                  sevenDayMovingAverage={data.dCasesSMA}
                />
              </>
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
                  <Typography component="h1" className={classes.title}>
                    Deaths
                  </Typography>
                </div>
                <Typography
                  component="h4"
                  className={classes.subTitle}
                  style={{ textDecorationColor: '#e53935' }}
                >
                  Total Deaths{' '}
                  <Typography
                    className={classes.subtitleSpan}
                    component="span"
                    color="textSecondary"
                  >
                    (Linear Scale)
                  </Typography>
                </Typography>
              </div>
            </div>

            {Object.keys(data).length !== 0 ? (
              <>
                <LineChart casesOrDeaths={data.deaths} name="Deaths" />

                <Typography
                  component="h4"
                  className={`${classes.subTitle} ${classes.my}`}
                  style={{ textDecorationColor: '#e53935' }}
                >
                  Daily New Deaths{' '}
                  <Typography component="span" color="textSecondary">
                    (Per Day)
                  </Typography>
                </Typography>
                <ColumnChart
                  name="Daily Deaths"
                  casesOrDeaths={data.deaths}
                  daily={data.dDeaths}
                  sevenDayMovingAverage={data.dDeathsSMA}
                />
              </>
            ) : (
              <Skeleton />
            )}
          </div>

          <Scroller />
        </Paper>
      </div>
    </>
  );
};

export default React.memo(Chart);
