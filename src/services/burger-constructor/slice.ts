import {
  PayloadAction,
  createSlice,
  isPending,
  isRejected,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { act } from 'react-dom/test-utils';
import { orderBurger } from './actions';

type TBurgerConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error?: string;
};

const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          const ingredient = action.payload;
          state.constructorItems.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const ingredient = state.constructorItems.ingredients.splice(
        action.payload,
        1
      )[0];
      state.constructorItems.ingredients.splice(
        action.payload - 1,
        0,
        ingredient
      );
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const ingredient = state.constructorItems.ingredients.splice(
        action.payload,
        1
      )[0];
      state.constructorItems.ingredients.splice(
        action.payload + 1,
        0,
        ingredient
      );
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.constructorItems.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );
      if (index !== -1) {
        state.constructorItems.ingredients.splice(index, 1);
      }
    },
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderModalData = action.payload;
    },
    clearOrderModalData(state) {
      state.orderModalData = null;
    },
    clearConstructorItems(state) {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    }
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderModalData: (state) => state.orderModalData,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      });
  }
});

export const {
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient,
  setOrderModalData,
  clearOrderModalData,
  clearConstructorItems
} = burgerConstructorSlice.actions;
export const { getConstructorItems, getError, getOrderModalData } =
  burgerConstructorSlice.selectors;
