import React, { useEffect, useState } from 'react';
import { fetchDailySummary } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailySummary, setDailySummary] = useState([]);

  useEffect(() => {
    const fetchedDailySummary = async () => {
      const dailyData = await fetchDailySummary();
      setDailySummary(dailyData);
    };

    fetchedDailySummary();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

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

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
