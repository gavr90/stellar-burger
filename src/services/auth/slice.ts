import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUser,
  logout,
  registerUser,
  updateUser,
  getUser
} from './actions';

type TAuthState = {
  loading: boolean;
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  error?: string;
};

const initialState: TAuthState = {
  loading: false,
  user: null,
  isAuthChecked: false,
  isAuthenticated: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    getUserSelector: (state) => state.user,
    getUserName: (state) => state.user?.name,
    getUserEmail: (state) => state.user?.email,
    getIsAuthChecked: (state) => state.isAuthChecked,
    authenticatedSelector: (state) => state.isAuthenticated,
    getAuthLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected, (state, action) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.error = action.error.message;
      });
  }
});

export const {
  getUserSelector,
  getUserName,
  getUserEmail,
  getIsAuthChecked,
  authenticatedSelector
} = authSlice.selectors;
