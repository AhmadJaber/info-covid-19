import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  CardContent,
  Typography,
  Chip,
  Paper,
  Card,
} from '@material-ui/core';
import cx from 'classnames';

import styles from '../CardList/Cards.module.css';
import {
  getPercentageChange,
  getChipBackground,
  numFormatter,
} from '../../utils/Card';

const style = (theme) => ({
  mainData: {
    marginTop: '.25em',
    marginBottom: '.125em',
    fontSize: '2.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2.125rem',
    },
  },
  colorSuccess: {
    color: '#4CAF50',
  },
  cardGrid: {
    padding: '1em !important',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  contentMain: {
    flex: '1 0 auto',
  },
});

const DataCard = ({
  label,
  todayData,
  cardClass,
  lastUpdated,
  yesterdayData,
  classes,
  children,
}) => {
  return (
    <Grid item xs={12} md={6} className={cx(classes.cardGrid, cardClass)}>
      <Paper elevation={3} component={Card} variant='outlined'>
        <CardContent>
          <div className={classes.content}>
            <div className={classes.contentMain}>
              <Typography
                component='h6'
                variant='subtitle2'
                color='textSecondary'
                gutterBottom
              >
                {label.toUpperCase()}
              </Typography>
              <Typography
                variant='h4'
                component='h3'
                className={`${classes.mainData} ${
                  label === 'total recoveries' ? classes.colorSuccess : ''
                }`}
              >
                {todayData.toLocaleString()}
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
            </div>

            <div>{children}</div>
          </div>
        </CardContent>
      </Paper>
    </Grid>
  );
};

export default withStyles(style)(DataCard);
