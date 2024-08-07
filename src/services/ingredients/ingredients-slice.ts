import { createSelector, createSlice, SerializedError } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

type TIngredientsState = {
  loading: boolean;
  ingredients: Array<TIngredient>;
  error?: string;
};

const initialState: TIngredientsState = {
  loading: false,
  ingredients: []
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getAllIngredients: (state) => state.ingredients,
    getBuns: createSelector(
      (state: TIngredientsState) => state.ingredients,
      (ingredients) =>
        ingredients.filter((ingredient) => ingredient.type.includes('bun'))
    ),
    getMains: createSelector(
      (state: TIngredientsState) => state.ingredients,
      (ingredients) =>
        ingredients.filter((ingredient) => ingredient.type.includes('main'))
    ),
    getSauces: createSelector(
      (state: TIngredientsState) => state.ingredients,
      (ingredients) =>
        ingredients.filter((ingredient) => ingredient.type.includes('sauce'))
    ),
    getIngredientsLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  getAllIngredients,
  getIngredientsLoading,
  getBuns,
  getMains,
  getSauces
} = ingredientsSlice.selectors;
