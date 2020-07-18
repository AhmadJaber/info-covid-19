import axios from 'axios';

const URL = 'https://disease.sh/v3/covid-19/all';

export const fetchData = async () => {
  try {
    const {
      data: { cases, deaths, recovered, active, updated: lastUpdated },
    } = await axios.get(URL);
    return { cases, deaths, recovered, active, lastUpdated };
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
