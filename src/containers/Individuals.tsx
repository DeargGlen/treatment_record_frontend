import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import AllIndividuals from 'containers/templates/AllIndividuals';
import ShowIndividual from 'containers/templates/ShowIndividual';

const Individuals: FC = () => (
  <>
    <Routes>
      <Route path="/" element={<AllIndividuals />} />
      <Route path="/:individualId" element={<ShowIndividual />} />
    </Routes>
  </>
);

export default Individuals;
