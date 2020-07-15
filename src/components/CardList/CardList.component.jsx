import React from 'react';
import { Grid } from '@material-ui/core';

import styles from './Cards.module.css';
import DataCard from '../Card/Card.component.jsx';

const CardList = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return <h1>Loading.....</h1>;
  }

  return (
    <div className={styles.cardContainer}>
      <Grid container spacing={3} justify='center'>
        <DataCard
          label='Infected'
          cardFor={confirmed}
          cardClass={styles.infected}
          lastUpdate={lastUpdate}
        />
        <DataCard
          label='Recovered'
          cardFor={recovered}
          cardClass={styles.recovered}
          lastUpdate={lastUpdate}
        />
        <DataCard
          label='Deaths'
          cardFor={deaths}
          cardClass={styles.deaths}
          lastUpdate={lastUpdate}
        />
      </Grid>
    </div>
  );
};

export default CardList;
