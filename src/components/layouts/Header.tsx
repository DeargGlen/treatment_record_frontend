/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FC, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Cookies from 'js-cookie';
import { signOut } from 'apis/users';
import { AuthContext } from 'App';
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

const Header: FC = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut()
      .then((res) => {
        if (res.data?.success === true) {
          Cookies.remove('_access_token');
          Cookies.remove('_client');
          Cookies.remove('_uid');

          setIsSignedIn(false);
          navigate('/signin');

          console.log('Succeeded in sign out');
        } else {
          console.log('Failed in sign out');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const back = () => {
    navigate(-1);
  };

  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <Button color="secondary" onClick={handleSignOut}>
            ログアウト
          </Button>
        );
      }

      return (
        <>
          <Button component={RouterLink} to="/signin" color="secondary">
            ログイン
          </Button>
          <Button component={RouterLink} to="/signup" color="secondary">
            ユーザー登録
          </Button>
        </>
      );
    }

    return <></>;
  };

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
                aria-label="backarrow"
                onClick={back}
                sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link component={RouterLink} to="/individuals">
                  牛の治療管理
                </Link>
              </Typography>
              <AuthButtons />
            </Toolbar>
          </AppBar>

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
export default Header;
