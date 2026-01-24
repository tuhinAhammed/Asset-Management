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

  // If no token at all, redirect to login
  if (!authToken) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // IMPORTANT: Token existence check only
  // Backend MUST validate the token on every API request.
  // Frontend cannot truly validate JWT tokens without exposing secret keys.
  // This is intentional and secure:
  // - Frontend checks if token exists (basic guard)
  // - Backend validates token authenticity on every request
  // - If token is invalid/expired, backend returns 401
  // - Interceptor catches 401 and redirects to login
  
  // Token exists (format validation only - no signature check possible in browser)
  if (typeof authToken === 'string' && authToken.length > 0) {
    return children;
  }

  // Invalid token format
  return <Navigate to="/admin/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
