import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import cx from 'classnames';
import CountUp from 'react-countup';

import styles from '../CardList/Cards.module.css';

const DataCard = ({ label, cardFor, cardClass, lastUpdate }) => {
  return (
    <Grid
      item
      xs={12}
      md={5}
      component={Card}
      className={cx(styles.card, cardClass)}
    >
      <CardContent>
        <Typography color='textSecondary' gutterBottom>
          {label}
        </Typography>
        <Typography variant='h5' component='h2'>
          <CountUp start={0} end={cardFor.value} duration={2.75} separator=','>
            {cardFor.value}
          </CountUp>
        </Typography>
        <Typography color='textSecondary'>
          {new Date(lastUpdate).toDateString()}
        </Typography>
        <Typography variant='body2' component='p'>
          Number of active cases of COVID-19.
        </Typography>
      </CardContent>
    </Grid>
  );
};

export default DataCard;
