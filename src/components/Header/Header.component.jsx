import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import HeaderLink from '../HeaderLink/HeaderLink.component.jsx';
import Logo from '../../assets/coronavirus.svg';

const useStyles = makeStyles({
  headerContainer: {
    padding: '1em',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-first',
  },
  headerMainContainer: {
    flex: 1,
  },
  headerMain: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '2.5em',
    width: '2.5em',
    marginRight: '.6em',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 600,
  },
});

const Header = () => {
  const classes = useStyles();
  console.log('header renderd');
  return (
    <div className={classes.headerContainer}>
      <div className={classes.headerMainContainer}>
        <div className={classes.headerMain}>
          <div>
            <Logo className={classes.logo} />
          </div>
          <Typography component='h1' className={classes.title}>
            INFO COVID-19
          </Typography>
        </div>
        <Typography component='h4' variant='subtitle2' color='textSecondary'>
          Covid-19 Total Information, Countrywise DataTable & Charts
        </Typography>
      </div>

      <HeaderLink />
    </div>
  );
};

export default memo(Header);
