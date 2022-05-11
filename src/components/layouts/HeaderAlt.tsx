import * as React from 'react';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import {
  AppBar,
  Box,
  Typography,
  Toolbar,
  Button,
  createTheme,
  ThemeProvider,
  IconButton,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Sidebar from './Sidebar';

const myTheme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
        color: 'white',
        fontSize: 20,
      },
    },
  },
  palette: {
    primary: {
      main: '#3cb371',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 890,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const drawerWidth = 161;

interface Props {
  // eslint-disable-next-line react/require-default-props
  window?: () => Window;
}

const HeaderAlt: FC<Props> = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <ThemeProvider theme={myTheme}>
          <AppBar
            position="fixed"
            color="primary"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="secondary"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link component={RouterLink} to="/individuals">
                  牛の治療管理
                </Link>
              </Typography>
              <Button color="secondary" component={RouterLink} to="/login">
                Login
              </Button>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="sidebar"
          >
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
            >
              <Toolbar />

              <Sidebar />
            </Drawer>
          </Box>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            <Toolbar />

            <Box
              component="nav"
              sx={{ overflow: 'auto', height: '100%' }}
              aria-label="sidebar"
            >
              <Sidebar />
            </Box>
          </Drawer>
        </ThemeProvider>
      </Box>
      <Toolbar />
    </>
  );
};
export default HeaderAlt;
