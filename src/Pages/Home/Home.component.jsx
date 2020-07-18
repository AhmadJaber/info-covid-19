import React from 'react';

import { fetchData } from '../../api';
import { CardList, Chart, DataTable } from '../../components';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      country: '',
      globalData: {},
    };
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ globalData: fetchedData });
  }

  handleCountryChange = async (country) => {
    console.log(country);

    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { globalData, country } = this.state;

    return (
      <div className='homepage'>
        <CardList data={globalData} />
        <DataTable />
      </div>
    );
  }
}

export default Home;
