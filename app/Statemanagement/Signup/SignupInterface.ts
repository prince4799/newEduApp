export interface User {
    username: string;
    email: string;
    password: string;
    contact: string;
}

export interface SignupState {
    loading: boolean;
    error: string | null;
    user: User | null;
}

export type SignupAction =
    | { type: 'SIGNUP_REQUEST' }
    | { type: 'SIGNUP_SUCCESS'; payload: User }
    | { type: 'SIGNUP_FAILURE'; payload: string };
