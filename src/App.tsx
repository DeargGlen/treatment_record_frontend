/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState, useEffect, createContext } from 'react';
import * as React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { User, currentUserRes } from 'interfaces/index';
import { getCurrentUser } from 'apis/users';
import { styled } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import theme from 'components/theme';

// components
import Individuals from 'containers/Individuals';
import Treatments from 'containers/Treatments';
import Home from 'containers/Home';
import Header from 'components/layouts/Header';
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import Settings from 'containers/Settings';
import BottomBar from 'components/layouts/BottomBar';
import Transfers from 'containers/Transfers';

export const AuthContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  },
);

const App: FC = () => {
  const sidebarWidth = 160;
  const headerNavigationHeightSmall = 40;
  const headerNavigationHeightBig = 56;
  const bottomNavigationHeight = 70;

  const ResponsiveDrawer = styled('div')(() => ({
    flexGrow: 1,
    paddingTop: `calc(5px + ${headerNavigationHeightSmall}px)`,
    paddingBottom: `calc(10px + ${bottomNavigationHeight}px)`,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: `calc(10px + ${headerNavigationHeightBig}px)`,
      paddingBottom: 10,
      paddingLeft: `calc(20px + ${sidebarWidth}px)`,
      paddingRight: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 500,
    },
  }));

  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const handleGetCurrentUser = async () => {
    try {
      const res: currentUserRes | undefined = await getCurrentUser();

      if (res?.data?.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser().catch((e) => {
      throw e;
    });
  }, [setCurrentUser]);

  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      }

      return <Navigate to="/signin" />;
    }

    return <></>;
  };

  return (
    <>
      <Router>
        <AuthContext.Provider
          value={{
            loading,
            setLoading,
            isSignedIn,
            setIsSignedIn,
            currentUser,
            setCurrentUser,
          }}
        >
          <Header />
          <ThemeProvider theme={theme}>
            <ResponsiveDrawer>
              <Routes>
                <Route
                  path="/*"
                  element={
                    <Private>
                      <Home />
                    </Private>
                  }
                />
                <Route
                  path="/individuals/*"
                  element={
                    <Private>
                      <Individuals />
                    </Private>
                  }
                />
                <Route
                  path="/treatments/*"
                  element={
                    <Private>
                      <Treatments />
                    </Private>
                  }
                />
                <Route
                  path="/transfers/*"
                  element={
                    <Private>
                      <Transfers />
                    </Private>
                  }
                />
                <Route
                  path="/settings/*"
                  element={
                    <Private>
                      <Settings />
                    </Private>
                  }
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
              </Routes>
            </ResponsiveDrawer>
          </ThemeProvider>
          <BottomBar />
        </AuthContext.Provider>
      </Router>
    </>
  );
};

export default App;
