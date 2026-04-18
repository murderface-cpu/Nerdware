import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/kyClient'

// Async thunk
export const fetchPortfolios = createAsyncThunk(
  'portfolios/fetchPortfolios',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('portfolios').json();

      if (res.data?.portfolios) {
        return res.data.portfolios;
      } else if (res.portfolios) {
        return res.portfolios;
      } else if (Array.isArray(res)) {
        return res;
      } else {
        console.error('Unexpected API response structure:', res);
        return rejectWithValue('Invalid data structure from API');
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to fetch portfolios';
      return rejectWithValue(errorMessage);
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolios',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolios.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPortfolios.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPortfolios.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// ✅ Selectors
export const selectAllPortfolios    = (state) => state.portfolios.items;
export const selectPortfoliosStatus = (state) => state.portfolios.status;
export const selectPortfoliosError  = (state) => state.portfolios.error;

// ✅ Reducer
export default portfolioSlice.reducer;