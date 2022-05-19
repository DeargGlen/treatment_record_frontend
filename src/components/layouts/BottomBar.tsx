import { FC } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, Paper, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import theme from 'components/theme';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useStyles = makeStyles({
  palette: {
    primary: {
      main: '#3cb371',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  wrapper: {
    display: 'block',
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 1000,
    textAlign: 'center',
  },
  root: {
    backgroundColor: '#f5f5f5',
  },
  button: {
    maxWidth: '100%',
  },
});

const BottomBar: FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  const select = () => {
    let num = -1;
    if (location.pathname.includes('/individuals')) {
      num = 0;
    } else if (location.pathname.includes('/treatments')) {
      num = 1;
    } else if (location.pathname.includes('/users')) {
      num = 2;
    } else {
      num = -1;
    }

    return num;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          className={classes.wrapper}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Paper
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: 70,
              display: 'flex',
              justifyContent: 'center',
            }}
            elevation={3}
          >
            <BottomNavigationAction
              className={classes.button}
              icon={<ArrowBackIcon />}
              onClick={back}
              sx={{ mb: 2 }}
            />
            <BottomNavigation
              showLabels
              value={select()}
              className={classes.root}
            >
              <BottomNavigationAction
                label="個体管理"
                className={classes.button}
                icon={<HomeIcon />}
                component={RouterLink}
                to="/individuals"
                sx={{ width: 105 }}
              />
              <BottomNavigationAction
                label="治療管理"
                className={classes.button}
                icon={<CreateIcon />}
                component={RouterLink}
                to="/treatments"
                sx={{ width: 105 }}
              />
              <BottomNavigationAction
                label="設定"
                className={classes.button}
                icon={<AccountCircle />}
                component={RouterLink}
                to="/settings"
                sx={{ width: 105 }}
              />
            </BottomNavigation>
          </Paper>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default BottomBar;
