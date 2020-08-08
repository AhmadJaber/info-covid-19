import React from 'react';
import { Link, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  footerContainer: {
    padding: '1rem',
    marginTop: '.25rem',
  },
  footerLink: {
    fontSize: '1rem',
    fontWeight: 500,
    paddingRight: '1em',
    color: '#2196F3',
    opacity: 1,
    '&:hover': {
      opacity: 0.7,
      textDecoration: 'none',
      transition: 'opacity 275ms linear',
    },
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footerContainer}>
      <Tooltip title='Github Ahmad Jaber'>
        <Link
          className={classes.footerLink}
          href='https://github.com/AhmadJaber'
          target='_blank'
          rel='noopener'
        >
          <span className={classes.emoji} role='img' aria-label='developer'>
            👨
          </span>{' '}
          Made By Ashik Ahmad Jaber
        </Link>
      </Tooltip>
      <Tooltip title='Data Source'>
        <Link
          className={classes.footerLink}
          href='https://github.com/disease-sh/API'
          target='_blank'
          rel='noopener'
        >
          <span className={classes.emoji} role='img' aria-label='data'>
            📊
          </span>{' '}
          Data Source
        </Link>
      </Tooltip>
    </div>
  );
};

export default Footer;
