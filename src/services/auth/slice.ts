import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  forgotPassword,
  loginUser,
  logout,
  registerUser,
  resetPassword
} from './actions';

type TInitalState = {
  isRegistred: boolean;
  user: TUser | null;
  isAuthChecked: boolean;
};

const initialState: TInitalState = {
  isRegistred: false,
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
    },
    setIsRegistred: (state, action: PayloadAction<boolean>) => {
      state.isRegistred = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getIsRegistred: (state) => state.isRegistred
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isRegistred = action.payload.success;
      })
      // .addCase(resetPassword.fulfilled, (state, action) => {
      //   state.isRegistred = action.payload.success;
      // })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const { getUser, getIsAuthChecked, getIsRegistred } =
  authSlice.selectors;
export const { setUser, setIsAuthChecked, setIsRegistred } = authSlice.actions;
