import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import AllTreatments from 'containers/templates/AllTreatments';
import ShowTreatment from 'containers/templates/ShowTreatment';
import EditTreatment from 'containers/templates/EditTreatment';
import NewTreatment from './templates/NewTreatment';

const Treatments: FC = () => (
  <>
    <Routes>
      <Route path="/" element={<AllTreatments />} />
      <Route path="/:treatmentId" element={<ShowTreatment />} />
      <Route path="/new" element={<NewTreatment />} />
      <Route path="/edit/:treatmentId" element={<EditTreatment />} />
    </Routes>
  </>
);

export default Treatments;
