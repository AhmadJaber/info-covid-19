import React from 'react';
import { Grid, Card, CardContent, Typography, Chip } from '@material-ui/core';
import cx from 'classnames';
import CountUp from 'react-countup';

import styles from '../CardList/Cards.module.css';
import {
  getPercentageChange,
  getChipBackground,
  numFormatter,
} from './Card.utils';

const DataCard = ({
  label,
  todayData,
  cardClass,
  lastUpdated,
  yesterdayData,
}) => {
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

        <div className={styles.badgeContainer}>
          <Chip
            label={getPercentageChange(todayData, yesterdayData)}
            style={getChipBackground(todayData, yesterdayData, label)}
            component='span'
          />
          <Typography
            component='span'
            color='textSecondary'
            variant='subtitle1'
            style={{ fontWeight: 500, marginLeft: '.5em' }}
          >
            {`from yesterday (${numFormatter(yesterdayData)})`}
          </Typography>
        </div>
      </CardContent>
    </Grid>
  );
};

export default DataCard;
