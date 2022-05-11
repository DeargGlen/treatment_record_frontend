import { FC } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, Paper, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import theme from 'components/theme';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
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
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
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
              />
              <BottomNavigationAction
                label="治療管理"
                className={classes.button}
                icon={<CreateIcon />}
                component={RouterLink}
                to="/treatments"
              />
              <BottomNavigationAction
                label="ユーザー設定"
                className={classes.button}
                icon={<AccountCircle />}
                component={RouterLink}
                to="/users"
              />
            </BottomNavigation>
          </Paper>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default BottomBar;
