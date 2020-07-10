import React, { useEffect, useState } from 'react';
import { fetchDailySummary } from '../../api';
import { Line } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = () => {
  const [dailySummary, setDailySummary] = useState([]);

  useEffect(() => {
    const fetchedDailySummary = async () => {
      const dailyData = await fetchDailySummary();
      setDailySummary(dailyData);
    };

    fetchedDailySummary();
  }, []);

  const lineChart =
    dailySummary.length !== 0 ? (
      <Line
        data={{
          labels: dailySummary.map(({ date }) => date),
          datasets: [
            {
              label: 'Infected',
              data: dailySummary.map(({ confirmed }) => confirmed),
              borderColor: '#3333ff',
              fill: true,
            },
            {
              label: 'Deaths',
              data: dailySummary.map(({ deaths }) => deaths),
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
