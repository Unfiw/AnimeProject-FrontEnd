// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from './auth';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  return isLoggedIn() ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
