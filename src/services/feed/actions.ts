import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeed = createAsyncThunk('feed', getFeedsApi);
