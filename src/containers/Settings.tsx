import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import SettingsIndex from 'containers/templates/SettingsIndex';
import UserSettings from 'containers/templates/UserSettings';
import FarmSettings from 'containers/templates/FarmSettings';

const Settings: FC = () => (
  <>
    <Routes>
      <Route path="/" element={<SettingsIndex />} />
      <Route path="/user" element={<UserSettings />} />
      <Route path="/farm" element={<FarmSettings />} />
    </Routes>
  </>
);

export default Settings;
