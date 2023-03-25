import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

import AsyncStorage from '@react-native-community/async-storage';

import {
    View,
    Text,
    StyleSheet,
    ViewStyle,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import Animated, { FadeInUp, log, SlideInLeft, SlideInRight, ZoomIn } from 'react-native-reanimated';
// import { CONSTANTS DIMENSIONS } from '../../Constants/Constants'
import * as CONSTANTS  from '../../Constants/Constants'

import { IMAGES } from "../../Assets/Images/Images"
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { COLORS } from '../../Constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';


// function ExtenFunc(ObjectData:Object | any  , screenName: string, navigation :any): JSX.Element {
//  export function ExtenFunc(ObjectData:Object | any  , screenName: string, title:string): JSX.Element {
export const VideoLists: React.FC<any> = ({
    ObjectData,
    screenName,
    title,
    navigation
}) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={IMAGES.gradientbg}
                style={styles.flatlistContainer}
            >
                <View style={{
                    height:CONSTANTS.DIMENSIONS.HEIGHT / 2,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor:'red',
                    width: '100%'
                }}>

                    <Text style={styles.flatlisttitle}>{title}</Text>
                    <Text
                        onPress={() => navigation.navigate(screenName)}
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#fff',
                            alignSelf: 'flex-start',
                            textAlignVertical: 'center',
                            marginTop: 10,
                            textDecorationLine: 'underline',

                        }}>View All{`\n`}</Text>
                </View>

                <FlatList
                    data={ObjectData}
                    horizontal
                    renderItem={({ item }) =>
                        <View
                            style={styles.flatlistcard}>

                        </View>
                    }
                />
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },

    button: {
        height: 35,
        width: 120,
        backgroundColor: COLORS.Button,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 5,
        elevation: 3,
        flexDirection: 'row',


    },
    buttonText: {
        alignSelf: 'center',
        textAlign: 'center',
        color: COLORS.ButtonText,
    },
    flatlistContainer: {
        height: CONSTANTS.DIMENSIONS.HEIGHT * 3,
        // width: CONSTANTS.DIMENSIONS.WIDTH * 10,
        backgroundColor: '#555',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    flatlisttitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        alignSelf: 'flex-start',
        // backgroundColor:'red',
        textAlignVertical: 'center',
        marginLeft: 10,
        marginTop: 10,
    },
    flatlistcard: {
        elevation: 10,
        height: CONSTANTS.DIMENSIONS.HEIGHT * 2,
        width: CONSTANTS.DIMENSIONS.WIDTH * 4,
        backgroundColor: '#fff',
        borderBottomLeftRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
        borderBottomRightRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
        borderTopRightRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,

    }
});
const card = (width: any, height: any): ViewStyle => ({
    width: width * 2,
    height: height * 2,
    backgroundColor: 'red',

})

/*export async function signupAPICalling(endpoint: string, data: any): Promise<any> {
    const URL = CONSTANTS.BASE_URL + endpoint
    // try {
   const reponse= await fetch(URL, {
        method: 'POST',

        body: JSON.stringify({
            "username": data.username,
            "email": data.email,
            "password": data.password,
            "contact": data.phone
        })
    }).then(res => res.json()).then((res) => {
        console.log("=======", JSON.stringify(res))
        return res;
    })
        .catch(err => {
            console.log(">>>>>>>>>>", err)
            return JSON.stringify(err);
        })
        console.log("=+++++=", JSON.stringify(reponse.error))

        return JSON.stringify(reponse.error);
}*/

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
  
  

  