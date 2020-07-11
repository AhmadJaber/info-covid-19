import React, { useEffect, useState } from 'react';
import { FormControl, NativeSelect } from '@material-ui/core';

import { fetchCountries } from '../../api/index';
import styles from './CountryPicker.module.css';

const CountryPicker = ({ country, handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchedCountries = async () => {
      const dataCountries = await fetchCountries();
      setCountries(dataCountries);
    };

    fetchedCountries();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        onChange={(e) => handleCountryChange(e.target.value)}
        value={country}
        onBlur={(e) => handleCountryChange(e.target.value)}
      >
        <option value=''>Global</option>
        {countries.map((country, index) => (
          <option value={country} key={index}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
