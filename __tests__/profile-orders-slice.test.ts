import { expect, test, describe } from '@jest/globals';
import { profileOrdersSlice } from '../src/services/profile-orders/profile-orders-slice';
import { getOrders, getOrderByNumber } from '../src/services/profile-orders/actions';

describe('тесты экстра-редюсеров profileOrdersSlice', function() {
  const initialState = {
    orders: [],
    selectedOrder: [],
    loading: false
  };

  test('вызов getOrders.pending, переменная loading, отвечающая за текущий запрос, меняется на true', function() {
    const newState = profileOrdersSlice.reducer(
      initialState,
      getOrders.pending('')
    );

    expect(newState).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('вызов getOrders.fulfilled, полученные заказы записываются в стейт, переменная loading меняется на false', function() {
    const orders = [
          {
              _id: '1',
              ingredients: [
                  '1',
                  '3',
                  '4'
              ],
              status: 'done',
              name: 'Тестовый бургер 1',
              createdAt: '2024-07-17T20:16:58.543Z',
              updatedAt: '2024-07-17T20:16:58.981Z',
              number: 123
          },
          {
              _id: '2',
              ingredients: [
                  '2',
                  '5',
                  '6'
              ],
              status: 'done',
              name: 'Тестовый бургер 2',
              createdAt: '2024-07-17T19:56:05.663Z',
              updatedAt: '2024-07-17T19:56:08.160Z',
              number: 124
          }
        ];

    const newState = profileOrdersSlice.reducer({
      ...initialState,
      loading: true
      },      
      getOrders.fulfilled(orders,'')
    );

    expect(newState).toEqual({
      ...initialState,
      orders: orders,
    });
  });

  test('вызов getOrders.rejected, полученная ошибка записывается в стейт, переменная loading меняется на false', function() {
    const error = new Error('Test error')
    
    const newState = profileOrdersSlice.reducer({
      ...initialState,
      loading: true
      },      
      getOrders.rejected(error, '')
    );

    expect(newState).toEqual({
      ...initialState,
      error: error.message
    });
  });

  test('вызов getOrderByNumber.pending, переменная loading, отвечающая за текущий запрос, меняется на true', function() {
    const newState = profileOrdersSlice.reducer(
      initialState,
      getOrderByNumber.pending('', 123)
    );

    expect(newState).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('вызов getOrderByNumber.fulfilled, полученныq заказ записывается в стейт, переменная loading меняется на false', function() {
    const orderResponse = {
      success: true,
      orders: [
        {
          _id: '1',
          ingredients: [
              '1',
              '3',
              '4'
          ],
          status: 'done',
          name: 'Тестовый бургер 1',
          createdAt: '2024-07-17T20:16:58.543Z',
          updatedAt: '2024-07-17T20:16:58.981Z',
          number: 123
        }
      ]
    };
     
    const newState = profileOrdersSlice.reducer({
      ...initialState,
      loading: true
      },      
      getOrderByNumber.fulfilled(orderResponse, '', 123)
    );

    expect(newState).toEqual({
      ...initialState,
      selectedOrder: orderResponse.orders
    });
  });

  test('вызов getOrderById.rejected, полученная ошибка записывается в стейт, переменная loading меняется на false', function() {
    const error = new Error('Test error')
    
    const newState = profileOrdersSlice.reducer({
      ...initialState,
      loading: true
      },      
      getOrderByNumber.rejected(error, '', 123)
    );

    expect(newState).toEqual({
      ...initialState,
      error: error.message
    });
  });
});