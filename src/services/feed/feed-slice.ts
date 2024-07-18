import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeed } from './actions';
import { TOrder } from '@utils-types';

type TFeedsState = {
  feed: {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
  };
  loading: boolean;
  error?: string;
};

const initialState: TFeedsState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (state) => state.feed,
    getAllOrders: (state) => state.feed.orders,
    getFeedLoading: (state) => state.loading,
    getFeedError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { getFeedSelector, getAllOrders, getFeedLoading, getFeedError } =
  feedSlice.selectors;
