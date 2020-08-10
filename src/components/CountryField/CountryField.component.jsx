/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import { fetchCountryInfo } from '../../api';
import countryToFlag from '../../utils/CountryCodeToFlag';

const useStyles = makeStyles((theme) => ({
  option: {
    fontSize: 15,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
    '& > span': {
      marginRight: 10,
      fontSize: 18,

      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 15,
      },
    },
  },
  root: {
    width: 200,
    flexShrink: 0,

    [theme.breakpoints.down('sm')]: {
      width: 190,
    },
    [theme.breakpoints.down('xs')]: {
      width: 160,
    },
  },
}));

const CountryField = ({ id, handleCountryChange }) => {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCountries = await fetchCountryInfo();
      const countryData = fetchedCountries.map(({ country, countryCode }) => {
        return { country, countryCode };
      });
      const filteredCountryData = countryData.filter(
        (data) => data.countryCode !== null
      );

      setCountries(filteredCountryData);
    };

    fetchData();
  }, []);

  const handleChange = (event, value) => {
    handleCountryChange(value);
  };

  return (
    <React.Fragment>
      {countries.length !== 0 ? (
        <Autocomplete
          id={id}
          onChange={handleChange}
          options={countries}
          classes={{
            option: classes.option,
            root: classes.root,
          }}
          autoHighlight
          getOptionLabel={(option) => {
            return option.country;
          }}
          renderOption={(option) => (
            <React.Fragment>
              <span>{countryToFlag(option.countryCode)}</span>
              {option.country}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Countries'
              variant='outlined'
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      ) : null}
    </React.Fragment>
  );
};

export default CountryField;
