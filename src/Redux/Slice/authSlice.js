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
    const response = await authAPI.login(email, password);
    console.log('API Response:', response.data);
    
    // Handle different possible response structures
    let token = null;
    let user = null;
    const responseData = response.data;
    
    // Check if response is successful
    if (!responseData.success) {
      console.error('Login failed:', responseData.message);
      return rejectWithValue(responseData.message || 'Login failed');
    }
    
    // Extract token and user from successful response
    if (responseData.token) {
      token = responseData.token;
      user = responseData.user;
    } else if (responseData.data?.token) {
      token = responseData.data.token;
      user = responseData.data.user;
    }
    
    console.log('Login successful. Extracted Token:', token ? 'Present' : 'Missing');
    
    if (!token) {
      console.error('No token in response. Full response:', responseData);
      return rejectWithValue('No token in API response. Check browser console for details.');
    }
    
    localStorage.setItem('authToken', token);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return { token, user };
  } catch (error) {
    console.error('Login error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
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
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token || action.payload.authorization?.token;
        state.successMessage = 'Login successful';
        // Ensure persistence
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
