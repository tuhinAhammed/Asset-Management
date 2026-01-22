import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Factory function to create CRUD slices for API modules
 * @param {string} name - Slice name
 * @param {object} api - API object with list, single, create, update, delete methods
 * @returns {object} - Redux slice
 */
export const createCRUDSlice = (name, api) => {
  const fetchList = createAsyncThunk(
    `${name}/fetchList`,
    async (params = {}, { rejectWithValue }) => {
      try {
        const response = await api.list(params);
        return response.data.data || response.data.list || response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || `Failed to fetch ${name} list`);
      }
    }
  );

  const fetchSingle = createAsyncThunk(
    `${name}/fetchSingle`,
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.single(id);
        return response.data.data || response.data.list || response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || `Failed to fetch ${name}`);
      }
    }
  );

  const createItem = createAsyncThunk(
    `${name}/create`,
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.create(data);
        return response.data.data || response.data.list || response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || `Failed to create ${name}`);
      }
    }
  );

  const updateItem = createAsyncThunk(
    `${name}/update`,
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await api.update(id, data);
        return response.data.data || response.data.list || response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || `Failed to update ${name}`);
      }
    }
  );

  const deleteItem = createAsyncThunk(
    `${name}/delete`,
    async (id, { rejectWithValue }) => {
      try {
        await api.delete(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || `Failed to delete ${name}`);
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
