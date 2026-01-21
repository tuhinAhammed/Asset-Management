import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Check Redux state token first, then localStorage as fallback
  const authToken = token || localStorage.getItem('authToken');

  // Show loading state if auth is still loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-theme to-themeDeep">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!authToken) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
