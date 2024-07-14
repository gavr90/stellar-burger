import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { getOrderByNumber, getOrders } from './actions';
import { TOrder } from '@utils-types';

type TProfileOrdersState = {
  orders: Array<TOrder>;
  selectedOrder: Array<TOrder>;
  selectedOrderId: string | null;
  isLoading: boolean;
  error?: string;
};

const initialState: TProfileOrdersState = {
  orders: [],
  selectedOrder: [],
  selectedOrderId: null,
  isLoading: false
};

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  selectors: {
    getProfileOrders: (state) => state.orders,
    getSelectedOrder: (state) => state.selectedOrder[0],
    getSelectedOrderId: (state) => state.selectedOrder[0]._id
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedOrder = action.payload.orders;
      })
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(isRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { getProfileOrders, getSelectedOrder, getSelectedOrderId } =
  profileOrdersSlice.selectors;
