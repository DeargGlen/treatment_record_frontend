import { FC } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// components
import Individuals from 'containers/Individuals';
import Treatments from 'containers/Treatments';
import Users from 'containers/Users';
import Header from 'components/layouts/Header';
import Sidebar from 'components/layouts/Sidebar';

const MainWrapper = styled.div`
  padding-left: 160px;
  padding-top: 50px;
`;

const App: FC = () => (
  <>
    <Router>
      <Header />
      <Sidebar />
      <MainWrapper>
        <Routes>
          <Route path="/individuals/*" element={<Individuals />} />
          <Route path="/treatments/*" element={<Treatments />} />
          <Route path="/users/*" element={<Users />} />
        </Routes>
      </MainWrapper>
    </Router>
  </>
);

export default App;
