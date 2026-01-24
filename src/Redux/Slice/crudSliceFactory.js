import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Factory function to create CRUD slices for API modules
 * @param {string} name - Slice name
 * @param {object} api - API object with list, single, create, update, delete methods
 * @returns {object} - Redux slice
 */
export const createCRUDSlice = (name, api) => {
  // Helper to extract array data from response
  const extractListData = (response) => {
    let data = response.data.data || response.data.list || response.data;
    
    // Handle nested structures
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      if (Array.isArray(data.list)) {
        data = data.list;
      } else if (Array.isArray(data.data)) {
        data = data.data;
      }
    }
    
    // If it's an array, return it
    if (Array.isArray(data)) return data;
    
    return [];
  };

  const fetchList = createAsyncThunk(
    `${name}/fetchList`,
    async (params = {}, { rejectWithValue }) => {
      try {
        const response = await api.list(params);
        
        // Handle error responses
        if (response.status !== 200 && response.status !== 201) {
          return rejectWithValue(response.data?.message || `Failed to fetch ${name} list`);
        }
        
        let data = extractListData(response);
        
        // Validate array items - filter out items with invalid status codes as field values
        if (Array.isArray(data)) {
          data = data.filter(item => {
            // Must have an id
            if (!item || typeof item !== 'object' || !item.id) {
              console.warn(`Filtered out item without id:`, item);
              return false;
            }
            
            // Filter out items where status is a number
            if (typeof item.status === 'number') {
              console.warn(`Filtered out malformed item with numeric status:`, item);
              return false;
            }
            
            // Filter string status values that look like HTTP error codes
            if (typeof item.status === 'string') {
              const trimmedStatus = item.status.trim();
              // Check if it's a 3-digit HTTP error code
              if (/^\d{3}$/.test(trimmedStatus)) {
                console.warn(`Filtered out item with HTTP error code status:`, item);
                return false;
              }
              // Check common valid status values
              if (!['active', 'inactive', 'draft', 'published', 'pending', 'approved', 'rejected'].includes(trimmedStatus.toLowerCase())) {
                // If status doesn't match any known status, filter it out
                if (trimmedStatus !== '' && trimmedStatus.toLowerCase() !== 'true' && trimmedStatus.toLowerCase() !== 'false') {
                  console.warn(`Filtered out item with invalid status:`, item);
                  return false;
                }
              }
            }
            
            return true;
          });
        }
        
        return data;
      } catch (error) {
        console.error(`Error fetching ${name}:`, error);
        const message = error?.message || error?.data?.message || `Failed to fetch ${name} list`;
        return rejectWithValue(message);
      }
    }
  );

  const fetchSingle = createAsyncThunk(
    `${name}/fetchSingle`,
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.single(id);
        if (response.status !== 200 && response.status !== 201) {
          return rejectWithValue(response.data?.message || `Failed to fetch ${name}`);
        }
        return response.data.data || response.data.list || response.data;
      } catch (error) {
        console.error(`Error fetching single ${name}:`, error);
        const message = error?.message || error?.data?.message || `Failed to fetch ${name}`;
        return rejectWithValue(message);
      }
    }
  );

  const createItem = createAsyncThunk(
    `${name}/create`,
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.create(data);
        if (response.status !== 200 && response.status !== 201) {
          return rejectWithValue(response.data?.message || `Failed to create ${name}`);
        }
        return response.data.data || response.data.list || response.data;
      } catch (error) {
        console.error(`Error creating ${name}:`, error);
        const message = error?.message || error?.data?.message || `Failed to create ${name}`;
        return rejectWithValue(message);
      }
    }
  );

  const updateItem = createAsyncThunk(
    `${name}/update`,
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await api.update(id, data);
        if (response.status !== 200 && response.status !== 201) {
          return rejectWithValue(response.data?.message || `Failed to update ${name}`);
        }
        return response.data.data || response.data.list || response.data;
      } catch (error) {
        console.error(`Error updating ${name}:`, error);
        const message = error?.message || error?.data?.message || `Failed to update ${name}`;
        return rejectWithValue(message);
      }
    }
  );

  const deleteItem = createAsyncThunk(
    `${name}/delete`,
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.delete(id);
        if (response.status !== 200 && response.status !== 201) {
          return rejectWithValue(response.data?.message || `Failed to delete ${name}`);
        }
        return id;
      } catch (error) {
        console.error(`Error deleting ${name}:`, error);
        const message = error?.message || error?.data?.message || `Failed to delete ${name}`;
        return rejectWithValue(message);
      }
    }
  );

  const initialState = {
    items: [],
    currentItem: null,
    loading: false,
    itemLoading: false,
    error: null,
    successMessage: null,
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      clearError: (state) => {
        state.error = null;
      },
      clearSuccess: (state) => {
        state.successMessage = null;
      },
      setCurrentItem: (state, action) => {
        state.currentItem = action.payload;
      },
      clearCurrentItem: (state) => {
        state.currentItem = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // Fetch List
        .addCase(fetchList.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchList.fulfilled, (state, action) => {
          state.loading = false;
          state.items = Array.isArray(action.payload) ? action.payload : [];
        })
        .addCase(fetchList.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // Fetch Single
        .addCase(fetchSingle.pending, (state) => {
          state.itemLoading = true;
          state.error = null;
        })
        .addCase(fetchSingle.fulfilled, (state, action) => {
          state.itemLoading = false;
          state.currentItem = action.payload;
        })
        .addCase(fetchSingle.rejected, (state, action) => {
          state.itemLoading = false;
          state.error = action.payload;
        })
        // Create
        .addCase(createItem.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createItem.fulfilled, (state, action) => {
          state.loading = false;
          state.items.push(action.payload);
          state.successMessage = `${name} created successfully`;
        })
        .addCase(createItem.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // Update
        .addCase(updateItem.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateItem.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.items.findIndex((item) => item.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
          state.currentItem = action.payload;
          state.successMessage = `${name} updated successfully`;
        })
        .addCase(updateItem.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // Delete
        .addCase(deleteItem.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteItem.fulfilled, (state, action) => {
          state.loading = false;
          state.items = state.items.filter((item) => item.id !== action.payload);
          state.successMessage = `${name} deleted successfully`;
        })
        .addCase(deleteItem.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

  return {
    reducer: slice.reducer,
    actions: {
      ...slice.actions,
      fetchList,
      fetchSingle,
      createItem,
      updateItem,
      deleteItem,
    },
  };
};
