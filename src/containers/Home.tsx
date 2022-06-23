import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import ShowLocations from 'containers/templates/ShowLocations';
import ShowActivities from 'containers/templates/ShowActivities';
import ShowBarn from 'containers/templates/ShowBarn';

const HomeIndex: FC = () => (
  <>
    <ShowLocations />
    <ShowActivities />
  </>
);

const Home: FC = () => (
  <>
    <Routes>
      <Route path="/" element={<HomeIndex />} />
      <Route path="/barns/:barnId" element={<ShowBarn />} />
    </Routes>
  </>
);
export default Home;
