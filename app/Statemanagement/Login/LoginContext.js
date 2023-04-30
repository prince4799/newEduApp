import React, { createContext, useContext, useReducer } from 'react';
import { loginReducer, initialState } from './LoginReducer';
import { loginRequest, loginSuccess, loginFailure } from './LoginAction';
import { BASE_URL } from '../../Constants/Constants';
import { alert, apiCaling } from '../../Assets/Utils/ExtenFunc';

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
    
      const data=await apiCaling({
        url:'auth/signin',
        body:{
          "userid":"Prince4799",
          "password":"12340000"
      },
      method:'POST',
      headers: { 'Content-Type': 'application/json' },

    })
    console.log("data",data);
    if(data.statuscode==200){
      dispatch(loginSuccess(data));
    }
    else{
      dispatch(loginFailure(data));
    }
   /*
    try {
      const response = await fetch(BASE_URL+'auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({
        //   "userid":user.id.toString(),
        //   "password":user.password.toString(),
        //   // "userid":"vipero",
        //   // "password":"Qwerty56"
        // }),
        body:JSON.stringify({
          "userid":"Prince4799",
          "password":"12340000"
      })
      });

      const data = await response.json();
      console.log(">>loginprovider>>",data);
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
    */
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
