import React, { createContext, useContext, useReducer } from 'react';
import { loginReducer, initialState } from './LoginReducer';
import { loginRequest, loginSuccess, loginFailure } from './LoginAction';
import { BASE_URL } from '../../Constants/Constants';
import { alert, apiCaling } from '../../Assets/Utils/ExtenFunc';

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

    // const userOption = options[user.userType];
    // // if (!userOption) {
    // //   throw new Error('Invalid user type');
    // // }
    // console.log("userType",userOption)

    if (user.userType === 'Admin') {
      options.Admin.headers[user.secret.secretKey] = user.secret.secretValue;
    }

    try {
      const response = await apiCaling(user.userType == 'Admin' ? options.Admin : options.User);
      if (response.statuscode == 200) {
        console.log("reponse", response)
        dispatch(loginSuccess(response));
      } else {
        dispatch(loginFailure(response));
      }
    } catch (error) {
      console.error(error);
    }

    /*switch (user.userType){
      case 'Admin':
        const secretKey= user.secret.secretKey;
        const secretValue= user.secret.secretValue;
        const option1={
          url:'admin/auth/login',
          body:{
            "userid":"Derma4799",
            "password":"Qwerty98",
        },
        method:'POST',
        headers: { 
          'Content-Type': 'application/json',
          [secretKey]: secretValue,
       },
      }
      console.log("data",data);
      if(data.statuscode==200){
        dispatch(loginSuccess(data));
      }
      else{
        dispatch(loginFailure(data));
      }
        break;

      case 'User':
        console.log(">>>>>here in case 2")
        const option2={
          url:'auth/signin',
          body:{
            "userid":"Prince4799",
            "password":"12340000"
        },
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
      }

      console.log("data",data);
      if(data.statuscode==200){
        dispatch(loginSuccess(data));
      }
      else{
        dispatch(loginFailure(data));
      }
        break;
    }
      const data=await apiCaling(user.userType== 'Admin'? option1: [option2])

    console.log("data",data);
    if(data.statuscode==200){
      dispatch(loginSuccess(data));
    }
    else{
      dispatch(loginFailure(data));
    }
    */
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
