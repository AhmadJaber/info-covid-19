import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import HeaderLink from '../HeaderLink/HeaderLink.component.jsx';
import Logo from '../../assets/coronavirus.svg';

const useStyles = makeStyles({
  headerContainer: {
    padding: '1em',
    paddingTop: 0,
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

  return (
    <div className={classes.headerContainer}>
      <div>
        <div className={classes.headerMain}>
          <div>
            <Logo className={classes.logo} />
          </div>
          <Typography component='h1' className={classes.title}>
            INFO COVID-19
          </Typography>
        </div>
      </div>

      <HeaderLink />
    </div>
  );
};

export default Header;
