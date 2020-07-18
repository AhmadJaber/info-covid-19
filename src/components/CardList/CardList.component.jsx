import React from 'react';
import { Grid } from '@material-ui/core';

import styles from './Cards.module.css';
import DataCard from '../Card/Card.component.jsx';

const CardList = ({
  data: { active, cases, deaths, recovered, lastUpdated },
  dayBeforeData,
}) => {
  if (!cases && dayBeforeData.length === 0) {
    return <h1>Loading.....</h1>;
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
        />
        <DataCard
          label='total deaths'
          todayData={deaths}
          yesterdayData={yesterdayDeaths[date]}
          cardClass={styles.deaths}
          lastUpdated={lastUpdated}
        />
        <DataCard
          label='total recoveries'
          todayData={recovered}
          yesterdayData={yesterdayRecovered[date]}
          cardClass={styles.recovered}
          lastUpdated={lastUpdated}
        />
        <DataCard
          label='active cases'
          todayData={active}
          yesterdayData={yesterdayActiveCases}
          cardClass={styles.active}
          lastUpdated={lastUpdated}
        />
      </Grid>
    </div>
  );
};

export default CardList;
