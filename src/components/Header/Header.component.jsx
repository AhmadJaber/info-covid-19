import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { ReactComponents as Logo } from '../../assets/coronavirus.svg';

const Header = () => {
  return (
    <div className='headerContainer'>
      <div>
        <Logo />
        <Typography component='h1' variant='h2'>
          INFO COVID-19
        </Typography>
      </div>
    </div>
  );
};

export default Header;
