import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import SettingsIndex from 'containers/templates/SettingsIndex';
import UserSettings from 'containers/templates/UserSettings';
import FarmSettings from 'containers/templates/FarmSettings';
import LocationSettings from 'containers/templates/LocationSettings';
import ShowBarn from 'containers/templates/ShowBarn';

const Settings: FC = () => (
  <>
    <Routes>
      <Route path="/" element={<SettingsIndex />} />
      <Route path="/user" element={<UserSettings />} />
      <Route path="/farm" element={<FarmSettings />} />
      <Route path="/farm/locations" element={<LocationSettings />} />
      <Route path="/barns/:barnId" element={<ShowBarn />} />
    </Routes>
  </>
);

export default Settings;
