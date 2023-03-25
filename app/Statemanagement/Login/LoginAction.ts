import { LoginUser, LoginAction } from './LoginInterface';

export function loginRequest(): LoginAction {
  return { type: 'LOGIN_REQUEST' };
}

export function loginSuccess(user: LoginUser): LoginAction {
  return { type: 'LOGIN_SUCCESS', payload: user };
}

export function loginFailure(error: string): LoginAction {
  return { type: 'LOGIN_FAILURE', payload: error };
}
