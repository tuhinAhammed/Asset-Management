import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreAuth } from '../Redux/Slice/authSlice';

/**
 * AuthInitializer Component
 * ========================
 * 
 * Initializes authentication state from localStorage on app mount.
 * This ensures that:
 * 1. Users remain logged in after page refresh
 * 2. Redux state is synced with localStorage
 * 3. ProtectedRoute guards work correctly on initial load
 * 
 * Usage: Wrap your entire router with this component
 */
const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore auth state from localStorage on app mount
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      dispatch(restoreAuth());
    }
  }, [dispatch]);

  return children;
};

export default AuthInitializer;
