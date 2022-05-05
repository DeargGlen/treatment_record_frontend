import { FC } from 'react';
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const SidebarWrapper = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  height: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  background: #f5f5f5;
  width: 160px;
`;

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
        color: '#696969',
        fontSize: 10,
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          width: 160,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 16,
        },
      },
    },
  },
});

const Sidebar: FC = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <SidebarWrapper>
        <ThemeProvider theme={theme}>
          <ListItem>
            <Link component={RouterLink} to="/individuals">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemText primary="個体管理" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link component={RouterLink} to="/treatments">
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemText primary="治療管理" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link component={RouterLink} to="/users">
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemText primary="ユーザー設定" />
              </ListItemButton>
            </Link>
          </ListItem>
        </ThemeProvider>
      </SidebarWrapper>
    </>
  );
};
export default Sidebar;
