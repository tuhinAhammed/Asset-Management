/**
 * AUTHENTICATION SLICE
 * ====================
 * 
 * Handles user authentication state management using Redux Toolkit.
 * 
 * FEATURES:
 * - Login/Logout functionality
 * - JWT token management
 * - User profile storage
 * - Error handling
 * - Loading states
 * 
 * DEMO MODE:
 * - Using mock data from src/Data/mockData.js
 * - Default credentials: admin@example.com / 12345678
 * 
 * CONNECTING TO REAL API:
 * 1. Update src/Api/axiosInstance.js
 *    - Set USE_MOCK_DATA = false
 *    - Update API_BASE_URL to your backend
 * 
 * 2. Verify login endpoint
 *    - Should be POST /login
 *    - Request: { email, Password: password }
 *    - Response: { token, user, ... }
 * 
 * 3. Update credentials
 *    - Change demo credentials to real admin account
 * 
 * RESPONSE EXPECTED FROM API:
 * {
 *   success: true,
 *   token: "JWT_TOKEN_HERE",
 *   user: {
 *     id: 1,
 *     name: "Admin Name",
 *     email: "admin@example.com",
 *     role: "admin"
 *   }
 * }
 * 
 * TOKEN HANDLING:
 * - Token stored in localStorage as 'authToken'
 * - Automatically sent in Authorization header: Bearer {token}
 * - Cleared on logout or 401 error
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../Api/endpoints';

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const isDev = typeof import.meta !== 'undefined' && import.meta.env.DEV;
    if (isDev) {
      console.log('🔐 Login thunk started with email:', email);
    }
    
    const response = await authAPI.login(email, password);
    if (isDev) {
      console.log('📡 API Response:', response);
    }
    
    const responseData = response.data;
    if (isDev) {
      console.log('📦 Response Data:', responseData);
    }
    
    // Handle both response formats:
    // Format 1: { success: true, token, user, ... } (our mock format)
    // Format 2: { status: 200, token, user, message, ... } (real API format)
    const isSuccessful = responseData.success === true || responseData.status === 200;
    
    if (!isSuccessful) {
      if (isDev) {
        console.error('❌ Response not successful:', responseData.message);
      }
      return rejectWithValue(responseData.message || 'Login failed');
    }
    
    const token = responseData.token;
    const user = responseData.user;
    
    if (isDev) {
      console.log('✅ Token extracted:', token);
    }
    
    if (!token) {
      if (isDev) {
        console.error('❌ No token found in response');
      }
      return rejectWithValue('No token in API response');
    }
    
    if (isDev) {
      console.log('🎫 Token:', token);
    }
    
    // Store in localStorage immediately for ProtectedRoute fallback
    localStorage.setItem('authToken', token);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    // Return both token and user for Redux state
    const result = { token, user };
    if (isDev) {
      console.log('✅ Returning from thunk:', result);
    }
    return result;
  } catch (error) {
    const isDev = typeof import.meta !== 'undefined' && import.meta.env.DEV;
    if (isDev) {
      console.error('💥 Login thunk error:', error);
    }
    const errorMsg = error.response?.data?.message || error.message || 'Login failed';
    return rejectWithValue(errorMsg);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authAPI.logout();
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return null;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Logout failed');
  }
});

export const getUser = createAsyncThunk('auth/getUser', async (_, { rejectWithValue }) => {
  try {
    const response = await authAPI.getUser();
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
  }
});

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ oldPassword, newPassword, passwordConfirmation }, { rejectWithValue }) => {
    try {
      const response = await authAPI.changePassword(oldPassword, newPassword, passwordConfirmation);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change password');
    }
  }
);

const initialState = {
  user: (() => {
    try {
      const user = localStorage.getItem('user');
      return user && user !== 'undefined' ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  })(),
  token: localStorage.getItem('authToken') || null,
  loading: false,
  error: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.successMessage = null;
    },
    restoreAuth: (state) => {
      // Restore auth state from localStorage
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
      if (token) {
        state.token = token;
      }
      if (user) {
        try {
          state.user = JSON.parse(user);
        } catch {
          state.user = null;
          localStorage.removeItem('user');
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('🎉 Login fulfilled - payload:', action.payload);
        state.loading = false;
        // Ensure we have both token and user
        const payload = action.payload;
        state.token = payload.token;
        state.user = payload.user;
        state.error = null;
        state.successMessage = 'Login successful';
        console.log('✅ Redux state updated - token:', state.token);
        
        // Double-check persistence
        if (state.token) {
          localStorage.setItem('authToken', state.token);
        }
        if (state.user) {
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.successMessage = 'Logout successful';
        // Clear localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Password changed successfully';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
