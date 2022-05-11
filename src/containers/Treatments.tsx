import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import AllTreatments from 'containers/templates/AllTreatments';
import NewTreatment from './templates/NewTreatment';

const Treatments: FC = () => (
  <>
    <Routes>
      <Route path="/" element={<AllTreatments />} />
      <Route path="/new" element={<NewTreatment />} />
    </Routes>
  </>
);

export default Treatments;
