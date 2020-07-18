import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import cx from 'classnames';
import CountUp from 'react-countup';

import styles from '../CardList/Cards.module.css';

const DataCard = ({ label, cardFor, cardClass, lastUpdated }) => {
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
          {label.toUpperCase()}
        </Typography>
        <Typography variant='h5' component='h2'>
          <CountUp start={0} end={cardFor} duration={2.75} separator=','>
            {cardFor}
          </CountUp>
        </Typography>
        <Typography color='textSecondary'>
          {new Date(lastUpdated).toDateString()}
        </Typography>
      </CardContent>
    </Grid>
  );
};

export default DataCard;
