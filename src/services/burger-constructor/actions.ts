import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const orderBurger = createAsyncThunk(
  'orders/send',
  async (itemsIds: string[]) => {
    const result = await orderBurgerApi(itemsIds);
    return result;
  }
);
