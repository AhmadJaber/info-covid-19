import React from 'react';
import {
  ThemeProvider,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700],
    },
  },
});
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    marginBottom: '1em',
    marginLeft: '0',
  },
}));

const FilterField = ({ handleChange }) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
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
