import axios from 'axios';

const URL = 'https://disease.sh/v3/covid-19/all';

export const fetchGlobalData = () => axios.get(URL);
export const fetchGlobalDayBeforeData = () =>
  axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=1');

export const fetchDailySummary = async (country = null) => {
  let URL = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all';

  if (country === null) {
    URL = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all';
  } else {
    URL = `https://disease.sh/v3/covid-19/historical/${country.countryCode}?lastdays=all`;
  }

  try {
    const { data } = await axios.get(URL);
    return { data };
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
        countryCode: countryInfo.iso2,
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
