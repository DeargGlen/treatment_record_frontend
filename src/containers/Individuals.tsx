import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import AllIndividuals from 'containers/templates/AllIndividuals';
import ShowIndividual from 'containers/templates/ShowIndividual';
import NewIndividual from './templates/NewIndividual';
import EditIndividual from './templates/EditIndividual';

const Individuals: FC = () => (
  <>
    <Routes>
      <Route path="/" element={<AllIndividuals />} />
      <Route path="/:individualId" element={<ShowIndividual />} />
      <Route path="/edit/:individualId" element={<EditIndividual />} />
      <Route path="/new" element={<NewIndividual />} />
    </Routes>
  </>
);

export default Individuals;
