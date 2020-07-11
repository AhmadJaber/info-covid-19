import axios from 'axios';

const URL = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let modifiedURL = URL;

  if (country) {
    modifiedURL = `${URL}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, deaths, recovered, lastUpdate },
    } = await axios.get(modifiedURL);
    return { confirmed, deaths, recovered, lastUpdate };
  } catch (error) {
    return error;
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
    return error;
  }
};

export const fetchCountryInfo = async () => {
  try {
    const { data } = await axios.get(
      'https://disease.sh/v3/covid-19/countries'
    );
    return data.map(
      ({
        country,
        countryInfo,
        cases,
        todayCases,
        deaths,
        todayDeaths,
        recovered,
        critical,
        casesPerOneMillion,
        deathsPerOneMillion,
      }) => ({
        country,
        countryFlag: countryInfo.flag,
        cases,
        todayCases,
        deaths,
        todayDeaths,
        recovered,
        casesPerOneMillion,
        deathsPerOneMillion,
        critical,
      })
    );
  } catch (error) {
    return error;
  }
};
