import { LoginUser, LoginAction } from './LoginInterface';
import * as CONST from "../../Constants/Constants";

export function loginRequest(): LoginAction {
  return { type: CONST.LOGIN_REQUEST };
}

export function loginSuccess(user: LoginUser): LoginAction {
  return { type: CONST.LOGIN_SUCCESS, payload: user };
}

export function loginFailure(error: string): LoginAction {
  return { type: CONST.LOGIN_FAILURE, payload: error };
}
