import React, { lazy, Suspense } from 'react';
import { Skeleton } from '../../components';

const CardList = lazy(() =>
  import('../../components/CardList/CardList.component.jsx')
);
const DataTable = lazy(() =>
  import('../../components/DataTable/DataTable.component.jsx')
);
const Chart = lazy(() => import('../../components/Chart/Chart.component.jsx'));

const Home = () => (
  <div className="homepage">
    <CardList />

    <Suspense fallback={<Skeleton />}>
      <DataTable />
      <Chart />
    </Suspense>
  </div>
);

export default Home;
