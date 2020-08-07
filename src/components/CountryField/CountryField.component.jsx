/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import { fetchCountryInfo } from '../../api';
import countryToFlag from '../../utils/CountryCodeToFlag';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  fieldWidth: {
    width: 300,
  },
});

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
          style={{ width: 200, flexShrink: 0 }}
          onChange={handleChange}
          options={countries}
          classes={{
            option: classes.option,
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
