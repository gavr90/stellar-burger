import { expect, test, describe } from '@jest/globals';
import { authSlice, getIsAuthChecked } from '../src/services/auth/auth-slice';
import {
  loginUser,
  logout,
  registerUser,
  updateUser,
  getUser
} from '../src/services/auth/actions';
import { TUser } from '../src/utils/types' 
import { TRegisterData, TLoginData } from '../src/utils/burger-api'

describe('тесты экстра-редюсеров userSlice', function() {
  const initialState = {
    loading: false,
    user: null,
    isAuthChecked: false,
    isAuthenticated: false
  };

  const loggedInUserState = {
    loading: false,
    user: {
      email: 'test-user-1@ya.ru',
      name: 'test-user-1'
    },
    isAuthChecked: true,
    isAuthenticated: true
  }

  const userData: TUser = {
    email: 'test-user-2@ya.ru',
    name: 'test-user-2'
  };

  const registerData: TRegisterData = {
    email: 'test-register-user@ya.ru',
    name: 'test-register-user',
    password: 'register-password'
  };

  const loginData: TLoginData = {
    email: 'test-login-user@ya.ru',
    password: 'login-password'
  };

  const error = new Error('Test error')

  test('вызов getUser.pending, переменная loading, отвечающая за текущий запрос, меняется на true', function() {
    const newState = authSlice.reducer(
      initialState,
      getUser.pending('')
    );

    expect(newState).toEqual({
      ...initialState, 
      loading: true
    });
  });
  
  test('вызов getUser.fulfilled, данные пользователя записываются в стейт, переменная loading меняется на false, isAuthenticaded и isAurhChecked меняются на true', function() {
    const userResponse = {
      success: true,
      user: userData
    }
    
    const newState = authSlice.reducer({
      ...initialState,
      loading: true
    },
      getUser.fulfilled(userResponse, '')
    );

    expect(newState).toEqual({
      loading: false,
      user: userData,
      isAuthChecked: true,
      isAuthenticated: true
    });
  });

  test('вызов getUser.rejected, полученная ошибка записывается в стейт, переменная loading меняется на false', function() {
    const newState = authSlice.reducer({
      ...initialState,
      loading: true
      },      
      getUser.rejected(error, '')
    );

    expect(newState).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
      error: error.message
    });
  });
 
  test('вызов registerUser.pending, переменная loading, отвечающая за текущий запрос, меняется на true', function() {
    const newState = authSlice.reducer(
      initialState,
      registerUser.pending('', registerData)
    );

    expect(newState).toEqual({
      ...initialState, 
      loading: true
    });
  });

  test('вызов registerUser.fulfilled, данные пользователя записываются в стейт, переменная loading меняется на false, isAuthenticaded и isAuthChecked меняются на true', function() {
    const newState = authSlice.reducer({
      ...initialState,
      loading: true
    },
      registerUser.fulfilled(userData, '', registerData)
    );

    expect(newState).toEqual({
      loading: false,
      user: userData,
      isAuthChecked: true,
      isAuthenticated: true
    });
  });

  test('вызов registerUser.rejected, полученная ошибка записывается в стейт, переменная loading меняется на false, isAuthChecked меняется на true', function() {
    const newState = authSlice.reducer({
      ...initialState,
      loading: true
      },      
      registerUser.rejected(error, '', registerData)
    );

    expect(newState).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
      error: error.message
    });
  });

  test('вызов updateUser.pending, переменная loading, отвечающая за текущий запрос, меняется на true', function() {
    const newState = authSlice.reducer(
      loggedInUserState,
      updateUser.pending('', registerData)
    );

    expect(newState).toEqual({
      ...loggedInUserState, 
      loading: true
    });
  });

  test('вызов updateUser.fulfilled, данные пользователя записываются в стейт, переменная loading меняется на false, isAuthenticaded и isAurhChecked меняются на true', function() {
    const newState = authSlice.reducer({
      ...loggedInUserState,
      loading: true
    },
      updateUser.fulfilled(userData, '', registerData)
    );

    expect(newState).toEqual({
      ...loggedInUserState,
      loading: false,
      user: userData,
    });
  });

  test('вызов updateUser.rejected, полученная ошибка записывается в стейт, переменная loading меняется на false, isAuthChecked меняется на true', function() {
    const newState = authSlice.reducer({
      ...loggedInUserState,
      loading: true
      },      
      updateUser.rejected(error, '', registerData)
    );

    expect(newState).toEqual({
      ...loggedInUserState,
      loading: false,
      isAuthChecked: true,
      error: error.message
    });
  });

  test('вызов loginUser.pending, переменная loading, отвечающая за текущий запрос, меняется на true', function() {
    const newState = authSlice.reducer(
      initialState,
      loginUser.pending('', loginData)
    );

    expect(newState).toEqual({
      ...initialState, 
      loading: true
    });
  });

  test('вызов loginUser.fulfilled, данные пользователя записываются в стейт, переменная loading меняется на false, isAuthenticaded и isAurhChecked меняются на true', function() {
    const newState = authSlice.reducer({
      ...initialState,
      loading: true
    },
      loginUser.fulfilled(userData, '', loginData)
    );

    expect(newState).toEqual({
      loading: false,
      user: userData,
      isAuthChecked: true,
      isAuthenticated: true
    });
  });

  test('вызов loginUser.rejected, полученная ошибка записывается в стейт, переменная loading меняется на false, isAuthChecked меняется на true', function() {
    const newState = authSlice.reducer({
      ...initialState,
      loading: true
      },
      loginUser.rejected(error, '', loginData)
    );

    expect(newState).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
      error: error.message
    });
  });

  test('вызов logout.pending, переменная loading, отвечающая за текущий запрос, меняется на true', function() {
    const newState = authSlice.reducer(
      loggedInUserState,
      logout.pending('')
    );

    expect(newState).toEqual({
      ...loggedInUserState, 
      loading: true
    });
  });

  test('вызов logout.fulfilled, данные пользователя записываются в стейт, переменная loading меняется на false, isAurhChecked меняется на true', function() {
    const newState = authSlice.reducer({
      ...loggedInUserState,
      loading: true
    },
      logout.fulfilled(undefined, '')
    );

    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true
    });
  });

  test('вызов logout.rejected, полученная ошибка записывается в стейт, переменная loading меняется на false, isAuthChecked меняется на true', function() {
    const newState = authSlice.reducer({
      ...loggedInUserState,
      loading: true
      },      
      logout.rejected(error, '')
    );

    expect(newState).toEqual({
      ...loggedInUserState,
      loading: false,
      isAuthChecked: true,
      error: error.message
    });
  });
});
