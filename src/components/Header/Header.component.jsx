import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import Brightness7RoundedIcon from '@material-ui/icons/Brightness7Rounded';
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';

import { ThemeContext } from '../../context/ThemeContext';
import HeaderLink from '../HeaderLink/HeaderLink.component.jsx';
import Logo from '../../assets/coronavirus.svg';

const useStyles = makeStyles({
  headerContainer: {
    padding: '1em',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-first',
  },
  headerMain: {
    flex: 1,
  },
  headerText: {
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
  iconButton: {
    textAlign: 'right',
    paddingRight: '1em',
  },
});

const Header = () => {
  const classes = useStyles();

  const { theme, toggleDarkMode } = useContext(ThemeContext);
  const icon = theme.isDark ? (
    <Brightness7RoundedIcon fontSize='large' />
  ) : (
    <Brightness4RoundedIcon fontSize='large' />
  );

  return (
    <header className={classes.header}>
      <div className={classes.iconButton}>
        <IconButton
          edge='end'
          color='inherit'
          aria-label='Toggle light/dark theme'
          onClick={toggleDarkMode}
        >
          {icon}
        </IconButton>
      </div>

      <div className={classes.headerContainer}>
        <div className={classes.headerMain}>
          <div className={classes.headerText}>
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
    </header>
  );
};

export default Header;
