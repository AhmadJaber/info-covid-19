import axios from 'axios';

const URL = 'https://disease.sh/v3/covid-19/all';

export const fetchGlobalData = () => {
  return axios.get(URL);
};

export const fetchGlobalDayBeforeData = () => {
  return axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=1');
};

export const fetchDailySummary = async () => {
  let globalURL = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all';

  try {
    const {
      data: { cases, deaths },
    } = await axios.get(globalURL);

    return { cases, deaths };
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
