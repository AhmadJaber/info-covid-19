import { SMA } from './MovingAverage';

export const chartHooksData = (cases, deaths) => {
  const casesArr = Object.entries(cases).map(([, value]) => value);
  const deathsArr = Object.entries(deaths).map(([, value]) => value);
  const dCases = casesArr.reduce((accm, amount, index) => {
    return index === 0 ? [...accm, 0] : [...accm, amount - casesArr[index - 1]];
  }, []);
  const dDeaths = deathsArr.reduce((accm, amount, index) => {
    return index === 0
      ? [...accm, 0]
      : [...accm, amount - deathsArr[index - 1]];
  }, []);

  const dCasesSMA = SMA(dCases, 7);
  const dDeathsSMA = SMA(dDeaths, 7);

  return { dCases, dDeaths, dCasesSMA, dDeathsSMA };
};
