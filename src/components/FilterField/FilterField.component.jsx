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
  margin: {
    margin: theme.spacing(1),
    marginBottom: '1em',
    marginLeft: '0',
  },
}));

const FilterField = ({ handleChange }) => {
  const classes = useStyles();
  const { theme } = useContext(HomeContext);
  const appliedTheme = createMuiTheme(theme ? themeLight : themeDark);

  return (
    <ThemeProvider theme={appliedTheme}>
      <TextField
        className={classes.margin}
        label='Search By Country'
        variant='outlined'
        id='mui-theme-provider-outlined-input'
        onChange={handleChange}
      />
    </ThemeProvider>
  );
};

export default FilterField;
