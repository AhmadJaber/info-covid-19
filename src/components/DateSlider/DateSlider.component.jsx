import React from 'react';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

// First date w/ data CSSE dataset
const date_of_first_case = new Date('01/22/2020');

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear().toString().substr(-2);

  return [month, day, year].join('/');
}

export default class DateSlider extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  static getDictKeys(dict, defaultVal) {
    try {
      return dict.keys();
    } catch (e) {
      return defaultVal;
    }
  }

  handleChange(event, newValue) {
    var result = new Date('01/22/2020');
    result.setDate(result.getDate() + newValue);
    this.props.handleDateChange(formatDate(result));
  }

  render() {
    const date_today = new Date();

    // To calculate the time difference of two dates
    const difference_in_time =
      date_today.getTime() - date_of_first_case.getTime();

    // To calculate the no. of days between two dates (subtract 1 since data is only updated at 23:59 UTC)
    const difference_in_days =
      Math.floor(difference_in_time / (1000 * 3600 * 24)) - 1;

    const marks = [
      {
        value: 0,
        label: 'Day 0',
      },
      {
        value: difference_in_days,
        label: 'Yesterday',
      },
    ];
    return (
      <>
        <Typography id='continuous-slider' gutterBottom>
          Days since January 22nd, 2020:
        </Typography>
        <br />
        <br />
        <Slider
          defaultValue={0}
          onChange={this.handleChange}
          getAriaValueText={''}
          aria-labelledby='continuous-slider'
          valueLabelDisplay='on'
          marks={marks}
          max={difference_in_days}
        />
      </>
    );
  }
}
