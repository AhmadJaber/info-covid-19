import React, { useContext } from 'react';
import {
  ThemeProvider,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { blue } from '@material-ui/core/colors';

import HomeContext from '../../context/HomeContext';

const themeDark = {
  palette: {
    type: 'dark',
    primary: {
      main: blue[500],
    },
  },
};

const themeLight = {
  palette: {
    type: 'light',
    primary: {
      main: blue[500],
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 220,
      marginBottom: '1em',
      marginLeft: '0',
      [theme.breakpoints.down('sm')]: {
        width: 200,
      },
      [theme.breakpoints.down('xs')]: {
        width: 180,
      },

      '& .MuiFormLabel-root-161': {
        fontSize: '.93rem',

        [theme.breakpoints.down('sm')]: {
          fontSize: '.85rem',
        },
      },
    },
  },
}));

const FilterField = ({ handleChange }) => {
  const classes = useStyles();
  const { theme } = useContext(HomeContext);
  const appliedTheme = createMuiTheme(theme ? themeLight : themeDark);

  return (
    <ThemeProvider theme={appliedTheme}>
      <form noValidate className={classes.root}>
        <TextField
          label='Search By Country'
          variant='outlined'
          id='mui-theme-provider-outlined-input'
          onChange={handleChange}
        />
      </form>
    </ThemeProvider>
  );
};

export default FilterField;
