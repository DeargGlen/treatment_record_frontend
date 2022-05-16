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
import Users from 'containers/UserSettings';

// components
import Individuals from 'containers/Individuals';
import Treatments from 'containers/Treatments';
import Header from 'components/layouts/Header';
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import BottomBar from 'components/layouts/BottomBar';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const handleGetCurrentUser = async () => {
    try {
      const res: currentUserRes | undefined = await getCurrentUser();

      if (res?.data?.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data?.data);

        console.log(res?.data.data);
      } else {
        console.log('No current user');
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
    if (isSignedIn) {
      return children;
    }

    return <Navigate to="/signin" />;
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
          <Routes>
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
              path="/users/*"
              element={
                <Private>
                  <Users />
                </Private>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
          <BottomBar />
        </AuthContext.Provider>
      </Router>
    </>
  );
};

export default App;
