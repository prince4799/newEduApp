import { LoginAction, LoginState, LoginUser } from "./LoginInterface";

export const initialState: LoginState = {
  loading: false,
  error: null,
  user: null,
};

export function loginReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'LOGIN_FAILURE':
      // console.log("loginReducer error",  state);
      
      return { ...state, loading: false, error: action.payload, };
    default:
      return state;
  }
}
