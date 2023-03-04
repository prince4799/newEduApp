import React, { createContext, useContext, useReducer } from 'react';
import { loginReducer, initialState } from './LoginReducer';
import { loginRequest, loginSuccess, loginFailure } from './LoginAction';

const LoginContext = createContext({
  state: initialState,
  dispatch: () => {},
  loginUser: () => {},
});

export const LoginProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const loginUser = async (user) => {
    dispatch(loginRequest());
    console.log("loginuser",user)
    try {
      const response = await fetch('http://192.168.101.57:5500/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "userid":user.id,
          "password":user.password,
          // "userid":9621205058,
          // "password":"Qwerty56"
        }),
      });

      const data = await response.json();
      // console.log(">>>>",state);
      if(data.status==200)
      dispatch(loginSuccess(data));
      else{
        dispatch(loginFailure(data));
      }
    } catch (error) {
      console.log("....",error);
      dispatch(loginFailure(error.message));

      
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
