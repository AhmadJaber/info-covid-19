import React from 'react';
import { Link, Tooltip, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  headerLinkWrapper: {
    flexShrink: 0,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

const HeaderLink = () => {
  const classes = useStyles();

  return (
    <div className={classes.headerLinkWrapper}>
      <Link
        style={{ padding: '0 .5rem' }}
        href='https://github.com/AhmadJaber/info-covid-19'
        target='_blank'
        rel='noopener'
      >
        <Tooltip title='To Code' placement='top-start'>
          <IconButton edge='end' color='inherit' aria-label='To Code'>
            <GitHubIcon fontSize='large' style={{ color: blue[500] }} />
          </IconButton>
        </Tooltip>
      </Link>
      <Link
        style={{ padding: '0 .5rem' }}
        href='https://www.linkedin.com/in/ashik-ahmad-jaber-993207143/'
        target='_blank'
        rel='noopener'
      >
        <Tooltip title='Contact Me' placement='top-start'>
          <IconButton edge='end' color='inherit' aria-label='Contact Me'>
            <LinkedInIcon fontSize='large' style={{ color: blue[500] }} />
          </IconButton>
        </Tooltip>
      </Link>
    </div>
  );
};

export default HeaderLink;
