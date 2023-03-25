import { Dimensions } from "react-native"


export var DIMENSIONS ={
    WIDTH :Dimensions.get('screen').width/10,
    SCALE :Dimensions.get('screen').scale,
    FONTSCALE :Dimensions.get('screen').fontScale,
    HEIGHT :Dimensions.get('screen').height/10,
}
export const BASE_URL='http://192.168.101.57:5500'
export const NET_STATUS=false;
export const APP_VERSION='';
export const IS_LOGGED_IN='';
export const ASYNC_SUCCESS='SUCCESS';
export const ASYNC_ERROR='ERROR';