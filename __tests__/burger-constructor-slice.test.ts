import {expect, test, describe} from '@jest/globals';
import { burgerConstructorSlice, addIngredient, clearConstructorItems, clearOrderResult, moveIngredientDown, moveIngredientUp, removeIngredient } from '../src/services/burger-constructor/burger-constructor-slice';
import { orderBurger } from '../src/services/burger-constructor/actions';

describe('тесты редюсеров и экстра-редюсеров burgerConstructorSlice', function() {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderResult: null
  };

  const bun = {
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
  };

  const bunWithId = {
    ...bun,
    id: 'test-id-bun'
  }

  const mainIngredient = {
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
  };

  const mainIngredientWithId = {
    ...mainIngredient,
    id: 'test-id-main'
  }

  const sauceIngredient = {
    _id: '3',
    name: 'Соус',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  }

  const sauceIngredientWithId = {
    ...sauceIngredient,
    id: 'test-id-sauce'
  }

  test('начальное состояние', () => {
    expect(burgerConstructorSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('addIngredient - добавление булки в конструктор', function() {
      const testAction = { type: addIngredient.type, payload: bunWithId};
      const newState = burgerConstructorSlice.reducer(initialState, testAction)
      expect(newState.constructorItems.bun).toEqual(bunWithId);
  });

  test('addIngredient - добавление ингредиента (не булки) в конструктор', function() {
    const testAction = { type: addIngredient.type, payload: mainIngredientWithId};
    const newState = burgerConstructorSlice.reducer(initialState, testAction)
    expect(newState.constructorItems.ingredients).toEqual([mainIngredientWithId]);
  });

  test('moveIngredientUp - перемещение ингредиента вверх по списку', function() {
    const ingredients = [
      mainIngredientWithId,
      sauceIngredientWithId
    ];

    const stateWithIngredients = {
      ...initialState,
      constructorItems: { 
        bun: null, ingredients }
    };

    const newState = burgerConstructorSlice.reducer(
      stateWithIngredients,
      moveIngredientUp(1)
    );

    expect(newState.constructorItems.ingredients).toEqual([
        sauceIngredientWithId,
        mainIngredientWithId
      ])
  });

  test('moveIngredientDown - перемещение ингредиента вниз по списку', function() {
    const ingredients = [
      mainIngredientWithId,
      sauceIngredientWithId
    ];

    const stateWithIngredients = {
      ...initialState,
      constructorItems: { bun: null, ingredients }
    };

    const newState = burgerConstructorSlice.reducer(
      stateWithIngredients,
      moveIngredientDown(0)
    );

    expect(newState.constructorItems.ingredients).toEqual([
        sauceIngredientWithId,
        mainIngredientWithId
      ])
  });

  test('removeIngredient - удаление ингредиента из конструктора', function() {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [mainIngredientWithId]
      }
    };
    const newState = burgerConstructorSlice.reducer(
      stateWithIngredient,
      removeIngredient(mainIngredientWithId)
    );
    expect(newState.constructorItems.ingredients).toEqual([]);
  });

  test('clearOrderResult - очистка заказа', function() {
    const stateWithOrder = {
      ...initialState,
      orderResult: { 
        _id: '1',
        ingredients: [
            '1',
            '2',
            '3'
        ],
        status: 'done',
        name: 'Тестовый бургер',
        createdAt: '2024-07-16T20:30:11.514Z',
        updatedAt: '2024-07-16T20:30:11.923Z',
        number: 456
      }
    };
    const newState = burgerConstructorSlice.reducer(stateWithOrder, clearOrderResult());
    expect(newState.orderResult).toBeNull();
  });

  test('clearConstructorItems - очистка конструктора', function() {
    const stateWithItems = {
      ...initialState,
      constructorItems: {
        bun: bunWithId,
        ingredients: [
          mainIngredientWithId,
          sauceIngredientWithId
        ]
      }
    };
    const newState = burgerConstructorSlice.reducer(stateWithItems, clearConstructorItems());
    expect(newState.constructorItems).toEqual({ bun: null, ingredients: [] });
  });

  test('вызов orderBurger.pending, переменная orderRequest, отвечающая за текущий запрос, меняется на true', function() {
    const newState = burgerConstructorSlice.reducer(
      initialState,
      orderBurger.pending('', ['1', '2', '3'])
    );

    expect(newState).toEqual({
      ...initialState,
      orderRequest: true
    });
  });

  test('вызов orderBurger.fulfilled, полученныq заказ записывается в стейт, переменная orderRequest меняется на false', function() {
    const newOrderResponse = {
      success: true,
      name: 'test-name',
      order: {
        _id: '1',
        ingredients: [
            '1',
            '2',
            '3'
        ],
        status: 'created',
        name: 'Тестовый бургер 1',
        createdAt: '2024-07-17T20:16:58.543Z',
        updatedAt: '2024-07-17T20:16:58.981Z',
        number: 123
      }
    };
     
    const newState = burgerConstructorSlice.reducer({
      ...initialState,
      orderRequest: true
      },      
      orderBurger.fulfilled(newOrderResponse, '', ['1', '2', '3'])
    );

    expect(newState).toEqual({
      ...initialState,
      orderResult: newOrderResponse.order
    });
  });

  test('вызов orderBurger.rejected, полученная ошибка записывается в стейт, переменная orderRequest меняется на false', function() {
    const error = new Error('Test error')
    
    const newState = burgerConstructorSlice.reducer({
      ...initialState,
      orderRequest: true
      },      
      orderBurger.rejected(error, '', ['1', '2', '3'])
    );

    expect(newState).toEqual({
      ...initialState,
      error: error.message
    });
  });
});