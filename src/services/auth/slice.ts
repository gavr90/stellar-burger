import {
  PayloadAction,
  createSlice,
  isPending,
  isRejected
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUser, logout, registerUser, updateUser } from './actions';

type TAuthState = {
  loading: boolean;
  user: TUser | null;
  isAuthChecked: boolean;
  error?: string;
};

const initialState: TAuthState = {
  loading: false,
  user: null,
  isAuthChecked: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getAuthLoading: (state) => state.loading,
    getAuthError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { getUser, getIsAuthChecked, getAuthError } = authSlice.selectors;
export const { setUser, setIsAuthChecked } = authSlice.actions;
