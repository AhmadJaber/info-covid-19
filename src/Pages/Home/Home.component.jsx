import React from 'react';
import { fetchGlobalData, fetchGlobalDayBeforeData } from '../../api';
import { CardList, DataTable, Header, Chart } from '../../components';

import HomeContext from '../../context/HomeContext';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      country: '',
      globalData: {},
      globalDayBeforeData: [],
    };
  }

  async componentDidMount() {
    const [firstResponse, secondResponse] = await Promise.all([
      fetchGlobalData(),
      fetchGlobalDayBeforeData(),
    ]);

    const {
      data: {
        active,
        cases,
        deaths,
        recovered,
        updated: lastUpdated,
        todayCases,
        todayDeaths,
        casesPerOneMillion,
        deathsPerOneMillion,
        critical,
      },
    } = firstResponse;
    const {
      data: {
        cases: dayBeforeCases,
        deaths: dayBeforeDeaths,
        recovered: dayBeforeRecovered,
      },
    } = secondResponse;

    this.setState({
      globalData: {
        active,
        cases,
        deaths,
        recovered,
        lastUpdated,
        todayCases,
        todayDeaths,
        casesPerOneMillion,
        deathsPerOneMillion,
        critical,
      },
      globalDayBeforeData: [
        dayBeforeCases,
        dayBeforeDeaths,
        dayBeforeRecovered,
      ],
    });
  }

  render() {
    const { globalData, globalDayBeforeData } = this.state;
    console.log('homepage rendered');
    return (
      <HomeContext.Provider
        value={{ globalContextData: globalData, theme: this.props.theme }}
      >
        <div className='homepage'>
          <Header />
          <CardList data={globalData} dayBeforeData={globalDayBeforeData} />
          <DataTable />
          <Chart />
        </div>
      </HomeContext.Provider>
    );
  }
}

export default Home;
