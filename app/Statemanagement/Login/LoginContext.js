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
      const response = await fetch('http://192.168.102.158:5500/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "userid":user.id.toString(),
          "password":user.password.toString(),
          // "userid":"vipero",
          // "password":"Qwerty56"
        }),
      });

      const data = await response.json();
      // console.log(">>loginprovider>>",data);
      if(data.statuscode==200){
        dispatch(loginSuccess(data));
      }
      else{
        dispatch(loginFailure(data));
      }
    } catch (error) {
      console.log("....",error);
      const customError={
        "message":error.message,
        "statuscode":900,
      }
      dispatch(loginFailure(customError));
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
