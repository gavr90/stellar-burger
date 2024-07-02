import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../../utils/cookie';

export const getFeed = createAsyncThunk(
  'feed',
  async (_, { rejectWithValue }) => {
    try {
      return await getFeedsApi();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
