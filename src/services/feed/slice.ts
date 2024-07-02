import { createSelector, createSlice } from '@reduxjs/toolkit';
import { getFeed } from './actions';
import { TOrder } from '@utils-types';

type TFeedsState = {
  feed: {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
  };
  isLoading: boolean;
  error?: string;
};

const initialState: TFeedsState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getAllOrders: (state) => state.feed.orders,
    getTotal: (state) => state.feed.total,
    getTotalToday: (state) => state.feed.total,
    getFeedLoading: (state) => state.isLoading,
    getFeedError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload;
      })
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { getAllOrders, getFeedLoading, getFeedError } =
  feedSlice.selectors;
