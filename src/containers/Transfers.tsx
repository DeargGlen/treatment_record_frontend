import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import TransfersIndex from 'containers/templates/TransfersIndex';
import NewTransfer from './templates/NewTransfer';

const Transfers: FC = () => (
  <>
    <Routes>
      <Route path="/" element={<TransfersIndex />} />
      <Route path="/new" element={<NewTransfer />} />
    </Routes>
  </>
);

export default Transfers;
