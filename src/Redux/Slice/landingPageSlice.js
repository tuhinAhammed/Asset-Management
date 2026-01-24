// Redux/Slice/landingPageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Disabled: Settings endpoint not available on backend
// import { langingPageApi } from '../../Api/Api'

export const fetchLandingPageData = createAsyncThunk(
  'landingPage/fetchData',
  async (_, { rejectWithValue }) => {
    // Settings endpoint disabled - not implemented on backend
    // Return empty data by default
    return null;
  }
)

const initialState = {
  data: null  // Only store data, no loading/error states
}

const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState,
  reducers: {
    clearLandingPageData: (state) => {
      state.data = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandingPageData.fulfilled, (state, action) => {
        state.data = action.payload
      })
      // Remove pending and rejected cases since we don't track loading/error
  }
})

export const { clearLandingPageData } = landingPageSlice.actions
export default landingPageSlice.reducer