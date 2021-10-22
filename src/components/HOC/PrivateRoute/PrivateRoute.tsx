import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthorized } from '../../../modules/redux/slices/userSlice';

export type ProtectedRouteProps = RouteProps;

const PrivateRoute = (props : ProtectedRouteProps): React.ReactElement => {
  const isUserAuthorized: boolean = useSelector(selectIsAuthorized);
  if (isUserAuthorized) {
    return <Route {...props} />;
  }

  const { location } = props;
  return <Redirect to={{ pathname: '/auth', state: { from: location } }} />;
};

export default PrivateRoute;
