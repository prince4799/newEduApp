import { Dimensions } from "react-native"


export var DIMENSIONS ={
    WIDTH :Dimensions.get('screen').width/10,
    SCALE :Dimensions.get('screen').scale,
    FONTSCALE :Dimensions.get('screen').fontScale,
    HEIGHT :Dimensions.get('screen').height/10,
}
// export const BASE_URL='http://192.168.43.239:5500/'//   http://localhost:5500/auth/signin //realme
// export const BASE_URL='http://localhost:5500/'//   http://localhost:5500/auth/signin 
export const BASE_URL='http://192.168.102.158:5500/'//   http://localhost:5500/auth/signin //kreate
// export const BASE_URL='http://prince.nationaltalentofindia.com/'

export const NET_STATUS='';
export const APP_VERSION='';
export const IS_LOGGED_IN='';
export const ASYNC_SUCCESS='SUCCESS';
export const ASYNC_ERROR='ERROR';

export const LOGIN_REQUEST='LOGIN_REQUEST';
export const LOGIN_SUCCESS="LOGIN_SUCCESS";
export const LOGIN_FAILURE="LOGIN_FAILURE";

export const stored={
    TOKEN:'',
    SECRET_KEY:'',
    SECRET_VALUE:'',
    USER_NAME:'',
    EMAIL:'',
    CONTACT:'',
    USER_TYPE:'',
    UPDATED:false
}





