import React, { createContext, useContext, useReducer } from 'react';
import { signupReducer, initialState } from './SignupReducer';
import { signupRequest, signupSuccess, signupFailure } from './SignUpAction';
import { apiCaling, printError, printInfo } from '../../Assets/Utils/ExtenFunc';

const tag = 'from signupContext';
const SignupContext = createContext({
  state: initialState,
  dispatch: () => { },
  signUpUser: () => { },
});

export const SignupProvider = ({ children }) => {
  const [state, dispatch] = useReducer(signupReducer, initialState);

  const signUpUser = async (user) => {
    const { password, email, phone, username, ...rest } = user
    printInfo("signUpUser", user,user.userType)
    dispatch(signupRequest());
    var options={
      body: {
        "username": username,
        "password": password,
        "contact": phone,
        "email": email
      },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    if (user.userType === 'Admin') {
        options["url"]='admin/auth/create',
      options.headers[user.secretKey] = user.secretValue;
    }

    if (user.userType === 'User') {
      options["url"]='auth/signup';
    }

    try {
      const response = await apiCaling(options);
      if (response.statuscode == 200) {
        console.log("reponse", response)
        dispatch(signupSuccess(response));
      } else {
        dispatch(signupFailure(response));
      }
    } catch (error) {
      printError(tag, error);
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
