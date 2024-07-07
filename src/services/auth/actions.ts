import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => {
    const result = await registerUserApi(data);
    setCookie('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    return result.user;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => {
    const result = await loginUserApi(data);
    setCookie('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    return result.user;
  }
);

export const getUser = createAsyncThunk('auth/getUser', getUserApi);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user: Partial<TRegisterData>) => {
    const result = await updateUserApi(user);
    return result.user;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});
