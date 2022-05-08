import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import AllUsers from 'containers/templates/AllUsers';
import ShowUsers from 'containers/templates/ShowUsers';

const Users: FC = () => (
  <>
    <div>Users</div>
    <Routes>
      <Route path="/" element={<AllUsers />} />
      <Route path="/:individualId" element={<ShowUsers />} />
    </Routes>
  </>
);

export default Users;
