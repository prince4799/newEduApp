import { User, SignupAction } from './SignupInterface';

export function signupRequest(): SignupAction {
  return { type: 'SIGNUP_REQUEST' };
}

export function signupSuccess(user: User): SignupAction {
  return { type: 'SIGNUP_SUCCESS', payload: user };
}

export function signupFailure(error: string): SignupAction {
  return { type: 'SIGNUP_FAILURE', payload: error };
}
