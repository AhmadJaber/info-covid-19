import React from 'react';

import { fetchGlobalData, fetchGlobalDayBeforeData } from '../../api';
import { CardList, DataTable } from '../../components';

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
      data: { active, cases, deaths, recovered, updated: lastUpdated },
    } = firstResponse;
    const {
      data: {
        cases: dayBeforeCases,
        deaths: dayBeforeDeaths,
        recovered: dayBeforeRecovered,
      },
    } = secondResponse;

    this.setState({
      globalData: { active, cases, deaths, recovered, lastUpdated },
      globalDayBeforeData: [
        dayBeforeCases,
        dayBeforeDeaths,
        dayBeforeRecovered,
      ],
    });
  }

  handleCountryChange = async (country) => {
    console.log(country);

    // const fetchedData = await fetchData(country);
    // this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { globalData, globalDayBeforeData } = this.state;

    return (
      <div className='homepage'>
        <CardList data={globalData} dayBeforeData={globalDayBeforeData} />
        <DataTable />
      </div>
    );
  }
}

export default Home;
