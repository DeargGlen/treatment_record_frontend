import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import SettingsIndex from './templates/SettingsIndex';
import UserSettings from './templates/UserSettings';
import FarmSettings from './templates/FarmSettings';
import TagSettings from './templates/TagSettings';
import LocationSettings from './templates/LocationSettings';
import ShowSettingBarn from './templates/ShowSettingBarn';
import ShowSettingSymptomTag from './templates/ShowSettingSymptomTag';
import ShowSettingDiseaseTag from './templates/ShowSettingDiseaseTag';
import ShowSettingIndividualTag from './templates/ShowSettingIndividualTag';
import AllShippedIndividuals from './templates/AllShippedIndividuals';
import UpdateShipped from './templates/UpdateShipped';

const Settings: FC = () => (
  <>
    <Routes>
      <Route path="/" element={<SettingsIndex />} />
      <Route path="/user" element={<UserSettings />} />
      <Route path="/farm" element={<FarmSettings />} />
      <Route path="/farm/locations" element={<LocationSettings />} />
      <Route path="/barns/:barnId" element={<ShowSettingBarn />} />
      <Route path="/tags" element={<TagSettings />} />
      <Route path="/tags/symptom" element={<ShowSettingSymptomTag />} />
      <Route path="/tags/disease" element={<ShowSettingDiseaseTag />} />
      <Route path="/tags/individual" element={<ShowSettingIndividualTag />} />
      <Route path="/shipped" element={<AllShippedIndividuals />} />
      <Route path="/shipped/update" element={<UpdateShipped />} />
    </Routes>
  </>
);

export default Settings;
