import React from 'react';
import { CardList, DataTable, Header, Chart } from '../../components';

import HomeContext from '../../context/HomeContext';

const Home = ({ theme }) => {
  return (
    <HomeContext.Provider value={{ theme }}>
      <div className='homepage'>
        <Header />
        <CardList />
        <DataTable />
        <Chart />
      </div>
    </HomeContext.Provider>
  );
};

export default Home;
