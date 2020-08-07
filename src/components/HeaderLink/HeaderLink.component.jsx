import React from 'react';
import { Link, Typography, Tooltip, IconButton } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import { blue } from '@material-ui/core/colors';

const HeaderLink = () => {
  return (
    <Link
      onClick={() => {
        console.info("I'm a button.");
      }}
    >
      <div>
        <Tooltip title='To Code'>
          <IconButton edge='end' color='inherit' aria-label='To Code'>
            <GitHubIcon fontSize='large' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Contact Me'>
          <IconButton edge='end' color='inherit' aria-label='Contact Me'>
            <LinkedInIcon fontSize='large' />
          </IconButton>
        </Tooltip>
      </div>
    </Link>
  );
};

export default HeaderLink;
