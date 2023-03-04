import { Dimensions } from "react-native"


export var DIMENSIONS ={
    WIDTH :Dimensions.get('screen').width/10,
    SCALE :Dimensions.get('screen').scale,
    FONTSCALE :Dimensions.get('screen').fontScale,
    HEIGHT :Dimensions.get('screen').height/10,
}

export const CONSTANTS={
    
    BASE_URL:'http://192.168.101.57:5500'
}
