/**
 * Sample React Native Login
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
  Button,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
  Alert,
  Linking,
} from 'react-native';
import Animated from "react-native-reanimated";


import { COLORS } from '../../Constants/Colors';
// import * as FirebaseAuth from "../../Firebase/FirebaseAuth"
// import { SignInUser } from '../../Firebase/FirebaseAuth';
import { SignInUser, CreateNewUser } from '../../Firebase/FirebaseAuth'
import * as firebaseDB from '../../Firebase/FirebaseDB';
import { LoginProvider, useLogin } from '../../Statemanagement/Login/LoginContext';
import { NET_STATUS } from '../../Constants/Constants';
const Login = ({ navigation }) => {

  const { height, width, scale, fontScale } = useWindowDimensions()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const { state, dispatch, loginUser } = useLogin();

  const portrait = (height / 10) * 5;
  const landscape = (height / 10) * 8
  const rotateY = new Animated.Value(0);
  // const AnimatedBackground = Animated.createAnimatedComponent(View);

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: rotateY.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg']
        })
      }
    ]
  };

  const loginValidation = ({ id, password }) => {

    if (!id || !password) {
      Alert.alert('Enter the Credentials!')
      return;
    }
    const user = { id, password }
    loginUser(user)
    console.log("state from Login", state)

    if(state.error){
      ToastAndroid.showWithGravityAndOffset(
        state.error.message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
    } else {
      ToastAndroid.showWithGravityAndOffset(
        state.user.message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
      props.navigation.navigate('BottomTab')
    }

  }

  const checkNet=()=>{
    if (!NET_STATUS){
      Alert.alert(
        'Internet is not available',
        'Please turn on your internet connection and try again.',
        [
          {text: 'Settings', onPress: () => Linking.openSettings()},
        ],
      );}
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={{ height: height, width: width, justifyContent: 'center', alignItems: 'center', }} resizeMode='cover' source={require("../../Assets/Images/gradient_bg.png")} >
        <Animated.View style={{ flipToFrontStyle }}>
          <ImageBackground style={{ ...styles.form(height, width), }} source={require("../../Assets/Images/half_bg.png")} >

            <View style={{ ...styles.form(height, width), }}>
              <ScrollView style={{ height: (height / 10) * 8, }}>

                <View style={{ alignSelf: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 24, top: 10, color: COLORS.Font }}>LOGIN</Text>
                  <View style={{ height: '20%', width: '25%', backgroundColor: '#fff', top: 0, margin: 10 }} />
                  <Text>APP LOGO</Text>
                </View>

                <KeyboardAvoidingView style={{ height: height > width ? portrait : landscape, width: '90%', alignSelf: 'center', marginBottom: 80, }} behavior='padding' >
                  <View style={{ ...styles.inputContainer }} >
                    <Image style={styles.inputImg} source={require('../../Assets/Images/mail.png')} />
                    <TextInput style={styles.inputs}
                      value={id}
                      onChangeText={(text) => setId(text)}
                      placeholder='Enter Your Mail' />
                  </View>
                  <View style={styles.inputContainer}>
                    <Image style={styles.inputImg} source={require('../../Assets/Images/padlock.png')} />

                    <TextInput style={styles.inputs}
                      value={password}
                      onChangeText={(text) => setPassword(text)}
                      placeholder='Enter Your Password' />
                    <Image style={{ ...styles.inputImg, }} source={require('../../Assets/Images/eye.png')} />
                  </View>

                  <View style={{ bottom: 0, top: '40%' }}>

                    <TouchableOpacity
                      onPress={() => loginValidation({ id, password })}
                      // onPress={() => navigation.navigate('BottomTab')}
                      style={{
                        ...styles.button,
                        width: (width / 10) * 6,
                      }}>
                      <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        ...styles.button,
                        width: (width / 10) * 6,
                        alignItems: 'center',
                      }}
                     /* onPress={() => {
                        try {

                          fetch('http://192.168.101.184:3000/api/user/createNew',
                            {
                              method: 'POST',
                              headers: {
                                "Content-Type": "application/json"
                              },

                              body: JSON.stringify({
                                "username": "Prince",
                                "password": "prince@123",
                                "id": "prince@gmail.com"
                              })
                            })
                            .then((res) => res.json())
                            .then(res => console.log(JSON.stringify(res)))
                        } catch (err) {
                          console.log("errr in hitting api", err)
                          throw err;
                        }
                      }}*/
                    >
                      <Text style={styles.buttonText}>SignIn with google</Text>
                      <Image
                        style={{
                          ...styles.inputImg,
                          height: 30,
                          width: 30,
                          tintColor: null
                        }}
                        source={require('../../Assets/Images/google.png')} />
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
              {/* <Text onPress={()=>flipToFrontStyle()} style={styles.link}>Create New Account.</Text> */}
            </View>
            <Text onPress={() => navigation.navigate('SignUp')} style={[styles.link]}>Create  An Account</Text>
          </ImageBackground>
        </Animated.View>
      </ImageBackground>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#B2C600",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  form: (deviceHeight, deviceWidth) => ({
    height: (deviceHeight / 10) * 8,
    width: (deviceWidth / 10) * 8,
    backgroundColor: COLORS['T-Background'],


  }),
  inputs: {
    width: '80%',
    height: '95%',
    padding: 5,
    alignSelf: 'center',
    color: COLORS.Font
  },

  inputContainer: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.Border,
  },

  inputImg: {
    height: 15,
    width: 15,
    tintColor: COLORS.Border,
    marginHorizontal: 5,

  },
  button: {
    height: 35,
    width: 120,
    backgroundColor: COLORS.Button,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    elevation: 3,
    flexDirection: 'row',


  },
  buttonText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: COLORS.ButtonText
  },
  link: {
    color: COLORS.Links,
    textDecorationLine: 'underline',
    alignSelf: 'center',
    // backgroundColor:'red',
    bottom: '5%'
  }
});

// export default Login;

const LoginWrapper = (props) => {
  return (
    <LoginProvider>
      <Login {...props} />
    </LoginProvider>
  );
};

export default LoginWrapper;