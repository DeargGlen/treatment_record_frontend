import { FC } from 'react';
import { ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import styled from 'styled-components';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'components/theme';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import AccoutntCircle from '@mui/icons-material/AccountCircle';
import CattleImg from 'images/cattle.png';

const SidebarWrapper = styled.div`
  height: 100%;
  background: #f5f5f5;
  width: 160px;
`;

const Sidebar: FC = () => {
  const location = useLocation();

  return (
    <>
      <SidebarWrapper>
        <ThemeProvider theme={theme}>
          <ListItem>
            <ListItemButton
              selected={location.pathname === '/'}
              component={RouterLink}
              to="/"
            >
              <HomeIcon />
              <ListItemText primary="ホーム" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton
              selected={location.pathname.includes('/individuals')}
              component={RouterLink}
              to="/individuals"
            >
              <img src={CattleImg} alt="tag-number" width="25" />
              <ListItemText primary="個体管理" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton
              selected={location.pathname.includes('/treatments')}
              component={RouterLink}
              to="/treatments"
            >
              <CreateIcon />
              <ListItemText primary="治療管理" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton
              selected={location.pathname.includes('/settings')}
              component={RouterLink}
              to="/settings"
            >
              <AccoutntCircle />
              <ListItemText primary="設定" />
            </ListItemButton>
          </ListItem>
        </ThemeProvider>
      </SidebarWrapper>
    </>
  );
};
export default Sidebar;
