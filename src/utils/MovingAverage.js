const average = (collection) => {
  const sum = collection.reduce((accm, item) => {
    return accm + parseFloat(item);
  }, 0);
  const average = sum / collection.length;
  return Math.round(average);
};

export const SMA = (values, period = 7) => {
  const sma = values.map((val, index, arr) => {
    if (index < period) {
      val = null;
    } else {
      val = arr.slice(index - period, index);
      val = average(val);
    }
    return val;
  });

  return sma;
};
