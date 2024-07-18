import { expect, test, describe } from '@jest/globals';
import { feedSlice } from '../src/services/feed/feed-slice';
import { getFeed } from '../src/services/feed/actions';

describe('тесты экстра-редюсеров feedSlice', function() {
  const initialState = {
    feed: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    loading: false
  };

  test('вызов getFeed.pending, переменная loading, отвечающая за текущий запрос, меняется на true', function() {
    const newState = feedSlice.reducer(
      initialState,
      getFeed.pending('')
    );

    expect(newState).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('вызов getFeed.fulfilled, полученные заказы записываются в стейт, переменная loading меняется на false', function() {
    const feedResponse = {
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
        ],
        total: 100,
        totalToday: 10
      }

    const newState = feedSlice.reducer({
      ...initialState,
      loading: true
      },      
      getFeed.fulfilled(feedResponse,'')
    );

    expect(newState).toEqual({
      loading: false,
      feed: feedResponse
    });
  });

  test('вызов getFeed.rejected, полученная ошибка записывается в стейт, переменная loading меняется на false', function() {
    const error = new Error('Test error')
    
    const newState = feedSlice.reducer({
      ...initialState,
      loading: true
      },      
      getFeed.rejected(error, '')
    );

    expect(newState).toEqual({
      ...initialState,
      error: error.message
    });
  });
});