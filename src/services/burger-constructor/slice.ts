import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurger } from './actions';

type TBurgerConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderResult: TOrder | null;
  error?: string;
};

const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderResult: null
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
    clearOrderResult(state) {
      state.orderResult = null;
    },
    clearConstructorItems(state) {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    }
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderRequest: (state) => state.orderRequest,
    getOrderResult: (state) => state.orderResult
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderResult = action.payload.order;
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
  clearOrderResult,
  clearConstructorItems
} = burgerConstructorSlice.actions;
export const { getConstructorItems, getOrderRequest, getOrderResult } =
  burgerConstructorSlice.selectors;
