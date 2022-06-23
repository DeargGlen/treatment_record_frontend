import { FC } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link as RouterLink } from 'react-router-dom';

const SettingsIndex: FC = () => (
  <>
    <List>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to="/settings/user">
          <ListItemText primary="ユーザー設定" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to="/settings/farm">
          <ListItemText primary="牧場設定" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to="/settings/tags">
          <ListItemText primary="タグ設定" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to="/settings/shipped">
          <ListItemText primary="出荷済みの牛一覧" />
        </ListItemButton>
      </ListItem>
      <Divider />
    </List>
  </>
);

export default SettingsIndex;
