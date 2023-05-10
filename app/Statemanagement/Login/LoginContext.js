import React, { createContext, useContext, useReducer } from 'react';
import { loginReducer, initialState } from './LoginReducer';
import { loginRequest, loginSuccess, loginFailure } from './LoginAction';
import { BASE_URL } from '../../Constants/Constants';
import { alert, apiCaling, printLog } from '../../Assets/Utils/ExtenFunc';

const LoginContext = createContext({
  state: initialState,
  dispatch: () => { },
  loginUser: () => { },
});

export const LoginProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  // const data=''
  const loginUser = async (user) => {
    dispatch(loginRequest());
    console.log("loginuser", user)
    const options = {
      Admin: {
        url: 'admin/auth/login',
        body: {
          "userid": "Derma4799",
          "password": "Qwerty98",
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // "x-secret-key": "#heyram@"
        },
      },
      User: {
        url: 'auth/signin',
        body: {
          "userid": "Prince4799",
          "password": "12340000"
        },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
    };
    if (user.userType === 'Admin') {
      options.Admin.headers[user.secret.secretKey] = user.secret.secretValue;
    }

    try {
      const response = await apiCaling(user.userType == 'Admin' ? options.Admin : options.User);
      if (response.statuscode == 200) {
        dispatch(loginSuccess(response));
      } else {
        dispatch(loginFailure(response));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    state,
    dispatch,
    loginUser,
  };

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  );
};

export function useLogin() {
  return useContext(LoginContext);
}
