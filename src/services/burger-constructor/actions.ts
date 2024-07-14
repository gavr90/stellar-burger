import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const orderBurger = createAsyncThunk(
  'orders/send',
  async (itemsIds: string[], { rejectWithValue }) => {
    try {
      const result = await orderBurgerApi(itemsIds);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
