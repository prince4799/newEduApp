import AsyncStorage from '@react-native-community/async-storage';
import { ToastAndroid, ViewStyle } from 'react-native';
import * as CONSTANTS from '../../Constants/Constants'

const card = (width: any, height: any): ViewStyle => ({
  width: width * 2,
  height: height * 2,
  backgroundColor: 'red',

})

const debug = true;

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
}

export const storeData = async (key: string, value: string, module: string): Promise<string> => {
  printLog('storing data',key,value,module)
  try {
    await AsyncStorage.setItem(key, ''+value);
    return 'In ' + module + ' ' + CONSTANTS.ASYNC_SUCCESS; // or any other string value you want to return on successful storage of data
  } catch (error: any) {
    //   console.log(error);
    return 'In' + module + CONSTANTS.ASYNC_ERROR + error.message; // or any other error string you want to return on failure
  }
};

export const retrieveData = async (key: string, module: string): Promise<object> => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log('Retrieved value:', value); // Log the value here
    if (value === null) {
      return {
        "status": 'false',
        "value": value
      };
    } else {
      return {
        "status": 'true',
        "value": value
      };
    }
  } catch (error) {
    throw error;
  }
};
  
export const removeData = async (key: string): Promise<string> => {
  try {
    await AsyncStorage.removeItem(key);
    return key + 'Succefully removed'
  } catch (error: any) {
    console.log(error);
    return key + 'error in removing' + error.message
  }
};

interface Params {
  url: string;
  body?: Record<string, any>;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  secret?: string;
}

export const apiCaling = async (params: Params): Promise<any> => {
  const { url, body, method, headers = {}, secret } = params;
printInfo(params)
  if (secret && !url.includes('login'||'signup')) {
    headers['Authorization'] = `Bearer ${secret}`;
  }

  const options: RequestInit = {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    headers: headers,
  };

  try {
    console.log("options", options, CONSTANTS.BASE_URL + url)
    const response = await fetch(CONSTANTS.BASE_URL + url, options);
    const json = await response.json();
    console.log("extenfunc", json)
    return json;
  } catch (error) {
    console.error(`Error calling API: ${error}`);
    throw error;
  }
};

export const alert = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  )
}
export const handleFirstInputEndEditing = (reference: any) => {
  return reference.current?.focus();
};
//red color
interface logInterface {
  (message?: any, ...optionalParams: any[]): void;
}

export const printError: logInterface = (message?: any, ...optionalParams: any[]) => {
  if (debug === true)
    console.log('\x1b[31m', message,...optionalParams);
};
//green color
export const printSucess : logInterface = (message?: any, ...optionalParams: any[]) => {
  if (debug == true)
    console.info('\x1b[32m',message, ...optionalParams)
}
//yellow color
export const printInfo :logInterface= (message?: any, ...optionalParams: any[]) => {
  if (debug == true)
    console.debug('\x1b[33m',message, ...optionalParams)
}
//white color
export const printLog :logInterface =(message?: any, ...optionalParams: any[])=>{
  if (debug == true)
    console.debug('\x1b[37m',message, ...optionalParams)
}


// Prevent from Copying text
export   const handleSelectionChange = (event:any, setState:any,state:any) => {
  // printError(event)
  const { selection } = event.nativeEvent;
  if (selection.start !== selection.end) {
    // Clear the selected text programmatically
    setState(state.substring(0, selection.start) + state.substring(selection.end));
  }
};