import { expect, test, describe } from '@jest/globals';
import { ingredientsSlice } from '../src/services/ingredients/ingredients-slice';
import { getIngredients } from '../src/services/ingredients/actions';

describe('тесты экстра-редюсеров ingredientsSlice', function() {
  const initialState = {
    loading: false,
    ingredients: [],
  };

  test('вызов getIngredients.pending, переменная loading, отвечающая за текущий запрос, меняется на true', function() {
    const newState = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('')
    );

    expect(newState).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('вызов getIngredients.fulfilled, полученные ингредиенты записываются в стейт, переменная loading меняется на false', function() {
    const ingredients = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '2',
        name: 'Начинка',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      }
    ];

    const newState = ingredientsSlice.reducer({
      ...initialState,
      loading: true
      },      
      getIngredients.fulfilled(ingredients,'')
    );

    expect(newState).toEqual({
      loading: false,
      ingredients: ingredients
    });
  });

  test('вызов getIngredients.rejected, полученная ошибка записывается в стейт, переменная loading меняется на false', function() {
    const error = new Error('Test error')
    
    const newState = ingredientsSlice.reducer({
      ...initialState,
      loading: true
      },      
      getIngredients.rejected(error, '')
    );

    expect(newState).toEqual({
      ...initialState,
      loading: false,
      error: error.message
    });
  });
});