import * as CONST from "../../Constants/Constants";
import { LoginAction, LoginState, LoginUser } from "./LoginInterface";

export const initialState: LoginState = {
  loading: false,
  error: null,
  user: null,
};

export function loginReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case CONST.LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case CONST.LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case CONST.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload, };
    default:
      return state;
  }
}
