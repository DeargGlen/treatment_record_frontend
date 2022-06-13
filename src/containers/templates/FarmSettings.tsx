import { FC } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link as RouterLink } from 'react-router-dom';

const FarmSettings: FC = () => (
  <>
    <List>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to="/settings/farm/locations">
          <ListItemText primary="場所の設定" />
        </ListItemButton>
      </ListItem>
      <Divider />
    </List>
  </>
);

export default FarmSettings;
