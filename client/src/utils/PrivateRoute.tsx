import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/contexts';

export function PrivateRoutes() {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

interface ProtectedRouteProps {
  children: JSX.Element;
}
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/login" />;
}
