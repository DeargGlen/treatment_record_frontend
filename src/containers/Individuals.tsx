import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import AllIndividuals from 'containers/templates/AllIndividuals';
import ShowIndividuals from 'containers/templates/ShowIndividuals';

const Individuals: FC = () => (
  <>
    <div>Individuals</div>
    <Routes>
      <Route path="/" element={<AllIndividuals />} />
      <Route path="/:individualId" element={<ShowIndividuals />} />
    </Routes>
  </>
);

export default Individuals;
