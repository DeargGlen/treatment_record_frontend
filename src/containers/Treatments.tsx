import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import AllTreatments from 'containers/templates/AllTreatments';

const Treatments: FC = () => (
  <>
    <div>Treatments</div>
    <Routes>
      <Route path="/" element={<AllTreatments />} />
    </Routes>
  </>
);

export default Treatments;
