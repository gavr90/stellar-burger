import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { authSlice } from './auth/auth-slice';
import { ingredientsSlice } from './ingredients/ingredients-slice';
import { burgerConstructorSlice } from './burger-constructor/burger-constructor-slice';
import { feedSlice } from './feed/feed-slice';
import { profileOrdersSlice } from './profile-orders/profile-orders-slice';

export const rootReducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
  [feedSlice.reducerPath]: feedSlice.reducer,
  [profileOrdersSlice.reducerPath]: profileOrdersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
