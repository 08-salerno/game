import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthorized } from '../../../modules/redux/slices/userSlice';

export type ProtectedRouteProps = RouteProps;

const PrivateRoute = (props : RouteProps):JSX.Element => {
  const isUserAuthorized: boolean = useSelector(selectIsAuthorized);
  console.log(isUserAuthorized, 'isUserAuthorized');
  if (isUserAuthorized) {
    return <Route {...props} />;
  }
  return <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />;
};

export default PrivateRoute;
