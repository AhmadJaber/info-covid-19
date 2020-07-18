import React from 'react';
import { Grid, Card, CardContent, Typography, Chip } from '@material-ui/core';
import cx from 'classnames';
import CountUp from 'react-countup';

import styles from '../CardList/Cards.module.css';

const DataCard = ({
  label,
  todayData,
  cardClass,
  lastUpdated,
  yesterdayData,
}) => {
  const getPercentageChange = (todayData, yesterdayData) => {
    const decreasedValue = todayData - yesterdayData;
    const percentage = Math.round((decreasedValue / yesterdayData) * 100);
    let output = '';

    if (percentage > 0) {
      output = `${percentage}% Increase`;
    } else if (percentage < 0) {
      output = `${percentage}% Decrease`;
    } else {
      output = `${percentage}% Increase`;
    }

    return output;
  };

  return (
    <Grid
      item
      xs={12}
      md={5}
      component={Card}
      className={cx(styles.card, cardClass)}
    >
      <CardContent>
        <Typography
          component='h6'
          variant='subtitle2'
          color='textSecondary'
          className={styles.cardTitle}
          gutterBottom
        >
          {label.toUpperCase()}
        </Typography>
        <Typography variant='h4' component='h3' className={styles.cardFocus}>
          <CountUp start={0} end={todayData} duration={2.75} separator=','>
            {todayData}
          </CountUp>
        </Typography>
        <Typography color='textSecondary'>
          {new Date(lastUpdated).toDateString()}
        </Typography>

        <Chip label={getPercentageChange(todayData, yesterdayData)} />
      </CardContent>
    </Grid>
  );
};

export default DataCard;
