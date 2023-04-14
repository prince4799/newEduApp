import AsyncStorage from '@react-native-community/async-storage';
import {ViewStyle} from 'react-native';
import * as CONSTANTS  from '../../Constants/Constants'

const card = (width: any, height: any): ViewStyle => ({
    width: width * 2,
    height: height * 2,
    backgroundColor: 'red',

})


export async function signupAPICalling(endpoint: string, data: { username: string, email: string, password: string, phone: string }): Promise<any> {
    const URL = CONSTANTS.BASE_URL + endpoint;
    // try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          contact: data.phone,
        }),
      });
      const jsonResponse = await response.json();
      console.log('=======', JSON.stringify(jsonResponse));
      return jsonResponse;
    // } catch (error) {
    //   console.log('>>>>>>>>>>', error);
    //   throw new Error('Failed to sign up.');
    //   return error
    // }
  }
  
  export const storeData = async (key: string, value: string, module: string): Promise<string> => {
    try {
      await AsyncStorage.setItem(key, value);
      return 'In'+ CONSTANTS.ASYNC_SUCCESS; // or any other string value you want to return on successful storage of data
    } catch (error:any) {
    //   console.log(error);
      return 'In'+module+CONSTANTS.ASYNC_ERROR+ error.message; // or any other error string you want to return on failure
    }
  };
/*
  export const retrieveData = async (key: string, module: string): Promise<string | null | any> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) {
        console.log("try-if",value)
        return null
        //   return 'In' + module + CONSTANTS.ASYNC_ERROR + 'Data not found!'; // or any other error string you want to return if the data is not found
        } 
        console.log("try-else",value)

          return value; // return the value if it exists
      
    } catch (error:any) {
      return 'In' + module + CONSTANTS.ASYNC_ERROR + error.message; // or any other error string you want to return if an error occurs while retrieving the data
    }
  };
  */
  export const retrieveData = async (key: string, module: string): Promise<object> => {
    try {
        
        const value = await AsyncStorage.getItem(key);
        if (value === null) {
          const valobj={
            "status": 'false',
            "value": value
          }
          return valobj;
        }
        const parsedValue = JSON.parse(value);
        const valobj={
          "status": 'true',
          "value": parsedValue
        }
        return valobj;
    } catch (error:any) {
       const valobj={
        "status": 'true',
        "value": null
      }
      return  valobj;
    }
  };
  
 export const removeData = async (key : string): Promise<string> => {
    try {
      await AsyncStorage.removeItem(key);
      return key+'Succefully removed'
    } catch (error: any) {
      console.log(error);
      return key+'error in removing'+error.message
    }
  };

  interface Params {
    url: string;
    body?: Record<string, any>;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    headers?: Record<string, string>;
    secret?: string;
  }
  
  const apiCaling = async (params: Params): Promise<any> => {
    const { url, body, method, headers = {}, secret } = params;
  
    if (secret) {
      headers['Authorization'] = `Bearer ${secret}`;
    }
  
    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };
  
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(`Error calling API: ${error}`);
      throw error;
    }
  };
  

  