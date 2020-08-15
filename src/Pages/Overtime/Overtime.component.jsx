import React from 'react';

import Papa from 'papaparse';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { infectedUrl, recoveredUrl, deathUrl } from '../../utils/csvLinks';
import Leaflet from '../../components/Map/Map.component.jsx';
import DateSlider from '../../components/DateSlider/DateSlider.component.jsx';
import DataSelector from '../../components/DataSelector/DataSelector.component.jsx';

class Overtime extends React.Component {
  static pullAndParseUrl(url) {
    return axios
      .get(url)
      .then((response) => Papa.parse(response.data, { header: true }));
  }

  constructor(props) {
    super(props);
    this.state = {
      infectedData: [],
      deathData: [],
      recoveredData: [],
      date: '1/22/20',
      infectedOn: true,
      deathOn: false,
      recoveredOn: false,
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.toggleInfectedData = this.toggleInfectedData.bind(this);
    this.toggleRecoveredData = this.toggleRecoveredData.bind(this);
    this.toggleDeathData = this.toggleDeathData.bind(this);
  }

  componentDidMount() {
    const parsedInfectedData = Overtime.pullAndParseUrl(infectedUrl);
    const parsedRecoveredData = Overtime.pullAndParseUrl(recoveredUrl);
    const parsedDeathData = Overtime.pullAndParseUrl(deathUrl);

    parsedInfectedData.then((result) => {
      this.setState({ infectedData: result.data });
    });

    parsedRecoveredData.then((result) => {
      this.setState({ recoveredData: result.data });
    });

    parsedDeathData.then((result) => {
      this.setState({ deathData: result.data });
    });
  }

  handleDateChange(selectedDate) {
    this.setState({ date: selectedDate });
  }

  toggleInfectedData() {
    this.setState({ infectedOn: !this.state.infectedOn });
  }

  toggleRecoveredData() {
    this.setState({ recoveredOn: !this.state.recoveredOn });
  }

  toggleDeathData() {
    this.setState({ deathOn: !this.state.deathOn });
  }

  render() {
    return (
      <div className="overtime">
        <Grid container justify="center" alignItems="center" spacing={3}>
          <Grid item xs={10} sm={8}>
            <Typography id="title" variant="h4" className="overtime__title">
              Visualizing COVID-19 Over Time
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Leaflet
              infectedData={this.state.infectedData}
              infectedOn={this.state.infectedOn}
              recoveredData={this.state.recoveredData}
              recoveredOn={this.state.recoveredOn}
              deathData={this.state.deathData}
              deathOn={this.state.deathOn}
              date={this.state.date}
            />
          </Grid>
          <Grid item xs={8}>
            {this.state.date}
            <DateSlider handleDateChange={this.handleDateChange} />
          </Grid>
          <Grid item xs={8}>
            <DataSelector
              toggleInfectedData={this.toggleInfectedData}
              infectedOn={this.state.infectedOn}
              toggleRecoveredData={this.toggleRecoveredData}
              recoveredOn={this.state.recoveredOn}
              toggleDeathData={this.toggleDeathData}
              deathOn={this.state.deathOn}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography id="title" variant="caption">
              This is a depiction of the spread of COVID-19 over time. We rely
              on the Johns Hopkins CSSE Data Repository, which is updated once a
              day at around 23:59 UTC. For that reason, the most recent data our
              slider allows users to select is yesterday&apos;s.
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Overtime;
