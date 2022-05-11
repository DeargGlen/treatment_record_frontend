import { FC } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import Individuals from 'containers/Individuals';
import Treatments from 'containers/Treatments';
import Users from 'containers/Users';
import HeaderAlt from 'components/layouts/HeaderAlt';
import Login from 'containers/Login';
import BottomBar from 'components/layouts/BottomBar';

const App: FC = () => (
  <>
    <Router>
      <HeaderAlt />
      <Routes>
        <Route path="/individuals/*" element={<Individuals />} />
        <Route path="/treatments/*" element={<Treatments />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <BottomBar />
    </Router>
  </>
);

export default App;
