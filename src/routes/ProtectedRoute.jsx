import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { authService } from '@/services/authService';

const ProtectedRoute = ({ element: Element, roles, ...rest }) => {
  const user = authService.getCurrentUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  if (roles && roles.indexOf(user.role) === -1) {
    return <Navigate to="/dashboard" />;
  }

  return <Route {...rest} element={<Element {...rest} />} />;
};

export default ProtectedRoute;
