import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0 16px 0 0',
    backgroundColor: '#2196F3',
    fontSize: '13px',
    fontWeight: 500,
  },
  linkButtonContainer: {},
  link: {
    textDecoration: 'none',
  },
}));

const LinkButton = ({ location }) => {
  const classes = useStyles();

  return (
    <div className={classes.linkButtonContainer}>
      {location === '' ? (
        <Link to='/overtime' className={classes.link}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            className={classes.button}
            endIcon={<LaunchIcon />}
          >
            COVID Overtime
          </Button>
        </Link>
      ) : (
        <Link to='/' className={classes.link}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            className={classes.button}
          >
            Home
          </Button>
        </Link>
      )}
    </div>
  );
};

export default LinkButton;
