/* eslint-disable react/jsx-props-no-spreading */
import { FC, useContext } from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { AuthContext } from 'App';

const PrivateRoute: FC<RouteProps> = ({ element, ...rest }) => {
  const { currentUser, loading } = useContext(AuthContext);
  if (!loading) {
    if (currentUser) {
      return (
        <>
          <Route element={element} {...rest} />;
        </>
      );
    }

    return <Navigate to="/signin" />;
  }

  return <></>;
};

export default PrivateRoute;
