import { getOrderByNumberApi, getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrders = createAsyncThunk('orders/get', getOrdersApi);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (data: number) => await getOrderByNumberApi(data)
);
