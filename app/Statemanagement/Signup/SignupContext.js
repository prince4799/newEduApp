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
    const options = {
      Admin: {
        url: 'admin/auth/create',
        body: {
          "username":"Derma4799",
          "password":"Qwerty98",
          "contact":9839479487,
          "email":"derma@mail.com"
      },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      User: {
        url: 'auth/signup',
        body: {
          "username":"Derma4799",
          "password":"Qwerty98",
          "contact":9839479487,
          "email":"derma@mail.com"
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
        console.log("reponse", response)
        dispatch(signupSuccess(response));
      } else {
        dispatch(signupFailure(response));
      }
    } catch (error) {
      console.error(error);
    }

   /*
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
    */
  

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
