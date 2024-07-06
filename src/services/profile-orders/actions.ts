import { getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrders = createAsyncThunk(
  'orders/get',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (data: number, { rejectWithValue }) => {
    try {
      return await getOrderByNumberApi(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
