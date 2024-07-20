import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { getOrderByNumber, getOrders } from './actions';
import { TOrder } from '@utils-types';

type TProfileOrdersState = {
  orders: Array<TOrder>;
  selectedOrder: Array<TOrder>;
  loading: boolean;
  error?: string;
};

const initialState: TProfileOrdersState = {
  orders: [],
  selectedOrder: [],
  loading: false
};

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  selectors: {
    getProfileOrders: (state) => state.orders,
    getSelectedOrder: (state) => state.selectedOrder[0]
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload.orders;
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { getProfileOrders, getSelectedOrder } =
  profileOrdersSlice.selectors;
