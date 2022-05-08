import { FC } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// components
import Individuals from 'containers/Individuals';
import Treatments from 'containers/Treatments';
import Users from 'containers/Users';
import HeaderAlt from 'components/layouts/HeaderAlt';

const MainWrapper = styled.div``;

const App: FC = () => (
  <>
    <Router>
      <HeaderAlt />
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
