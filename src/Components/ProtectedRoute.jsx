import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  // Check localStorage as fallback for when token might not be in Redux yet
  const authToken = token || localStorage.getItem('authToken');

  if (!authToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
