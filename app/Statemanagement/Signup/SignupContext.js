import React, { createContext, useContext, useReducer } from 'react';
import { signupReducer, initialState } from './SignupReducer';
import { signupRequest, signupSuccess, signupFailure } from './SignUpAction';

const SignupContext = createContext({
  state: initialState,
  dispatch: () => {},
  signUpUser: () => {},
});

export const SignupProvider = ({ children }) => {
  const [state, dispatch] = useReducer(signupReducer, initialState);

  const signUpUser = async (user) => {
    dispatch(signupRequest());

    try {
      const response = await fetch('http://192.168.101.57:5500/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "username":user.username,
          "password":user.password,
          "email":user.email,
          "contact":user.phone
        }),
      });

      const data = await response.json();
      // console.log(">>>>",state);
      if(data.status==200)
      dispatch(signupSuccess(data));
      else{
        dispatch(signupFailure(data));
      }
    } catch (error) {
      console.log("....",error);
      dispatch(signupFailure(error.message));

      
    }
  };

  const value = {
    state,
    dispatch,
    signUpUser,
  };

  return (
    <SignupContext.Provider value={value}>
      {children}
    </SignupContext.Provider>
  );
};

export function useSignup() {
  return useContext(SignupContext);
}
