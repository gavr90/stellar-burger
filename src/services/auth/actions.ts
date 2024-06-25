import {
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../../utils/cookie';
import { setIsAuthChecked, setUser } from './slice';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const result = await registerUserApi(data);
      setCookie('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
      return result.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const result = await loginUserApi(data);
      setCookie('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
      return result.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((resolve) => dispatch(setUser(resolve.user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'password-reset',
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      return await forgotPasswordApi(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'password-reset/reset',
  async (data: { password: string; token: string }, { rejectWithValue }) => {
    try {
      return await resetPasswordApi(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => await logoutApi()
);
