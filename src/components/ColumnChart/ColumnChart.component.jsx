import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const useStyles = makeStyles({
  chartContainer: {
    position: 'relative',
    margin: 'auto',
  },
});

const ColumnChart = ({ casesOrDeaths, daily, sevenDayMovingAverage }) => {
  const classes = useStyles();

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: undefined,
    },
    xAxis: {
      categories: Object.entries(casesOrDeaths).map(([key]) => {
        const event = new Date(key);
        const options = { month: 'short', day: 'numeric' };
        return event.toLocaleDateString('en-US', options);
      }),
    },
    yAxis: {
      title: {
        text: undefined,
      },
    },
    series: [
      {
        name: 'Daily Cases',
        color: '#999',
        lineWidth: 4,
        showCheckbox: false,
        showInLegend: false,
        data: daily,
      },
      {
        name: '7-day moving average',
        type: 'spline',
        selected: false,
        lineWidth: 2,
        color: '#34a4c9',
        visible: false,
        data: sevenDayMovingAverage,
      },
    ],
  };

  return (
    <div className={classes.chartContainer}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ColumnChart;
