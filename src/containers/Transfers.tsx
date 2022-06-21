import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import TransfersIndex from 'containers/templates/TransfersIndex';
import ShowTreatment from 'containers/templates/ShowTreatment';
import NewTreatment from './templates/NewTreatment';

const Transfers: FC = () => (
  <>
    <Routes>
      <Route path="/" element={<TransfersIndex />} />
      <Route path="/:treatmentId" element={<ShowTreatment />} />
      <Route path="/new" element={<NewTreatment />} />
    </Routes>
  </>
);

export default Transfers;
