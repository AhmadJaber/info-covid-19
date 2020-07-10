import axios from 'axios';

const URL = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let modifiedURL = URL;

  if (Boolean(country)) {
    modifiedURL = `${URL}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, deaths, recovered, lastUpdate },
    } = await axios.get(modifiedURL);
    return { confirmed, deaths, recovered, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailySummary = async () => {
  try {
    const { data } = await axios.get(`${URL}/daily`);

    return data.map(({ confirmed, deaths, reportDate: date }) => ({
      confirmed: confirmed.total,
      deaths: deaths.total,
      date,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${URL}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
