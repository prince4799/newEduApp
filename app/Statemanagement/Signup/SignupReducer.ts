import { SignupAction, SignupState, User } from "./SignupInterface";

export const initialState: SignupState = {
  loading: false,
  error: null,
  user: null,
};

export function signupReducer(state: SignupState, action: SignupAction): SignupState {
  switch (action.type) {
    case 'SIGNUP_REQUEST':
      return { ...state, loading: true, error: null };
    case 'SIGNUP_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'SIGNUP_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
