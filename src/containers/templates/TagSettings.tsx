import { FC } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link as RouterLink } from 'react-router-dom';

const TagSettings: FC = () => (
  <>
    <List>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to="/settings/tags/individual">
          <ListItemText primary="個体タグ" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to="/settings/tags/symptom">
          <ListItemText primary="症状タグ" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to="/settings/tags/disease">
          <ListItemText primary="疾病タグ" />
        </ListItemButton>
      </ListItem>
      <Divider />
    </List>
  </>
);

export default TagSettings;
