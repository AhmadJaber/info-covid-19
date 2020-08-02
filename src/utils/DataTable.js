export const isCasesDeathsGreaterThanZero = (data) => {
  if (data === undefined || isNaN(data)) {
    return false;
  } else if (data > 0) {
    return true;
  }
  return false;
};
