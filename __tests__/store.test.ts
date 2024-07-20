import { rootReducer } from '../src/services/store';
import { authSlice } from '../src/services/auth/auth-slice';
import { burgerConstructorSlice } from '../src/services/burger-constructor/burger-constructor-slice';
import { feedSlice } from '../src/services/feed/feed-slice';
import { ingredientsSlice } from '../src/services/ingredients/ingredients-slice';
import { profileOrdersSlice } from '../src/services/profile-orders/profile-orders-slice';

describe('проверка правильной инициализации rootReducer', function() {
  test('вызов rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером, возвращает корректное начальное состояние хранилища', function() {
    const testAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, testAction);
    expect(state).toEqual({
      auth: authSlice.reducer(undefined, testAction),
      ingredients: ingredientsSlice.reducer(undefined, testAction),
      burgerConstructor: burgerConstructorSlice.reducer(undefined, testAction),
      feed: feedSlice.reducer(undefined, testAction),
      profileOrders: profileOrdersSlice.reducer(undefined, testAction)
    })
  })
})
