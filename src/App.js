import React from 'react';
import { CardList, Chart, DataTable } from './components';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import styles from './App.module.css';
import { fetchData } from './api';

const THEME = createMuiTheme({
  typography: {
    fontFamily: ['Work Sans', 'Roboto'],
  },
});

class App extends React.Component {
  state = {
    data: {},
    country: '',
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    console.log(country);

    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <MuiThemeProvider theme={THEME}>
        <div className={styles.paddingVertical}>
          <div className={styles.container}>
            <CardList data={data} />
            <DataTable />
            <Chart country={country} data={data} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
