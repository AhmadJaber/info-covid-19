import React, { lazy, Suspense } from 'react';
import { CardList, Skeleton } from '../../components';

const DataTable = lazy(() =>
  import('../../components/DataTable/DataTable.component.jsx')
);
const Chart = lazy(() => import('../../components/Chart/Chart.component.jsx'));

const Home = () => {
  return (
    <div className='homepage'>
      <CardList />
      <Suspense fallback={<Skeleton />}>
        <DataTable />
        <Chart />
      </Suspense>
    </div>
  );
};

export default Home;
