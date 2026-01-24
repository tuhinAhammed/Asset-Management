// Redux/Slice/landingPageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../Api/axiosInstance'

export const fetchLandingPageData = createAsyncThunk(
  'landingPage/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      // Fetch landing page settings from backend
      const response = await axiosInstance.get('/settings');
      
      // Extract data with defensive handling
      const data = response.data?.data || response.data || {};
      return data;
    } catch (error) {
      // Return rejection with error message
      const message = error.response?.data?.message || error.message || 'Failed to fetch landing page data';
      return rejectWithValue(message);
    }
  }
)

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: false
}

const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState,
  reducers: {
    clearLandingPageData: (state) => {
      state.data = null
      state.error = null
    },
    clearLandingPageError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandingPageData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLandingPageData.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
        state.error = null
        state.success = true
      })
      .addCase(fetchLandingPageData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'An error occurred'
        state.success = false
        state.data = null
      })
  }
})

export const { clearLandingPageData, clearLandingPageError } = landingPageSlice.actions
export default landingPageSlice.reducer