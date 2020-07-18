import React from 'react';
import { Grid } from '@material-ui/core';

import styles from './Cards.module.css';
import DataCard from '../Card/Card.component.jsx';

const CardList = ({
  data: { active, cases, deaths, recovered, lastUpdated },
}) => {
  if (!cases) {
    return <h1>Loading.....</h1>;
  }

  return (
    <div className={styles.cardContainer}>
      <Grid container spacing={3} justify='center'>
        <DataCard
          label='total cases'
          cardFor={cases}
          cardClass={styles.infected}
          lastUpdated={lastUpdated}
        />
        <DataCard
          label='total deaths'
          cardFor={deaths}
          cardClass={styles.deaths}
          lastUpdated={lastUpdated}
        />
        <DataCard
          label='total recoveries'
          cardFor={recovered}
          cardClass={styles.recovered}
          lastUpdated={lastUpdated}
        />
        <DataCard
          label='active cases'
          cardFor={active}
          cardClass={styles.recovered}
          lastUpdated={lastUpdated}
        />
      </Grid>
    </div>
  );
};

export default CardList;
