export interface LoginUser {
    id: string | number;
    password: string;
}



export interface LoginState {
    loading: boolean;
    error: string | null;
    user: LoginUser | null;
}

export type LoginAction =
    | { type: 'LOGIN_REQUEST' }
    | { type: 'LOGIN_SUCCESS'; payload: LoginUser }
    | { type: 'LOGIN_FAILURE'; payload: string };
