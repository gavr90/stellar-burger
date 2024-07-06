import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ProtectedRouteProps } from './type';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { getIsAuthChecked, getUser } from '../../services/auth/slice';

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  // if (!isAuthChecked) {
  //   return <Preloader />;
  // }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
