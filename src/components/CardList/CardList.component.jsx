import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import styles from './Cards.module.css';
import DataCard from '../Card/Card.component.jsx';
import Skeleton from '../Skeleton/Skeleton.component.jsx';

import CasesLogo from '../../assets/casesv2.svg';
import DeathsLogo from '../../assets/deathv2.svg';
import RecoverLogo from '../../assets/recoverv2.svg';
import ActiveLogo from '../../assets/coronav2.svg';

const useStyles = makeStyles({
  logo: {
    width: '3.5em',
    height: '3.5em',
  },
});

const CardList = ({
  data: { active, cases, deaths, recovered, lastUpdated },
  dayBeforeData,
}) => {
  const classes = useStyles();

  if (!cases && dayBeforeData.length === 0) {
    return <Skeleton />;
  }

  const yesterday = dayBeforeData.reduce(
    (accm, data) => accm.concat(Object.keys(data)),
    []
  );

  const [yesterdayCases, yesterdayDeaths, yesterdayRecovered] = dayBeforeData;
  const [date] = yesterday;
  const yesterdayActiveCases =
    yesterdayCases[date] - yesterdayDeaths[date] - yesterdayRecovered[date];

  return (
    <div className={styles.cardContainer}>
      <Grid container spacing={3} justify='center'>
        <DataCard
          label='total cases'
          todayData={cases}
          yesterdayData={yesterdayCases[date]}
          cardClass={styles.infected}
          lastUpdated={lastUpdated}
        >
          <CasesLogo className={classes.logo} />
        </DataCard>
        <DataCard
          label='total deaths'
          todayData={deaths}
          yesterdayData={yesterdayDeaths[date]}
          cardClass={styles.deaths}
          lastUpdated={lastUpdated}
        >
          <DeathsLogo className={classes.logo} />
        </DataCard>
        <DataCard
          label='total recoveries'
          todayData={recovered}
          yesterdayData={yesterdayRecovered[date]}
          cardClass={styles.recovered}
          lastUpdated={lastUpdated}
        >
          <RecoverLogo className={classes.logo} />
        </DataCard>
        <DataCard
          label='active cases'
          todayData={active}
          yesterdayData={yesterdayActiveCases}
          cardClass={styles.active}
          lastUpdated={lastUpdated}
        >
          <ActiveLogo className={classes.logo} />
        </DataCard>
      </Grid>
    </div>
  );
};

export default CardList;
